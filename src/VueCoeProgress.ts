import Vue from 'vue'
import progress from './progress'

const VueCoeProgress = (url: string) => Vue.extend({
  data () {
    return {
      progress: 0 as number,
      file: null as File | null,
      hasError: false as boolean,
      isUploading: false as boolean,
      request: null as XMLHttpRequest | null
    }
  },

  methods: {
    _handleStart (): void {
      this.isUploading = true
    },

    _handleError (): void {
      this._reset()
      this.hasError = true
    },

    _handleAbort (): void {
      this._reset()
    },

    _handleFinish (): void {
      this._reset()
    },

    _handleProgress (event: ProgressEvent): void {
      if (!event.lengthComputable) return

      const percent = event.loaded / event.total * 100

      this.progress = percent

      if (percent === 100) return
    },

    _reset (): void {
      this.progress = 0
      this.request = null
      this.isUploading = false
    },

    $abortRequest (): void {
      if (!this.request) return

      this.request.abort()
      this._reset()
    },

    $upload (): void {
      this.request = progress({
        url,
        file: this.file,
        abortFn: this._handleAbort,
        errorFn: this._handleError,
        loadendFn: this._handleFinish,
        loadstartFn: this._handleStart,
        progressFn: this._handleProgress
      })
    }
  }
})

export default VueCoeProgress