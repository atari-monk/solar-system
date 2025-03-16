import {Body} from './Body'
import {CONFIG, defaultConfig} from './defaultConfig'
import {SolarSystem} from './SolarSystem'

export const solarSystem = new SolarSystem(defaultConfig)
const sun = new Body(
  CONFIG.DEFAULT_SUN.x,
  CONFIG.DEFAULT_SUN.y,
  CONFIG.DEFAULT_SUN.vx,
  CONFIG.DEFAULT_SUN.vy,
  CONFIG.DEFAULT_SUN.mass,
  CONFIG.DEFAULT_SUN.radius,
  CONFIG.DEFAULT_SUN.color
)
const planet = new Body(
  CONFIG.DEFAULT_PLANET.x,
  CONFIG.DEFAULT_PLANET.y,
  CONFIG.DEFAULT_PLANET.vx,
  Math.sqrt(
    (defaultConfig.G * CONFIG.DEFAULT_SUN.mass) / CONFIG.DEFAULT_PLANET.x
  ),
  CONFIG.DEFAULT_PLANET.radius,
  CONFIG.DEFAULT_PLANET.radius,
  CONFIG.DEFAULT_PLANET.color
)
solarSystem.addBody(sun)
solarSystem.addBody(planet)
