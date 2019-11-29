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
