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
        if (this.boundingBoxesFromServer) {
          this.initCanvas(true)
        }
      }
    },
    mounted() {
      if (this.image.complete) {
        this.initCanvas()
      } else {
        this.image.onload = this.initCanvas
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
          this.boundingBoxes = this.boundingBoxes.concat(this.boundingBoxesFromServer.map(boundingBox => {
            return {
              startY: boundingBox[0] * this.image.height,
              startX: boundingBox[1] * this.image.width,
              endY: boundingBox[2] * this.image.height,
              endX: boundingBox[3] * this.image.width,
              boundingSource: this.$t('ContributionAssistant.AutomaticBoundingBoxSource')
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
        this.isDrawing = true;
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
          this.drawBoundingBoxes(); // Redraw previous boundingBoxes
          
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
        this.boundingBoxes.push({ startX: this.startX, startY: this.startY, endX, endY, boundingSource: this.$t('ContributionAssistant.ManualBoundingBoxSource') })
        this.extractLabels()
      },
      drawBoundingBoxes() {
        const ctx = this.$refs.canvas.getContext("2d")
        ctx.strokeStyle = "red"
        this.boundingBoxes.forEach(rect => {
          const { startX, startY, endX, endY } = rect
          const width = endX - startX
          const height = endY - startY
          ctx.strokeRect(startX * this.scale, startY * this.scale, width * this.scale, height * this.scale)
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
          
          extractedLabels[i] = {
            imageSrc: originalCanvas.toDataURL(),
            blob: await new Promise(resolve => originalCanvas.toBlob(resolve, 'image/webp')),
            boundingSource: boundingSource
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
