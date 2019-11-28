import { IProgressOptions } from './types'
import { captureErrors, registerListeners } from './utils'

function progress (options: IProgressOptions): XMLHttpRequest | null {
  if (!options.file) return null;

  let req: XMLHttpRequest = new XMLHttpRequest();

  captureErrors(req, options);
  registerListeners(req, options);

  let formData: FormData = new FormData();
  formData.append('file', options.file!);

  req.open('post', options.url, true);
  req.send(formData);

  return req;
}

export default progress;