import React, { useState } from 'react';
import { Calendar, CheckSquare, Utensils, ArrowLeftRight, Activity, ShoppingBag, Award, Printer, Menu, X, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCommitment: () => void;
  onOpenPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCommitment,
  onOpenPrint,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'plan', label: 'Cardápio 42D', icon: Utensils },
    { id: 'tracker', label: 'Diário de Bordo', icon: CheckSquare },
    { id: 'plate', label: 'Montador de Prato', icon: Calendar },
    { id: 'swaps', label: 'Semáforo & Trocas', icon: ArrowLeftRight },
    { id: 'movement', label: 'Movimento', icon: Activity },
    { id: 'shopping', label: 'Lista de Compras', icon: ShoppingBag }
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSelectTab('plan')}
              className="text-left group cursor-pointer focus:outline-none min-h-[44px] flex items-center"
            >
              <span className="text-lg sm:text-xl font-black tracking-tight text-stone-900 group-hover:text-emerald-700 transition-colors">
                Protocolo Verão 42
              </span>
            </button>
            <span className="hidden lg:inline text-xs text-stone-400 font-mono">
              Método C.A.S.A.
            </span>
          </div>

          {/* Zone 2: 4-6 clean text navigation links (desktop) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer min-h-[40px] ${
                    isActive
                      ? 'bg-stone-100 text-stone-900 font-bold'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Direct Print / PDF Button - Always visible on mobile and desktop */}
            <button
              onClick={onOpenPrint}
              className="min-h-[44px] px-3 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              title="Abrir opções de Impressão e PDF"
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span className="hidden xs:inline sm:inline">Imprimir / PDF</span>
              <span className="xs:hidden sm:hidden">PDF</span>
            </button>

            <button
              onClick={onOpenCommitment}
              className="hidden sm:flex min-h-[44px] items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors cursor-pointer"
              title="Assinar ou ver seu Compromisso Pessoal"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Compromisso</span>
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-xl focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile top drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-2 pb-5 space-y-1 shadow-xl animate-fadeIn">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition-colors ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-950 font-bold'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-stone-100 space-y-1">
            <button
              onClick={() => {
                onOpenCommitment();
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold text-stone-800 hover:bg-stone-50 rounded-xl"
            >
              <Award className="w-5 h-5 text-amber-600" />
              <span>Termo de Compromisso Pessoal</span>
            </button>
            <button
              onClick={() => {
                onOpenPrint();
                setMobileMenuOpen(false);
              }}
              className="w-full min-h-[48px] flex items-center gap-3 px-3.5 py-2.5 text-sm font-bold text-emerald-800 bg-emerald-50 rounded-xl"
            >
              <Printer className="w-5 h-5 text-emerald-700" />
              <span>Imprimir / Salvar em PDF</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
