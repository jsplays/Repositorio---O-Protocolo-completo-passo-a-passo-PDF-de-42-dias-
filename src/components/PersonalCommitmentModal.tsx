import React, { useState } from 'react';
import { PersonalCommitment } from '../types/protocol';
import { X, Award, CheckCircle, Printer, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PersonalCommitmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  commitment: PersonalCommitment;
  onSaveCommitment: (commitment: PersonalCommitment) => void;
}

export const PersonalCommitmentModal: React.FC<PersonalCommitmentModalProps> = ({
  isOpen,
  onClose,
  commitment,
  onSaveCommitment
}) => {
  const [name, setName] = useState(commitment.name || '');
  const [startDate, setStartDate] = useState(commitment.startDate || new Date().toISOString().split('T')[0]);
  const [agreed, setAgreed] = useState(commitment.signed);

  if (!isOpen) return null;

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCommitment: PersonalCommitment = {
      name: name.trim(),
      startDate,
      signed: true,
      signatureDate: new Date().toLocaleDateString('pt-BR')
    };

    onSaveCommitment(newCommitment);
    setAgreed(true);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>Página 52 · Compromisso Pessoal</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Style Box */}
        <div className="p-6 bg-stone-50 border-2 border-dashed border-stone-300 rounded-2xl space-y-4 text-center">
          <h3 className="text-xl font-black text-stone-900 font-display">
            Termo de Compromisso Pessoal
          </h3>

          <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
            Antes de iniciar a jornada de 42 dias, firme um pacto consigo mesmo. A constância nasce do respeito ao seu corpo, nunca da punição.
          </p>

          <div className="text-left bg-white p-4 rounded-xl border border-stone-200 text-xs text-stone-700 space-y-2.5">
            <p className="font-bold text-stone-900">
              Eu me comprometo a:
            </p>
            <ul className="space-y-1.5 pl-1">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Cuidar do meu corpo sem punição ou culpa;</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Respeitar minha fome física e minha saciedade natural;</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Buscar constância sustentável em vez de perfeição;</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Adaptar as sugestões à minha realidade e rotina;</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Pedir ajuda profissional quando necessário;</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                <span>Valorizar minha saúde e disposição para além da balança.</span>
              </li>
            </ul>
          </div>

          {commitment.signed ? (
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-2">
              <div className="flex items-center justify-center gap-2 font-bold text-emerald-900 text-sm">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>Compromisso Assinado</span>
              </div>
              <p className="font-medium">
                Assinado por: <span className="font-bold font-mono text-sm">{commitment.name}</span>
              </p>
              <p className="text-[11px] text-emerald-700">
                Início: {commitment.startDate} · Assinado em: {commitment.signatureDate}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSign} className="space-y-3 text-left pt-2">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Seu nome completo:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Digite seu nome..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Data de início dos 42 dias:
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors shadow-sm cursor-pointer"
              >
                Assinar e Salvar Meu Compromisso
              </button>
            </form>
          )}
        </div>

        <div className="flex items-center justify-between pt-2">
          {commitment.signed && (
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-100 rounded-lg"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span>Imprimir Certificado</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
