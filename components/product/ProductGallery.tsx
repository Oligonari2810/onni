'use client'

import { useState, useRef } from 'react'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [zoom, setZoom] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const mainRef = useRef<HTMLDivElement>(null)

  // Use only the main image (first one)
  const mainImage = images[0]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mainRef.current) return
    const rect = mainRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPos({ x, y })
  }

  return (
    <div className="product-gallery">
      <div
        ref={mainRef}
        className="product-gallery-main"
        onMouseEnter={() => setZoom(true)}
        onMouseLeave={() => setZoom(false)}
        onMouseMove={handleMouseMove}
        style={{ cursor: zoom ? 'zoom-in' : 'default' }}
      >
        <img
          src={mainImage}
          alt={productName}
          className="product-gallery-img"
          style={{
            transform: zoom ? 'scale(1.8)' : 'scale(1)',
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transition: zoom ? 'none' : 'transform 0.3s ease',
          }}
        />
      </div>

      {/* Thumbnails — only show if more than 1 image */}
      {images.length > 1 && (
        <div className="gallery-thumbnails">
          {images.map((img, i) => (
            <img key={i} src={img} alt={`${productName} ${i + 1}`} className="gallery-thumb" />
          ))}
        </div>
      )}
    </div>
  )
}
