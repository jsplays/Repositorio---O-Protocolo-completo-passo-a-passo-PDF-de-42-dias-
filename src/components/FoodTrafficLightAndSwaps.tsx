import React, { useState } from 'react';
import { TRAFFIC_LIGHT_DATA, FOOD_SUBSTITUTIONS } from '../data/protocolData';
import { ArrowLeftRight, CheckCircle2, AlertTriangle, AlertCircle, Search, Sparkles, HelpCircle } from 'lucide-react';

export const FoodTrafficLightAndSwaps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'traffic' | 'swaps'>('swaps');
  const [selectedTrafficLight, setSelectedTrafficLight] = useState<'green' | 'yellow' | 'red'>('green');
  const [searchSwap, setSearchSwap] = useState('');
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);

  const filteredSubs = FOOD_SUBSTITUTIONS.filter((sub) => {
    const text = `${sub.original} ${sub.alternatives.join(' ')} ${sub.note || ''}`.toLowerCase();
    return text.includes(searchSwap.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Top Toggle Switch */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-stone-900">
            Semáforo Alimentar & Substituições Inteligentes
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Aprenda a fazer trocas equivalentes sem passar fome ou culpa (Páginas 7 e 48 do protocolo).
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
          <button
            onClick={() => setActiveTab('swaps')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'swaps'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Substituições Simples (Pág 48)
          </button>
          <button
            onClick={() => setActiveTab('traffic')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'traffic'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Semáforo Alimentar (Pág 7)
          </button>
        </div>
      </div>

      {activeTab === 'swaps' ? (
        /* TAB 1: Substituições Simples */
        <div className="space-y-6">
          {/* Search and Helper card */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 text-xs text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="max-w-2xl">
              <span className="font-bold text-sm block text-emerald-900 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-700" />
                Como funcionam as trocas no Método C.A.S.A.
              </span>
              <p className="leading-relaxed">
                A substituição não precisa ter exatamente o mesmo número de calorias. O objetivo é manter uma combinação semelhante de grupos alimentares (carboidrato por carboidrato, proteína por proteína) adaptando ao seu gosto, bolso e rotina.
              </p>
            </div>

            <div className="relative w-full sm:w-64 shrink-0">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Buscar ingrediente..."
                value={searchSwap}
                onChange={(e) => setSearchSwap(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-emerald-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 text-stone-800"
              />
            </div>
          </div>

          {/* Substitutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSubs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200 p-5 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold block">
                        Se a receita pedir:
                      </span>
                      <h4 className="text-base font-bold text-stone-900">
                        {item.original}
                      </h4>
                    </div>
                    {item.note && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        {item.note}
                      </span>
                    )}
                  </div>

                  <div className="pt-3">
                    <span className="text-xs font-semibold text-stone-700 block mb-2">
                      Você pode usar no lugar:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.alternatives.map((alt, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2.5 py-1 text-xs bg-stone-50 hover:bg-emerald-50 text-stone-800 hover:text-emerald-900 border border-stone-200 rounded-md transition-colors font-medium"
                        >
                          {alt}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-400">
                  Equivalente nutricional direto dentro do mesmo grupo
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* TAB 2: Semáforo Alimentar (Página 7) */
        <div className="space-y-6">
          {/* 3 Traffic Segments Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedTrafficLight('green')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedTrafficLight === 'green'
                  ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full ${selectedTrafficLight === 'green' ? 'bg-emerald-300' : 'bg-emerald-600'}`} />
                <span className="text-sm font-bold">Verde</span>
              </div>
              <p className={`text-xs mt-1.5 ${selectedTrafficLight === 'green' ? 'text-emerald-100' : 'text-stone-500'}`}>
                Priorize com frequência · Base da rotina
              </p>
            </button>

            <button
              onClick={() => setSelectedTrafficLight('yellow')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedTrafficLight === 'yellow'
                  ? 'bg-amber-600 text-white border-amber-700 shadow-sm'
                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full ${selectedTrafficLight === 'yellow' ? 'bg-amber-200' : 'bg-amber-500'}`} />
                <span className="text-sm font-bold">Amarelo</span>
              </div>
              <p className={`text-xs mt-1.5 ${selectedTrafficLight === 'yellow' ? 'text-amber-100' : 'text-stone-500'}`}>
                Atenção à quantidade & frequência
              </p>
            </button>

            <button
              onClick={() => setSelectedTrafficLight('red')}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedTrafficLight === 'red'
                  ? 'bg-stone-800 text-white border-stone-900 shadow-sm'
                  : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-3.5 h-3.5 rounded-full ${selectedTrafficLight === 'red' ? 'bg-rose-400' : 'bg-rose-500'}`} />
                <span className="text-sm font-bold">Vermelho</span>
              </div>
              <p className={`text-xs mt-1.5 ${selectedTrafficLight === 'red' ? 'text-stone-200' : 'text-stone-500'}`}>
                Consumo ocasional (não proibido!)
              </p>
            </button>
          </div>

          {/* Active Traffic Light Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-6">
            <div>
              <h3 className="text-xl font-bold text-stone-900">
                {TRAFFIC_LIGHT_DATA[selectedTrafficLight].title}
              </h3>
              <p className="text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                {TRAFFIC_LIGHT_DATA[selectedTrafficLight].description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TRAFFIC_LIGHT_DATA[selectedTrafficLight].items.map((group, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-1.5"
                >
                  <span className="text-xs font-bold text-stone-900 block">
                    {group.name}
                  </span>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {group.examples}
                  </p>
                </div>
              ))}
            </div>

            {/* Ethical Principle Banner */}
            <div className="p-4 bg-stone-100 rounded-xl text-xs text-stone-700 leading-relaxed border border-stone-200">
              <span className="font-bold text-stone-900 block mb-1">
                Lembrete de Ouro:
              </span>
              Nenhum alimento isolado determina o resultado. O padrão alimentar ao longo do tempo é o que realmente importa para a sua saúde, seu bem-estar e sua energia.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
