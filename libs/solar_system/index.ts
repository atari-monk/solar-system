const canvas = document.getElementById('solarCanvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const G = 0.1
const traceInterval = 100

class Body {
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

  draw(offsetX: number, offsetY: number) {
    ctx.beginPath()
    ctx.arc(this.x + offsetX, this.y + offsetY, this.radius, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
    ctx.closePath()
  }

  drawTrace(offsetX: number, offsetY: number) {
    ctx.beginPath()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 1
    for (let i = 0; i < this.trace.length - 1; i++) {
      ctx.moveTo(this.trace[i].x + offsetX, this.trace[i].y + offsetY)
      ctx.lineTo(this.trace[i + 1].x + offsetX, this.trace[i + 1].y + offsetY)
    }
    ctx.stroke()
  }
}

class SolarSystem {
  bodies: Body[] = []
  frameCount = 0

  addBody(body: Body) {
    this.bodies.push(body)
  }

  updatePhysics(dt: number) {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = 0; j < this.bodies.length; j++) {
        if (i !== j) {
          this.applyGravity(this.bodies[i], this.bodies[j], dt)
        }
      }
    }

    this.bodies.forEach(body => {
      body.x += body.vx * dt
      body.y += body.vy * dt

      if (this.frameCount % traceInterval === 0) {
        body.trace.push({x: body.x, y: body.y})
        if (body.trace.length > 1000) body.trace.shift()
      }
    })

    this.frameCount++
  }

  applyGravity(bodyA: Body, bodyB: Body, dt: number) {
    let dx = bodyB.x - bodyA.x
    let dy = bodyB.y - bodyA.y
    let r = Math.sqrt(dx * dx + dy * dy)
    if (r === 0) return

    let force = (G * bodyA.mass * bodyB.mass) / (r * r)
    let ax = (force * (dx / r)) / bodyA.mass
    let ay = (force * (dy / r)) / bodyA.mass

    bodyA.vx += ax * dt
    bodyA.vy += ay * dt
  }
}

const solarSystem = new SolarSystem()
const sun = new Body(0, 0, 0, 0, 10000, 30, 'yellow')
const planet = new Body(
  200,
  0,
  0,
  Math.sqrt((G * sun.mass) / 200),
  10,
  10,
  'blue'
)
solarSystem.addBody(sun)
solarSystem.addBody(planet)

export function animate(timestamp: number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const offsetX = canvas.width / 2
  const offsetY = canvas.height / 2

  solarSystem.bodies.forEach(body => {
    body.drawTrace(offsetX, offsetY)
    body.draw(offsetX, offsetY)
  })

  solarSystem.updatePhysics(1 / 60)
  requestAnimationFrame(animate)
}
