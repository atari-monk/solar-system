import {solarSystem} from './solar_system_factory'

export const canvas = document.getElementById(
  'solarCanvas'
) as HTMLCanvasElement
export const ctx = canvas.getContext('2d')!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let lastTimestamp = 0

export function animate(timestamp: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const offsetX = canvas.width / 2
  const offsetY = canvas.height / 2

  solarSystem.bodies.forEach(body => {
    body.drawTrace(ctx, offsetX, offsetY)
    body.draw(ctx, offsetX, offsetY)
  })

  if (lastTimestamp) {
    const deltaTime = (timestamp - lastTimestamp) / 1000
    solarSystem.updatePhysics(deltaTime)
  }

  lastTimestamp = timestamp
  requestAnimationFrame(animate)
}
