import React, { useState } from 'react';
import { SUSTAINABLE_HABITS_LIST, FAQS } from '../data/protocolData';
import { exportAllDataAsJSON } from '../utils/storage';
import { CheckSquare, ChevronDown, ChevronUp, Download, Heart, HelpCircle, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FAQAndHabitsProps {
  selectedHabits: string[];
  onToggleHabit: (habit: string) => void;
  onOpenPauseModal: () => void;
}

export const FAQAndHabits: React.FC<FAQAndHabitsProps> = ({
  selectedHabits,
  onToggleHabit,
  onOpenPauseModal
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSelectHabit = (habit: string) => {
    onToggleHabit(habit);
    if (!selectedHabits.includes(habit) && selectedHabits.length + 1 === 5) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* 5 Habits for Life (Página 50) */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
              Página 50 — Após os 42 Dias
            </span>
            <h3 className="text-xl font-bold text-stone-900 mt-2">
              Escolha 5 Hábitos Sustentáveis para Manter
            </h3>
            <p className="text-xs text-stone-500 mt-0.5">
              O fim do protocolo não é o fim do cuidado. É a consolidação da sua nova rotina.
            </p>
          </div>

          <div className="px-3 py-1.5 bg-stone-100 rounded-xl text-xs font-semibold text-stone-700">
            {selectedHabits.length} de 5 selecionados
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
          {SUSTAINABLE_HABITS_LIST.map((habit, idx) => {
            const isChecked = selectedHabits.includes(habit);
            return (
              <div
                key={idx}
                onClick={() => handleSelectHabit(habit)}
                className={`p-3 rounded-xl border text-xs flex items-center justify-between cursor-pointer select-none transition-all ${
                  isChecked
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-medium'
                    : 'bg-stone-50 hover:bg-stone-100/70 border-stone-200 text-stone-700'
                }`}
              >
                <span>{habit}</span>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 ml-2 pointer-events-none"
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mindful Pause Quick Trigger Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
            Ferramenta Rápida · Página 49
          </span>
          <h4 className="text-lg font-bold">
            Sentiu vontade súbita ou ansiedade para comer?
          </h4>
          <p className="text-xs text-emerald-100 max-w-xl leading-relaxed">
            Faça a pausa guiada de 2 minutos antes de ir à despensa. Respire, beba água e decida com tranquilidade.
          </p>
        </div>

        <button
          onClick={onOpenPauseModal}
          className="px-4 py-2.5 bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs rounded-xl transition-colors shadow-xs shrink-0 cursor-pointer"
        >
          Iniciar Pausa de 2 Minutos
        </button>
      </div>

      {/* FAQ Accordion (Página 51) */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
            Página 51 · Dúvidas Comuns
          </span>
          <h3 className="text-xl font-bold text-stone-900 mt-1">
            Perguntas Frequentes (FAQ)
          </h3>
        </div>

        <div className="space-y-2 pt-2">
          {FAQS.map((item, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border border-stone-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-stone-800 hover:bg-stone-50 transition-colors"
                >
                  <span>{item.q}</span>
                  {isOpen ? <ChevronUp className="w-4 h-4 text-stone-400 shrink-0 ml-2" /> : <ChevronDown className="w-4 h-4 text-stone-400 shrink-0 ml-2" />}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-stone-600 leading-relaxed border-t border-stone-100 bg-stone-50/50">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Data Backup & Export Box */}
      <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <span className="font-bold text-stone-900 block">
            Seus dados são 100% privados e salvos no seu navegador
          </span>
          <span className="text-stone-500">
            Você pode exportar um arquivo JSON de backup a qualquer momento para guardar seu histórico dos 42 dias.
          </span>
        </div>
        <button
          onClick={exportAllDataAsJSON}
          className="inline-flex items-center gap-2 px-3.5 py-2 font-bold text-stone-700 bg-white hover:bg-stone-100 border border-stone-200 rounded-xl transition-colors cursor-pointer shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-stone-600" />
          <span>Exportar Backup (JSON)</span>
        </button>
      </div>
    </div>
  );
};
