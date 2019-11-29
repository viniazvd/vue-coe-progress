import { IProgressOptions } from './types'
import { captureErrors, registerListeners, setHeaders } from './utils'

function progress (options: IProgressOptions, id: string): XMLHttpRequest | null {
  if (!options.file) return null;

  let req: XMLHttpRequest = new XMLHttpRequest();

  captureErrors(id, req, options);
  registerListeners(id, req, options);

  let formData: FormData = new FormData();
  formData.append('file', options.file!);

  req.open('post', options.url, true);
  setHeaders(req, options)
  req.send(formData);

  return req;
}

export default progress;