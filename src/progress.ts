type XMLEvent = (event: ProgressEvent) => void

function progress (
  url: string,
  file: File,
  abortFn: XMLEvent,
  processFn: XMLEvent
): XMLHttpRequest {
  let req = new XMLHttpRequest();

  req.upload.addEventListener('abort', abortFn, false);
  req.upload.addEventListener('progress', processFn, false);

  req.onload = () => console.log('finish!');
  req.onerror = () => console.log('error!');

  let formData = new FormData();
  formData.append('file', file!);

  req.open('post', url, true);
  req.setRequestHeader("Content-type", "multipart/form-data");
  req.send(formData);

  return req;
}

export default progress;