// ONNI — Catálogo de Productos
// Bestsellers K-Beauty importados de Corea
// Precios calculados: (UMM + logística + seguro) × 2

export interface Product {
  id: string
  slug: string
  name: string
  category: string
  benefit: string
  micro: string
  price: number
  color: string
  skinType: 'oily' | 'combination' | 'all' | 'sensitive' | 'mature'
  climateTags: string[]
  bestSeller: boolean
  vegan: boolean
  crueltyFree: boolean
  popularity: number
  stock: number
  keyIngredients: { name: string; benefit: string }[]
  howToUse: string[]
  fullIngredients: string
  images: string[]
  description: string
  volume: string
}

// Mapeo de extensiones de imagen por producto (descargadas de UMM)
const IMG_EXTENSIONS: Record<string, string> = {
  'beauty-of-joseon-revive-eye-serum-ginseng-retinal-30ml': 'png',
  'vt-vt-reedle-shot-1300-8ml': 'webp',
  'goodal-green-tangerine-vita-c-dark-spot-serum-40ml': 'jpg',
  'dralthea-345-relief-cream-50ml': 'jpg',
  'manyo-pure-cleansing-oil-200ml': 'png',
  'im-from-rice-toner-150ml': 'webp',
  'round-lab-1025-dokdo-toner-lotion-special-settoner-200ml-lot': 'webp',
}

const img = (slug: string) => `/images/products/${slug}/main.${IMG_EXTENSIONS[slug] || 'webp'}`

