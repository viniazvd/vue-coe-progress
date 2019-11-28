type XMLEvent = (event: Event) => void
type XMLProgressEvent = (event: ProgressEvent, id: number) => void | null

export type TypeEvents = {
  [key: string]: string;
}

export interface IData {
  error: string,
  progress: number,
  data: File | null,
  uploading: boolean,
  requests: XMLHttpRequest | null
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
  abortFn?: XMLEvent,
  errorFn?: XMLEvent,
  loadendFn?: XMLEvent,
  loadstartFn?: XMLEvent,
  progressFn?: XMLProgressEvent
}