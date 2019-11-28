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
    const once = event !== 'progress'

    if (fn) registerListener({ req, event, fn, once })
  })
}

export function captureErrors (req: XMLHttpRequest, options: IProgressOptions) {
  req.onreadystatechange = (event: Event): void => {
    if (req.readyState !== 4 || req.status === 200) return;

    if (options && options.errorFn) options.errorFn(event)
  }
}

export function setHeaders (req: XMLHttpRequest, options: IProgressOptions) {
  const headers = options.headers

  if (headers) {
    Object
      .entries(headers)
      .forEach(([ key, value ]) => req.setRequestHeader(key, value))
  }
}