import React, { useState } from 'react';
import { CASA_PILLARS, PROTOCOL_SUBTITLE, PROTOCOL_TAGLINE } from '../data/protocolData';
import { HealthDisclaimerBanner } from './HealthDisclaimerBanner';
import { Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import heroImage from '../assets/images/hero_summer_healthy_meal_1790970391387.jpg';

interface ProtocolBannerProps {
  onStartTracking?: () => void;
  currentDay: number;
}

export const ProtocolBanner: React.FC<ProtocolBannerProps> = ({ onStartTracking, currentDay }) => {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  return (
    <div className="bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-4">
        {/* Prominent, crystal-clear health warning right on top */}
        <HealthDisclaimerBanner />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          {/* Left Column: Headlines, Tagline & CASA intro */}
          <div className="lg:col-span-7 space-y-3.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Método C.A.S.A. · 42 Dias de Escolhas Possíveis</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              Protocolo Verão 42
            </h1>

            <p className="text-base sm:text-lg text-emerald-800 font-bold">
              {PROTOCOL_TAGLINE}
            </p>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-2xl">
              {PROTOCOL_SUBTITLE} Sem promessas irreais, sem chás de efeito falso e sem passar fome. Um método centrado em comida de verdade, atenção à fome e simplicidade.
            </p>

            {/* Quick Metrics Bar with Touch Targets */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-1 max-w-md">
              <div className="p-2.5 sm:p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-center sm:text-left">
                <span className="block text-xl sm:text-2xl font-black text-stone-900 font-mono tabular-nums">42</span>
                <span className="text-[11px] text-stone-500 font-medium">Dias de plano</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-center sm:text-left">
                <span className="block text-xl sm:text-2xl font-black text-emerald-700 font-mono tabular-nums">6</span>
                <span className="text-[11px] text-stone-500 font-medium">Semanas guia</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 text-center sm:text-left">
                <span className="block text-xl sm:text-2xl font-black text-emerald-800 font-mono tabular-nums">Dia {currentDay}</span>
                <span className="text-[11px] text-emerald-700 font-medium">Seu progresso</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Photography */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-stone-200 bg-stone-100 group">
              <img
                src={heroImage}
                alt="Prato equilibrado com comida de verdade: frango grelhado, arroz, feijão e salada colorida"
                className="w-full h-48 sm:h-64 object-cover object-center group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col justify-end p-4">
                <div className="flex items-center gap-1.5 text-white/90 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Comida de verdade · Prato equilibrado</span>
                </div>
                <p className="text-white text-xs sm:text-sm font-semibold mt-0.5">
                  Arroz, feijão, vegetais e proteína: a base sólida e sustentável.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 CASA Pillars Interactive Bar */}
        <div className="pt-4 border-t border-stone-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Os 4 Pilares do Método C.A.S.A.
            </span>
            <span className="text-[11px] text-stone-400">Toque para ver detalhes</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
            {CASA_PILLARS.map((pillar, idx) => {
              const isSelected = activePillar === idx;
              return (
                <button
                  key={pillar.letter + idx}
                  onClick={() => setActivePillar(isSelected ? null : idx)}
                  className={`min-h-[56px] p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-500/20 shadow-xs'
                      : 'bg-white hover:bg-stone-50 border-stone-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-black font-mono text-xs shrink-0">
                      {pillar.letter}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold text-stone-900 truncate">
                        {pillar.title}
                      </h3>
                      <p className="text-[10px] text-stone-500 truncate">
                        {pillar.focus}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <p className="mt-2.5 text-[11px] text-stone-700 leading-snug pt-2 border-t border-emerald-200">
                      {pillar.description}
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
