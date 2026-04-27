const img = (slug: string, suffix: string) => `/images/products/${slug}/${suffix}.svg`

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
  popularity: number // simulated sales count
  stock: number
  keyIngredients: { name: string; benefit: string }[]
  howToUse: string[]
  fullIngredients: string
  images: string[]
  description: string
  volume: string
}

const placeholderImage = (color: string, label: string) =>
  `https://placehold.co/800x1000/${color.replace('#', '')}/ffffff?text=${encodeURIComponent(label)}`

export const products: Product[] = [
  {
    id: 'serum-niacinamide-txa',
    slug: 'serum-niacinamide-txa',
    name: 'Sérum Niacinamide + TXA',
    category: 'Manchas',
    benefit: 'Ayuda a mejorar hiperpigmentación y tono desigual.',
    micro: 'Para piel con marcas, PIH o manchas visibles.',
    price: 34.99,
    color: '#2a2024',
    skinType: 'all',
    climateTags: ['tropical', 'humid', 'high-uv'],
    bestSeller: true,
    vegan: true,
    crueltyFree: true,
    popularity: 42,
    stock: 38,
    volume: '30 ml',
    description: 'Sérum concentrado con Niacinamida al 5% y Ácido Tranexámico al 2% diseñado para tratar hiperpigmentación, manchas oscuras y tono desigual de la piel. Fórmula ligera que se absorbe rápidamente sin dejar residuo pegajoso, ideal para climas tropicales.',
    keyIngredients: [
      { name: 'Niacinamida 5%', benefit: 'Unifica el tono y reduce manchas' },
      { name: 'Ácido Tranexámico 2%', benefit: 'Inhibe la producción de melanina' },
      { name: 'Ácido Hialurónico', benefit: 'Hidratación profunda sin peso' },
    ],
    howToUse: [
      'Aplica 2-3 gotas sobre el rostro limpio',
      'Distribuye con toques suaves hasta absorber',
      'Usa mañana y noche antes de la crema hidratante',
      'Sigue con protector solar SPF50+ de día',
    ],
    fullIngredients: 'Water, Niacinamide (5%), Tranexamic Acid (2%), Propanediol, Glycerin, Sodium Hyaluronate, Panthenol, Allantoin, Xanthan Gum, Ethylhexylglycerin, Disodium EDTA, 1,2-Hexanediol, Phenoxyethanol.',
    images: [
      img('serum-niacinamide-txa', 'main'),
    ],
  },
  {
    id: 'aceite-limpiador-gentle-black',
    slug: 'aceite-limpiador-gentle-black',
    name: 'Aceite limpiador Gentle Black',
    category: 'Limpieza',
    benefit: 'Retira SPF, sebo y residuos sin dejar sensación pesada.',
    micro: 'Ideal para doble limpieza en piel grasa o mixta.',
    price: 28.99,
    color: '#1a1a1a',
    skinType: 'combination',
    climateTags: ['tropical', 'humid'],
    bestSeller: false,
    vegan: true,
    crueltyFree: true,
    popularity: 18,
    stock: 45,
    volume: '200 ml',
    description: 'Aceite limpiador de textura ligera con extracto de carbón activado y aceites botánicos. Disuelve maquillaje resistente, protector solar y exceso de sebo en un solo paso. Se emulsiona con agua sin dejar película grasa.',
    keyIngredients: [
      { name: 'Carbón activado', benefit: 'Purifica y absorbe impurezas' },
      { name: 'Aceite de jojoba', benefit: 'Limpia sin resecar' },
      { name: 'Aceite de girasol', benefit: 'Disuelve SPF y maquillaje' },
    ],
    howToUse: [
      'Con manos secas, aplica sobre rostro seco',
      'Masajea en círculos suaves por 60 segundos',
      'Añade agua para emulsionar',
      'Enjuaga y sigue con la Espuma Heartleaf',
    ],
    fullIngredients: 'Sorbeth-30 Tetraoleate, Caprylic/Capric Triglyceride, Polyglyceryl-10 Dioleate, Simmondsia Chinensis (Jojoba) Seed Oil, Helianthus Annuus (Sunflower) Seed Oil, Charcoal Powder, Tocopherol, Fragrance, Limonene.',
    images: [
      `/images/products/aceite-limpiador-gentle-black/main.webp`,
    ],
  },
  {
    id: 'espuma-heartleaf',
    slug: 'espuma-heartleaf',
    name: 'Espuma Heartleaf',
    category: 'Limpieza',
    benefit: 'Limpia sin resecar y ayuda a mantener equilibrio en clima húmedo.',
    micro: 'Para uso diario en piel con sebo, poros o sensibilidad.',
    price: 22.99,
    color: '#1e2a1e',
    skinType: 'oily',
    climateTags: ['tropical', 'humid', 'hot'],
    bestSeller: true,
    vegan: true,
    crueltyFree: true,
    popularity: 55,
    stock: 12,
    volume: '150 ml',
    description: 'Limpiador en espuma con extracto de Houttuynia Cordata (Heartleaf) al 60%. Calma, controla el exceso de sebo y minimiza poros visibles. pH bajo (5.5) que respeta la barrera cutánea natural. Textura aireada que no tira la piel.',
    keyIngredients: [
      { name: 'Heartleaf 60%', benefit: 'Calma y reduce rojeces' },
      { name: 'BHA suave', benefit: 'Limpia poros en profundidad' },
      { name: 'Pantenol', benefit: 'Hidrata y repara la barrera' },
    ],
    howToUse: [
      'Humedece el rostro con agua tibia',
      'Dispensa una pequeña cantidad y haz espuma',
      'Masajea suavemente por 30-60 segundos',
      'Enjuaga con agua y seca con toalla limpia',
    ],
    fullIngredients: 'Water, Houttuynia Cordata Extract (60%), Glycerin, Potassium Cocoyl Glycinate, Sodium Methyl Cocoyl Taurate, Cocamidopropyl Betaine, Salicylic Acid (0.5%), Panthenol, Madecassoside, Allantoin, Ethylhexylglycerin, Citric Acid, Sodium Chloride, 1,2-Hexanediol, Phenoxyethanol.',
    images: [
      `/images/products/espuma-heartleaf/main.webp`,
    ],
  },
  {
    id: 'protector-solar-spf50',
    slug: 'protector-solar-spf50',
    name: 'Protector solar SPF50+',
    category: 'Protección solar',
    benefit: 'Protección alta con textura ligera y uso cómodo diario.',
    micro: 'Pensado para alta radiación UV y clima tropical.',
    price: 29.99,
    color: '#1a2030',
    skinType: 'all',
    climateTags: ['tropical', 'high-uv', 'hot', 'humid'],
    bestSeller: true,
    vegan: true,
    crueltyFree: true,
    popularity: 78,
    stock: 25,
    volume: '50 ml',
    description: 'Protector solar de amplio espectro SPF50+ PA++++ con filtros químicos de nueva generación. Textura fluida tipo esencia que se absorbe en segundos, sin cast blanco ni sensación grasosa. Resistente al sudor, ideal para alta radiación UV del Caribe.',
    keyIngredients: [
      { name: 'SPF50+ PA++++', benefit: 'Máxima protección UVA/UVB' },
      { name: 'Niacinamida', benefit: 'Unifica el tono mientras protege' },
      { name: 'Centella Asiática', benefit: 'Calma la piel expuesta al sol' },
    ],
    howToUse: [
      'Aplica generosamente como último paso de tu rutina',
      'Usa la cantidad de dos dedos para rostro y cuello',
      'Reaplica cada 2-3 horas si estás al sol',
      'Compatible con maquillaje — no genera pill',
    ],
    fullIngredients: 'Water, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Ethylhexyl Triazone, Niacinamide, Methylene Bis-Benzotriazolyl Tetramethylbutylphenol, Glycerin, Butylene Glycol, Centella Asiatica Extract, Madecassoside, Tocopherol, Adenosine, Allantoin, Panthenol, Xanthan Gum, Acrylates/C10-30 Alkyl Acrylate Crosspolymer, Tromethamine, Ethylhexylglycerin, Disodium EDTA, 1,2-Hexanediol, Phenoxyethanol.',
    images: [
      `/images/products/protector-solar-spf50/main.webp`,
    ],
  },
  {
    id: 'serum-peach-niacinamide',
    slug: 'serum-peach-niacinamide',
    name: 'Sérum Peach + Niacinamide',
    category: 'Hidratación',
    benefit: 'Aporta luminosidad e hidratación con textura ligera.',
    micro: 'Para piel opaca o deshidratada en clima cálido.',
    price: 32.99,
    color: '#2a1a24',
    skinType: 'combination',
    climateTags: ['tropical', 'warm'],
    bestSeller: false,
    vegan: true,
    crueltyFree: true,
    popularity: 22,
    stock: 40,
    volume: '30 ml',
    description: 'Sérum hidratante con extracto de durazno y Niacinamida que aporta luminosidad, hidratación ligera y unifica el tono. Fórmula water-gel que se absorbe al instante sin dejar residuo. Ideal para climas cálidos donde las cremas pesadas resultan incómodas.',
    keyIngredients: [
      { name: 'Extracto de durazno', benefit: 'Antioxidante y luminosidad' },
      { name: 'Niacinamida 3%', benefit: 'Controla poros y unifica tono' },
      { name: 'Beta-glucano', benefit: 'Hidratación de larga duración' },
    ],
    howToUse: [
      'Aplica después del sérum de tratamiento',
      'Distribuye 3-4 gotas sobre rostro y cuello',
      'Presiona suavemente para absorber',
      'Usa mañana y noche',
    ],
    fullIngredients: 'Water, Prunus Persica (Peach) Fruit Extract, Glycerin, Niacinamide (3%), Butylene Glycol, Beta-Glucan, Trehalose, Panthenol, Allantoin, Xanthan Gum, Ethylhexylglycerin, Disodium EDTA, Citric Acid, 1,2-Hexanediol, Phenoxyethanol, Fragrance.',
    images: [
      img('serum-peach-niacinamide', 'main'),
    ],
  },
  {
    id: 'sheet-masks-x10',
    slug: 'sheet-masks-x10',
    name: 'Sheet Masks x10',
    category: 'Tratamiento complementario',
    benefit: 'Aporte rápido de hidratación y confort.',
    micro: 'Útiles en cabina, regalo o activación de rutina.',
    price: 24.99,
    color: '#1e1e2a',
    skinType: 'sensitive',
    climateTags: ['tropical', 'all-climates'],
    bestSeller: false,
    vegan: false,
    crueltyFree: true,
    popularity: 15,
    stock: 60,
    volume: '10 unidades (25 ml c/u)',
    description: 'Pack de 10 mascarillas de tela con diferentes formulaciones: hialurónico, vitamina C, centella, arroz y propóleo. Cada mascarilla aporta 25 ml de esencia concentrada. Ideales para cabina (post-tratamiento), regalo o activación de rutina semanal.',
    keyIngredients: [
      { name: 'Hialurónico (3 uds)', benefit: 'Hidratación intensiva' },
      { name: 'Vitamina C (2 uds)', benefit: 'Luminosidad y antioxidante' },
      { name: 'Centella (2 uds)', benefit: 'Calma post-solar' },
      { name: 'Arroz (2 uds)', benefit: 'Unifica el tono' },
      { name: 'Propóleo (1 ud)', benefit: 'Nutrición y reparación' },
    ],
    howToUse: [
      'Aplica sobre rostro limpio y seco',
      'Deja actuar 15-20 minutos',
      'Retira y masajea el exceso de esencia',
      'No enjuagues — deja que absorba',
    ],
    fullIngredients: 'Varies per mask type. Each mask contains: Water, Glycerin, Butylene Glycol, active extract (per variant), Sodium Hyaluronate, Panthenol, Allantoin, Xanthan Gum, Ethylhexylglycerin, Disodium EDTA, 1,2-Hexanediol, Phenoxyethanol.',
    images: [
      img('sheet-masks-x10', 'main'),
    ],
  },
  {
    id: 'serum-retinol-bakuchiol',
    slug: 'serum-retinol-bakuchiol',
    name: 'Sérum Retinol + Bakuchiol',
    category: 'Antiedad',
    benefit: 'Apoya renovación y firmeza con enfoque tolerable.',
    micro: 'Para rutina nocturna en piel que busca prevención o corrección.',
    price: 38.99,
    color: '#201a28',
    skinType: 'mature',
    climateTags: ['tropical', 'all-climates'],
    bestSeller: false,
    vegan: true,
    crueltyFree: true,
    popularity: 14,
    stock: 30,
    volume: '30 ml',
    description: 'Sérum nocturno que combina Retinol encapsulado (0.3%) con Bakuchiol vegetal para potenciar resultados con menor irritación. Estimula renovación celular, mejora líneas finas y firmeza. Fórmula con ceramidas y escualano para minimizar la sequedad típica del retinol.',
    keyIngredients: [
      { name: 'Retinol encapsulado 0.3%', benefit: 'Renovación celular progresiva' },
      { name: 'Bakuchiol 1%', benefit: 'Alternativa vegetal al retinol' },
      { name: 'Ceramidas + Escualano', benefit: 'Protegen la barrera cutánea' },
    ],
    howToUse: [
      'Aplica por la noche sobre rostro limpio y seco',
      'Usa 2-3 gotas, distribuye con toques suaves',
      'Empieza con 2 veces por semana y aumenta gradualmente',
      'Usa protector solar SPF50+ al día siguiente',
      'No usar durante el embarazo',
    ],
    fullIngredients: 'Water, Squalane, Glycerin, Caprylic/Capric Triglyceride, Retinol (0.3% encapsulated), Bakuchiol (1%), Ceramide NP, Niacinamide, Tocopherol, Panthenol, Allantoin, Xanthan Gum, Ethylhexylglycerin, Disodium EDTA, 1,2-Hexanediol, Phenoxyethanol.',
    images: [
      img('serum-retinol-bakuchiol', 'main'),
    ],
  },
]
