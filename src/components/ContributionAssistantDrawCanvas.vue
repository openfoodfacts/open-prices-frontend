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
      }
    },
    emits: ['croppedImages'],
    data() {
      return {
        isDrawing: false,
        startX: 0,
        startY: 0,
        scale: 1,
        rectangles: []
      }
    },
    watch: {
      image(newImage) {
        newImage.onload = this.init
      }
    },
    methods: {
      init() {
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext("2d")
        canvas.style.width = "100%"
        this.scale = canvas.offsetWidth / this.image.width
        const preferedHeight = 400

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
        
        this.rectangles = [] // reset rectangles
        this.drawRectangles(); // Draw previous rectangles after resizing
      },
      startDrawing(event) {
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
          this.drawRectangles(); // Redraw previous rectangles
          
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
        this.rectangles.push({ startX: this.startX, startY: this.startY, endX, endY })
        this.cropImages()
      },
      drawRectangles() {
        const ctx = this.$refs.canvas.getContext("2d")
        ctx.strokeStyle = "red"
        this.rectangles.forEach(rect => {
          const { startX, startY, endX, endY } = rect
          const width = endX - startX
          const height = endY - startY
          ctx.strokeRect(startX * this.scale, startY * this.scale, width * this.scale, height * this.scale)
        });
      },
      async cropImages() {
        let croppedImages = []
        let croppedBlobs = []
        const originalCanvas = document.createElement("canvas")
        const ctx = originalCanvas.getContext("2d")
        for (let i = 0; i < this.rectangles.length; i++) {
          const rect = this.rectangles[i]
          const { startX, startY, endX, endY } = rect
          const width = Math.abs(endX - startX)
          const height = Math.abs(endY - startY)
          
          originalCanvas.width = width
          originalCanvas.height = height
          ctx.drawImage(this.image, Math.min(startX, endX), Math.min(startY, endY), width, height, 0, 0, width, height)
          
          croppedImages[i] = originalCanvas.toDataURL()
          croppedBlobs[i] = await new Promise(resolve => originalCanvas.toBlob(resolve, 'image/webp'))
        }
        this.$emit('croppedImages', [croppedImages, croppedBlobs])
      },
      removeRectangle(index) {
        this.rectangles.splice(index, 1)
          const canvas = this.$refs.canvas
          const ctx = canvas.getContext("2d")
          
          ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height)
          this.drawRectangles()
          this.cropImages()
      }
    }
  }
</script>
