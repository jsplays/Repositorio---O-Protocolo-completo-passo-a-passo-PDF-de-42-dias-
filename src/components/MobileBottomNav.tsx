import React, { useState } from 'react';
import { Utensils, CheckSquare, Calendar, ArrowLeftRight, MoreHorizontal, ShoppingBag, Activity, Award, Printer, HelpCircle, X, Sparkles } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCommitment: () => void;
  onOpenPrint: () => void;
  onOpenPauseModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenCommitment,
  onOpenPrint,
  onOpenPauseModal
}) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const primaryTabs = [
    { id: 'plan', label: 'Cardápio', icon: Utensils },
    { id: 'tracker', label: 'Diário', icon: CheckSquare },
    { id: 'plate', label: 'Prato', icon: Calendar },
    { id: 'swaps', label: 'Trocas', icon: ArrowLeftRight }
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setIsMoreMenuOpen(false);
  };

  return (
    <>
      {/* Fixed Bottom Tab Bar for Mobile (Hidden on md and up) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg">
        <div className="grid grid-cols-5 items-center h-16 px-1 max-w-md mx-auto">
          {primaryTabs.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !isMoreMenuOpen;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className="min-h-[48px] flex flex-col items-center justify-center transition-colors cursor-pointer"
              >
                <div className={`p-1 rounded-full transition-transform ${isActive ? 'scale-110' : ''}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                </div>
                <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${isActive ? 'text-emerald-900 font-bold' : 'text-stone-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* 5th Tab: Mais / Menu */}
          <button
            onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
            className="min-h-[48px] flex flex-col items-center justify-center transition-colors cursor-pointer"
          >
            <div className={`p-1 rounded-full transition-transform ${isMoreMenuOpen ? 'scale-110' : ''}`}>
              <MoreHorizontal className={`w-5 h-5 ${isMoreMenuOpen ? 'text-emerald-700' : 'text-stone-400'}`} />
            </div>
            <span className={`text-[10px] font-medium tracking-tight mt-0.5 ${isMoreMenuOpen ? 'text-emerald-900 font-bold' : 'text-stone-500'}`}>
              Mais
            </span>
          </button>
        </div>
      </nav>

      {/* Slide-Up Bottom Sheet for "Mais" Options */}
      {isMoreMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex flex-col justify-end animate-fadeIn"
          onClick={() => setIsMoreMenuOpen(false)}
        >
          <div
            className="bg-white rounded-t-3xl p-5 border-t border-stone-200 space-y-4 max-h-[80vh] overflow-y-auto shadow-2xl animate-scaleUp pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sheet Handle */}
            <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto" />

            <div className="flex items-center justify-between pt-1">
              <span className="text-sm font-bold text-stone-900">
                Menu & Ferramentas
              </span>
              <button
                onClick={() => setIsMoreMenuOpen(false)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => handleSelectTab('shopping')}
                className="min-h-[48px] p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 flex items-center gap-2.5 text-left text-xs font-semibold text-stone-800"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Lista de Compras</span>
              </button>

              <button
                onClick={() => handleSelectTab('movement')}
                className="min-h-[48px] p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 flex items-center gap-2.5 text-left text-xs font-semibold text-stone-800"
              >
                <Activity className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Guia de Movimento</span>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenPrint();
                }}
                className="min-h-[48px] p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 flex items-center gap-2.5 text-left text-xs font-bold text-emerald-900"
              >
                <Printer className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Imprimir / PDF</span>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenCommitment();
                }}
                className="min-h-[48px] p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 flex items-center gap-2.5 text-left text-xs font-bold text-amber-950"
              >
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Compromisso</span>
              </button>

              <button
                onClick={() => {
                  setIsMoreMenuOpen(false);
                  onOpenPauseModal();
                }}
                className="min-h-[48px] p-3 rounded-xl bg-teal-50 hover:bg-teal-100 border border-teal-200 flex items-center gap-2.5 text-left text-xs font-bold text-teal-950"
              >
                <Sparkles className="w-4 h-4 text-teal-700 shrink-0" />
                <span>Pausa (2 Minutos)</span>
              </button>

              <button
                onClick={() => handleSelectTab('faq')}
                className="min-h-[48px] p-3 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 flex items-center gap-2.5 text-left text-xs font-semibold text-stone-800"
              >
                <HelpCircle className="w-4 h-4 text-stone-500 shrink-0" />
                <span>Dúvidas & Hábitos</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
