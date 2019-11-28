import { TypeEvents, IListenerOptions, IProgressOptions } from './types'

const EVENTS: TypeEvents = {
  abort: 'abortFn',
  error: 'errorFn',
  loadend: 'loadendFn',
  progress: 'progressFn',
  loadstart: 'loadstartFn',
}

function registerListener (options: IListenerOptions): void {
  if (options.fn) {
    options.req.upload.addEventListener(options.event, options.fn, { once: options.once })
  }
}

export function registerListeners (req: XMLHttpRequest, options: IProgressOptions): void {
  Object
    .keys(EVENTS)
    .forEach(event => {
      const eventName = EVENTS[event]
      const fn = (options as any)[eventName]
      const isOnce = event !== 'progress'

      if (fn) registerListener({ req, event, fn, isOnce })
    })
}