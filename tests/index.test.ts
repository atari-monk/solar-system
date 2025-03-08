import {greet} from '../libs/solar_system/index'

test('greet function', () => {
  expect(greet('Alice')).toBe('Hello, Alice!')
})
