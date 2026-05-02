#!/usr/bin/env python3
"""
ONNI UMM Product Importer
Lee el Excel de UMM y genera todos los productos para ONNI.

Uso:
    python3 scripts/import-umma-products.py
"""

import pandas as pd
import urllib.request
import urllib.parse
import re
from pathlib import Path
import time
import json

# Configuración
EXCEL_PATH = "/Users/anamarperezmarrero/Downloads/20260501203410.xlsx"
OUTPUT_DIR = Path("/Users/anamarperezmarrero/onni/public/images/products")
OUTPUT_TS = Path("/Users/anamarperezmarrero/onni/lib/products-umma-full.ts")

# Colores por categoría
CATEGORY_COLORS = {
    "eye": "2a1a1a",
    "cleanser": "1a1a1a",
    "toner": "3a2a4a",
    "serum": "4a3a5a",
    "sun": "4a6a8a",
    "cream": "3a3a4a",
    "mask": "2a6a4a",
    "treatment": "5a2a3a",
    "lip": "6a2a4a",
    "other": "2a2a2a",
}

# Bestsellers mundiales K-Beauty (marcar como tal)
BESTSELLERS = [
    "REVIVE EYE SERUM",  # Beauty of Joseon
    "1025 DOKDO TONER",  # Round Lab
    "GREEN TANGERINE",  # Goodal
    "HEARTLEAF",  # Abib/Anua
    "REEDLE SHOT",  # VT
    "345 RELIEF CREAM",  # Dr. Althea
    "PURE CLEANSING OIL",  # Manyo
    "RICE TONER",  # I'M FROM
    "BEAN SUN",  # Mixsoon
    "PDRN",  # Multiple brands
    "CICA COLLAGEN",  # VT
    "WATERFULL",  # Jumiso
    "KOJIC ACID TURMERIC",  # Medicube
    "ZERO PORE PAD",  # Medicube
]


def normalize_slug(text):
    """Convierte nombre de producto a slug URL-safe."""
    text = text.lower()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-+", "-", text)
    return text.strip("-")[:60]


def guess_category(product_name):
    """Adivina la categoría del producto por su nombre."""
    name = product_name.upper()
    
    if "EYE" in name or "EYE CREAM" in name or "EYE SERUM" in name:
        return "eye"
    elif "CLEANSING" in name or "CLEANSER" in name or "OIL" in name and "CLEAN" in name:
        return "cleanser"
    elif "TONER" in name or "PAD" in name:
        return "toner"
    elif "SERUM" in name or "AMPOULE" in name or "ESSENCE" in name:
        return "serum"
    elif "SUN" in name or "SPF" in name:
        return "sun"
    elif "CREAM" in name or "LOTION" in name or "GEL CREAM" in name:
        return "cream"
    elif "MASK" in name:
        return "mask"
    elif "LIP" in name:
        return "lip"
    elif "TREATMENT" in name or "RETINOL" in name or "VITAMIN" in name:
        return "treatment"
    else:
        return "other"


def get_category_name(cat_slug):
    """Nombre legible de la categoría."""
    names = {
        "eye": "Contorno de Ojos",
        "cleanser": "Limpiadores",
        "toner": "Tónicos",
        "serum": "Sérums",
        "sun": "Protección Solar",
        "cream": "Cremas",
        "mask": "Mascarillas",
        "lip": "Labios",
        "treatment": "Tratamientos",
        "other": "Otros",
    }
    return names.get(cat_slug, "Otros")


def download_placeholder(brand, name, color, output_path):
    """Descarga placeholder desde placehold.co."""
    try:
        label = f"{brand}: {name[:30]}"
        encoded = urllib.parse.quote(label)
        url = f"https://placehold.co/800x1000/{color}/ffffff?text={encoded}"
        urllib.request.urlretrieve(url, output_path)
        return True
    except Exception as e:
        print(f"  ❌ Error: {e}")
        return False


