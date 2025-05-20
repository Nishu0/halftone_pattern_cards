"use client"

import { useEffect, useRef } from "react"

interface HalftoneCanvasProps {
  color: string
  dotSize: number
  spacing: number
  threshold: number
  noise: number
}

export function HalftoneCanvas({ color, dotSize, spacing, threshold, noise }: HalftoneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match its display size
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Parse the color
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: Number.parseInt(result[1], 16),
            g: Number.parseInt(result[2], 16),
            b: Number.parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 }
    }

    const rgb = hexToRgb(color)

    // Generate halftone pattern
    const rows = Math.ceil(canvas.height / spacing)
    const cols = Math.ceil(canvas.width / spacing)

    // Create a pattern with some randomness
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        // Add some noise to create an organic pattern
        const randomValue = Math.random() * noise * 255
        const distanceFromCenter = Math.sqrt(
          Math.pow((x - cols / 2) / (cols / 2), 2) + Math.pow((y - rows / 2) / (rows / 2), 2),
        )

        // Create a radial gradient effect
        const gradientValue = (1 - distanceFromCenter) * 255

        // Combine the random noise with the gradient
        const value = gradientValue + randomValue

        // Apply threshold
        if (value > threshold) {
          const size = dotSize * (value / 255) * (1 - distanceFromCenter * 0.5)

          ctx.beginPath()
          ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`
          ctx.arc(x * spacing + spacing / 2, y * spacing + spacing / 2, size / 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    // Add some random dots for texture
    for (let i = 0; i < canvas.width * canvas.height * 0.001; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      const size = Math.random() * dotSize * 0.8

      if (Math.random() > 0.5) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`
        ctx.arc(x, y, size / 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }, [color, dotSize, spacing, threshold, noise])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
