#!/usr/bin/env python3
"""
UMMA Cart Image Downloader
Descarga imágenes de productos del carrito de UMM y las guarda en la estructura de ONNI.

Uso:
    python download-umma-images.py

Requisitos:
    pip install requests beautifulsoup4 selenium webdriver-manager

Nota: UMM requiere login, así que usamos Selenium con tu sesión activa.
"""

import os
import re
import time
import json
import requests
from pathlib import Path
from bs4 import BeautifulSoup

# Configuración
OUTPUT_DIR = Path("/Users/anamarperezmarrero/onni/public/images/products")
CART_URL = "https://umma.io/cart"
TIMEOUT = 30

# Productos seleccionados para el lanzamiento (extraídos de tu carrito)
# Formato: {slug: {name, price, image_url}}
PRODUCTS = [
    # Limpiadores
    {
        "slug": "anua-pdrn-cleansing-foam",
        "name": "PDRN Hyaluronic Acid Moisturizing Cleansing Foam",
        "brand": "Anua",
        "price": 32.30,
    },
    {
        "slug": "manyo-pure-cleansing-oil",
        "name": "Pure Cleansing Oil",
        "brand": "manyo",
        "price": 48.30,
    },
    {
        "slug": "vt-pdrn-cleanser",
        "name": "PDRN Barrier Cleanser",
        "brand": "VT",
        "price": 38.30,
    },
    # Tónicos
    {
        "slug": "anua-niacinamide-txa-toner",
        "name": "Niacinamide TXA Brightening Booster Toner",
        "brand": "Anua",
        "price": 48.40,
    },
    {
        "slug": "anua-peach-77-toner",
        "name": "Peach 77 Niacin Essence Toner",
        "brand": "Anua",
        "price": 29.95,
    },
    {
        "slug": "im-from-rice-toner",
        "name": "Rice Toner",
        "brand": "I'M FROM",
        "price": 40.45,
    },
    # Sérums
    {
        "slug": "goodal-vitamin-c-serum",
        "name": "Green Tangerine Vita C Dark Spot Serum",
        "brand": "goodal",
        "price": 53.85,
    },
    {
        "slug": "jumiso-niacinamide-serum",
        "name": "Niacinamide 10 Serum",
        "brand": "JUMISO",
        "price": 179.00,
    },
    # Contorno de ojos
    {
        "slug": "beauty-of-joseon-eye-serum",
        "name": "Revive Eye Serum: Ginseng + Retinal",
        "brand": "Beauty of Joseon",
        "price": 33.00,
    },
    {
        "slug": "vt-cica-collagen-eye-cream",
        "name": "Cica Collagen Eye Cream",
        "brand": "VT",
        "price": 40.25,
    },
    # Protector solar
    {
        "slug": "tocobo-bio-watery-sun",
        "name": "Bio Watery Sun Cream SPF50+ PA++++",
        "brand": "TOCOBO",
        "price": 33.65,
    },
    {
        "slug": "round-lab-birch-juice-sunscreen",
        "name": "Birch Juice Moisturizing Sunscreen",
        "brand": "ROUND LAB",
        "price": 135.20,
    },
    # Mascarillas
    {
        "slug": "some-by-mi-real-cica-mask",
        "name": "Real Cica Calming Care Mask",
        "brand": "SOME BY MI",
        "price": 3.10,
    },
    {
        "slug": "dr-jart-ceramidin-mask",
        "name": "Ceramidin Skin Barrier Moisturizing Mask",
        "brand": "DR.JART+",
        "price": 48.55,
    },
    # Cremas
    {
        "slug": "dr-althea-345-relief-cream",
        "name": "345 Relief Cream",
        "brand": "Dr.Althea",
        "price": 50.40,
    },
    {
        "slug": "vt-pdrn-capsule-cream",
        "name": "PDRN Capsule Cream 100",
        "brand": "VT",
        "price": 43.65,
    },
]


def create_product_folders():
    """Crea las carpetas para cada producto."""
    print(f"📁 Creando carpetas en {OUTPUT_DIR}...")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    for product in PRODUCTS:
        folder = OUTPUT_DIR / product["slug"]
        folder.mkdir(parents=True, exist_ok=True)
        print(f"  ✓ {folder.name}")
    
    print(f"✅ {len(PRODUCTS)} carpetas creadas\n")


def download_image(url: str, output_path: Path) -> bool:
    """Descarga una imagen desde URL."""
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            "Accept": "image/webp,image/apng,image/*,*/*;q=0.8",
        }
        response = requests.get(url, headers=headers, timeout=TIMEOUT)
        response.raise_for_status()
        
        with open(output_path, "wb") as f:
            f.write(response.content)
        
        return True
    except Exception as e:
        print(f"  ❌ Error descargando {url}: {e}")
        return False


