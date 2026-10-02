import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, HeartPulse } from 'lucide-react';

export const HealthDisclaimerBanner: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-amber-50 border-y sm:border sm:rounded-2xl border-amber-300/80 shadow-xs overflow-hidden my-4">
      {/* High-visibility header bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-3 sm:px-5 flex items-center justify-between cursor-pointer select-none bg-amber-100/70 hover:bg-amber-100 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-amber-600 text-white rounded-lg shrink-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs sm:text-sm font-extrabold text-amber-950 uppercase tracking-tight block">
              Página 2 — Aviso Importante de Saúde & Ética
            </span>
            <span className="text-[11px] text-amber-800">
              Leia com atenção antes de iniciar qualquer mudança em sua rotina
            </span>
          </div>
        </div>

        <button
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-amber-900"
          aria-label={isExpanded ? 'Recolher aviso' : 'Expandir aviso'}
        >
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Clear, structured body */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-3.5 text-xs sm:text-sm text-stone-800 leading-relaxed bg-amber-50/60">
          <p className="font-semibold text-amber-950">
            Este material tem finalidade estritamente educativa e informativa. Ele não substitui consulta, diagnóstico ou plano de tratamento individualizado realizado por médico, nutricionista, psicólogo ou profissional habilitado.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-white rounded-xl border border-amber-200/80 space-y-1">
              <span className="font-bold text-amber-900 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-600 shrink-0" />
                Condições que Exigem Orientação Médica
              </span>
              <p className="text-xs text-stone-600">
                Gestantes, lactantes, adolescentes, idosos, pessoas com diabetes, hipertensão, doenças renais, doenças gastrointestinais, alergias ou histórico de transtornos alimentares devem buscar avaliação profissional individual antes de qualquer mudança.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-amber-200/80 space-y-1">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Sem Promessas Mágicas ou &quot;Detox&quot;
              </span>
              <p className="text-xs text-stone-600">
                Não existe resultado igual para todos. O foco do protocolo é desenvolver constância, disposição e hábitos saudáveis possíveis — sem chás milagrosos, sem jejuns forçados e sem meta obrigatória de peso.
              </p>
            </div>
          </div>

          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950 flex items-start gap-2.5">
            <span className="font-black text-rose-700 text-sm shrink-0">⚠️</span>
            <div>
              <span className="font-bold block">Sinais de alerta para interrupção imediata:</span>
              <span>
                Interrompa qualquer atividade física e procure atendimento médico imediato se sentir dor no peito, falta de ar intensa, tontura, desmaio, confusão mental ou palpitações persistentes.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
