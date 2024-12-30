<template>
  <v-img
    :src="croppedImage"
    contain
  />
</template>

<script>
export default {
  props: {
    proofImageFilePath: {
      type: String,
      default: ''
    },
    boundingBox: {
      type: Array,
      default: () => []
    }
  },
  emits: ['croppedImage'],
  data() {
    return {
      canvas: null,
      ctx: null,
      proofImage: null,
      croppedImage: null
    }
  },
  watch: {
    proofImageFilePath() {
      this.getImage()
    },
    boundingBox() {
      this.cropImage()
    }
  },
  mounted() {
    this.getImage()
  },
  methods: {
    getImage() {
      this.canvas = document.createElement('canvas')
      this.ctx = this.canvas.getContext('2d')
      this.proofImage = new Image()
      this.proofImage.onload = this.cropImage
      this.proofImage.src = `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${this.proofImageFilePath}`
      this.proofImage.crossOrigin = 'Anonymous'
    },
    cropImage() {
      const startY = this.boundingBox[0] * this.proofImage.height
      const startX = this.boundingBox[1] * this.proofImage.width
      const endY = this.boundingBox[2] * this.proofImage.height
      const endX = this.boundingBox[3] * this.proofImage.width
      const width = Math.abs(endX - startX)
      const height = Math.abs(endY - startY)
      this.canvas.width = width
      this.canvas.height = height
      this.ctx.drawImage(this.proofImage, Math.min(startX, endX), Math.min(startY, endY), width, height, 0, 0, width, height)
      this.croppedImage = this.canvas.toDataURL()
      this.$emit('croppedImage', this.croppedImage)
    }
  }
}
</script>
