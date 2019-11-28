import Vue from 'vue'
import { IMixinProps, IData } from './types'
import { createFiles, getUniqueId } from './utils'
import progress from './progress'

const VueCoeProgress = (params: IMixinProps) => Vue.extend({
  data () {
    return {
      files: {} as any
    }
  },

  methods: {
    $setFiles (data: FileList | File) {
      if (data instanceof FileList) this.files = createFiles(data)
    },

    _handleStart (): void {
      // this.isUploading = true
    },

    _handleError (): void {
      this._reset()
      // this.hasError = true
    },

    _handleAbort (): void {
      this._reset()
    },

    _handleFinish (): void {
      // this._reset()
    },

    _handleProgress (event: ProgressEvent, id: number): void {
      if (!event.lengthComputable) return

      // this.progress[id] = +(event.loaded / event.total * 100).toFixed(0)
    },

    _reset (): void {
      // this.files = null
      // this.progress = {}
      // this.requests = null
      // this.isUploading = false
    },

    $abortRequest (): void {
      // if (!this.requests) return

      // this.requests.abort()
      //this._reset()
    },

    $upload (): void {
      if (!this.files) return

      // Array.from(this.files).forEach(file => {
      //   const id = getUniqueId()

      //   const xhr = progress({
      //     file,
      //     url: params.url,
      //     headers: params.headers,
      //     abortFn: this._handleAbort,
      //     errorFn: this._handleError,
      //     loadendFn: this._handleFinish,
      //     loadstartFn: this._handleStart,
      //     progressFn: this._handleProgress
      //   }, id)

      //   this.progress = { ...this.progress, [id]: 0 }
      //   this.requests = { ...this.requests, [id]: xhr }
      // })
    }
  }
})

export default VueCoeProgress