type XMLEvent = (event: Event) => void
type XMLProgressEvent = (event: ProgressEvent) => void | null

export type TypeEvents = {
  [key: string]: string;
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
  file: File | null,
  abortFn?: XMLEvent,
  loadendFn?: XMLEvent,
  errorFn?: XMLEvent,
  loadstartFn?: XMLEvent,
  progressFn?: XMLProgressEvent
}