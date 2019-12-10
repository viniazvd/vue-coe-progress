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

# server example:
https://gist.github.com/viniazvd/ab0b546a7b1b9171b9aa5e3ee67de63b

## States

Name       |   type  |   default  | About
---------- | ------- | ---------- | ------
files      |  Object |   `{}`     | object with file handling states
$fileList  |  Array  |   `[]`     | mapped file list

## Methods

Name            | Params                                    
--------------- | ----------------------------------------- 
$setStates      | -                            
$upload         | -
$setFiles       | data: FileList
$abortRequest   | id: string                                
$handleStart    | id: string, event: Event                  
$handleFinish   | id: string, event: Event                  
$handleProgress | id: string, event: ProgressEvent          
$handleError    | id: string, message: string, event: Event 

## disclaimer:
It's a mixin, you can overwrite them! :D

## contributors:
- https://github.com/Giseudo
