import { TypeEvents, IData, IListenerOptions, IProgressOptions } from './types'

const EVENTS: TypeEvents = {
  abort: 'abortFn',
  error: 'errorFn',
  loadend: 'loadendFn',
  progress: 'progressFn',
  loadstart: 'loadstartFn',
}

export function setStates (file: File): IData {
  return {
    error: '',
    data: file,
    progress: 0,
    done: false,
    request: null,
    aborted: false,
    uploading: false,
  }
}

export function createFiles (data: FileList): { [id: string]: IData } {
  return Array
    .from(data)
    .reduce((acc, file) => {
      const id = getUniqueId()

      acc = Object.assign(acc, { [id]: setStates(file) })

      return acc
    }, {})
}

function registerListener (options: IListenerOptions): void {
  if (options.fn) {
    options.req.upload.addEventListener(options.event, options.fn, { once: options.once })
  }
}

export function registerListeners (id: string, req: XMLHttpRequest, options: IProgressOptions): void {
  Object
    .keys(EVENTS)
    .forEach(event => {
      const eventName = EVENTS[event]
      const fn = (options as any)[eventName]
      const once = event !== 'progress'

      if (fn) registerListener({ req, event, fn: (event: Event) => fn(id, event), once })
    })
}

const VALID_EVENTS = [ 200, 201 ]

export function captureErrors (id: string, req: XMLHttpRequest, options: IProgressOptions) {
  req.onreadystatechange = (event: Event): void => {
    if (req.readyState !== 4 || VALID_EVENTS.includes(req.status)) return;

    if (options && options.errorFn) options.errorFn(id, req.responseText, event)
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

export function getUniqueId (): number {
  const n = Date.now() + Math.random()

  return +(n.toFixed(3).toString().replace('.', ''))
}