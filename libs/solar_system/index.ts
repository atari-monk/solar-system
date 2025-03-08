const canvas = document.getElementById('solarCanvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')!

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const G = 0.1
const traceInterval = 100

interface IBody {
  x: number
  y: number
  vx: number
  vy: number
  mass: number
  radius: number
  color: string
}

const sun: IBody = {
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  mass: 10000,
  radius: 30,
  color: 'yellow',
}

const planet: IBody = {
  x: 200,
  y: 0,
  vx: 0,
  vy: Math.sqrt((G * sun.mass) / 200),
  mass: 10,
  radius: 10,
  color: 'blue',
}

const trace: {x: number; y: number}[] = []
let frameCount = 0
let lastTime = 0

function drawBody(body: IBody, offsetX: number, offsetY: number): void {
  ctx.beginPath()
  ctx.arc(body.x + offsetX, body.y + offsetY, body.radius, 0, Math.PI * 2)
  ctx.fillStyle = body.color
  ctx.fill()
  ctx.closePath()
}

function drawVector(
  x: number,
  y: number,
  vx: number,
  vy: number,
  color: string,
  offsetX: number,
  offsetY: number
): void {
  ctx.beginPath()
  ctx.moveTo(x + offsetX, y + offsetY)
  ctx.lineTo(x + offsetX + vx * 10, y + offsetY + vy * 10)
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.stroke()
}

function updatePhysics(dt: number): void {
  let dx = planet.x - sun.x
  let dy = planet.y - sun.y
  let r = Math.sqrt(dx * dx + dy * dy)

  let force = (G * sun.mass * planet.mass) / (r * r)

  let ax = (force * (dx / r)) / planet.mass
  let ay = (force * (dy / r)) / planet.mass

  planet.vx -= ax * dt
  planet.vy -= ay * dt

  planet.x += planet.vx * dt
  planet.y += planet.vy * dt

  frameCount++
  if (frameCount % traceInterval === 0) {
    trace.push({x: planet.x, y: planet.y})
  }
  if (trace.length > 1000) trace.shift()
}

function drawTrace(offsetX: number, offsetY: number): void {
  ctx.beginPath()
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 1
  for (let i = 0; i < trace.length - 1; i++) {
    ctx.moveTo(trace[i].x + offsetX, trace[i].y + offsetY)
    ctx.lineTo(trace[i + 1].x + offsetX, trace[i + 1].y + offsetY)
  }
  ctx.stroke()
}

export function animate(timestamp: number): void {
  if (lastTime === 0) {
    lastTime = timestamp
  }

  const dt = (timestamp - lastTime) / 1000
  lastTime = timestamp

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const offsetX = canvas.width / 2
  const offsetY = canvas.height / 2

  drawTrace(offsetX, offsetY)
  drawBody(sun, offsetX, offsetY)
  drawBody(planet, offsetX, offsetY)

  drawVector(planet.x, planet.y, planet.vx, planet.vy, 'red', offsetX, offsetY)
  drawVector(
    planet.x,
    planet.y,
    (planet.x - sun.x) * -0.01,
    (planet.y - sun.y) * -0.01,
    'green',
    offsetX,
    offsetY
  )

  updatePhysics(dt)

  requestAnimationFrame(animate)
}
