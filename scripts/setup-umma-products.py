#!/usr/bin/env python3
"""
UMMA Cart Image Downloader - Versión Simple
Crea las carpetas y descarga placeholders para los productos de ONNI.

Uso:
    python3 scripts/setup-umma-products.py
"""

import os
import time
import urllib.request
from pathlib import Path

# Configuración
OUTPUT_DIR = Path("/Users/anamarperezmarrero/onni/public/images/products")

# Productos seleccionados del carrito UMM
PRODUCTS = [
    # Limpiadores
    {"slug": "anua-pdrn-cleansing-foam", "name": "Anua PDRN Cleansing Foam", "brand": "Anua", "price": 32.30, "color": "1a4a4a"},
    {"slug": "manyo-pure-cleansing-oil", "name": "Manyo Pure Cleansing Oil", "brand": "Manyo", "price": 48.30, "color": "1a1a1a"},
    {"slug": "vt-pdrn-cleanser", "name": "VT PDRN Cleanser", "brand": "VT", "price": 38.30, "color": "2a4a3a"},
    
    # Tónicos
    {"slug": "anua-niacinamide-txa-toner", "name": "Anua Niacinamide TXA Toner", "brand": "Anua", "price": 48.40, "color": "3a2a4a"},
    {"slug": "anua-peach-77-toner", "name": "Anua Peach 77 Toner", "brand": "Anua", "price": 29.95, "color": "4a2a3a"},
    {"slug": "im-from-rice-toner", "name": "I'M FROM Rice Toner", "brand": "I'M FROM", "price": 40.45, "color": "f5f5dc"},
    
    # Sérums
    {"slug": "goodal-vitamin-c-serum", "name": "Goodal Vitamin C Serum", "brand": "Goodal", "price": 53.85, "color": "2a5a3a"},
    {"slug": "jumiso-niacinamide-serum", "name": "Jumiso Niacinamide Serum", "brand": "Jumiso", "price": 179.00, "color": "4a3a5a"},
    
    # Contorno de ojos
    {"slug": "beauty-of-joseon-eye-serum", "name": "Beauty of Joseon Eye Serum", "brand": "Beauty of Joseon", "price": 33.00, "color": "2a1a1a"},
    {"slug": "vt-cica-collagen-eye-cream", "name": "VT Cica Collagen Eye Cream", "brand": "VT", "price": 40.25, "color": "1a3a2a"},
    
    # Protector solar
    {"slug": "tocobo-bio-watery-sun", "name": "Tocobo Bio Watery Sun", "brand": "Tocobo", "price": 33.65, "color": "4a6a8a"},
    {"slug": "round-lab-birch-juice-sunscreen", "name": "Round Lab Birch Juice Sunscreen", "brand": "Round Lab", "price": 135.20, "color": "3a5a4a"},
    
    # Mascarillas
    {"slug": "some-by-mi-real-cica-mask", "name": "Some By Mi Cica Mask", "brand": "Some By Mi", "price": 3.10, "color": "2a6a4a"},
    {"slug": "dr-jart-ceramidin-mask", "name": "Dr. Jart+ Ceramidin Mask", "brand": "Dr. Jart+", "price": 48.55, "color": "1a2a3a"},
    
    # Cremas
    {"slug": "dr-althea-345-relief-cream", "name": "Dr. Althea 345 Relief Cream", "brand": "Dr. Althea", "price": 50.40, "color": "3a3a4a"},
    {"slug": "vt-pdrn-capsule-cream", "name": "VT PDRN Capsule Cream", "brand": "VT", "price": 43.65, "color": "2a3a5a"},
]


def create_folders():
    """Crea las carpetas para cada producto."""
    print("📁 Creando carpetas de productos...\n")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    for product in PRODUCTS:
        folder = OUTPUT_DIR / product["slug"]
        folder.mkdir(parents=True, exist_ok=True)
        print(f"  ✓ {product['slug']}")
    
    print(f"\n✅ {len(PRODUCTS)} carpetas creadas")


def download_placeholder(product, output_path):
    """Descarga un placeholder desde placehold.co"""
    try:
        import urllib.parse
        label = f"{product['brand']}: {product['name'][:25]}"
        encoded_label = urllib.parse.quote(label)
        url = f"https://placehold.co/800x1000/{product['color']}/ffffff?text={encoded_label}"
        
        urllib.request.urlretrieve(url, output_path)
        return True
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False


def download_images():
    """Descarga las imágenes (placeholders por ahora)."""
    print("\n📥 Descargando imágenes (placeholders)...\n")
    
    downloaded = 0
    for product in PRODUCTS:
        folder = OUTPUT_DIR / product["slug"]
        output_path = folder / "main.webp"
        
        if output_path.exists():
            print(f"  ⏭️  {product['slug']} (ya existe)")
            continue
        
        print(f"  📸 {product['slug']}...")
        if download_placeholder(product, output_path):
            downloaded += 1
            print(f"      ✓ OK")
        else:
            print(f"      ❌ Fallido")
        
        time.sleep(0.3)
    
    print(f"\n✅ {downloaded} imágenes descargadas")


def generate_products_file():
    """Genera el archivo de productos para ONNI."""
    output_path = Path("/Users/anamarperezmarrero/onni/lib/products-umma.ts")
    
    print("\n📝 Generando products-umma.ts...\n")
    
    content = '''// Productos importados de UMM (umma.io)
// Generado automáticamente por scripts/setup-umma-products.py
// 
// PRÓXIMOS PASOS:
// 1. Revisar y completar cada producto (ingredientes, cómo usar, etc.)
// 2. Reemplazar placeholders con fotos reales
// 3. Importar en products.ts o usar directamente en la app

import type { Product } from './products'

const img = (slug: string) => `/images/products/${slug}/main.webp`

export const ummaProducts: Product[] = [
'''
    
    for product in PRODUCTS:
        content += f'''  {{
    id: '{product["slug"]}',
    slug: '{product["slug"]}',
    name: '{product["name"]}',
    category: 'K-Beauty',
    benefit: 'Producto K-Beauty seleccionado por ONNI',
    micro: 'Disponible en umma.io',
    price: {product["price"]},
    color: '#{product["color"]}',
    skinType: 'all' as const,
    climateTags: ['tropical', 'humid'],
    bestSeller: false,
    vegan: false,
    crueltyFree: true,
    popularity: 0,
    stock: 100,
    volume: 'TBD',
    description: 'Producto importado desde Corea a través de UMM.',
    keyIngredients: [],
    howToUse: [],
    fullIngredients: 'TBD',
    images: [img('{product["slug"]}')]
  }},

'''
    
    content += ''']
'''
    
    with open(output_path, "w") as f:
        f.write(content)
    
    print(f"  ✅ {output_path.name} generado")


def main():
    print("=" * 60)
    print("🇰🇷  ONNI — Setup de Productos UMM")
    print("=" * 60 + "\n")
    
    create_folders()
    download_images()
    generate_products_file()
    
    print("\n" + "=" * 60)
    print("✅ ¡Listo!")
    print("=" * 60)
    print("\n📋 Próximos pasos:")
    print("   1. Revisá lib/products-umma.ts y completá los campos")
    print("   2. Reemplazá los placeholders con fotos reales de UMM")
    print("   3. Agregá los productos al catálogo principal")
    print("\n📸 Para obtener fotos reales:")
    print("   - Entrá a cada producto en umma.io")
    print("   - Guardá la imagen como main.webp en su carpeta")
    print("   - O contactá a UMM para assets de marketing")


if __name__ == "__main__":
    main()
