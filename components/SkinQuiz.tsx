'use client';
import { useState } from 'react';
import { useCart } from '@/lib/useCart';
import { CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
  {
    question: '¿Cuál es tu tipo de piel?',
    subtitle: 'Selecciona la que más se parezca a la tuya',
    options: [
      { value: 'Grasa', icon: '💧', title: 'Piel Grasa', desc: 'Brillo constante durante el día' },
      { value: 'Seca', icon: '🏜️', title: 'Piel Seca', desc: 'Sensación de tirantez' },
      { value: 'Mixta', icon: '⚖️', title: 'Piel Mixta', desc: 'Grasa solo en zona T' },
      { value: 'Sensible', icon: '🌸', title: 'Piel Sensible', desc: 'Se irrita con facilidad' }
    ]
  },
  {
    question: '¿Tu principal preocupación?',
    subtitle: '¿Qué te gustaría mejorar de tu piel?',
    options: [
      { value: 'Manchas', icon: '🔴', title: 'Manchas', desc: 'Hiperpigmentación o marcas' },
      { value: 'Acné', icon: '🔥', title: 'Acné', desc: 'Brotes frecuentes' },
      { value: 'Arrugas', icon: '⏳', title: 'Arrugas', desc: 'Líneas de expresión' },
      { value: 'Opacidad', icon: '✨', title: 'Opacidad', desc: 'Falta de luminosidad' }
    ]
  },
  {
    question: '¿Presupuesto mensual?',
    subtitle: 'Inversión aproximada para tu rutina',
    options: [
      { value: '$50 - $80', icon: '💰', title: 'Básico', desc: 'Esencial para empezar' },
      { value: '$80 - $120', icon: '💎', title: 'Completo', desc: 'Rutina completa' },
      { value: '$120+', icon: '👑', title: 'Premium', desc: 'Lo mejor para tu piel' }
    ]
  },
];

const results: Record<string, { name: string; desc: string; price: number; products: string[] }> = {
  'Grasa-Manchas': { name: 'Control + Glow', desc: 'Niacinamida + Vitamina C', price: 65, products: ['Cleanser', 'Serum VC', 'SPF'] },
  'Grasa-Acné': { name: 'Acné Tropical', desc: 'Cleanser + Niacinamida + SPF', price: 60, products: ['Cleanser', 'Niacinamida', 'SPF Oil-Free'] },
  'Grasa-Arrugas': { name: 'Matte + Anti-age', desc: 'Retinol + SPF oil-free', price: 75, products: ['Cleanser', 'Retinol', 'SPF Matte'] },
  'Grasa-Opacidad': { name: 'Glow Mate', desc: 'Exfoliante + Vitamina C', price: 55, products: ['Cleanser', 'AHA/BHA', 'Serum VC'] },
  'Seca-Manchas': { name: 'Hidra + Glow', desc: 'Hialurónico + Vitamina C', price: 68, products: ['Cleanser', 'Hyaluronic', 'Serum VC'] },
  'Seca-Acné': { name: 'Balance Hidra', desc: 'Hidratación sin grasa', price: 62, products: ['Cleanser', 'Toner', 'Gel Moisturizer'] },
  'Seca-Arrugas': { name: 'Nutrición Total', desc: 'Ceramidas + Retinol', price: 85, products: ['Cleanser', 'Ceramides', 'Retinol'] },
  'Seca-Opacidad': { name: 'Glow Nutritivo', desc: 'Rice Toner + Vitamina C', price: 58, products: ['Cleanser', 'Rice Toner', 'Serum VC'] },
  'Mixta-Manchas': { name: 'Balance + Glow', desc: 'Control + Luminosidad', price: 65, products: ['Cleanser', 'Serum VC', 'SPF'] },
  'Mixta-Acné': { name: 'Acné Balance', desc: 'Control sin resecar', price: 60, products: ['Cleanser', 'Niacinamida', 'SPF'] },
  'Mixta-Arrugas': { name: 'Balance Age', desc: 'Zona T + contorno', price: 72, products: ['Cleanser', 'Eye Serum', 'SPF'] },
  'Mixta-Opacidad': { name: 'Glow Balance', desc: 'Unifica + ilumina', price: 58, products: ['Cleanser', 'Toner', 'Serum VC'] },
  'Sensible-Manchas': { name: 'Calm + Glow', desc: 'Centella + Vitamina C', price: 70, products: ['Gentle Cleanser', 'Centella', 'SPF Mineral'] },
  'Sensible-Acné': { name: 'Calm Acné', desc: 'Sin alcohol ni fragancia', price: 65, products: ['Gentle Cleanser', 'Azelaic', 'SPF'] },
  'Sensible-Arrugas': { name: 'Calm Age', desc: 'Péptidos suaves', price: 80, products: ['Gentle Cleanser', 'Peptides', 'SPF'] },
  'Sensible-Opacidad': { name: 'Calm Glow', desc: 'Luminosidad sin irritar', price: 62, products: ['Gentle Cleanser', 'Rice Toner', 'SPF'] },
};

