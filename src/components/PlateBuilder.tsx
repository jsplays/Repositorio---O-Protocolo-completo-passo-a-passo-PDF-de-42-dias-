import React, { useState } from 'react';
import platePhoto from '../assets/images/plate_visual_balance_1790970411867.jpg';
import { Sparkles, Utensils, Check, RotateCcw, Info, Hand, ShieldCheck } from 'lucide-react';

export const PlateBuilder: React.FC = () => {
  const [selectedVegs, setSelectedVegs] = useState<string[]>(['Alface & Tomate', 'Cenoura ralada']);
  const [selectedProtein, setSelectedProtein] = useState<string>('Frango grelhado');
  const [selectedCarb, setSelectedCarb] = useState<string>('Arroz branco ou integral');
  const [selectedLegume, setSelectedLegume] = useState<string>('Feijão carioca');
  const [selectedFat, setSelectedFat] = useState<string>('Fio de azeite de oliva');

  const proteins = ['Frango grelhado', 'Ovos mexidos', 'Filé de peixe', 'Carne moída / patinho', 'Sardinha', 'Tofu grelhado'];
  const carbs = ['Arroz branco ou integral', 'Batata assada / cozida', 'Mandioca (aipim)', 'Macarrão simples', 'Cuscuz de milho', 'Batata-doce'];
  const legumes = ['Feijão carioca', 'Feijão preto', 'Lentilha', 'Grão-de-bico', 'Sem leguminosa hoje'];
  const vegsList = ['Alface & Tomate', 'Couve refogada', 'Cenoura ralada', 'Brócolis no vapor', 'Abobrinha grelhada', 'Beterraba cozida', 'Rúcula fresca'];
  const fats = ['Fio de azeite de oliva', 'Sementes de abóbora', 'Castanhas picadas', 'Manteiga simples no preparo'];

  const handleToggleVeg = (item: string) => {
    if (selectedVegs.includes(item)) {
      if (selectedVegs.length > 1) {
        setSelectedVegs(selectedVegs.filter((v) => v !== item));
      }
    } else {
      setSelectedVegs([...selectedVegs, item]);
    }
  };

  const handleReset = () => {
    setSelectedVegs(['Alface & Tomate', 'Cenoura ralada']);
    setSelectedProtein('Frango grelhado');
    setSelectedCarb('Arroz branco ou integral');
    setSelectedLegume('Feijão carioca');
    setSelectedFat('Fio de azeite de oliva');
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md">
            Página 8 — Montagem do Prato & Medidas Práticas
          </span>
          <h2 className="text-2xl font-bold text-stone-900 mt-2">
            O Método Visual do Prato Equilibrado
          </h2>
          <p className="text-sm text-stone-600 mt-1 leading-relaxed">
            Sem balança e sem neura. Monte seu almoço e jantar com esta referência visual simples. Ajuste as quantidades ao seu nível real de fome.
          </p>
        </div>
      </div>

      {/* Interactive Plate Simulator & Practical Palm Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Interactive Plate Canvas */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Utensils className="w-4 h-4 text-emerald-700" />
              <span>Simulador Interativo do Prato</span>
            </h3>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Padrão</span>
            </button>
          </div>

          {/* Visual Plate Graphic */}
          <div className="relative mx-auto max-w-sm aspect-square rounded-full border-8 border-stone-200 bg-stone-100 shadow-inner overflow-hidden p-2">
            {/* Top Half: 1/2 Vegetais & Legumes */}
            <div className="absolute top-2 left-2 right-2 h-[48%] rounded-t-full bg-emerald-100/90 border-b-2 border-dashed border-stone-300 flex flex-col items-center justify-center p-4 text-center">
              <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                1/2 · Vegetais & Verduras
              </span>
              <span className="text-[11px] text-emerald-800 font-medium mt-1">
                {selectedVegs.join(' + ')}
              </span>
              <span className="text-[10px] text-emerald-600 mt-0.5">
                Quanto couber confortavelmente no prato
              </span>
            </div>

            {/* Bottom Left: 1/4 Proteína */}
            <div className="absolute bottom-2 left-2 w-[48%] h-[48%] rounded-bl-full bg-amber-100/90 border-r-2 border-dashed border-stone-300 flex flex-col items-center justify-center p-3 text-center">
              <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                1/4 · Proteína
              </span>
              <span className="text-[11px] text-amber-800 font-medium mt-1">
                {selectedProtein}
              </span>
              <span className="text-[10px] text-amber-600 mt-0.5">
                Tamanho da palma da mão
              </span>
            </div>

            {/* Bottom Right: 1/4 Carboidrato & Leguminosa */}
            <div className="absolute bottom-2 right-2 w-[48%] h-[48%] rounded-br-full bg-orange-100/90 flex flex-col items-center justify-center p-3 text-center">
              <span className="text-xs font-bold text-orange-950 uppercase tracking-wider">
                1/4 · Carboidrato
              </span>
              <span className="text-[11px] text-orange-900 font-medium mt-1">
                {selectedCarb}
              </span>
              {selectedLegume !== 'Sem leguminosa hoje' && (
                <span className="text-[10px] text-orange-700 font-semibold mt-0.5">
                  + {selectedLegume}
                </span>
              )}
              <span className="text-[10px] text-orange-600 mt-0.5">
                Tamanho de um punho
              </span>
            </div>

            {/* Center Floating Fat Pin */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 px-2.5 py-1 rounded-full shadow-md border border-stone-200 text-center">
              <span className="text-[10px] font-bold text-stone-700 block">
                {selectedFat}
              </span>
              <span className="text-[9px] text-stone-500">Tamanho do polegar</span>
            </div>
          </div>

          {/* Ingredient Selection Selectors */}
          <div className="space-y-4 pt-4 border-t border-stone-200">
            {/* 1. Vegetais */}
            <div>
              <label className="block text-xs font-bold text-emerald-900 mb-1.5 flex items-center justify-between">
                <span>1. Escolha seus Vegetais & Folhas (selecione 1 ou mais):</span>
                <span className="text-[11px] text-stone-400">1/2 do prato</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {vegsList.map((item) => {
                  const isChecked = selectedVegs.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => handleToggleVeg(item)}
                      className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                        isChecked
                          ? 'bg-emerald-700 text-white font-semibold'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Proteínas */}
            <div>
              <label className="block text-xs font-bold text-amber-900 mb-1.5 flex items-center justify-between">
                <span>2. Escolha sua Proteína:</span>
                <span className="text-[11px] text-stone-400">1/4 do prato</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {proteins.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedProtein(item)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                      selectedProtein === item
                        ? 'bg-amber-700 text-white font-semibold'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Carboidratos */}
            <div>
              <label className="block text-xs font-bold text-orange-900 mb-1.5 flex items-center justify-between">
                <span>3. Escolha seu Carboidrato:</span>
                <span className="text-[11px] text-stone-400">1/4 do prato</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {carbs.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedCarb(item)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                      selectedCarb === item
                        ? 'bg-orange-700 text-white font-semibold'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Leguminosa */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5 flex items-center justify-between">
                <span>4. Acompanhamento (Leguminosas):</span>
                <span className="text-[11px] text-stone-400">Opcional e bem-vindo</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {legumes.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedLegume(item)}
                    className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                      selectedLegume === item
                        ? 'bg-stone-800 text-white font-semibold'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Practical Hand Measures Guide & Real Photography */}
        <div className="lg:col-span-5 space-y-6">
          {/* Real Photography Card */}
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
            <img
              src={platePhoto}
              alt="Prato modelo em cerâmica dividido harmonicamente"
              className="w-full h-48 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 bg-stone-50 border-t border-stone-200">
              <span className="text-xs font-bold text-stone-800 block">
                Visualização Real na Mesa
              </span>
              <p className="text-xs text-stone-500 mt-0.5">
                Cores vivas, texturas naturais e refeições saborosas que sustentam a energia.
              </p>
            </div>
          </div>

          {/* Practical Measures Guide (Página 8) */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Hand className="w-4 h-4 text-emerald-600" />
              <span>Medidas Práticas com a Própria Mão</span>
            </h3>

            <p className="text-xs text-stone-600">
              Quando estiver fora de casa, em restaurantes por quilo ou viajando:
            </p>

            <div className="space-y-3">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 font-bold text-xs flex items-center justify-center shrink-0">
                  ✋
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    Proteína: Palma da Mão
                  </span>
                  <span className="text-xs text-stone-600">
                    Aproximadamente a espessura e o tamanho da palma da sua mão aberta (sem os dedos).
                  </span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-800 font-bold text-xs flex items-center justify-center shrink-0">
                  ✊
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    Carboidrato: Punho Fechado
                  </span>
                  <span className="text-xs text-stone-600">
                    Aproximadamente o volume do seu punho fechado para arroz, batata ou massa.
                  </span>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-200 text-stone-800 font-bold text-xs flex items-center justify-center shrink-0">
                  👍
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-900 block">
                    Gordura: Tamanho do Polegar
                  </span>
                  <span className="text-xs text-stone-600">
                    Azeite para regar ou porção de castanhas correspondente à falange do polegar.
                  </span>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/70 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0">
                  🥗
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">
                    Vegetais & Verduras: Prato Livre
                  </span>
                  <span className="text-xs text-emerald-800">
                    Quanto couber confortavelmente no prato para dar saciedade, mastigação e cor.
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg text-[11px] text-stone-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Essa divisão não é uma regra rígida. Ajuste conforme suas necessidades individuais e orientação profissional.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