// 🏆 TOP 7 BESTSELLERS K-BEAUTY
// Precios calculados con fórmula: (UMM + $1.23 logística + 0.6% seguro) × 2
export const products: Product[] = [
  {
    id: 'beauty-of-joseon-revive-eye-serum',
    slug: 'beauty-of-joseon-revive-eye-serum',
    name: 'Revive Eye Serum: Ginseng + Retinal',
    category: 'Contorno de Ojos',
    benefit: 'Reduce ojeras, líneas finas y bolsas con ginseng y retinal.',
    micro: 'El eye serum más viral de Corea — 2000+ reviews 5*',
    price: 15.50,
    color: '2a1a1a',
    skinType: 'all',
    climateTags: ['tropical', 'humid', 'all-climates'],
    bestSeller: true,
    vegan: true,
    crueltyFree: true,
    popularity: 95,
    stock: 50,
    volume: '30 ml',
    description: 'El contorno de ojos más vendido de Beauty of Joseon. Combina Ginseng (tradicional coreano) con Retinal (vitamina A pura) para reducir ojeras, líneas de expresión y bolsas. Textura ligera que se absorbe rápidamente sin milia. Ideal para climas tropicales.',
    keyIngredients: [
      { name: 'Ginseng 30%', benefit: 'Estimula circulación y reduce ojeras' },
      { name: 'Retinal', benefit: 'Reduce líneas finas y arrugas' },
      { name: 'Niacinamida', benefit: 'Unifica el tono del contorno' },
    ],
    howToUse: [
      'Aplica una gota en el contorno de ojos por la noche',
      'Distribuye con toques suaves usando el dedo anular',
      'Evita el contacto directo con los ojos',
      'Usa protector solar SPF50+ durante el día',
    ],
    fullIngredients: 'Water, Panax Ginseng Root Extract, Caprylic/Capric Triglyceride, Glycerin, Retinal, Niacinamide, Dipalmitoyl Hydroxyproline, Sodium Hyaluronate, Tocopherol, Adenosine, Allantoin, Panthenol, Xanthan Gum, Ethylhexylglycerin, Disodium EDTA, 1,2-Hexanediol, Phenoxyethanol.',
    images: [img('beauty-of-joseon-revive-eye-serum-ginseng-retinal-30ml')],
  },
  {
    id: 'vt-reedle-shot-1300',
    slug: 'vt-reedle-shot-1300',
    name: 'Reedle Shot 1300',
    category: 'Tratamientos',
    benefit: 'Microagujas de espículas que renuevan la piel desde dentro.',
    micro: 'El trending skincare 2025 — "needle skincare" viral',
    price: 48.00,
    color: '4a3a5a',
    skinType: 'mature',
    climateTags: ['tropical', 'humid', 'all-climates'],
    bestSeller: true,
    vegan: false,
    crueltyFree: true,
    popularity: 90,
    stock: 30,
    volume: '8 ml',
    description: 'El producto más innovador de VT. Contiene 1300 espículas (microagujas naturales de esponja marina) que penetran la piel para estimular renovación celular, reducir arrugas y mejorar textura. Sensación de hormigueo al aplicar = está funcionando.',
    keyIngredients: [
      { name: 'Espículas 1300', benefit: 'Microagujas que renuevan la piel' },
      { name: 'PDRN', benefit: 'Repara y regenera tejidos' },
      { name: 'Centella', benefit: 'Calma post-aplicación' },
    ],
    howToUse: [
      'Aplica por la noche sobre rostro limpio y SECO',
      'Presiona suavemente (no frotes) hasta absorber',
      'Sentirás hormigueo — es normal',
      'Usa 2-3 veces por semana inicialmente',
      'Sigue con crema hidratante',
    ],
    fullIngredients: 'Water, Glycerin, Dipropylene Glycol, Sponge Spicules (1300 count), PDRN, Centella Asiatica Extract, Madecassoside, Asiaticoside, Madecassic Acid, Asiatic Acid, Sodium Hyaluronate, Panthenol, Allantoin, Adenosine, Xanthan Gum, Ethylhexylglycerin, Disodium EDTA, 1,2-Hexanediol, Phenoxyethanol.',
    images: [img('vt-vt-reedle-shot-1300-8ml')],
  },
  {
    id: 'goodal-green-tangerine-vitamin-c-serum',
    slug: 'goodal-green-tangerine-vitamin-c-serum',
    name: 'Green Tangerine Vita C Dark Spot Serum',
    category: 'Sérums',
    benefit: 'Reduce manchas y unifica el tono con vitamina C pura.',
    micro: 'Bestseller histórico — 1 cada 3 segundos en Corea',
    price: 24.00,
    color: '2a5a3a',
    skinType: 'all',
    climateTags: ['tropical', 'humid', 'high-uv'],
    bestSeller: true,
    vegan: true,
    crueltyFree: true,
    popularity: 88,
    stock: 45,
    volume: '40 ml',
    description: 'El sérum de vitamina C más vendido de Goodal. Con extracto de mandarina verde (70%) y Niacinamida, reduce manchas oscuras, unifica el tono y aporta luminosidad. Fórmula estable que no se oxida rápidamente. Ideal para hiperpigmentación post-acné y melasma.',
    keyIngredients: [
      { name: 'Mandarina Verde 70%', benefit: 'Vitamina C natural + antioxidantes' },
      { name: 'Niacinamida 2%', benefit: 'Unifica tono y reduce manchas' },
      { name: 'Ácido Tranexámico', benefit: 'Inhibe producción de melanina' },
    ],
    howToUse: [
      'Aplica 2-3 gotas sobre rostro limpio por la mañana',
      'Distribuye con toques suaves hasta absorber',
      'Espera 1-2 minutos antes de aplicar crema',
      'SIEMPRE usa protector solar SPF50+ después',
    ],
    fullIngredients: 'Citrus Unshiu (Satsuma) Peel Extract (70%), Water, Glycerin, Niacinamide (2%), Tranexamic Acid, Sodium Ascorbyl Phosphate (Vitamin C), Panthenol, Allantoin, Sodium Hyaluronate, Tocopherol, Xanthan Gum, Ethylhexylglycerin, Disodium EDTA, 1,2-Hexanediol, Phenoxyethanol.',
    images: [img('goodal-green-tangerine-vita-c-dark-spot-serum-40ml')],
  },
  {
    id: 'dr-althea-345-relief-cream',
    slug: 'dr-althea-345-relief-cream',
    name: '345 Relief Cream',
    category: 'Cremas',
    benefit: 'Calma irritación y fortalece barrera en piel sensible.',
    micro: '#1 crema para piel sensible en Corea',
    price: 22.50,
    color: '3a3a4a',
    skinType: 'sensitive',
    climateTags: ['tropical', 'humid', 'hot'],
    bestSeller: true,
    vegan: true,
    crueltyFree: true,
    popularity: 85,
    stock: 40,
    volume: '50 ml',
    description: 'La crema #1 de Dr. Althea para piel sensible. Fórmula "3-4-5 Complex" con 3 tipos de ácido hialurónico, 4 tipos de ceramidas y 5 ingredientes calmantes. Repara barrera cutánea, calma rojeces e hidrata sin sensación grasa. Ideal para climas tropicales.',
    keyIngredients: [
      { name: '3-Hyaluronic Acid', benefit: 'Hidratación en 3 capas' },
      { name: '4-Ceramide Complex', benefit: 'Repara barrera cutánea' },
      { name: '5-Calm Complex', benefit: 'Calma irritación y rojeces' },
    ],
    howToUse: [
      'Aplica después del sérum, mañana y noche',
      'Toma una cantidad del tamaño de una moneda',
      'Distribuye en rostro y cuello con masajes circulares',
      'Presiona suavemente para mejorar absorción',
    ],
    fullIngredients: 'Water, Glycerin, Dipropylene Glycol, Caprylic/Capric Triglyceride, Sodium Hyaluronate (3 types), Ceramide NP, Ceramide AS, Ceramide AP, Ceramide EOP, Ceramide NS, Centella Asiatica Extract, Madecassoside, Asiaticoside, Panthenol, Allantoin, Trehalose, Betaine, Xanthan Gum, Ethylhexylglycerin, Disodium EDTA, 1,2-Hexanediol, Phenoxyethanol.',
    images: [img('dralthea-345-relief-cream-50ml')],
  },
  {
    id: 'manyo-pure-cleansing-oil',
    slug: 'manyo-pure-cleansing-oil',
    name: 'Pure Cleansing Oil',
    category: 'Limpiadores',
    benefit: 'Dissuelve maquillaje, SPF y sebo sin dejar residuo graso.',
    micro: 'Cleansing oil más vendido — se agota siempre',
    price: 22.00,
    color: '1a1a1a',
    skinType: 'combination',
    climateTags: ['tropical', 'humid'],
    bestSeller: true,
    vegan: true,
    crueltyFree: true,
    popularity: 82,
    stock: 50,
    volume: '200 ml',
    description: 'El aceite limpiador más popular de Manyo. Disuelve maquillaje resistente, protector solar y exceso de sebo en un solo paso. Se emulsiona con agua sin dejar película grasa. Con aceites botánicos de jojoba y girasol que nutren mientras limpian.',
    keyIngredients: [
      { name: 'Aceite de Jojoba', benefit: 'Limpia sin resecar' },
      { name: 'Aceite de Girasol', benefit: 'Disuelve SPF y maquillaje' },
      { name: 'Aceite de Oliva', benefit: 'Nutre y suaviza' },
    ],
    howToUse: [
      'Con manos SECAS, aplica 2-3 pumps sobre rostro seco',
      'Masajea en círculos por 60 segundos (incluye zona de ojos)',
      'Añade agua tibia para emulsionar (se vuelve blanco)',
      'Enjuaga completamente',
      'Sigue con tu limpiador en espuma (doble limpieza)',
    ],
    fullIngredients: 'Sorbeth-30 Tetraoleate, Caprylic/Capric Triglyceride, Polyglyceryl-10 Dioleate, Simmondsia Chinensis (Jojoba) Seed Oil, Helianthus Annuus (Sunflower) Seed Oil, Olea Europaea (Olive) Fruit Oil, Tocopherol, Fragrance, Limonene.',
    images: [img('manyo-pure-cleansing-oil-200ml')],
  },
  {
    id: 'im-from-rice-toner',
    slug: 'im-from-rice-toner',
    name: 'Rice Toner',
    category: 'Tónicos',
    benefit: 'Aporta luminosidad e hidratación con extracto de arroz.',
    micro: 'Clásico atemporal — 10+ años en el top',
    price: 18.50,
    color: 'f5f5dc',
    skinType: 'all',
    climateTags: ['tropical', 'humid', 'all-climates'],
    bestSeller: true,
    vegan: true,
    crueltyFree: true,
    popularity: 80,
    stock: 45,
    volume: '150 ml',
    description: 'El tónico icónico de I\'M FROM. Con 77.78% extracto de arroz de Yeoju (Corea), aporta luminosidad, hidratación y unifica el tono. Textura lechosa que se absorbe rápidamente. Ideal para todo tipo de piel, especialmente piel opaca y deshidratada.',
    keyIngredients: [
      { name: 'Extracto de Arroz 77.78%', benefit: 'Luminosidad + hidratación' },
      { name: 'Niacinamida', benefit: 'Unifica tono y reduce manchas' },
      { name: 'Adenosina', benefit: 'Antiedad y firmeza' },
    ],
    howToUse: [
      'Aplica después de limpiar, mañana y noche',
      'Vierte una cantidad generosa en las manos o algodón',
      'Presiona suavemente sobre rostro y cuello',
      'Espera 30 segundos antes del siguiente paso',
    ],
    fullIngredients: 'Oryza Sativa (Rice) Extract (77.78%), Water, Glycerin, Niacinamide, 1,2-Hexanediol, Dipropylene Glycol, Adenosine, Disodium EDTA, Xanthan Gum, Ethylhexylglycerin, Phenoxyethanol.',
    images: [img('im-from-rice-toner-150ml')],
  },
  {
    id: 'round-lab-1025-dokdo-toner',
    slug: 'round-lab-1025-dokdo-toner',
    name: '1025 Dokdo Toner',
    category: 'Tónicos',
    benefit: 'Equilibra pH, hidrata y prepara la piel para los siguientes pasos.',
    micro: '#1 toner en Olive Young 5 años consecutivos',
    price: 23.50,
    color: '3a5a4a',
    skinType: 'all',
    climateTags: ['tropical', 'humid', 'sensitive'],
    bestSeller: true,
    vegan: true,
    crueltyFree: true,
    popularity: 92,
    stock: 55,
    volume: '200 ml',
    description: 'El tónico más vendido de Corea por 5 años consecutivos. Con agua de mar profunda de Ulleungdo (1025m) y minerales, equilibra el pH, hidrata profundamente y prepara la piel para absorber mejor los siguientes productos. Fórmula ultra-ligera y refrescante.',
    keyIngredients: [
      { name: 'Agua de Mar Profunda 1025m', benefit: 'Minerales + hidratación profunda' },
      { name: 'Niacinamida', benefit: 'Unifica tono y controla sebo' },
      { name: 'Ácido Hialurónico', benefit: 'Hidratación intensa' },
    ],
    howToUse: [
      'Aplica después de limpiar, mañana y noche',
      'Vierte una cantidad generosa en las manos',
      'Presiona suavemente sobre rostro y cuello',
      'Repite 2-3 capas para máxima hidratación (skin flooding)',
    ],
    fullIngredients: 'Deep Sea Water, Water, Glycerin, Dipropylene Glycol, Niacinamide, Sodium Hyaluronate, Panthenol, Allantoin, Betaine, Trehalose, Betaine Salicylate, Portulaca Oleracea Extract, Disodium EDTA, Xanthan Gum, Ethylhexylglycerin, 1,2-Hexanediol, Phenoxyethanol.',
    images: [img('round-lab-1025-dokdo-toner-lotion-special-settoner-200ml-lot')],
  },
]
