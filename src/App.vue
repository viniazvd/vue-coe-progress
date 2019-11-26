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

export default Vue.extend({
  name: 'app',

  data () {
    return {
      file: null,
      progress: 0
    }
  },

  // mounted () {
  //   window.addEventListener('progress', this.handleProcess);
  // },

  methods: {
    // handleProcess (event: any): void {
    //   console.log(event);
    // },

    setFile (event: any): void {
      this.file = event.target.files[0];
    },

    submit (): void {
      let xhr = new XMLHttpRequest();
      xhr.open('post', 'http://localhost:3000/');
      xhr.setRequestHeader("Content-type", "multipart/form-data")

      xhr.onload = () => console.log('loading');
      xhr.onerror = () => console.log('error!');

      xhr.upload.addEventListener('progress', (event: any) => {
        if (!event.lengthComputable) return

        const percent = event.loaded / event.total * 100;

        if (percent === 100) {
          this.progress = 0
          return
        }

        this.progress = percent
      })

      let formData = new FormData();
      formData.append('file', this.file!);

      xhr.send(formData);
    }
  }
});
</script>
