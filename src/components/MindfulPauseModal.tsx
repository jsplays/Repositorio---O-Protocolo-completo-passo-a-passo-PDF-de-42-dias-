import React, { useState, useEffect } from 'react';
import { MINDFUL_PAUSE_STEPS } from '../data/protocolData';
import { X, Play, Pause, RotateCcw, Droplet, Heart, CheckCircle2, Sparkles } from 'lucide-react';

interface MindfulPauseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MindfulPauseModal: React.FC<MindfulPauseModalProps> = ({ isOpen, onClose }) => {
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, secondsLeft]);

  if (!isOpen) return null;

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsTimerRunning(false);
    setSecondsLeft(120);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-stone-200 space-y-6 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Página 49 · Método C.A.S.A.</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div>
          <h3 className="text-xl font-bold text-stone-900">
            Pausa Consciente de 2 Minutos
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Sentiu aquela vontade súbita de comer? Dê um instante ao seu corpo antes de agir no piloto automático.
          </p>
        </div>

        {/* 2-Min Timer Circle */}
        <div className="p-6 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-24 h-24 rounded-full border-4 border-emerald-600 bg-white flex items-center justify-center shadow-inner">
            <span className="text-2xl font-black font-mono text-stone-900 tabular-nums">
              {formatTimer(secondsLeft)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
            >
              {isTimerRunning ? 'Pausar' : secondsLeft === 0 ? 'Concluído' : 'Iniciar 2 Minutos'}
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              title="Reiniciar"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
          <span className="text-[11px] text-stone-400">
            Respire fundo três vezes enquanto observa o relógio
          </span>
        </div>

        {/* 5 Steps Carousel / List */}
        <div className="space-y-2">
          {MINDFUL_PAUSE_STEPS.map((s, idx) => (
            <div
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-3 rounded-xl border text-xs transition-all cursor-pointer ${
                activeStep === idx
                  ? 'bg-emerald-50 border-emerald-300'
                  : 'bg-white hover:bg-stone-50 border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900">
                  {s.step}. {s.title}
                </span>
                {activeStep === idx && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
              </div>
              {activeStep === idx && (
                <p className="text-stone-600 mt-1 leading-relaxed">
                  {s.text}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Conclusion note */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[11px] text-stone-500">
            Se decidir comer: saboreie sem culpa e volte à rotina na refeição seguinte.
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
