import React from 'react';
import { DailyLog } from '../types/protocol';
import { Droplet, Moon, Trophy, ChevronLeft, ChevronRight, Activity, Smile, Sparkles, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DailyTrackerProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  dailyLogs: Record<number, DailyLog>;
  onUpdateDailyLog: (day: number, log: DailyLog) => void;
}

export const DailyTracker: React.FC<DailyTrackerProps> = ({
  currentDay,
  setCurrentDay,
  dailyLogs,
  onUpdateDailyLog
}) => {
  const activeLog: DailyLog = dailyLogs[currentDay] || {
    date: new Date().toISOString().split('T')[0],
    dayNumber: currentDay,
    sleepHours: 7,
    waterGlasses: 6,
    waterGoal: 8,
    fruitVegStatus: 'sim',
    movementStatus: 'sim',
    movementType: 'Caminhada moderada',
    movementMinutes: 25,
    hungerBefore: 'moderada',
    postMealFeeling: 'satisfeito',
    victoryToday: '',
    adjustmentTomorrow: '',
    completedMeals: { breakfast: false, lunch: false, snack: false, dinner: false }
  };

  const updateField = <K extends keyof DailyLog>(field: K, value: DailyLog[K]) => {
    const updated = {
      ...activeLog,
      [field]: value
    };
    onUpdateDailyLog(currentDay, updated);
  };

  const handleWaterClick = (index: number) => {
    const newGlasses = activeLog.waterGlasses === index + 1 ? index : index + 1;
    updateField('waterGlasses', newGlasses);
    if (newGlasses >= activeLog.waterGoal && activeLog.waterGlasses < activeLog.waterGoal) {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const completedDaysCount = Object.entries(dailyLogs).filter(([_, log]) => {
    const hasReflection = log.victoryToday?.trim().length > 0;
    const hasHabits = log.waterGlasses >= 4 && log.fruitVegStatus !== 'nao';
    return hasReflection || hasHabits;
  }).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Day Selector & Streak Overview (Thumb zone optimized) */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay <= 1}
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            aria-label="Dia anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-stone-400 font-bold block">
              Registro Diário
            </span>
            <div className="flex items-center justify-center gap-2">
              <span className="text-2xl font-black text-stone-900 font-mono tabular-nums">
                Dia {currentDay}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
                de 42
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentDay(Math.min(42, currentDay + 1))}
            disabled={currentDay >= 42}
            className="min-h-[44px] min-w-[44px] p-2 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
            aria-label="Próximo dia"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Date Input */}
        <div className="flex items-center gap-2 bg-stone-50 px-3 py-2 rounded-xl border border-stone-200 w-full sm:w-auto justify-center sm:justify-start min-h-[44px]">
          <Calendar className="w-4 h-4 text-stone-500 shrink-0" />
          <label className="text-xs text-stone-500 font-semibold">Data:</label>
          <input
            type="date"
            value={activeLog.date}
            onChange={(e) => updateField('date', e.target.value)}
            className="text-xs font-semibold text-stone-800 bg-transparent focus:outline-none"
          />
        </div>

        {/* Consistency Counter */}
        <div className="flex items-center gap-2.5 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl w-full sm:w-auto justify-center sm:justify-start min-h-[44px]">
          <Trophy className="w-4 h-4 text-emerald-700 shrink-0" />
          <div className="text-xs">
            <span className="text-emerald-950 font-bold block">
              {completedDaysCount} de 42 dias registrados
            </span>
            <span className="text-[10px] text-emerald-700">
              Constância real sem foco em balança
            </span>
          </div>
        </div>
      </div>

      {/* Main Tracking Sheet (Página 45) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
        {/* Left Column: Sleep, Water & Habits */}
        <div className="lg:col-span-7 space-y-4 sm:space-y-6">
          {/* Card 1: Sono & Hidratação */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Moon className="w-4 h-4 text-indigo-600" />
              <span>Sono & Hidratação</span>
            </h3>

            {/* Sleep Stepper */}
            <div className="p-3.5 sm:p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700">
                  Dormi aproximadamente:
                </span>
                <span className="text-base font-black text-indigo-900 font-mono tabular-nums">
                  {activeLog.sleepHours} horas
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={activeLog.sleepHours}
                onChange={(e) => updateField('sleepHours', parseFloat(e.target.value))}
                className="w-full accent-indigo-600 h-3 bg-stone-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-stone-400">
                <span>4h</span>
                <span className="font-semibold text-emerald-700">7h a 9h ideal</span>
                <span>12h</span>
              </div>
            </div>

            {/* Water Glasses */}
            <div className="p-3.5 sm:p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Água ao longo do dia:</span>
                </span>
                <span className="text-xs font-bold text-blue-900 font-mono">
                  {activeLog.waterGlasses * 250} ml ({activeLog.waterGlasses}/8 copos)
                </span>
              </div>

              {/* 8 Touch-friendly Glasses */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {Array.from({ length: 8 }).map((_, idx) => {
                  const filled = idx < activeLog.waterGlasses;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleWaterClick(idx)}
                      className={`min-h-[46px] rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer select-none ${
                        filled
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-white text-stone-400 border border-blue-200 hover:border-blue-400'
                      }`}
                      title={`${(idx + 1) * 250} ml`}
                    >
                      <Droplet className={`w-4 h-4 ${filled ? 'fill-white' : ''}`} />
                      <span className="text-[10px] font-mono mt-0.5">{(idx + 1) * 250}</span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Status */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-blue-200/60">
                <span className="text-[11px] text-blue-950 font-bold">Status:</span>
                {(['sim', 'parcialmente', 'nao'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      if (status === 'sim') updateField('waterGlasses', 8);
                      if (status === 'parcialmente') updateField('waterGlasses', 4);
                      if (status === 'nao') updateField('waterGlasses', 1);
                    }}
                    className={`min-h-[40px] px-3 text-xs font-bold rounded-lg capitalize transition-colors ${
                      (status === 'sim' && activeLog.waterGlasses >= 7) ||
                      (status === 'parcialmente' && activeLog.waterGlasses >= 3 && activeLog.waterGlasses < 7) ||
                      (status === 'nao' && activeLog.waterGlasses < 3)
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'bg-white text-blue-950 border border-blue-200 hover:bg-blue-100'
                    }`}
                  >
                    {status === 'nao' ? 'Não' : status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Food & Movement */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <span>Comida de Verdade & Movimento</span>
            </h3>

            {/* Fruits & Vegs */}
            <div className="p-3.5 sm:p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <span className="text-xs font-bold text-stone-900 block">
                Comi frutas ou vegetais hoje?
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['sim', 'parcialmente', 'nao'] as const).map((status) => {
                  const isSelected = activeLog.fruitVegStatus === status;
                  return (
                    <button
                      key={status}
                      type="button"
                      onClick={() => updateField('fruitVegStatus', status)}
                      className={`min-h-[44px] px-3 text-xs font-bold rounded-xl capitalize transition-colors cursor-pointer ${
                        isSelected
                          ? status === 'sim'
                            ? 'bg-emerald-700 text-white'
                            : status === 'parcialmente'
                            ? 'bg-amber-600 text-white'
                            : 'bg-stone-700 text-white'
                          : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      {status === 'nao' ? 'Não' : status}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Movement */}
            <div className="p-3.5 sm:p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
              <span className="text-xs font-bold text-stone-900 block">
                Fiz algum movimento hoje?
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateField('movementStatus', 'sim')}
                  className={`min-h-[44px] px-3 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                    activeLog.movementStatus === 'sim'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Sim
                </button>
                <button
                  type="button"
                  onClick={() => updateField('movementStatus', 'nao')}
                  className={`min-h-[44px] px-3 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                    activeLog.movementStatus === 'nao'
                      ? 'bg-stone-700 text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  Não
                </button>
              </div>

              {activeLog.movementStatus === 'sim' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-stone-200">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Atividade:
                    </label>
                    <input
                      type="text"
                      value={activeLog.movementType || ''}
                      onChange={(e) => updateField('movementType', e.target.value)}
                      placeholder="Ex: Caminhada rápida..."
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Duração:
                    </label>
                    <select
                      value={activeLog.movementMinutes || 20}
                      onChange={(e) => updateField('movementMinutes', parseInt(e.target.value, 10))}
                      className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-xl text-stone-800 focus:outline-none"
                    >
                      <option value={10}>10 minutos</option>
                      <option value={20}>20 minutos</option>
                      <option value={30}>30 minutos</option>
                      <option value={45}>45 minutos</option>
                      <option value={60}>60+ minutos</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Satiety & Daily Reflections */}
        <div className="lg:col-span-5 space-y-4 sm:space-y-6">
          {/* Card 3: Sensações */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Smile className="w-4 h-4 text-amber-600" />
              <span>Atenção & Sensações</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                Como estava a fome antes de comer?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['nenhuma', 'pouca', 'moderada', 'intensa'] as const).map((level) => {
                  const isSelected = activeLog.hungerBefore === level;
                  return (
                    <button
                      key={level}
                      type="button"
                      onClick={() => updateField('hungerBefore', level)}
                      className={`min-h-[44px] text-xs font-bold rounded-xl capitalize transition-colors text-center cursor-pointer ${
                        isSelected
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {level}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-2">
                Como me senti depois da refeição?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['satisfeito', 'leve', 'com_energia', 'pesado', 'estufado'] as const).map((feeling) => {
                  const isSelected = activeLog.postMealFeeling === feeling;
                  const labelMap: Record<string, string> = {
                    satisfeito: 'Satisfeito',
                    leve: 'Leve',
                    com_energia: 'Energia',
                    pesado: 'Pesado',
                    estufado: 'Estufado'
                  };
                  return (
                    <button
                      key={feeling}
                      type="button"
                      onClick={() => updateField('postMealFeeling', feeling)}
                      className={`min-h-[44px] px-2 text-xs font-bold rounded-xl transition-colors text-center cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-700 text-white shadow-xs'
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                      }`}
                    >
                      {labelMap[feeling]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 4: Reflexão Diária */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Reflexão Diária (Página 45)</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Uma vitória de hoje:
              </label>
              <textarea
                rows={2}
                value={activeLog.victoryToday}
                onChange={(e) => updateField('victoryToday', e.target.value)}
                placeholder="Ex: Almocei sem tela e bebi 2L de água com calma..."
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none text-stone-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1">
                Algo que posso ajustar amanhã:
              </label>
              <textarea
                rows={2}
                value={activeLog.adjustmentTomorrow}
                onChange={(e) => updateField('adjustmentTomorrow', e.target.value)}
                placeholder="Ex: Deixar a fruta descascada de manhã para a tarde..."
                className="w-full p-3 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none text-stone-800"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 42-Day Consistency Grid (Touch optimized for phones) */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <h4 className="text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider">
            Matriz dos 42 Dias
          </h4>
          <span className="text-[11px] text-stone-500 font-mono">
            Toque em qualquer dia para navegar
          </span>
        </div>

        <div className="grid grid-cols-7 sm:grid-cols-14 gap-1.5 sm:gap-2">
          {Array.from({ length: 42 }).map((_, idx) => {
            const dayNum = idx + 1;
            const log = dailyLogs[dayNum];
            const isSelected = currentDay === dayNum;
            const isRecorded = !!(log?.victoryToday?.trim() || (log?.waterGlasses && log.waterGlasses >= 4));

            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => setCurrentDay(dayNum)}
                className={`min-h-[42px] rounded-xl text-xs font-mono font-bold flex flex-col items-center justify-center transition-all cursor-pointer relative ${
                  isSelected
                    ? 'ring-2 ring-emerald-600 bg-stone-900 text-white shadow-xs'
                    : isRecorded
                    ? 'bg-emerald-100 text-emerald-950 hover:bg-emerald-200'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200'
                }`}
              >
                <span>{dayNum}</span>
                {isRecorded && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
