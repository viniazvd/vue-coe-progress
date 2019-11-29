type XMLEvent = (id: string, event: Event) => void
type XMLErrorEvent = (id: string, message: string, event: Event) => void
type XMLProgressEvent = (id: string, event: ProgressEvent) => void | null

export type TypeEvents = {
  [key: string]: string;
}

export interface IData {
  error: string,
  done: boolean,
  progress: number,
  aborted: boolean,
  data: File | null,
  uploading: boolean,
  request: XMLHttpRequest | null
}

export interface IMixinProps {
  url: string,
  headers?: object
}

export interface IListenerOptions {
  fn: any,
  event: string,
  once: boolean,
  req: XMLHttpRequest
}

// TODO: remove any type on errorFn
export interface IProgressOptions {
  url: string,
  headers?: object,
  file: File | null,
  loadendFn?: XMLEvent,
  loadstartFn?: XMLEvent,
  errorFn?: XMLErrorEvent,
  progressFn?: XMLProgressEvent
}