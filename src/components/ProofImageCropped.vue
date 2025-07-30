<template>
  <v-img
    :src="croppedImage"
    contain
  />
</template>

<script>
import proof_utils from '../utils/proof.js'

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
      this.proofImage.src = proof_utils.getImageFullUrl(this.proofImageFilePath)
      this.proofImage.crossOrigin = 'Anonymous'
    },
    cropImage() {
      const startY = Math.round(this.boundingBox[0] * this.proofImage.height)
      const startX = Math.round(this.boundingBox[1] * this.proofImage.width)
      const endY = Math.round(this.boundingBox[2] * this.proofImage.height)
      const endX = Math.round(this.boundingBox[3] * this.proofImage.width)
      const width = Math.abs(endX - startX)
      const height = Math.abs(endY - startY)
      this.canvas.width = width
      this.canvas.height = height
      this.ctx.drawImage(this.proofImage, Math.min(startX, endX), Math.min(startY, endY), width, height, 0, 0, width, height)
      // Note: we started with 'this.croppedImage = URL.canvas.toDataURL()'
      // but 'createObjectURL' is much more efficient than 'toDataURL'
      // and it allows us to call 'revokeObjectURL'
      this.canvas.toBlob(blob => {
        this.croppedImage = URL.createObjectURL(blob)
        this.$emit('croppedImage', this.croppedImage)
      })
    }
  }
}
</script>
