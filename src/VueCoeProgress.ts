import Vue from 'vue'
import progress from './progress'
import { createFiles, setStates } from './utils'
import { IMixinProps, IData } from './types'

const VueCoeProgress = (params: IMixinProps) => Vue.extend({
  data () {
    return {
      files: {} as { [key: string]: IData }
    }
  },

  computed: {
    $fileList (): object {
      if (!this.files) return []

      return Object
        .entries(this.files)
        .map(([ id, file ]) => ({ id, ...file }))
    }
  },

  methods: {
    _getXHR (id: string, file: IData, options: object) {
      return progress(Object.assign({
        file: file.data,
        url: params.url,
        headers: params.headers,
        errorFn: this.$handleError,
        loadFn: () => {},
        loadendFn: this.$handleFinish,
        loadstartFn: this.$handleStart,
        progressFn: this.$handleProgress
      }, options), id);
    },

    $setStates (): IData {
      return setStates()
    },

    $setFiles (data: FileList): void {
      const isFileList = data instanceof FileList

      if (!isFileList) return

      (this.files as any) = createFiles(data)
    },

    $handleStart (id: string): void {
      this.files[id]['uploading'] = true
    },

    $handleError (id: string, message: string): void {
      this.files[id]['error'] = message
    },

    $handleFinish (id: string): void {
      this.files[id]['done'] = true
      this.files[id]['uploading'] = false
    },

    $handleProgress (id: string, event: ProgressEvent): void {
      if (!event.lengthComputable) return

      this.files[id]['progress'] = +(event.loaded / event.total * 100).toFixed(0)
    },

    $abortRequest (id: string): void {
      this.files[id]['aborted'] = true
      this.files[id]['request']!.abort()
    },

    $upload (options): void {
      if (!this.files) return

      Object
        .entries(this.files)
        .forEach(([ id, file ]) => this.files[id]['request'] = this._getXHR(id, file, options))
    }
  }
})

export default VueCoeProgress
