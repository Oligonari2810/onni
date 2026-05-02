'use client';
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const handleOption = (msg: string) => {
    setStep(1);
    setTimeout(() => {
      window.open(`https://wa.me/18494754442?text=${encodeURIComponent(msg)}`, '_blank');
      setOpen(false);
      setStep(0);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      {open && (
        <div className="bg-white w-72 rounded-xl shadow-2xl mb-4 border border-[rgba(196,73,122,0.12)] p-4 animate-fade-in origin-bottom-left">
          <div className="flex justify-between items-center mb-3">
            <span className="font-medium text-[#1A0A12]">💬 Expertas ONNI</span>
            <button onClick={() => setOpen(false)}><X size={16} /></button>
          </div>
          {step === 0 ? (
            <div className="space-y-2">
              <div className="bg-[#FAF4F0] p-3 rounded-lg rounded-tl-none text-sm text-[#5A4A4F]">Hola! 👋 ¿En qué te ayudo?</div>
              {['Estado de mi pedido', 'Recomendar rutina', 'Hablar con humana'].map((opt) => (
                <button key={opt} onClick={() => handleOption(opt)} className="block w-full text-left text-sm text-[#C4497A] hover:bg-[#C4497A]/5 p-2 rounded transition-colors">
                  {opt} →
                </button>
              ))}
            </div>
          ) : (
            <div className="text-sm text-[#5A4A4F] animate-pulse">Conectando con WhatsApp...</div>
          )}
        </div>
      )}
      <button onClick={() => setOpen(!open)} className="bg-[#1A0A12] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform hover:bg-[#C4497A]">
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
