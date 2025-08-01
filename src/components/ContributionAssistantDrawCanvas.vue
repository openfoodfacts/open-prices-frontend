<template>
  <canvas
    id="canvas"
    ref="canvas"
    style="width: 100%; touch-action: none;"
    @mousedown="startDrawing"
    @mousemove="drawContent"
    @mouseup="finishDrawing"
    @touchstart="startDrawing"
    @touchmove="drawContent"
    @touchend="finishDrawing"
  />
</template>

<script>
  import constants from '../constants'
  export default {
    props: {
      image: {
        type: Image,
        default: null
      },
      boundingBoxesFromServer: {
        type: Array,
        default: null
      }
    },
    emits: ['extractedLabels', 'loaded'],
    data() {
      return {
        isDrawing: false,
        startX: 0,
        startY: 0,
        scale: 1,
        boundingBoxes: []
      }
    },
    watch: {
      boundingBoxesFromServer() {
        if (this.boundingBoxesFromServer.length) {
          this.initCanvas(false)
        }
      }
    },
    mounted() {
      if (this.image.complete) {
        this.initCanvas()
      } else {
        this.image.onload = () => this.initCanvas()
      }
    },
    methods: {
      initCanvas(keepBoundingBoxes=false) {
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext("2d")
        canvas.style.width = "100%"
        this.scale = canvas.offsetWidth / this.image.width
        const preferedHeight = window.innerHeight - 250

        if (preferedHeight < this.image.height * this.scale) {
          // Image will be too tall
          // Ajust to fit preferedHeight
          canvas.style.width = "auto"
          this.scale = preferedHeight / this.image.height
        }
        
        const newWidth = this.image.width * this.scale
        const newHeight = this.image.height * this.scale
        canvas.width = newWidth
        canvas.height = newHeight
        
        ctx.drawImage(this.image, 0, 0, newWidth, newHeight)
        
        if (!keepBoundingBoxes) {
          this.boundingBoxes = [] // reset boundingBoxes
        }
        if (this.boundingBoxesFromServer) {
          this.boundingBoxes = this.boundingBoxes.concat(this.boundingBoxesFromServer.map(({boundingBox, id, status}) => {
            return {
              startY: boundingBox[0] * this.image.height,
              startX: boundingBox[1] * this.image.width,
              endY: boundingBox[2] * this.image.height,
              endX: boundingBox[3] * this.image.width,
              boundingSource: this.$t('ContributionAssistant.AutomaticBoundingBoxSource'),
              id: id,
              status: status
            }
          }))
          this.extractLabels()
        }
        this.drawBoundingBoxes(); // Draw previous boundingBoxes after resizing
        this.$emit('loaded')
      },
      startDrawing(event) {
        if (this.isDrawing) return
        if (event.type == "touchstart") {
          const rect = event.target.getBoundingClientRect()
          event.offsetX = event.targetTouches[0].clientX - rect.left 
          event.offsetY = event.targetTouches[0].clientY - rect.top 
        }
        this.startX = event.offsetX / this.scale
        this.startY = event.offsetY / this.scale
        this.isDrawing = true
      },
      drawContent(event) {
        if (event.type == "touchmove") {
          const rect = event.target.getBoundingClientRect()
          event.offsetX = event.targetTouches[0].clientX - rect.left 
          event.offsetY = event.targetTouches[0].clientY - rect.top 
        }
        if (this.isDrawing) {
          const canvas = this.$refs.canvas
          const ctx = canvas.getContext("2d")
          
          ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height); // Redraw image
          this.drawBoundingBoxes() // Redraw previous boundingBoxes
          
          const currentX = event.offsetX / this.scale
          const currentY = event.offsetY / this.scale
          const width = currentX - this.startX
          const height = currentY - this.startY
          
          ctx.strokeStyle = "red"
          ctx.strokeRect(this.startX * this.scale, this.startY * this.scale, width * this.scale, height * this.scale)
        }
      },
      finishDrawing(event) {
        this.isDrawing = false
        if (event.type == "touchend") {
          const rect = event.target.getBoundingClientRect()
          event.offsetX = event.changedTouches[0].clientX - rect.left 
          event.offsetY = event.changedTouches[0].clientY - rect.top 
        }
        const endX = event.offsetX / this.scale
        const endY = event.offsetY / this.scale
        // ignore bounding boxes that are too small
        if (Math.abs(endX - this.startX) > 10 && Math.abs(endY - this.startY) > 10) {
          this.boundingBoxes.push({ startX: this.startX, startY: this.startY, endX, endY, boundingSource: this.$t('ContributionAssistant.ManualBoundingBoxSource') })
        }
        this.extractLabels()
        this.drawBoundingBoxes()
      },
      drawBoundingBoxes() {
        const ctx = this.$refs.canvas.getContext("2d")
        this.boundingBoxes.forEach(rect => {
          const { startX, startY, endX, endY } = rect
          const width = endX - startX
          const height = endY - startY
          let text = ""
          switch (rect.status) {
            case constants.PRICE_TAG_STATUS_WITH_PRICE:
              ctx.strokeStyle = "green"
              ctx.fillStyle = "green"
              text = this.$t('ContributionAssistant.PriceTagLabels.PriceTagWithPrice')
              break
            case constants.PRICE_TAG_STATUS_UNREADABLE:
              ctx.strokeStyle = "orange"
              ctx.fillStyle = "orange"
              text = this.$t('ContributionAssistant.PriceTagLabels.PriceTagUnreadable')
              break
            case constants.PRICE_TAG_STATUS_TRUNCATED:
              ctx.strokeStyle = "#883c1e"  // dark brown
              ctx.fillStyle = "#883c1e"
              text = this.$t('ContributionAssistant.PriceTagLabels.PriceTagTruncated')
              break
            case constants.PRICE_TAG_STATUS_NOT_A_PRICE:
              ctx.strokeStyle = "#88631e"  // light brown
              ctx.fillStyle = "#88631e"
              text = this.$t('ContributionAssistant.PriceTagLabels.PriceTagNotAPrice')
              break
            case constants.PRICE_TAG_STATUS_NO_BARCODE:
              ctx.strokeStyle = "yellow"
              ctx.fillStyle = "yellow"
              text = this.$t('ContributionAssistant.PriceTagLabels.PriceTagNoBarcode')
              break
            case constants.PRICE_TAG_STATUS_OTHER:
              ctx.strokeStyle = "gray"
              ctx.fillStyle = "gray"
              text = this.$t('ContributionAssistant.PriceTagLabels.PriceTagOther')
              break
            default:
              if (rect.id) {  // status == null
                ctx.strokeStyle = "blue"
                ctx.fillStyle = "blue"
                text = this.$t('ContributionAssistant.PriceTagLabels.PriceTagWithoutPrice')
              } else {
                ctx.strokeStyle = "red"
                ctx.fillStyle = "red"
                text = this.$t('ContributionAssistant.PriceTagLabels.NewPriceTag')
              }
          }
          ctx.strokeRect(startX * this.scale, startY * this.scale, width * this.scale, height * this.scale)
          const textWidth = ctx.measureText(text).width + 4
          ctx.strokeRect(Math.min(startX, endX) * this.scale, Math.min(startY, endY) * this.scale - 10, textWidth, 10)
          ctx.fillRect(Math.min(startX, endX) * this.scale, Math.min(startY, endY) * this.scale - 10, textWidth, 10)
          ctx.fillStyle = "white"
          ctx.fillText(text, Math.min(startX, endX) * this.scale + 2, Math.min(startY, endY) * this.scale - 2)
        });
      },
      async extractLabels() {
        let extractedLabels = []
        const originalCanvas = document.createElement("canvas")
        const ctx = originalCanvas.getContext("2d")
        for (let i = 0; i < this.boundingBoxes.length; i++) {
          const rect = this.boundingBoxes[i]
          const { startX, startY, endX, endY, boundingSource } = rect
          const width = Math.abs(endX - startX)
          const height = Math.abs(endY - startY)
          
          originalCanvas.width = width
          originalCanvas.height = height
          ctx.drawImage(this.image, Math.min(startX, endX), Math.min(startY, endY), width, height, 0, 0, width, height)

          const y_min = Math.min(startY, endY) / this.image.height
          const y_max = Math.max(startY, endY) / this.image.height
          const x_min = Math.min(startX, endX) / this.image.width
          const x_max = Math.max(startX, endX) / this.image.width
          
          extractedLabels[i] = {
            imageSrc: originalCanvas.toDataURL(),
            blob: await new Promise(resolve => originalCanvas.toBlob(resolve, 'image/webp')),
            boundingSource: boundingSource,
            boundingBox: [y_min, x_min, y_max, x_max],
            status: rect.status,
            id: rect.id || null
          }
        }
        this.$emit('extractedLabels', extractedLabels)
      },
      removeBoundingBox(index) {
        this.boundingBoxes.splice(index, 1)
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext("2d")
        
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height)
        this.drawBoundingBoxes()
        this.extractLabels()
      }
    }
  }
</script>
