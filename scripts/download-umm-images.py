#!/usr/bin/env python3
"""
Descarga imágenes de productos ONNI desde UMM
Las imágenes se guardan como main.webp en cada carpeta de producto
"""

import os
import requests
from pathlib import Path

# Los 7 bestsellers de ONNI con sus IDs de UMM
PRODUCTS = {
    "beauty-of-joseon-revive-eye-serum-ginseng-retinal-30ml": {
        "name": "Beauty of Joseon Revive Eye Serum",
        "umm_id": 1886032,
    },
    "vt-vt-reedle-shot-1300-8ml": {
        "name": "VT Reedle Shot 1300",
        "umm_id": 1883222,
    },
    "goodal-green-tangerine-vita-c-dark-spot-serum-40ml": {
        "name": "Goodal Green Tangerine Vita C Serum",
        "umm_id": 1883175,
    },
    "dralthea-345-relief-cream-50ml": {
        "name": "Dr. Althea 345 Relief Cream",
        "umm_id": 1844710,
    },
    "manyo-pure-cleansing-oil-200ml": {
        "name": "Manyo Pure Cleansing Oil",
        "umm_id": 1885999,
    },
    "im-from-rice-toner-150ml": {
        "name": "I'M FROM Rice Toner",
        "umm_id": 1875027,
    },
    "round-lab-1025-dokdo-toner-lotion-special-settoner-200ml-lot": {
        "name": "Round Lab 1025 Dokdo Toner",
        "umm_id": 1874987,
    },
}

BASE_DIR = Path(__file__).parent.parent / "public" / "images" / "products"

def get_image_url(umm_id: int) -> str:
    """
    Obtiene la URL de la imagen desde la API de UMM
    """
    # UMM usa Cloudfront para las imágenes
    # El patrón es: https://d2l2bfroyrqmu1.cloudfront.net/product-image/[fecha]/[uuid].webp
    # Pero necesitamos hacer scraping o usar la API
    
    # Intentamos con la página del producto
    product_url = f"https://umma.io/product/{umm_id}"
    return product_url

def download_image(umm_id: int, dest_path: Path) -> bool:
    """
    Descarga la imagen del producto desde UMM
    """
    try:
        # Headers para simular navegador
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        }
        
        # Primero obtenemos la página del producto para extraer la imagen
        product_url = f"https://umma.io/product/{umm_id}"
        response = requests.get(product_url, headers=headers, timeout=30, allow_redirects=True)
        
        if response.status_code != 200:
            print(f"❌ Error HTTP {response.status_code} para producto {umm_id}")
            return False
        
        # Buscar URLs de imágenes en el HTML (patrones de Cloudfront)
        import re
        
        # Buscar imágenes .webp de Cloudfront
        pattern = r'https://d2l2bfroyrqmu1\.cloudfront\.net/product-image/[^"\']+\.webp'
        matches = re.findall(pattern, response.text)
        
        if not matches:
            # Intentar con otro patrón
            pattern = r'https://[^"\']+\.webp'
            matches = re.findall(pattern, response.text)
        
        if not matches:
            print(f"⚠️  No se encontró imagen para producto {umm_id}")
            return False
        
        # Usar la primera imagen encontrada (suele ser la principal)
        image_url = matches[0]
        print(f"   📷 Image URL: {image_url[:80]}...")
        
        # Descargar la imagen
        img_response = requests.get(image_url, headers=headers, timeout=30)
        img_response.raise_for_status()
        
        # Guardar como main.webp
        dest_file = dest_path / "main.webp"
        with open(dest_file, 'wb') as f:
            f.write(img_response.content)
        
        print(f"✅ Guardado: {dest_file}")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    print("🇰🇷 Descargando imágenes de productos UMM para ONNI\n")
    print("=" * 70)
    
    downloaded = 0
    failed = 0
    
    for slug, product in PRODUCTS.items():
        product_dir = BASE_DIR / slug
        
        if not product_dir.exists():
            print(f"\n⚠️  {slug} → Carpeta no existe, creando...")
            product_dir.mkdir(parents=True, exist_ok=True)
        
        print(f"\n📥 {product['name']} (ID: {product['umm_id']})...")
        
        if download_image(product['umm_id'], product_dir):
            downloaded += 1
        else:
            failed += 1
            print(f"   ⚠️  Se mantendrá el placeholder SVG actual")
    
    print("\n" + "=" * 70)
    print(f"✅ Descargadas: {downloaded}/{len(PRODUCTS)}")
    print(f"❌ Fallidas: {failed}")
    print("=" * 70)
    
    if failed > 0:
        print("\n⚠️  Algunos productos fallaron. Podés:")
        print("   1. Ir manualmente a umma.io/product/[ID]")
        print("   2. Click derecho en la imagen → Copiar dirección")
        print("   3. Descargar manualmente y guardar como main.webp")

if __name__ == "__main__":
    main()
