interface ProgressOptions {
  url: string,
  file: File,
  abortFn?: XMLEvent,
  progress?: XMLEvent
}

type XMLEvent = (event: ProgressEvent) => void

function progress (options: ProgressOptions): XMLHttpRequest {
  let req = new XMLHttpRequest();

  if (options.abortFn) req.upload.addEventListener('abort', options.abortFn, false);
  if (options.progress) req.upload.addEventListener('progress', options.progress, false);

  req.onload = () => console.log('finish!');
  req.onerror = () => console.log('error!');

  let formData = new FormData();
  formData.append('file', options.file!);

  req.open('post', options.url, true);
  req.setRequestHeader("Content-type", "multipart/form-data");
  req.send(formData);

  return req;
}

export default progress;