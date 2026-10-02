import React, { useState } from 'react';
import { MealDay, WeekMeta, DailyLog, ShoppingCategory, PersonalCommitment } from '../types/protocol';
import { WEEKS_DATA, MEAL_DAYS } from '../data/protocolData';
import { Printer, X, Download, Copy, Check, FileText, Calendar, CheckSquare, ShoppingBag, Award } from 'lucide-react';

interface PrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay: number;
  dailyLogs: Record<number, DailyLog>;
  customMeals: Record<number, Partial<MealDay>>;
  shoppingCategories: ShoppingCategory[];
  commitment: PersonalCommitment;
}

export const PrintModal: React.FC<PrintModalProps> = ({
  isOpen,
  onClose,
  currentDay,
  dailyLogs,
  customMeals,
  shoppingCategories,
  commitment
}) => {
  const [printSection, setPrintSection] = useState<'current_week' | 'all_days' | 'daily_log' | 'shopping' | 'commitment'>('current_week');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentWeekNum = Math.ceil(currentDay / 7) || 1;
  const currentWeekMeta = WEEKS_DATA.find((w) => w.week === currentWeekNum) || WEEKS_DATA[0];
  const weekDays = MEAL_DAYS.filter((m) => m.week === currentWeekNum);

  const getMealData = (dayNum: number): MealDay => {
    const base = MEAL_DAYS.find((m) => m.day === dayNum) || MEAL_DAYS[0];
    const custom = customMeals[dayNum];
    if (!custom) return base;
    return { ...base, ...custom };
  };

  const activeLog = dailyLogs[currentDay];

  // Try window.print with friendly fallback
  const handleTriggerPrint = () => {
    try {
      window.print();
    } catch (e) {
      alert("Para imprimir no seu dispositivo móvel, use a opção 'Baixar Versão para PDF' abaixo.");
    }
  };

  // Generate clean HTML printable document that opens cleanly in any mobile or desktop browser
  const handleDownloadPrintableHTML = () => {
    let contentHtml = '';

    if (printSection === 'current_week' || printSection === 'all_days') {
      const daysToRender = printSection === 'current_week' ? weekDays : MEAL_DAYS;
      const title = printSection === 'current_week'
        ? `Semana ${currentWeekMeta.week}: ${currentWeekMeta.title} (${currentWeekMeta.daysRange})`
        : 'Cardápio Completo · 42 Dias';

      contentHtml = `
        <h1>PROTOCOLO VERÃO 42 — MÉTODO C.A.S.A.</h1>
        <h2>${title}</h2>
        <p><strong>Subtítulo:</strong> Um plano prático de 42 dias para melhorar sua alimentação, sua rotina e sua relação com o corpo.</p>
        <div style="background:#fef3c7; padding:12px; border-radius:8px; margin-bottom:20px; font-size:12px;">
          <strong>AVISO IMPORTANTE:</strong> Este material tem finalidade educativa e não substitui consulta médica ou nutricional.
        </div>
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse:collapse; font-size:12px;">
          <thead>
            <tr style="background:#e2e8f0;">
              <th>Dia</th>
              <th>Café da manhã</th>
              <th>Almoço</th>
              <th>Lanche opcional</th>
              <th>Jantar</th>
            </tr>
          </thead>
          <tbody>
            ${daysToRender.map((d) => {
              const meal = getMealData(d.day);
              return `
                <tr>
                  <td style="font-weight:bold; text-align:center;">Dia ${d.day}</td>
                  <td>${meal.breakfast}</td>
                  <td>${meal.lunch}</td>
                  <td>${meal.snack}</td>
                  <td>${meal.dinner}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      `;
    } else if (printSection === 'daily_log') {
      contentHtml = `
        <h1>PROTOCOLO VERÃO 42 — REGISTRO DIÁRIO</h1>
        <h2>Dia ${currentDay} de 42</h2>
        <p><strong>Data:</strong> ${activeLog?.date || new Date().toLocaleDateString('pt-BR')}</p>
        <hr/>
        <p><strong>Dormi aproximadamente:</strong> ${activeLog?.sleepHours || 7} horas</p>
        <p><strong>Bebi água:</strong> ${activeLog?.waterGlasses || 6} copos (${(activeLog?.waterGlasses || 6) * 250} ml)</p>
        <p><strong>Comi frutas ou vegetais:</strong> ${activeLog?.fruitVegStatus || 'Sim'}</p>
        <p><strong>Fiz algum movimento:</strong> ${activeLog?.movementStatus === 'sim' ? `Sim (${activeLog?.movementType || 'Caminhada'}, ${activeLog?.movementMinutes || 20} min)` : 'Não'}</p>
        <p><strong>Fome antes das refeições:</strong> ${activeLog?.hungerBefore || 'Moderada'}</p>
        <p><strong>Sensação depois de comer:</strong> ${activeLog?.postMealFeeling || 'Satisfeito'}</p>
        <br/>
        <div style="border:1px solid #cbd5e1; padding:12px; border-radius:6px;">
          <p><strong>Uma vitória de hoje:</strong></p>
          <p>${activeLog?.victoryToday || 'Alimentação equilibrada e sem pressa.'}</p>
        </div>
        <br/>
        <div style="border:1px solid #cbd5e1; padding:12px; border-radius:6px;">
          <p><strong>Algo que posso ajustar amanhã:</strong></p>
          <p>${activeLog?.adjustmentTomorrow || 'Planejar a garrafa de água logo pela manhã.'}</p>
        </div>
      `;
    } else if (printSection === 'shopping') {
      contentHtml = `
        <h1>PROTOCOLO VERÃO 42 — LISTA DE COMPRAS</h1>
        <p>Data de geração: ${new Date().toLocaleDateString('pt-BR')}</p>
        <hr/>
        ${shoppingCategories.map((cat) => `
          <h3>${cat.name}</h3>
          <ul>
            ${cat.items.map((i) => `<li>[ ${i.checked ? 'X' : ' '} ] ${i.name}</li>`).join('')}
          </ul>
        `).join('')}
      `;
    } else if (printSection === 'commitment') {
      contentHtml = `
        <div style="text-align:center; padding:30px; border:3px double #065f46;">
          <h1>PROTOCOLO VERÃO 42 — MÉTODO C.A.S.A.</h1>
          <h2>TERMO DE COMPROMISSO PESSOAL</h2>
          <p style="font-size:16px;">Eu, <strong>${commitment.name || 'Participante do Protocolo'}</strong>, assumo o compromisso de:</p>
          <ul style="text-align:left; display:inline-block; font-size:14px; line-height:1.8;">
            <li>Cuidar do meu corpo sem punição ou culpa;</li>
            <li>Respeitar minha fome e minha saciedade natural;</li>
            <li>Buscar constância em vez de perfeição;</li>
            <li>Adaptar as sugestões à minha realidade;</li>
            <li>Pedir ajuda profissional quando necessário;</li>
            <li>Valorizar minha saúde para além do peso.</li>
          </ul>
          <br/><br/>
          <p><strong>Data de início:</strong> ${commitment.startDate}</p>
          <p><strong>Assinado digitalmente em:</strong> ${commitment.signatureDate || new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      `;
    }

    const fullDocument = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <title>Protocolo Verão 42 - Impressão / PDF</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 24px; color: #1e293b; max-width: 800px; margin: 0 auto; line-height: 1.5; }
          h1 { color: #065f46; margin-bottom: 4px; font-size: 22px; }
          h2 { color: #334155; margin-top: 0; font-size: 16px; font-weight: 600; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 10px; font-size: 13px; text-align: left; }
          th { background-color: #f1f5f9; font-weight: 600; }
          @media print {
            body { padding: 0; }
            .no-print-btn { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="no-print-btn" style="margin-bottom: 20px; padding: 12px; background: #e0f2fe; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 13px; color: #0369a1; font-weight: 500;">Página pronta para imprimir ou Salvar como PDF pelo navegador.</span>
          <button onclick="window.print()" style="background:#0284c7; color:white; border:none; padding:8px 16px; border-radius:6px; font-weight:bold; cursor:pointer;">
            Imprimir / Salvar PDF
          </button>
        </div>
        ${contentHtml}
      </body>
      </html>
    `;

    const blob = new Blob([fullDocument], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const newWindow = window.open(url, '_blank');
    if (!newWindow) {
      // Fallback: download as .html file
      const a = document.createElement('a');
      a.href = url;
      a.download = `protocolo_verao_42_${printSection}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  // Copy text representation
  const handleCopyText = () => {
    let text = `PROTOCOLO VERÃO 42 — MÉTODO C.A.S.A.\n`;
    if (printSection === 'current_week') {
      text += `SEMANA ${currentWeekMeta.week}: ${currentWeekMeta.title.toUpperCase()}\n\n`;
      weekDays.forEach((d) => {
        const m = getMealData(d.day);
        text += `DIA ${d.day}:\n`;
        text += `• Café da manhã: ${m.breakfast}\n`;
        text += `• Almoço: ${m.lunch}\n`;
        text += `• Lanche: ${m.snack}\n`;
        text += `• Jantar: ${m.dinner}\n\n`;
      });
    } else if (printSection === 'all_days') {
      text += `CARDÁPIO COMPLETO (42 DIAS)\n\n`;
      MEAL_DAYS.forEach((d) => {
        const m = getMealData(d.day);
        text += `DIA ${d.day} (Semana ${d.week}):\n`;
        text += `• Café: ${m.breakfast}\n• Almoço: ${m.lunch}\n• Lanche: ${m.snack}\n• Jantar: ${m.dinner}\n\n`;
      });
    } else if (printSection === 'daily_log') {
      text += `REGISTRO DIÁRIO — DIA ${currentDay}\n`;
      text += `• Sono: ${activeLog?.sleepHours || 7} horas\n`;
      text += `• Água: ${(activeLog?.waterGlasses || 6) * 250} ml\n`;
      text += `• Frutas/Vegetais: ${activeLog?.fruitVegStatus || 'Sim'}\n`;
      text += `• Movimento: ${activeLog?.movementStatus === 'sim' ? 'Sim' : 'Não'}\n`;
      text += `• Vitória de hoje: ${activeLog?.victoryToday || '-'}\n`;
      text += `• Ajustar amanhã: ${activeLog?.adjustmentTomorrow || '-'}\n`;
    } else if (printSection === 'shopping') {
      text += `LISTA DE COMPRAS:\n\n`;
      shoppingCategories.forEach((c) => {
        text += `${c.name.toUpperCase()}:\n`;
        c.items.forEach((i) => {
          text += `[${i.checked ? 'X' : ' '}] ${i.name}\n`;
        });
        text += `\n`;
      });
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-900/70 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border border-stone-200 space-y-5 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-stone-900">
                Imprimir ou Salvar em PDF
              </h3>
              <p className="text-xs text-stone-500">
                Funciona em celulares, tablets e computadores.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Picker Tabs */}
        <div>
          <label className="block text-xs font-bold text-stone-700 mb-2">
            Escolha o que deseja imprimir / salvar:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              onClick={() => setPrintSection('current_week')}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                printSection === 'current_week'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                  : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
              }`}
            >
              <Calendar className="w-4 h-4 mb-1 text-emerald-700" />
              <span className="text-xs block">Semana Atual ({currentWeekNum})</span>
              <span className="text-[10px] text-stone-500 font-normal">7 dias da semana</span>
            </button>

            <button
              onClick={() => setPrintSection('all_days')}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                printSection === 'all_days'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                  : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
              }`}
            >
              <FileText className="w-4 h-4 mb-1 text-emerald-700" />
              <span className="text-xs block">Todos os 42 Dias</span>
              <span className="text-[10px] text-stone-500 font-normal">Guia completo</span>
            </button>

            <button
              onClick={() => setPrintSection('daily_log')}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                printSection === 'daily_log'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                  : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
              }`}
            >
              <CheckSquare className="w-4 h-4 mb-1 text-emerald-700" />
              <span className="text-xs block">Diário do Dia {currentDay}</span>
              <span className="text-[10px] text-stone-500 font-normal">Registro de hoje</span>
            </button>

            <button
              onClick={() => setPrintSection('shopping')}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                printSection === 'shopping'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                  : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
              }`}
            >
              <ShoppingBag className="w-4 h-4 mb-1 text-emerald-700" />
              <span className="text-xs block">Lista de Compras</span>
              <span className="text-[10px] text-stone-500 font-normal">Para levar ao mercado</span>
            </button>

            <button
              onClick={() => setPrintSection('commitment')}
              className={`p-3 rounded-xl text-left border transition-all cursor-pointer sm:col-span-2 ${
                printSection === 'commitment'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                  : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700'
              }`}
            >
              <Award className="w-4 h-4 mb-1 text-amber-600" />
              <span className="text-xs block">Certificado de Compromisso</span>
              <span className="text-[10px] text-stone-500 font-normal">Seu pacto de autocuidado</span>
            </button>
          </div>
        </div>

        {/* Live Clean Preview Box */}
        <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 max-h-56 overflow-y-auto text-xs text-stone-700">
          <div className="flex items-center justify-between font-bold text-stone-900 pb-2 border-b border-stone-200">
            <span>Pré-visualização do conteúdo:</span>
            <span className="text-[11px] text-emerald-800 uppercase font-mono">Formatado para A4</span>
          </div>

          {printSection === 'current_week' && (
            <div className="space-y-2">
              <p className="font-bold text-emerald-900">
                Semana {currentWeekMeta.week}: {currentWeekMeta.title} ({currentWeekMeta.daysRange})
              </p>
              {weekDays.map((d) => {
                const meal = getMealData(d.day);
                return (
                  <div key={d.day} className="p-2 bg-white rounded-lg border border-stone-200 space-y-0.5">
                    <span className="font-bold text-stone-800">Dia {d.day}:</span>
                    <p className="text-[11px] text-stone-600">☕ {meal.breakfast} · 🍽️ {meal.lunch} · 🍎 {meal.snack} · 🌙 {meal.dinner}</p>
                  </div>
                );
              })}
            </div>
          )}

          {printSection === 'all_days' && (
            <p className="text-stone-600">
              O documento incluirá a tabela completa dos 42 dias, dividida pelas 6 semanas do método C.A.S.A., com café da manhã, almoço, lanche opcional e jantar.
            </p>
          )}

          {printSection === 'daily_log' && (
            <div className="space-y-1">
              <p><strong>Dia {currentDay} de 42:</strong> {activeLog?.date || 'Hoje'}</p>
              <p>• Sono: {activeLog?.sleepHours || 7} horas | Água: {(activeLog?.waterGlasses || 6) * 250} ml</p>
              <p>• Vitória: {activeLog?.victoryToday || 'Não preenchido'}</p>
              <p>• Ajuste: {activeLog?.adjustmentTomorrow || 'Não preenchido'}</p>
            </div>
          )}

          {printSection === 'shopping' && (
            <div className="space-y-1">
              {shoppingCategories.map((c) => (
                <div key={c.id}>
                  <strong>{c.name}:</strong> {c.items.map((i) => i.name).slice(0, 4).join(', ')}...
                </div>
              ))}
            </div>
          )}

          {printSection === 'commitment' && (
            <div>
              <p><strong>Compromisso de:</strong> {commitment.name || '(Seu Nome)'}</p>
              <p>Data de início: {commitment.startDate}</p>
            </div>
          )}
        </div>

        {/* Action Buttons: 3 foolproof options */}
        <div className="space-y-2 pt-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {/* Primary Action 1: Open printable HTML/PDF in new tab (works 100% on phones and iframes) */}
            <button
              onClick={handleDownloadPrintableHTML}
              className="min-h-[46px] w-full px-4 py-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>Abrir Página / Salvar PDF</span>
            </button>

            {/* Primary Action 2: Trigger direct browser print dialog */}
            <button
              onClick={handleTriggerPrint}
              className="min-h-[46px] w-full px-4 py-3 text-xs font-bold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 shrink-0 text-stone-600" />
              <span>Imprimir no Navegador</span>
            </button>
          </div>

          {/* Action 3: Copy Text to clipboard */}
          <button
            onClick={handleCopyText}
            className="min-h-[42px] w-full px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Texto copiado com sucesso!' : 'Copiar Texto para Bloco de Notas'}</span>
          </button>
        </div>

        <div className="text-[11px] text-stone-400 text-center">
          Dica para celular: ao clicar em &quot;Abrir Página / Salvar PDF&quot;, você pode usar o menu do navegador e selecionar &quot;Compartilhar &gt; Imprimir &gt; Salvar como PDF&quot;.
        </div>
      </div>
    </div>
  );
};
