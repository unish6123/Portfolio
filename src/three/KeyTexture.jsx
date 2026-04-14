export function createKeyTexture(color, IconSvgString, bgColor) {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = bgColor
  ctx.roundRect(0, 0, 128, 128, 16)
  ctx.fill()

  // Top face highlight
  ctx.fillStyle = 'rgba(255,255,255,0.08)'
  ctx.roundRect(6, 6, 116, 50, 10)
  ctx.fill()

  // Draw SVG icon in center
  const img = new Image()
  const blob = new Blob([IconSvgString], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  img.src = url

  return new Promise((resolve) => {
    img.onload = () => {
      ctx.drawImage(img, 24, 20, 80, 80)
      URL.revokeObjectURL(url)
      resolve(canvas)
    }
  })
}