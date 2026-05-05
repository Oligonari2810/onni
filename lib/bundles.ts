import { products } from './products'

export interface Bundle {
  id: string
  name: string
  description: string
  icon: string
  gradient: string
  productIds: string[]
  highlight?: string
}

export const bundles: Bundle[] = [
  {
    id: 'glow-caribeno',
    name: 'Glow Caribeño',
    description: 'Luminosidad y manchas sin sensación pesada en clima húmedo.',
    icon: '✨',
    gradient: 'linear-gradient(135deg, #FBD0DF 0%, #E8B4C8 100%)',
    productIds: ['1885999', '1883175', '1886011'],
    highlight: 'Ahorra tiempo: limpieza + vitamina C + SPF',
  },
  {
    id: 'piel-sensible',
    name: 'Piel Sensible',
    description: 'Rutina de barrera para piel reactiva o sensibilizada por sol/calor.',
    icon: '🌿',
    gradient: 'linear-gradient(135deg, #D8E5F3 0%, #B8D4E8 100%)',
    productIds: ['1885999', '1875027', '1844710'],
  },
  {
    id: 'acne-tropical',
    name: 'Acné Tropical',
    description: 'Control de grasa, limpieza profunda y SPF reaplicable.',
    icon: '🔥',
    gradient: 'linear-gradient(135deg, #FBEBBB 0%, #E8D4A8 100%)',
    productIds: ['1885999', '1875021', '1886011'],
  },
]

export function getBundleProducts(bundle: Bundle) {
  return bundle.productIds
    .map((id) => products.find((product) => product.id === id))
    .filter(Boolean)
}

export function getBundleTotal(bundle: Bundle) {
  return getBundleProducts(bundle).reduce((sum, product) => sum + (product?.price || 0), 0)
}
