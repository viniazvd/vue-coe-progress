<template>
  <div id="app">
    <!-- <div v-if="isUploading"> -->
      <!-- <pre v-for="(x, index) in progress" :key="index">
        progress: {{ x }}
      </pre> -->

      <button @click="$abortRequest">abort</button>
    <!-- </div> -->

    <!-- <span>hasError: {{ hasError }}</span> -->

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
