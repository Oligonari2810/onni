export const translations = {
  es: {
    nav: {
      logo: 'ONNI',
      links: {
        about: 'Nosotras',
        products: 'Productos',
        caribbean: 'El Caribe',
        points: 'Puntos Onni',
        b2b: 'B2B',
      },
      cta: 'Contacto B2B',
    },
    hero: {
      eyebrow: 'K-Beauty · República Dominicana · El Caribe',
      title: 'Onni',
      subtitle: 'La hermana mayor del Caribe',
      description:
        'Los mejores productos K-beauty <strong>seleccionados para el Caribe</strong>. Ciencia coreana. Clima tropical. Precio accesible.',
      cta1: 'Ver selección',
      cta2: 'Distribución B2B',
      stats: [
        { value: '#1', label: 'Mercado cosmético per cápita en LATAM' },
        { value: '10%', label: 'De los ingresos que se gastan en belleza en RD' },
        {
          value: '0',
          label: 'Marcas K-beauty especializadas para el Caribe antes de Onni',
        },
      ],
    },
    form: {
      name: 'Nombre',
      establishment: 'Establecimiento',
      email: 'Email',
      country: 'País',
      message: 'Mensaje',
      submit: 'Solicitar dossier B2B →',
      success: '✓ Solicitud enviada — te contactamos en 24h',
    },
  },
  en: {
    nav: {
      logo: 'ONNI',
      links: {
        about: 'About',
        products: 'Products',
        caribbean: 'Caribbean',
        points: 'Onni Points',
        b2b: 'B2B',
      },
      cta: 'B2B Contact',
    },
    hero: {
      eyebrow: 'K-Beauty · Dominican Republic · The Caribbean',
      title: 'Onni',
      subtitle: 'The older sister of the Caribbean',
      description:
        'The best K-beauty products <strong>curated for the Caribbean</strong>. Korean science. Tropical climate. Accessible price.',
      cta1: 'View selection',
      cta2: 'B2B Distribution',
      stats: [
        { value: '#1', label: 'Cosmetics market per capita in LATAM' },
        { value: '10%', label: 'Of income spent on beauty in DR' },
        {
          value: '0',
          label: 'K-beauty brands specialized for the Caribbean before Onni',
        },
      ],
    },
    form: {
      name: 'Name',
      establishment: 'Establishment',
      email: 'Email',
      country: 'Country',
      message: 'Message',
      submit: 'Request B2B dossier →',
      success: '✓ Request sent — we\'ll contact you within 24h',
    },
  },
  fr: {
    nav: {
      logo: 'ONNI',
      links: {
        about: 'À propos',
        products: 'Produits',
        caribbean: 'Caraïbes',
        points: 'Points Onni',
        b2b: 'B2B',
      },
      cta: 'Contact B2B',
    },
    hero: {
      eyebrow: 'K-Beauty · République Dominicaine · Les Caraïbes',
      title: 'Onni',
      subtitle: 'La sœur aînée des Caraïbes',
      description:
        'Les meilleurs produits K-beauty <strong>sélectionnés pour les Caraïbes</strong>. Science coréenne. Climat tropical. Prix accessible.',
      cta1: 'Voir la sélection',
      cta2: 'Distribution B2B',
      stats: [
        { value: '#1', label: 'Marché cosmétique par habitant en LATAM' },
        { value: '10%', label: 'Des revenus dépensés en beauté en RD' },
        {
          value: '0',
          label: 'Marques K-beauty spécialisées pour les Caraïbes avant Onni',
        },
      ],
    },
    form: {
      name: 'Nom',
      establishment: 'Établissement',
      email: 'Email',
      country: 'Pays',
      message: 'Message',
      submit: 'Demander le dossier B2B →',
      success: '✓ Demande envoyée — nous vous contacterons dans 24h',
    },
  },
}

export type Language = 'es' | 'en' | 'fr'

export function getTranslation(lang: Language) {
  return translations[lang] || translations.es
}