def scrape_umma_cart():
    """
    Extrae información del carrito de UMM.
    
    Nota: UMM requiere autenticación. Si no estás logueado,
    necesitás copiar el HTML manualmente desde el navegador.
    """
    print("🔍 Escaneando carrito de UMM...")
    print(f"   URL: {CART_URL}")
    
    # Intentar obtener el HTML directamente
    try:
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        }
        response = requests.get(CART_URL, headers=headers, timeout=TIMEOUT)
        
        if response.status_code == 403 or "login" in response.url.lower():
            print("  ⚠️  UMM requiere login. Alternativas:")
            print("     1. Copiá el HTML del carrito y guardalo como cart.html")
            print("     2. Usá Selenium con tu sesión activa")
            return None
        
        return response.text
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return None


def parse_cart_html(html: str) -> list:
    """Parsea el HTML del carrito y extrae productos."""
    soup = BeautifulSoup(html, "html.parser")
    products = []
    
    # Buscamos contenedores de productos (ajustar selectores según estructura real)
    # Esto es un template -可能需要 ajustar según la estructura real de UMM
    product_cards = soup.select(".product-item, .cart-item, [data-product]")
    
    for card in product_cards:
        try:
            name_elem = card.select_one(".product-name, .item-title, h3, h4")
            price_elem = card.select_one(".price, .item-price")
            img_elem = card.select_one("img")
            
            if name_elem and price_elem:
                name = name_elem.get_text(strip=True)
                price_text = price_elem.get_text(strip=True)
                price = float(re.search(r"[\d.]+", price_text).group()) if re.search(r"[\d.]+", price_text) else 0
                img_url = img_elem.get("src") if img_elem else None
                
                products.append({
                    "name": name,
                    "price": price,
                    "image_url": img_url,
                })
        except Exception as e:
            continue
    
    return products


def download_all_images():
    """Descarga todas las imágenes de los productos."""
    print("📥 Descargando imágenes de productos...\n")
    
    downloaded = 0
    failed = 0
    
    for product in PRODUCTS:
        folder = OUTPUT_DIR / product["slug"]
        output_path = folder / "main.webp"
        
        # Si ya existe, saltar
        if output_path.exists():
            print(f"  ⏭️  {product['slug']} (ya existe)")
            continue
        
        # Intentar obtener imagen de UMM
        # Construir URL tentativa (UMM usa un patrón específico)
        # Esto es un placeholder - necesitarás la URL real de cada imagen
        
        # Por ahora, usamos placehold.co como fallback
        color = product.get("color", "2a2024")
        label = f"{product['brand']}\\n{product['name'][:30]}"
        placeholder_url = f"https://placehold.co/800x1000/{color.replace('#', '')}/ffffff?text={label}"
        
        print(f"  📸 {product['slug']}...")
        
        if download_image(placeholder_url, output_path):
            downloaded += 1
            print(f"      ✓ Descargado (placeholder)")
        else:
            failed += 1
            print(f"      ❌ Fallido")
        
        time.sleep(0.5)  # Rate limiting
    
    print(f"\n✅ Descarga completada: {downloaded} éxitos, {failed} fallidos")


def generate_products_ts():
    """Genera/actualiza el archivo lib/products.ts con los productos de UMM."""
    output_path = Path("/Users/anamarperezmarrero/onni/lib/products-umma.ts")
    
    print(f"📝 Generando {output_path.name}...")
    
    content = '''// Productos importados de UMM (umma.io)
// Generado automáticamente por scripts/download-umma-images.py

import type { Product } from './products'

const img = (slug: string) => `/images/products/${slug}/main.webp`

export const ummaProducts: Product[] = [
'''
    
    for product in PRODUCTS:
        content += f'''
  {{
    id: '{product["slug"]}',
    slug: '{product["slug"]}',
    name: '{product["name"]}',
    category: 'Importado',
    benefit: 'Producto K-Beauty seleccionado por ONNI',
    micro: 'Disponible en umma.io',
    price: {product["price"]},
    color: '#2a2024',
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
    images: [img('{product["slug"]}')],
  }},
'''
    
    content += ''']
'''
    
    with open(output_path, "w") as f:
        f.write(content)
    
    print(f"  ✅ {output_path} generado")
    print(f"  📍 Revisá y ajustá los campos antes de usar")


def main():
    print("=" * 60)
    print("🇰🇷  UMM Image Downloader para ONNI")
    print("=" * 60 + "\n")
    
    # Paso 1: Crear carpetas
    create_product_folders()
    
    # Paso 2: Intentar scrapear UMM (puede requerir login)
    html = scrape_umma_cart()
    
    if html:
        products = parse_cart_html(html)
        print(f"  📦 {len(products)} productos encontrados en el carrito\n")
    
    # Paso 3: Descargar imágenes (placeholders por ahora)
    download_all_images()
    
    # Paso 4: Generar archivo de productos
    generate_products_ts()
    
    print("\n" + "=" * 60)
    print("✅ ¡Listo!")
    print("=" * 60)
    print("\n📋 Próximos pasos:")
    print("   1. Revisá lib/products-umma.ts y completá los campos")
    print("   2. Reemplazá los placeholders con fotos reales")
    print("   3. Importá los productos en tu catálogo principal")
    print("\n📸 Para obtener fotos reales de UMM:")
    print("   - Abrí cada producto en umma.io")
    print("   - Guardá la imagen como main.webp en la carpeta correspondiente")
    print("   - O contactá a UMM para solicitar assets de marketing")


if __name__ == "__main__":
    main()
