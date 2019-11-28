<template>
  <div id="app">
    <div v-if="isUploading">
      <span>progress is: {{ progress }}</span>
      <button @click="$abortRequest">abort</button>
    </div>

    <span>hasError: {{ hasError }}</span>

    <form enctype="multipart/form-data" method="post" name="fileinfo">
      <input type="file" multiple @change="setFile">

      <button @click.prevent="$upload">submit</button>
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
      const files = (event.target as HTMLInputElement).files

      if (files && files.length) this.file = files[0]
    }
  }
});
</script>
