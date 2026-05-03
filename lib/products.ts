// lib/products.ts
// ONNI — Catálogo de Productos
// Bestsellers K-Beauty importados de Corea
// Precios calculados: (UMM + logística + seguro) × 2

export interface Product {
  id: string;
  brand: string;
  name: string;
  slug: string;
  category: string;
  cost: number;       // Tu costo real (Columna PRICE del Excel)
  price: number;      // Precio de venta D2C (Sugerido con margen >100%)
  msrp: number;       // Precio de referencia (MSRP del Excel)
  stock: number;      // Stock actual
  image: string;      // Ruta de imagen
  badges: string[];   // Etiquetas para frontend
  description: string;
  benefits: string;
  skinTypes: string[];
  fullIngredients?: string;  // Lista completa de ingredientes (INCI) - opcional
}

export const products: Product[] = [
  {
    id: "1883222",
    brand: "VT",
    name: "Reedle Shot 1300 8ml",
    slug: "vt-reedle-shot-1300",
    category: "Tratamientos",
    cost: 22.64,
    msrp: 47.17,
    price: 48.00,      // Margen ~111% sobre costo
    stock: 5,
    image: "/images/products/vt-reedle-shot-1300.webp",
    badges: ["Trending", "Bestseller"],
    description: "Microagujas de espículas que penetran en la piel para renovar desde dentro. El tratamiento #1 en Asia.",
    benefits: "Renovación celular profunda y efecto lifting inmediato",
    skinTypes: ["all", "mature"]
  },
  {
    id: "1886032",
    brand: "Beauty of Joseon",
    name: "Revive Eye Serum : Ginseng + Retinal 30ml",
    slug: "beauty-of-joseon-revive-eye-serum",
    category: "Contorno de Ojos",
    cost: 6.60,
    msrp: 11.79,
    price: 15.50,      // Margen ~134% sobre costo
    stock: 5,
    image: "/images/products/beauty-of-joseon-revive-eye-serum.webp",
    badges: ["Bestseller", "Vegano", "Ideal Caribe"],
    description: "El eye serum más viral de Corea. Reduce ojeras y líneas de expresión con Ginseng y Retinal suave.",
    benefits: "Reduce ojeras y patas de gallo",
    skinTypes: ["all", "mature"]
  },
  {
    id: "1883175",
    brand: "Goodal",
    name: "Green Tangerine Vita C Dark Spot Serum 40ml",
    slug: "goodal-green-tangerine-vita-c-dark-spot-serum",
    category: "Sérums",
    cost: 10.77,
    msrp: 21.50,
    price: 24.00,      // Margen ~122% sobre costo
    stock: 5,
    image: "/images/products/goodal-green-tangerine-vita-c.webp",
    badges: ["Bestseller", "Vegano"],
    description: "Vitamina C pura extraída de mandarina verde. Unifica el tono y atenúa manchas solares sin irritar.",
    benefits: "Ilumina y reduce manchas solares",
    skinTypes: ["all", "oily", "combination"]
  },
  {
    id: "1844710",
    brand: "Dr. Althea",
    name: "345 Relief Cream 50ml",
    slug: "dr-althea-345-relief-cream",
    category: "Cremas",
    cost: 10.08,
    msrp: 20.12,
    price: 22.50,      // Margen ~123% sobre costo
    stock: 5,
    image: "/images/products/dr-althea-345-relief-cream.webp",
    badges: ["Bestseller", "Ideal Caribe"],
    description: "Crema calmante con ceramidas y pantenol. Repara la barrera cutánea en piel sensible.",
    benefits: "Calma piel irritada y fortalece la barrera",
    skinTypes: ["sensitive", "dry"]
  },
  {
    id: "1885999",
    brand: "Manyo",
    name: "Pure Cleansing Oil 200ml",
    slug: "manyo-pure-cleansing-oil",
    category: "Limpiadores",
    cost: 9.66,
    msrp: 20.12,
    price: 22.00,      // Margen ~127% sobre costo
    stock: 5,
    image: "/images/products/manyo-pure-cleansing-oil.webp",
    badges: ["Bestseller", "Vegano"],
    description: "Aceite limpiador que disuelve maquillaje, SPF y exceso de sebo sin dejar residuo grasoso.",
    benefits: "Limpieza profunda sin residuos",
    skinTypes: ["all", "combination", "oily"]
  },
  {
    id: "1875027",
    brand: "I'M FROM",
    name: "Rice Toner 150ml",
    slug: "im-from-rice-toner",
    category: "Tónicos",
    cost: 8.09,
    msrp: 23.31,
    price: 18.50,      // Margen ~128% sobre costo
    stock: 5,
    image: "/images/products/im-from-rice-toner.webp",
    badges: ["Bestseller", "Vegano", "Ideal Caribe"],
    description: "Tónico hidratante con extracto de arroz fermentado. Aporta luminosidad natural y suavidad.",
    benefits: "Hidratación y luminosidad",
    skinTypes: ["all", "dry", "sensitive"]
  },
  {
    id: "1886011",
    brand: "TOCOBO",
    name: "Cotton Soft Sun Stick SPF50+ PA++++ 19g",
    slug: "tocobo-cotton-soft-sun-stick",
    category: "Protección Solar",
    cost: 7.00,
    msrp: 15.26,
    price: 15.00,      // Margen ~114% sobre costo
    stock: 20,
    image: "/images/products/tocobo-cotton-soft-sun-stick.webp",
    badges: ["Nuevo", "Ideal Caribe", "Vegano"],
    description: "Protector solar en barra con acabado mate. Se reaplica sobre maquillaje sin dejar cast blanco.",
    benefits: "SPF50+ sin residuo blanco, ideal para clima húmedo",
    skinTypes: ["all", "oily", "combination"]
  },
  {
    id: "1875021",
    brand: "numbuzin",
    name: "No.5+ Vitamin Glutathione Dark Spot Laser Cream 50ml",
    slug: "numbuzin-no5-glutathione-cream",
    category: "Tratamientos",
    cost: 8.74,
    msrp: 20.81,
    price: 21.00,      // Margen ~140% sobre costo
    stock: 15,
    image: "/images/products/numbuzin-no5-glutathione-cream.webp",
    badges: ["Trending", "Bestseller", "Vegano"],
    description: "Crema con Glutatión y Vitamina para aclarar manchas oscuras y unificar el tono de la piel.",
    benefits: "Aclara manchas y da efecto 'Glass Skin'",
    skinTypes: ["all", "combination"]
  }
];

// Funciones auxiliares
export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug);
}

export function getAllProductSlugs() {
  return products.map(p => ({ params: { slug: p.slug } }));
}
