'use client';
import { useState, useEffect } from 'react';
import { X, Copy } from 'lucide-react';

export default function ExitPopup() {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('onni_exit')) {
        setShow(true);
        sessionStorage.setItem('onni_exit', 'true');
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!show) return null;

  const copyCode = () => {
    navigator.clipboard.writeText('ONNI15');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#1A0A12]/70 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative text-center">
        <button onClick={() => setShow(false)} className="absolute top-4 right-4 p-2 hover:bg-[#EDE0E8] rounded-full"><X size={20} /></button>
        <h3 className="text-3xl font-['Cormorant Garamond',serif] mb-2 text-[#1A0A12]">¡Espera! 🌸</h3>
        <p className="text-[#5A4A4F] mb-6">¿Te vas sin tu <span className="text-[#C4497A] font-bold">15% OFF</span>?</p>
        <div 
          className="bg-[#FAF4F0] p-4 rounded-lg border border-dashed border-[#C4497A] flex items-center justify-between cursor-pointer hover:bg-[#C4497A]/10 transition-colors mb-6"
          onClick={copyCode}
        >
          <code className="text-lg font-bold tracking-widest text-[#1A0A12]">{copied ? '¡COPIADO!' : 'ONNI15'}</code>
          <Copy size={18} className="text-[#C4497A]" />
        </div>
        <button onClick={() => setShow(false)} className="text-sm text-[#5A4A4F] hover:underline">Seguir comprando</button>
      </div>
    </div>
  );
}