export default function SkinQuiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);
  const { addToCart } = useCart();

  const handleSelect = (value: string) => {
    setSelected(value);
    const newAnswers = [...answers, value];

    setTimeout(() => {
      if (step < 2) {
        setStep((s) => s + 1);
        setSelected(null);
        setAnswers(newAnswers);
      } else {
        setFinished(true);
      }
    }, 250);
  };

  const handleAddToCart = () => {
    const resultKey = answers.join('-');
    const result = results[resultKey] || results['Mixta-Opacidad'];

    addToCart({
      id: `rutina-${result.name.toLowerCase().replace(/\s+/g, '-')}`,
      name: `Rutina ${result.name}`,
      price: result.price,
      image: '/images/products/rutina-glow.webp',
      category: 'Rutina',
    });
  };

  const getResult = () => {
    const resultKey = answers.join('-');
    return results[resultKey] || { name: 'Glow Caribeño', desc: 'Limpieza + Vitamina C + SPF', price: 58, products: ['Cleanser', 'Serum', 'SPF'] };
  };

  const result = getResult();

  return (
    <section id="quiz" className="py-28 bg-gradient-to-b from-[#FAF4F0] to-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#C4497A]/10 rounded-full text-[#C4497A] text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            K-Beauty Personalizado
          </span>
          <h2 className="text-4xl md:text-6xl font-['Cormorant Garamond',serif] text-[#1A0A12] mb-6">
            Tu Rutina Perfecta
          </h2>
          <p className="text-[#5A4A4F] text-lg max-w-2xl mx-auto">
            Responde 3 preguntas y descubre los productos coreanos ideales para tu piel en el Caribe
          </p>
        </div>

        {/* Quiz Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-[rgba(196,73,122,0.08)]">
            {/* Progress Bar */}
            <div className="h-2 bg-[#EDE0E8]">
              <div
                className="h-full bg-gradient-to-r from-[#C4497A] to-[#E8B4C8] transition-all duration-500"
                style={{ width: finished ? '100%' : `${((step + 1) / 3) * 100}%` }}
              />
            </div>

            <div className="p-8 md:p-16">
              {finished ? (
                /* Result */
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#C4497A] to-[#E8B4C8] rounded-full mb-8 shadow-lg">
                    <CheckCircle size={56} className="text-white" />
                  </div>
                  
                  <p className="text-[#C4497A] text-sm font-bold uppercase tracking-widest mb-4">Tu Match Perfecto</p>
                  
                  <h3 className="text-4xl md:text-5xl font-['Cormorant Garamond',serif] text-[#1A0A12] mb-6">
                    Rutina {result.name}
                  </h3>
                  
                  <p className="text-[#5A4A4F] text-xl mb-8">{result.desc}</p>

                  {/* Products */}
                  <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {result.products.map((product, i) => (
                      <span key={i} className="px-4 py-2 bg-[#FAF4F0] rounded-full text-[#1A0A12] text-sm font-medium">
                        {product}
                      </span>
                    ))}
                  </div>

                  {/* Price Box */}
                  <div className="bg-gradient-to-r from-[#FAF4F0] to-[#F0E4DC] rounded-2xl p-8 mb-8 border border-[rgba(196,73,122,0.12)]">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="text-left">
                        <p className="text-[#1A0A12] font-semibold mb-1">Inversión mensual</p>
                        <p className="text-[#5A4A4F] text-sm">Envío gratis en pedidos +$75 USD</p>
                      </div>
                      <div className="text-right">
                        <p className="text-5xl font-['Cormorant Garamond',serif] text-[#C4497A]">${result.price}</p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={handleAddToCart}
                    className="w-full md:w-auto px-12 py-5 bg-gradient-to-r from-[#C4497A] to-[#E8B4C8] text-white font-bold text-sm uppercase tracking-widest rounded-full hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 mx-auto"
                  >
                    Agregar Rutina al Carrito
                    <ArrowRight size={20} />
                  </button>

                  <p className="text-[#5A4A4F] text-sm mt-6">
                    ¿Cambias de opinión? <button onClick={() => { setFinished(false); setStep(0); setAnswers([]); }} className="text-[#C4497A] font-semibold underline">Reiniciar quiz</button>
                  </p>
                </div>
              ) : (
                /* Questions */
                <div>
                  <div className="text-center mb-12">
                    <p className="text-[#C4497A] text-xs font-bold uppercase tracking-widest mb-4">
                      Paso {step + 1} de 3
                    </p>
                    <h3 className="text-3xl md:text-4xl font-['Cormorant Garamond',serif] text-[#1A0A12] mb-4">
                      {steps[step].question}
                    </h3>
                    <p className="text-[#5A4A4F] text-lg">{steps[step].subtitle}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {steps[step].options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className={`group p-6 rounded-2xl border-2 transition-all text-left ${
                          selected === opt.value
                            ? 'border-[#C4497A] bg-gradient-to-br from-[#C4497A]/5 to-[#E8B4C8]/5 shadow-lg'
                            : 'border-[#EDE0E8] hover:border-[#C4497A] hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start gap-5">
                          <span className="text-5xl group-hover:scale-110 transition-transform">{opt.icon}</span>
                          <div>
                            <span className="font-bold text-[#1A0A12] text-lg block mb-1">{opt.title}</span>
                            <span className="text-[#5A4A4F] text-sm">{opt.desc}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          {!finished && (
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-3 text-[#5A4A4F] text-sm">
                <span className="text-2xl">️</span>
                <span>2 minutos</span>
              </div>
              <div className="flex items-center gap-3 text-[#5A4A4F] text-sm">
                <span className="text-2xl">✨</span>
                <span>Resultados personalizados</span>
              </div>
              <div className="flex items-center gap-3 text-[#5A4A4F] text-sm">
                <span className="text-2xl">🇷</span>
                <span>Productos 100% coreanos</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
