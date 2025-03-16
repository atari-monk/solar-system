import {SolarSystemConfig} from './SolarSystemConfig'

export const defaultConfig: SolarSystemConfig = {
  G: 0.1,
  traceInterval: 1,
  timeScale: 200,
}

export const CONFIG = {
  CANVAS_ID: 'solarCanvas',
  BACKGROUND_COLOR: 'white',
  LINE_WIDTH: 1,
  MAX_TRACE_LENGTH: 250,
  DEFAULT_SUN: {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    mass: 10000,
    radius: 30,
    color: 'yellow',
  },
  DEFAULT_PLANET: {
    x: 200,
    y: 0,
    vx: 0,
    radius: 10,
    color: 'blue',
  },
}
