import {SolarSystemConfig} from './SolarSystemConfig'
import {Body} from './Body'

export class SolarSystem {
  bodies: Body[] = []
  frameCount = 0
  private config: SolarSystemConfig

  constructor(config: SolarSystemConfig) {
    this.config = config
  }

  addBody(body: Body) {
    this.bodies.push(body)
  }

  updatePhysics(dt: number) {
    dt *= this.config.timeScale

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

      if (this.frameCount % this.config.traceInterval === 0) {
        body.trace.push({x: body.x, y: body.y})
        if (body.trace.length > 250) body.trace.shift()
      }
    })

    this.frameCount++
  }

  applyGravity(bodyA: Body, bodyB: Body, dt: number) {
    let dx = bodyB.x - bodyA.x
    let dy = bodyB.y - bodyA.y
    let r = Math.sqrt(dx * dx + dy * dy)
    if (r === 0) return

    let force = (this.config.G * bodyA.mass * bodyB.mass) / (r * r)
    let ax = (force * (dx / r)) / bodyA.mass
    let ay = (force * (dy / r)) / bodyA.mass

    bodyA.vx += ax * dt
    bodyA.vy += ay * dt
  }
}
