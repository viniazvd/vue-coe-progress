import { IProgressOptions } from './types'
import { registerListeners } from './utils'

function progress (options: IProgressOptions): XMLHttpRequest | null {
  if (!options.file) return null;

  let req = new XMLHttpRequest();

  // register event listeners
  registerListeners(req, options);

  let formData = new FormData();
  formData.append('file', options.file!);

  req.open('post', options.url, true);
  req.setRequestHeader("Content-type", "multipart/form-data");
  req.send(formData);

  return req;
}

export default progress;