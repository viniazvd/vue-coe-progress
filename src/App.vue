<template>
  <div id="app">
    <div v-if="upload && progress">
      <span>progress is: {{ progress }}</span>
      <button @click="abortUpload">abort</button>
    </div>

    <form enctype="multipart/form-data" method="post" name="fileinfo">
      <input type="file" @change="setFile">

      <button @click.prevent="submit">submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import progress from './progress'

export default Vue.extend({
  name: 'app',

  data () {
    return {
      progress: 0,
      file: null as File | null,
      upload: null as XMLHttpRequest | null
    }
  },

  methods: {
    setFile (event: Event): void {
      const file = (event.target as HTMLInputElement).files

      if (file && file.length) {
        this.file = (event.target as HTMLInputElement).files[0]
      }
    },

    abortUpload (): void {
      this.upload.abort()

      // reset
      this.upload = null
      this.progress = 0
    },

    submit (): void {
      const self = this

      function handleProgress (event: ProgressEvent): void {
        if (!event.lengthComputable) return

        const percent = event.loaded / event.total * 100;

        self.progress = percent

        if (percent === 100) return
      }

      function handleAbort () {
        console.log('handle abort')
      }

      this.upload = progress({
        url: 'http://localhost:3000/',
        file: this.file,
        abortFn: handleAbort,
        progress: handleProgress
      })
    }
  }
});
</script>
