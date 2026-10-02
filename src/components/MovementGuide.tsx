import React, { useState, useEffect, useRef } from 'react';
import { MOVEMENT_LEVELS } from '../data/protocolData';
import { Activity, Play, Pause, RotateCcw, Volume2, CheckCircle2, MessageSquare, Award, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

export const MovementGuide: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(1200); // 20 mins default
  const [timerInitial, setTimerInitial] = useState<number>(1200);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play gentle chime via Web Audio
  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playChime();
            confetti({
              particleCount: 50,
              spread: 70,
              origin: { y: 0.6 }
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timerSeconds]);

  const handleSetTimer = (minutes: number) => {
    setIsRunning(false);
    setTimerSeconds(minutes * 60);
    setTimerInitial(minutes * 60);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimerSeconds(timerInitial);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  const currentLevel = MOVEMENT_LEVELS[selectedLevel];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
          Páginas 33–38 e 46 — Atividade Física & Energia
        </span>
        <h2 className="text-2xl font-bold text-stone-900 mt-2">
          Movimento Progressivo e Possível
        </h2>
        <p className="text-sm text-stone-600 mt-1 max-w-3xl leading-relaxed">
          Adultos geralmente se beneficiam de pelo menos 150 minutos semanais de atividade aeróbica moderada e fortalecimento muscular em 2 dias. Quem está começando deve evoluir aos poucos, sem exaustão ou culpa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Progression Levels & Conversation Test */}
        <div className="lg:col-span-7 space-y-6">
          {/* Level Switcher */}
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Escolha seu nível atual
            </h3>

            <div className="grid grid-cols-3 gap-2">
              {MOVEMENT_LEVELS.map((lvl, idx) => (
                <button
                  key={lvl.level}
                  onClick={() => setSelectedLevel(idx)}
                  className={`py-2.5 px-3 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                    selectedLevel === idx
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  {lvl.level}
                </button>
              ))}
            </div>

            <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 space-y-3">
              <div>
                <span className="text-xs font-bold text-stone-900 block">
                  Perfil: {currentLevel.level}
                </span>
                <span className="text-xs text-stone-500">
                  {currentLevel.description}
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-stone-200">
                {currentLevel.prescription.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Teste da Conversa Guide */}
          <div className="bg-amber-50/80 border border-amber-200 p-5 rounded-2xl space-y-3 text-xs text-stone-800">
            <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
              <MessageSquare className="w-4 h-4 text-amber-700" />
              <span>O “Teste da Conversa” (Como dosar a intensidade)</span>
            </div>
            <p className="leading-relaxed">
              Você não precisa monitorar frequência cardíaca complexa com relógios caros. Em intensidade moderada recomendada:
            </p>
            <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60 font-medium text-amber-950">
              “Você consegue falar frases curtas com alguém ao lado, mas percebe que sua respiração está mais rápida e o corpo aquecido.”
            </div>
            <p className="text-[11px] text-stone-500">
              Se conseguir cantar, o ritmo está muito leve. Se não conseguir dizer duas palavras seguidas, reduza a passada.
            </p>
          </div>

          {/* Week 5 Movement Distribution Table (Dias 29 a 35) */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
              Programação da Semana 5 (Dias 29 a 35)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                <span className="font-bold text-stone-800">Dias 29 e 31:</span> Caminhada confortável por 20 a 30 min.
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                <span className="font-bold text-stone-800">Dias 30 e 34:</span> Fortalecimento leve ou musculação.
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                <span className="font-bold text-stone-800">Dias 32 e 35:</span> Caminhada curta ou atividade prazerosa.
              </div>
              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-emerald-950">
                <span className="font-bold">Dia 33:</span> Alongamento e descanso ativo.
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Movement Timer */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Cronômetro de Movimento</span>
            </h3>
            <span className="text-xs text-stone-400">Com aviso sonoro</span>
          </div>

          <p className="text-xs text-stone-500">
            Coloque o celular no bolso ou ao lado e faça sua caminhada ou pausa ativa:
          </p>

          {/* Presets */}
          <div className="grid grid-cols-3 gap-2">
            {[10, 20, 30].map((mins) => (
              <button
                key={mins}
                onClick={() => handleSetTimer(mins)}
                className={`py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  timerInitial === mins * 60
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {mins} min
              </button>
            ))}
          </div>

          {/* Digital Clock Display */}
          <div className="py-8 bg-stone-900 rounded-2xl text-center text-white space-y-2 shadow-inner">
            <div className="text-5xl font-mono font-black tracking-tight tabular-nums">
              {formatTime(timerSeconds)}
            </div>
            <span className="text-xs text-stone-400 uppercase tracking-widest block">
              {isRunning ? 'Em movimento...' : timerSeconds === 0 ? 'Concluído!' : 'Pronto para começar'}
            </span>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-emerald-700 hover:bg-emerald-800 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isRunning ? 'Pausar' : 'Iniciar Movimento'}</span>
            </button>

            <button
              onClick={handleResetTimer}
              className="p-3 rounded-xl border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors"
              title="Reiniciar"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/70 text-[11px] text-stone-500 flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-stone-400 shrink-0" />
            <span>Um sino soará suavemente quando o tempo terminar.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
