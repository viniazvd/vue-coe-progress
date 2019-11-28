<template>
  <div id="app">
    <div v-if="isUploading">
      <span>progress is: {{ progress }}</span>
      <button @click="$abortRequest">abort</button>
    </div>

    <form enctype="multipart/form-data" method="post" name="fileinfo">
      <input type="file" @change="setFile">

      <button @click.prevent="$submit">submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueCoeProgress from './VueCoeProgress'

export default Vue.extend({
  name: 'app',

  mixins: [ VueCoeProgress('http://localhost:3000/') ],

  methods: {
    setFile (event: Event): void {
      const file = (event.target as HTMLInputElement).files

      if (file && file.length) {
        this.file = (event.target as HTMLInputElement).files[0]
      }
    }
  }
});
</script>
