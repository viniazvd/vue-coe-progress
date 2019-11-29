<h1 align="center">vue-coe-progress ✅</h1>

<p align="center">
  <a href="#"><img src="https://img.shields.io/npm/l/vuelidation.svg" alt="License" target="_blank"></a>
</p>

<br>

<p align="center">
  ✨ <a href="#">Example(wip)</a>✨
</p>

<br>

## Install
`yarn add vue-coe-progress` or `npm install vue-coe-progress`

**Example**
```vue
<template>
  <div id="app">
    <pre v-for="file in $fileList" :key="file.id">
      <button @click="$abortRequest(file.id)">abort</button>

      <span>done: {{ file.done }}</span>
      <span>error: {{ file.error }}</span>
      <span>aborted: {{ file.aborted }}</span>
      <span>progress: {{ file.progress }}</span>
      <span>uploading: {{ file.uploading }}</span>
    </pre>

    <input type="file" multiple @change="setFile">

    <button @click.prevent="$upload">submit</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCoeProgress from './VueCoeProgress'

export default Vue.extend({
  name: 'app',

  mixins: [
    VueCoeProgress({
      url: 'http://localhost:3000/',
      headers: { 'Authorization': 'Basic 48120481204120h08fhw' }
    })
  ],

  methods: {
    setFile (event: Event): void {
      const files = (event.target as HTMLInputElement).files

      if (files && files.length) this.$setFiles(files)
    }
  }
});
</script>
```

# server
```js
const concat = require('concat-stream')

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-cors'))
  fastify.register(require('fastify-multipart'), { limits: { fileSize: 3000000 } })
  fastify.post('/', function (req, reply) {
    const mp = req.multipart(handler,
      (err) => {
        if (err) reply.code(400).send(err)
        reply.code(200).send('done')
      }
    )

    function handler(field, file, filename, encoding, mimetype) {
      file.pipe(concat(function (buf) {
        console.log('received', filename, 'size', buf.length)
      }))

      file.on('limit', () => reply.code(500).send('File size limit reached'))
    }

    mp.on('filesLimit', () => reply.code(400).send('Maximum number of files reached'))
    mp.on('fieldsLimit', () => reply.code(400).send('Maximim number of fields reached'))
    mp.on('partsLimit', () => reply.code(400).send('Maximum number of form parts reached'))
  })
}
```

package.son
```json
{
  "name": "upload-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "fastify start index.js"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "cors": "^2.8.5",
    "fastify": "^2.10.0",
    "fastify-cli": "^1.3.0",
    "fastify-cors": "^3.0.0",
    "concat-stream": "^2.0.0",
    "fastify-multipart": "^1.0.2"
  }
}
```

## States (of mixin)

Name       |   type  |   default  | About
---------- | ------- | ---------- | ------
files      |  Object |   `{}`     | object with file handling states
$fileList  |  Array  |   `[]`     | mapped file list

## Methods (of mixin)

Name            | Params                                    
--------------- | ----------------------------------------- 
$setFiles       | data: FileList                            
$upload         | -                                         
$abortRequest   | id: string                                
$handleStart    | id: string, event: Event                  
$handleFinish   | id: string, event: Event                  
$handleProgress | id: string, event: ProgressEvent          
$handleError    | id: string, message: string, event: Event 

## disclaimer:
It's a mixin, you can overwrite them! :D

## contributors:
- https://github.com/Giseudo