def main():
    print("=" * 80)
    print("🇰🇷  ONNI — Importador de Productos UMM")
    print("=" * 80 + "\n")
    
    # Leer Excel
    print(f"📖 Leyendo Excel: {EXCEL_PATH}")
    df = pd.read_excel(EXCEL_PATH)
    print(f"   ✅ {len(df)} productos encontrados\n")
    
    # Crear carpetas
    print("📁 Creando carpetas...")
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    products_data = []
    bestsellers = []
    categories_count = {}
    
    for idx, row in df.iterrows():
        brand = str(row['BRAND']).strip()
        product = str(row['PRODUCT']).strip()
        price = float(row['PRICE'])
        qty = int(row['QTY'])
        amount = float(row['AMOUNT'])
        
        # Generar slug
        slug = normalize_slug(f"{brand}-{product}")
        
        # Categoría
        cat_slug = guess_category(product)
        cat_name = get_category_name(cat_slug)
        color = CATEGORY_COLORS.get(cat_slug, "2a2a2a")
        
        # ¿Es bestseller?
        is_bestseller = any(bs in product.upper() for bs in BESTSELLERS)
        if is_bestseller:
            bestsellers.append(f"{brand} - {product[:50]}")
        
        # Contar categorías
        categories_count[cat_name] = categories_count.get(cat_name, 0) + 1
        
        # Crear carpeta
        folder = OUTPUT_DIR / slug
        folder.mkdir(parents=True, exist_ok=True)
        
        # Descargar placeholder
        output_path = folder / "main.webp"
        if not output_path.exists():
            if download_placeholder(brand, product, color, output_path):
                print(f"  ✓ {slug[:50]}")
            else:
                print(f"  ❌ {slug[:50]} (falló)")
        else:
            print(f"  ⏭️  {slug[:50]} (existe)")
        
        # Datos para TypeScript
        products_data.append({
            "idx": idx + 1,
            "brand": brand,
            "product": product,
            "slug": slug,
            "category": cat_name,
            "category_slug": cat_slug,
            "price": price,
            "qty": qty,
            "amount": amount,
            "is_bestseller": is_bestseller,
            "color": color,
        })
        
        # Pequeña pausa para no saturar
        if (idx + 1) % 20 == 0:
            time.sleep(0.5)
    
    print(f"\n✅ {len(products_data)} productos procesados\n")
    
    # Generar archivo TypeScript
    print(f"📝 Generando {OUTPUT_TS.name}...")
    
    ts_content = '''// Productos importados de UMM (umma.io)
// Generado automáticamente por scripts/import-umma-products.py
// 
// PRÓXIMOS PASOS:
// 1. Revisar y completar cada producto (ingredientes, cómo usar, etc.)
// 2. Reemplazar placeholders con fotos reales de UMM
// 3. Importar en products.ts o usar directamente en la app

import type { Product } from './products'

const img = (slug: string) => `/images/products/${slug}/main.webp`

export const ummaProducts: Product[] = [
'''
    
    for p in products_data:
        ts_content += f'''  {{
    id: '{p["slug"]}',
    slug: '{p["slug"]}',
    name: '{p["product"].replace("'", "\\'")}',
    category: '{p["category"]}',
    benefit: 'Producto K-Beauty seleccionado por ONNI',
    micro: 'Disponible en umma.io',
    price: {p["price"]},
    color: '#{p["color"]}',
    skinType: 'all' as const,
    climateTags: ['tropical', 'humid'],
    bestSeller: {str(p["is_bestseller"]).lower()},
    vegan: false,
    crueltyFree: true,
    popularity: {qty * 10},
    stock: {qty},
    volume: 'TBD',
    description: '{p["brand"]} - {p["product"][:100]}...',
    keyIngredients: [],
    howToUse: [],
    fullIngredients: 'TBD',
    images: [img('{p["slug"]}')]
  }},

'''
    
    ts_content += ']\n'
    
    with open(OUTPUT_TS, "w") as f:
        f.write(ts_content)
    
    print(f"  ✅ {OUTPUT_TS.name} generado\n")
    
    # Resumen
    print("=" * 80)
    print("📊 RESUMEN")
    print("=" * 80)
    print(f"\n📦 Total productos: {len(products_data)}")
    print(f"💰 Valor total del carrito: ${sum(p['amount'] for p in products_data):,.2f}")
    print(f"⭐ Bestsellers K-Beauty: {len(bestsellers)}")
    
    print("\n📂 Productos por categoría:")
    for cat, count in sorted(categories_count.items(), key=lambda x: x[1], reverse=True):
        print(f"   • {cat}: {count}")
    
    print(f"\n🏷️  Bestsellers identificados:")
    for bs in bestsellers[:15]:
        print(f"   ⭐ {bs}")
    if len(bestsellers) > 15:
        print(f"   ... y {len(bestsellers) - 15} más")
    
    print("\n" + "=" * 80)
    print("✅ ¡Importación completada!")
    print("=" * 80)
    print("\n📋 Próximos pasos:")
    print("   1. Revisá lib/products-umma-full.ts")
    print("   2. Completá los campos vacíos (ingredientes, cómo usar)")
    print("   3. Reemplazá placeholders con fotos reales de UMM")
    print("   4. Importá los productos al catálogo principal")


if __name__ == "__main__":
    main()
