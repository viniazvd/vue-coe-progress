<template>
  <div id="app">
    <span v-if="progress">progress is: {{ progress }}</span>
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
      file: null,
      progress: 0
    }
  },

  methods: {
    setFile (event: Event): void {
      const file = (event.target as HTMLInputElement).files

      if (file && file.length) {
        this.file = (event.target as HTMLInputElement).files[0]
      }
    },

    submit (): void {
      const self = this

      function handleProgress (event: ProgressEvent): void {
        if (!event.lengthComputable) return

        const percent = event.loaded / event.total * 100;

        self.progress = percent

        if (percent === 100) return
      }

      progress('http://localhost:3000/', this.file, handleProgress)
    }
  }
});
</script>
