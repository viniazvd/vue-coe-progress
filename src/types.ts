type XMLEvent = (event: ProgressEvent) => void

export type TypeEvents = {
  [key: string]: string;
}

export interface IListenerOptions {
  fn: any,
  event: string,
  once: boolean,
  req: XMLHttpRequest
}

export interface IProgressOptions {
  url: string,
  file: File | null,
  abortFn?: XMLEvent,
  errorFn?: XMLEvent,
  loadendFn?: XMLEvent,
  progressFn?: XMLEvent,
  loadstartFn?: XMLEvent
}