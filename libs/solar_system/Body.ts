import {CONFIG} from './defaultConfig'

export class Body {
  x: number
  y: number
  vx: number
  vy: number
  mass: number
  radius: number
  color: string
  trace: {x: number; y: number}[] = []

  constructor(
    x: number,
    y: number,
    vx: number,
    vy: number,
    mass: number,
    radius: number,
    color: string
  ) {
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.mass = mass
    this.radius = radius
    this.color = color
  }

  draw(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number) {
    ctx.beginPath()
    ctx.arc(this.x + offsetX, this.y + offsetY, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  drawTrace(ctx: CanvasRenderingContext2D, offsetX: number, offsetY: number) {
    ctx.beginPath()
    ctx.strokeStyle = CONFIG.BACKGROUND_COLOR
    ctx.lineWidth = CONFIG.LINE_WIDTH
    for (let i = 0; i < this.trace.length - 1; i++) {
      ctx.moveTo(this.trace[i].x + offsetX, this.trace[i].y + offsetY)
      ctx.lineTo(this.trace[i + 1].x + offsetX, this.trace[i + 1].y + offsetY)
    }
    ctx.stroke()
  }
}
