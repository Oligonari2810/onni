'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function EmailPopup() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const dismissed = localStorage.getItem('onni_popup_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => setShow(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const close = () => {
    setShow(false);
    const expireDate = Date.now() + (30 * 24 * 60 * 60 * 1000);
    localStorage.setItem('onni_popup_dismissed', expireDate.toString());
  };

  const submit = () => {
    if (email) {
      alert('¡Gracias! Tu cupón 15% ha sido enviado.');
      close();
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A0A12]/60 backdrop-blur-md p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl relative text-center">
        <button onClick={close} className="absolute top-4 right-4 p-2 hover:bg-[#EDE0E8] rounded-full"><X size={20} /></button>
        <div className="text-4xl mb-4">🌸</div>
        <h3 className="text-3xl font-['Cormorant Garamond',serif] mb-2 text-[#1A0A12]">Únete a ONNI</h3>
        <p className="text-[#5A4A4F] mb-6">Recibe <strong className="text-[#C4497A]">15% OFF</strong> y una guía de rutina gratuita.</p>
        <input 
          type="email" 
          placeholder="tu@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 bg-[#FAF4F0] border border-[rgba(196,73,122,0.12)] rounded-lg mb-4 focus:outline-none focus:border-[#C4497A]"
        />
        <button onClick={submit} className="w-full py-4 bg-[#C4497A] text-white font-medium rounded-lg hover:bg-[#a3365e] transition-colors">
          ¡Quiero mi descuento!
        </button>
        <button onClick={close} className="mt-4 text-xs text-[#5A4A4F] hover:text-[#1A0A12] underline">No gracias, prefiero pagar full</button>
      </div>
    </div>
  );
}
