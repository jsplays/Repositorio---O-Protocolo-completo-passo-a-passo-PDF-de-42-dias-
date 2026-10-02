/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProtocolBanner } from './components/ProtocolBanner';
import { MealPlanViewer } from './components/MealPlanViewer';
import { DailyTracker } from './components/DailyTracker';
import { PlateBuilder } from './components/PlateBuilder';
import { FoodTrafficLightAndSwaps } from './components/FoodTrafficLightAndSwaps';
import { MovementGuide } from './components/MovementGuide';
import { ShoppingList } from './components/ShoppingList';
import { FAQAndHabits } from './components/FAQAndHabits';
import { PersonalCommitmentModal } from './components/PersonalCommitmentModal';
import { MindfulPauseModal } from './components/MindfulPauseModal';
import { PrintModal } from './components/PrintModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import {
  getStoredCurrentDay,
  setStoredCurrentDay,
  getStoredDailyLogs,
  saveDailyLog,
  getStoredCustomMeals,
  saveCustomMeal,
  resetCustomMealDay,
  getStoredShoppingList,
  saveShoppingList,
  getStoredCommitment,
  saveCommitment,
  getStoredPostHabits,
  saveStoredPostHabits
} from './utils/storage';
import { DailyLog, MealDay, ShoppingCategory, PersonalCommitment } from './types/protocol';
import { Shield, ChevronUp, Printer } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('plan');
  const [currentDay, setCurrentDayState] = useState<number>(1);
  const [dailyLogs, setDailyLogs] = useState<Record<number, DailyLog>>({});
  const [customMeals, setCustomMeals] = useState<Record<number, Partial<MealDay>>>({});
  const [shoppingCategories, setShoppingCategories] = useState<ShoppingCategory[]>([]);
  const [commitment, setCommitment] = useState<PersonalCommitment>({
    name: '',
    startDate: new Date().toISOString().split('T')[0],
    signed: false
  });
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);

  // Modals
  const [isCommitmentOpen, setIsCommitmentOpen] = useState(false);
  const [isPauseModalOpen, setIsPauseModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Load initial data
  useEffect(() => {
    setCurrentDayState(getStoredCurrentDay());
    setDailyLogs(getStoredDailyLogs());
    setCustomMeals(getStoredCustomMeals());
    setShoppingCategories(getStoredShoppingList());
    setCommitment(getStoredCommitment());
    setSelectedHabits(getStoredPostHabits());
  }, []);

  const handleSetCurrentDay = (day: number) => {
    setCurrentDayState(day);
    setStoredCurrentDay(day);
  };

  const handleUpdateDailyLog = (day: number, log: DailyLog) => {
    const updated = { ...dailyLogs, [day]: log };
    setDailyLogs(updated);
    saveDailyLog(day, log);
  };

  const handleSaveCustomMeal = (day: number, meal: Partial<MealDay>) => {
    const updated = { ...customMeals, [day]: meal };
    setCustomMeals(updated);
    saveCustomMeal(day, meal);
  };

  const handleResetCustomMeal = (day: number) => {
    const updated = { ...customMeals };
    delete updated[day];
    setCustomMeals(updated);
    resetCustomMealDay(day);
  };

  const handleUpdateShoppingList = (newCategories: ShoppingCategory[]) => {
    setShoppingCategories(newCategories);
    saveShoppingList(newCategories);
  };

  const handleSaveCommitment = (newCommitment: PersonalCommitment) => {
    setCommitment(newCommitment);
    saveCommitment(newCommitment);
  };

  const handleTogglePostHabit = (habit: string) => {
    let updated: string[];
    if (selectedHabits.includes(habit)) {
      updated = selectedHabits.filter((h) => h !== habit);
    } else {
      updated = [...selectedHabits, habit];
    }
    setSelectedHabits(updated);
    saveStoredPostHabits(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-800 antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCommitment={() => setIsCommitmentOpen(true)}
        onOpenPrint={() => setIsPrintModalOpen(true)}
      />

      {/* Main Top Hero & CASA Banner with Clear Health Disclaimer */}
      <ProtocolBanner
        currentDay={currentDay}
        onStartTracking={() => setActiveTab('tracker')}
      />

      {/* Main Content Viewport (pb-24 on mobile so nothing is covered by the fixed bottom tab bar) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 pb-28 md:pb-12">
        {activeTab === 'plan' && (
          <MealPlanViewer
            currentDay={currentDay}
            setCurrentDay={handleSetCurrentDay}
            dailyLogs={dailyLogs}
            onUpdateDailyLog={handleUpdateDailyLog}
            customMeals={customMeals}
            onSaveCustomMeal={handleSaveCustomMeal}
            onResetCustomMeal={handleResetCustomMeal}
            onOpenSwaps={() => setActiveTab('swaps')}
          />
        )}

        {activeTab === 'tracker' && (
          <DailyTracker
            currentDay={currentDay}
            setCurrentDay={handleSetCurrentDay}
            dailyLogs={dailyLogs}
            onUpdateDailyLog={handleUpdateDailyLog}
          />
        )}

        {activeTab === 'plate' && <PlateBuilder />}

        {activeTab === 'swaps' && <FoodTrafficLightAndSwaps />}

        {activeTab === 'movement' && <MovementGuide />}

        {activeTab === 'shopping' && (
          <ShoppingList
            categories={shoppingCategories}
            onUpdateCategories={handleUpdateShoppingList}
          />
        )}

        {activeTab === 'faq' && (
          <FAQAndHabits
            selectedHabits={selectedHabits}
            onToggleHabit={handleTogglePostHabit}
            onOpenPauseModal={() => setIsPauseModalOpen(true)}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Navigation Bar (Thumb ergonomic zone) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCommitment={() => setIsCommitmentOpen(true)}
        onOpenPrint={() => setIsPrintModalOpen(true)}
        onOpenPauseModal={() => setIsPauseModalOpen(true)}
      />

      {/* Footer / Agradecimento (Página 53) */}
      <footer className="mt-auto border-t border-stone-200 bg-white no-print pb-20 md:pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-6 space-y-2">
              <span className="text-sm sm:text-base font-bold text-stone-900 font-display block">
                Protocolo Verão 42 · Método C.A.S.A.
              </span>
              <p className="text-xs text-stone-500 leading-relaxed max-w-md">
                Do bloquinho à praia: 42 dias de escolhas possíveis. Um plano prático para melhorar sua alimentação, sua rotina e sua relação com o corpo, sem dietas extremas, sem detox e sem proibições radicais.
              </p>
              <div className="flex items-center gap-1.5 text-xs text-stone-400 pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Baseado nas diretrizes do Guia Alimentar para a População Brasileira.</span>
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Ferramentas
              </span>
              <ul className="text-xs space-y-1.5 text-stone-600">
                <li>
                  <button onClick={() => setActiveTab('plan')} className="hover:text-emerald-700 min-h-[36px] flex items-center">
                    Cardápio 42 Dias
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('tracker')} className="hover:text-emerald-700 min-h-[36px] flex items-center">
                    Diário de Bordo
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('plate')} className="hover:text-emerald-700 min-h-[36px] flex items-center">
                    Montador de Prato
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('swaps')} className="hover:text-emerald-700 min-h-[36px] flex items-center">
                    Semáforo & Trocas
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3 space-y-2">
              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider block">
                Exportação & Acesso
              </span>
              <ul className="text-xs space-y-1.5 text-stone-600">
                <li>
                  <button
                    onClick={() => setIsPrintModalOpen(true)}
                    className="text-emerald-800 font-bold hover:underline min-h-[36px] flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir / Salvar em PDF</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsCommitmentOpen(true)} className="hover:text-amber-700 min-h-[36px] flex items-center">
                    Termo de Compromisso
                  </button>
                </li>
                <li>
                  <button onClick={() => setIsPauseModalOpen(true)} className="hover:text-emerald-700 min-h-[36px] flex items-center">
                    Pausa Consciente (2 min)
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
            <span>
              Página 53: “Seu resultado mais importante não precisa aparecer apenas na balança.”
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1 hover:text-stone-700 transition-colors p-2"
            >
              <span>Voltar ao topo</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        currentDay={currentDay}
        dailyLogs={dailyLogs}
        customMeals={customMeals}
        shoppingCategories={shoppingCategories}
        commitment={commitment}
      />

      <PersonalCommitmentModal
        isOpen={isCommitmentOpen}
        onClose={() => setIsCommitmentOpen(false)}
        commitment={commitment}
        onSaveCommitment={handleSaveCommitment}
      />

      <MindfulPauseModal
        isOpen={isPauseModalOpen}
        onClose={() => setIsPauseModalOpen(false)}
      />
    </div>
  );
}
