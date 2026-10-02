import React, { useState } from 'react';
import { MealDay, WeekMeta, DailyLog } from '../types/protocol';
import { WEEKS_DATA, MEAL_DAYS } from '../data/protocolData';
import { Check, Edit2, RotateCcw, Search, Sparkles, CheckCircle2, Circle, ArrowLeftRight, Coffee, Sun, Apple, Moon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MealPlanViewerProps {
  currentDay: number;
  setCurrentDay: (day: number) => void;
  dailyLogs: Record<number, DailyLog>;
  onUpdateDailyLog: (day: number, log: DailyLog) => void;
  customMeals: Record<number, Partial<MealDay>>;
  onSaveCustomMeal: (day: number, meal: Partial<MealDay>) => void;
  onResetCustomMeal: (day: number) => void;
  onOpenSwaps: () => void;
}

export const MealPlanViewer: React.FC<MealPlanViewerProps> = ({
  currentDay,
  setCurrentDay,
  dailyLogs,
  onUpdateDailyLog,
  customMeals,
  onSaveCustomMeal,
  onResetCustomMeal,
  onOpenSwaps
}) => {
  const [selectedWeek, setSelectedWeek] = useState<number>(Math.ceil(currentDay / 7) || 1);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<MealDay>>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Active week meta
  const currentWeekMeta = WEEKS_DATA.find((w) => w.week === selectedWeek) || WEEKS_DATA[0];

  // Days belonging to selected week
  const weekDays = MEAL_DAYS.filter((m) => m.week === selectedWeek);

  // Function to get active meal text (custom or default)
  const getMealData = (dayNum: number): MealDay => {
    const base = MEAL_DAYS.find((m) => m.day === dayNum) || MEAL_DAYS[0];
    const custom = customMeals[dayNum];
    if (!custom) return base;
    return {
      ...base,
      ...custom
    };
  };

  // Toggle meal completion in daily log
  const handleToggleMeal = (dayNum: number, mealKey: 'breakfast' | 'lunch' | 'snack' | 'dinner') => {
    const existingLog: DailyLog = dailyLogs[dayNum] || {
      date: new Date().toISOString().split('T')[0],
      dayNumber: dayNum,
      sleepHours: 7,
      waterGlasses: 6,
      waterGoal: 8,
      fruitVegStatus: 'sim',
      movementStatus: 'sim',
      hungerBefore: 'moderada',
      postMealFeeling: 'satisfeito',
      victoryToday: '',
      adjustmentTomorrow: '',
      completedMeals: { breakfast: false, lunch: false, snack: false, dinner: false }
    };

    const updatedCompleted = {
      ...existingLog.completedMeals,
      [mealKey]: !existingLog.completedMeals[mealKey]
    };

    const allChecked = Object.values(updatedCompleted).every(Boolean);

    if (!existingLog.completedMeals[mealKey]) {
      if (allChecked) {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.8 }
        });
      }
    }

    onUpdateDailyLog(dayNum, {
      ...existingLog,
      completedMeals: updatedCompleted
    });
  };

  const handleStartEdit = (dayNum: number) => {
    const data = getMealData(dayNum);
    setEditForm({
      breakfast: data.breakfast,
      lunch: data.lunch,
      snack: data.snack,
      dinner: data.dinner
    });
    setEditingDay(dayNum);
  };

  const handleSaveEdit = (dayNum: number) => {
    onSaveCustomMeal(dayNum, editForm);
    setEditingDay(null);
  };

  const filteredDays = searchQuery.trim()
    ? MEAL_DAYS.filter((m) => {
        const text = `${m.breakfast} ${m.lunch} ${m.snack} ${m.dinner}`.toLowerCase();
        return text.includes(searchQuery.toLowerCase());
      })
    : weekDays;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Filter and Search Bar with Touch Targets */}
      <div className="bg-white p-3.5 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        {/* Horizontal Week Scroller */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {WEEKS_DATA.map((w) => {
            const isSelected = selectedWeek === w.week;
            const isCurrentWeek = Math.ceil(currentDay / 7) === w.week;
            return (
              <button
                key={w.week}
                onClick={() => {
                  setSelectedWeek(w.week);
                  setSearchQuery('');
                }}
                className={`min-h-[44px] px-3.5 py-2 text-xs font-bold rounded-xl transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                <span>Semana {w.week}</span>
                {isCurrentWeek && (
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-amber-300' : 'bg-emerald-500'}`} />
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Day Chips for Active Week (Mobile-Friendly Jump) */}
        {!searchQuery && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-stone-100 scrollbar-none">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider shrink-0 mr-1">
              Dias:
            </span>
            {weekDays.map((d) => {
              const isToday = currentDay === d.day;
              return (
                <button
                  key={d.day}
                  onClick={() => setCurrentDay(d.day)}
                  className={`min-h-[38px] px-3 py-1 text-xs font-mono font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
                    isToday
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Dia {d.day}
                </button>
              );
            })}
          </div>
        )}

        {/* Search Input */}
        <div className="relative pt-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar ingrediente nos 42 dias (ex: ovo, arroz, peixe)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-12 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600/30 text-stone-800"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400 hover:text-stone-700 p-1"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Week Focus Objective Card */}
      {!searchQuery && (
        <div className="bg-gradient-to-r from-emerald-900 to-stone-900 text-white p-4 sm:p-6 rounded-2xl shadow-sm space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-semibold tracking-wider uppercase">
                <span>{currentWeekMeta.daysRange}</span>
                <span aria-hidden="true">·</span>
                <span>Objetivo da Semana</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-bold mt-1 text-white">
                Semana {currentWeekMeta.week}: {currentWeekMeta.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-2xl leading-relaxed">
                {currentWeekMeta.objective}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-3.5 rounded-xl border border-white/15 max-w-sm shrink-0">
              <span className="block text-[11px] font-bold text-amber-300 uppercase tracking-wide">
                Meta Comportamental
              </span>
              <p className="text-xs text-white/90 mt-0.5 leading-snug">
                {currentWeekMeta.behaviorGoal}
              </p>
              <div className="mt-1.5 pt-1.5 border-t border-white/15 text-[11px] text-emerald-200">
                💡 <span className="font-semibold">Dica:</span> {currentWeekMeta.tip}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Days List / Cards */}
      <div className="space-y-4">
        {filteredDays.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-stone-200 p-6">
            <p className="text-stone-500 text-xs sm:text-sm">Nenhuma refeição encontrada com &quot;{searchQuery}&quot;.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-3 min-h-[44px] px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl hover:bg-emerald-100"
            >
              Ver todos os dias
            </button>
          </div>
        ) : (
          filteredDays.map((dayItem) => {
            const dayNum = dayItem.day;
            const currentData = getMealData(dayNum);
            const isToday = currentDay === dayNum;
            const isCustomized = !!customMeals[dayNum];
            const isEditing = editingDay === dayNum;
            const log = dailyLogs[dayNum];
            const completed = log?.completedMeals || {
              breakfast: false,
              lunch: false,
              snack: false,
              dinner: false
            };

            const completedCount = Object.values(completed).filter(Boolean).length;

            return (
              <div
                key={dayNum}
                className={`bg-white rounded-2xl border transition-all ${
                  isToday
                    ? 'border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                    : 'border-stone-200 hover:border-stone-300 shadow-xs'
                }`}
              >
                {/* Day Header Bar */}
                <div className="px-4 py-3 bg-stone-50/80 border-b border-stone-200 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentDay(dayNum)}
                      className={`min-h-[38px] text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                        isToday
                          ? 'bg-emerald-700 text-white font-mono'
                          : 'bg-stone-200 hover:bg-stone-300 text-stone-800 font-mono'
                      }`}
                      title="Definir como meu dia de hoje"
                    >
                      Dia {dayNum}
                    </button>
                    {isToday && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Hoje
                      </span>
                    )}
                    <span className="text-[11px] text-stone-500">
                      {completedCount}/4 feitas
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={onOpenSwaps}
                      className="min-h-[38px] px-2.5 py-1 text-xs text-stone-700 hover:text-stone-900 bg-white border border-stone-200 rounded-lg flex items-center gap-1"
                    >
                      <ArrowLeftRight className="w-3.5 h-3.5 text-stone-500" />
                      <span className="hidden sm:inline">Trocas</span>
                    </button>

                    {isCustomized && !isEditing && (
                      <button
                        onClick={() => onResetCustomMeal(dayNum)}
                        className="min-h-[38px] px-2 py-1 text-xs text-rose-700 hover:bg-rose-50 rounded-lg flex items-center gap-1"
                        title="Restaurar padrão"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Restaurar</span>
                      </button>
                    )}

                    {!isEditing ? (
                      <button
                        onClick={() => handleStartEdit(dayNum)}
                        className="min-h-[38px] px-2.5 py-1 text-xs font-semibold text-stone-800 hover:bg-emerald-50 rounded-lg flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Editar</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleSaveEdit(dayNum)}
                          className="min-h-[38px] px-3 py-1 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={() => setEditingDay(null)}
                          className="min-h-[38px] px-2 text-xs text-stone-600 hover:bg-stone-100 rounded-lg"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Day Meals Grid - Touch friendly */}
                <div className="p-3.5 sm:p-5">
                  {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                          <Coffee className="w-3.5 h-3.5 text-amber-600" /> Café da manhã
                        </label>
                        <textarea
                          value={editForm.breakfast || ''}
                          onChange={(e) => setEditForm({ ...editForm, breakfast: e.target.value })}
                          rows={2}
                          className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                          <Sun className="w-3.5 h-3.5 text-orange-600" /> Almoço
                        </label>
                        <textarea
                          value={editForm.lunch || ''}
                          onChange={(e) => setEditForm({ ...editForm, lunch: e.target.value })}
                          rows={2}
                          className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                          <Apple className="w-3.5 h-3.5 text-emerald-600" /> Lanche opcional
                        </label>
                        <textarea
                          value={editForm.snack || ''}
                          onChange={(e) => setEditForm({ ...editForm, snack: e.target.value })}
                          rows={2}
                          className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center gap-1">
                          <Moon className="w-3.5 h-3.5 text-indigo-600" /> Jantar
                        </label>
                        <textarea
                          value={editForm.dinner || ''}
                          onChange={(e) => setEditForm({ ...editForm, dinner: e.target.value })}
                          rows={2}
                          className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                      {/* Breakfast */}
                      <button
                        type="button"
                        onClick={() => handleToggleMeal(dayNum, 'breakfast')}
                        className={`min-h-[64px] p-3.5 rounded-xl border text-left transition-all cursor-pointer select-none flex flex-col justify-between ${
                          completed.breakfast
                            ? 'bg-emerald-50 border-emerald-300'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                            <Coffee className="w-3.5 h-3.5 text-amber-600" />
                            <span>Café da manhã</span>
                          </span>
                          {completed.breakfast ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-stone-300 shrink-0" />
                          )}
                        </div>
                        <p className={`text-xs leading-relaxed ${completed.breakfast ? 'text-emerald-950 font-semibold' : 'text-stone-800'}`}>
                          {currentData.breakfast}
                        </p>
                      </button>

                      {/* Lunch */}
                      <button
                        type="button"
                        onClick={() => handleToggleMeal(dayNum, 'lunch')}
                        className={`min-h-[64px] p-3.5 rounded-xl border text-left transition-all cursor-pointer select-none flex flex-col justify-between ${
                          completed.lunch
                            ? 'bg-emerald-50 border-emerald-300'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                            <Sun className="w-3.5 h-3.5 text-orange-600" />
                            <span>Almoço</span>
                          </span>
                          {completed.lunch ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-stone-300 shrink-0" />
                          )}
                        </div>
                        <p className={`text-xs leading-relaxed ${completed.lunch ? 'text-emerald-950 font-semibold' : 'text-stone-800'}`}>
                          {currentData.lunch}
                        </p>
                      </button>

                      {/* Optional Snack */}
                      <button
                        type="button"
                        onClick={() => handleToggleMeal(dayNum, 'snack')}
                        className={`min-h-[64px] p-3.5 rounded-xl border text-left transition-all cursor-pointer select-none flex flex-col justify-between ${
                          completed.snack
                            ? 'bg-emerald-50 border-emerald-300'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                            <Apple className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Lanche opcional</span>
                          </span>
                          {completed.snack ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-stone-300 shrink-0" />
                          )}
                        </div>
                        <p className={`text-xs leading-relaxed ${completed.snack ? 'text-emerald-950 font-semibold' : 'text-stone-800'}`}>
                          {currentData.snack}
                        </p>
                      </button>

                      {/* Dinner */}
                      <button
                        type="button"
                        onClick={() => handleToggleMeal(dayNum, 'dinner')}
                        className={`min-h-[64px] p-3.5 rounded-xl border text-left transition-all cursor-pointer select-none flex flex-col justify-between ${
                          completed.dinner
                            ? 'bg-emerald-50 border-emerald-300'
                            : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full mb-1">
                          <span className="flex items-center gap-1.5 text-xs font-bold text-stone-700">
                            <Moon className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Jantar</span>
                          </span>
                          {completed.dinner ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-stone-300 shrink-0" />
                          )}
                        </div>
                        <p className={`text-xs leading-relaxed ${completed.dinner ? 'text-emerald-950 font-semibold' : 'text-stone-800'}`}>
                          {currentData.dinner}
                        </p>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
