'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function BeforeAfterSlider() {
  const [width, setWidth] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateWidth = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setWidth((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => { if (isDragging.current) updateWidth(e.clientX); };
    const onTouchMove = (e: TouchEvent) => { 
      if (isDragging.current && e.touches.length > 0) updateWidth(e.touches[0].clientX); 
    };
    const stopDrag = () => { isDragging.current = false; document.body.style.overflow = ''; };
    const startDrag = () => { isDragging.current = true; document.body.style.overflow = 'hidden'; };

    const handle = document.getElementById('ba-handle');
    handle?.addEventListener('mousedown', startDrag);
    handle?.addEventListener('touchstart', startDrag);
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
      handle?.removeEventListener('mousedown', startDrag);
      handle?.removeEventListener('touchstart', startDrag);
    };
  }, [updateWidth]);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-[#C4497A] font-bold mb-2 block">Resultados</span>
          <h2 className="text-4xl md:text-5xl font-['Cormorant Garamond',serif] text-[#1A0A12]">Resultados reales</h2>
          <p className="text-[#5A4A4F] mt-4 max-w-lg mx-auto">8 semanas usando la rutina Glow Caribeño. Desliza para ver el cambio.</p>
        </div>

        <div 
          ref={containerRef} 
          className="relative w-full max-w-4xl mx-auto aspect-video bg-[#EDE0E8] rounded-xl overflow-hidden cursor-ew-resize select-none shadow-2xl border-4 border-white group"
        >
          {/* After Image (Background) - Piel con glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F5E6E0] to-[#E8B4C8] flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">✨</div>
              <span className="text-[#1A0A12] text-xl font-['Cormorant Garamond',serif] font-medium">Después (8 semanas)</span>
              <p className="text-[#5A4A4F] text-sm mt-2">Piel luminosa, uniforme y saludable</p>
            </div>
          </div>

          {/* Before Image (Foreground, clipped) - Piel opaca */}
          <div className="absolute top-0 left-0 h-full bg-gradient-to-br from-[#8B7355] to-[#A08060]" style={{ width: `${width}%`, overflow: 'hidden' }}>
            <div className="w-full h-full flex items-center justify-center relative">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-50">📷</div>
                <span className="text-white text-xl font-['Cormorant Garamond',serif] font-medium">Antes</span>
                <p className="text-white/70 text-sm mt-2">Piel opaca, manchas visibles</p>
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-[#1A0A12] shadow-sm">
              Antes
            </div>
          </div>

          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-xs font-bold text-[#C4497A] shadow-sm pointer-events-none z-10">
            Después
          </div>

          {/* Slider Handle */}
          <div 
            id="ba-handle"
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize group z-20 shadow-lg" 
            style={{ left: `${width}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-[#1A0A12]">
                <path d="M18 8l4 4-4 4" />
                <path d="M6 8l-4 4 4 4" />
              </svg>
            </div>
          </div>

          {/* Instruction */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-6 py-3 rounded-full text-xs font-medium text-[#1A0A12] shadow-sm pointer-events-none whitespace-nowrap">
            👈 Desliza para ver el cambio →
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16">
          <div className="text-center">
            <p className="text-4xl font-['Cormorant Garamond',serif] text-[#C4497A] mb-2">89%</p>
            <p className="text-sm text-[#5A4A4F]">Notó más luminosidad</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-['Cormorant Garamond',serif] text-[#C4497A] mb-2">4.9★</p>
            <p className="text-sm text-[#5A4A4F]">Calificación promedio</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-['Cormorant Garamond',serif] text-[#C4497A] mb-2">2 semanas</p>
            <p className="text-sm text-[#5A4A4F]">Para ver resultados</p>
          </div>
        </div>
      </div>
    </section>
  );
}
