function progress (url: string, file: File, cb: (event: ProgressEvent) => void): any {
  let req = new XMLHttpRequest();

  req.upload.addEventListener('progress', cb, false);
  req.onload = () => console.log('finish!');
  req.onerror = () => console.log('error!');

  let formData = new FormData();
  formData.append('file', file!);

  req.open('post', url, true);
  req.setRequestHeader("Content-type", "multipart/form-data");
  req.send(formData);
}

export default progress;