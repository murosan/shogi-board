import { setImmediate } from 'timers'

export function flushPromises() {
  return new Promise(setImmediate)
}
