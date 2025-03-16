import {solarSystem} from './solar_system_factory'

export const canvas = document.getElementById(
  'solarCanvas'
) as HTMLCanvasElement
export const ctx = canvas.getContext('2d')!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

export function animate(timestamp: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const offsetX = canvas.width / 2
  const offsetY = canvas.height / 2

  solarSystem.bodies.forEach(body => {
    body.drawTrace(ctx, offsetX, offsetY)
    body.draw(ctx, offsetX, offsetY)
  })

  solarSystem.updatePhysics(1 / 60)
  requestAnimationFrame(animate)
}
