import {Body} from './Body'
import {SolarSystem} from './SolarSystem'
import {SolarSystemConfig} from './SolarSystemConfig'

export const defaultConfig: SolarSystemConfig = {
  G: 0.1,
  traceInterval: 1,
  timeScale: 200,
}
export const solarSystem = new SolarSystem(defaultConfig)
const sun = new Body(0, 0, 0, 0, 10000, 30, 'yellow')
const planet = new Body(
  200,
  0,
  0,
  Math.sqrt((defaultConfig.G * sun.mass) / 200),
  10,
  10,
  'blue'
)
solarSystem.addBody(sun)
solarSystem.addBody(planet)
