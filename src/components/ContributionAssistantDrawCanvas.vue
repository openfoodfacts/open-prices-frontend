<template>
  <canvas
    id="canvas"
    ref="canvas"
    style="width: 100%; touch-action: none"
    role="button"
    tabindex="0"
    @mousedown="startDrawing"
    @mousemove="drawContent"
    @mouseup="finishDrawing"
    @touchstart="startDrawing"
    @touchmove="drawContent"
    @touchend="finishDrawing"
  />
</template>

<script>
import constants from "../constants";
import draw_utils from "../utils/draw.js";

export default {
  props: {
    imageSrc: {
      type: String,
      default: null,
    },
    forceFullImageHeight: {
      type: Boolean,
      default: false,
    },
    boundingBoxesFromServer: {
      type: Array,
      default: null,
    },
    preventDrawing: {
      type: Boolean,
      default: false,
    },
    removeMode: {
      type: Boolean,
      default: true,
    },
    mode: {
      type: String,
      default: "Labels",
      examples: ["Labels", "Crop", "Redact"],
    },
  },
  emits: ["extractedLabels", "extracting", "loaded"],
  data() {
    return {
      isDrawing: false,
      startX: 0,
      startY: 0,
      scale: 1,
      boundingBoxes: [],
      image: new Image(),
    };
  },
  watch: {
    boundingBoxesFromServer() {
      if (this.boundingBoxesFromServer.length) {
        this.initCanvas(false);
      }
    },
    imageSrc() {
      this.image.src = this.imageSrc;
      this.image.crossOrigin = "anonymous";
      if (this.image.complete) {
        this.initCanvas();
      } else {
        this.image.onload = () => this.initCanvas();
      }
    },
  },
  mounted() {
    this.image.src = this.imageSrc;
    this.image.crossOrigin = "anonymous";
    if (this.image.complete) {
      this.initCanvas();
    } else {
      this.image.onload = () => this.initCanvas();
    }
  },
  methods: {
    initCanvas(keepBoundingBoxes = false) {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      canvas.style.width = "100%";
      const { scale, cssWidth, cssHeight } = draw_utils.computeCanvasFit({
        containerWidth: canvas.offsetWidth,
        imageWidth: this.image.width,
        imageHeight: this.image.height,
        maxHeight: window.innerHeight - 350,
        forceFullImageHeight: this.forceFullImageHeight,
      });
      this.scale = scale;
      canvas.style.width = cssWidth;
      if (cssHeight) {
        canvas.style.height = cssHeight;
      }

      const newWidth = this.image.width;
      const newHeight = this.image.height;
      canvas.width = newWidth;
      canvas.height = newHeight;

      ctx.drawImage(this.image, 0, 0, newWidth, newHeight);

      if (!keepBoundingBoxes) {
        this.boundingBoxes = []; // reset boundingBoxes
      }
      if (this.boundingBoxesFromServer) {
        this.boundingBoxes = this.boundingBoxes.concat(
          this.boundingBoxesFromServer.map(
            ({ boundingBox, id, status, created_by }) => {
              return {
                startY: boundingBox[0] * this.image.height,
                startX: boundingBox[1] * this.image.width,
                endY: boundingBox[2] * this.image.height,
                endX: boundingBox[3] * this.image.width,
                boundingSource: created_by
                  ? this.$t("ContributionAssistant.ManualBoundingBoxSource")
                  : this.$t("ContributionAssistant.AutomaticBoundingBoxSource"),
                id: id,
                status: status,
              };
            },
          ),
        );
        this.extractLabels();
      }
      // draw previous boundingBoxes after resizing
      this.drawBoundingBoxes();
      // done
      this.$emit("loaded");
    },
    startDrawing(event) {
      if (this.isDrawing || this.preventDrawing) return;
      if (event.type == "touchstart") {
        const rect = event.target.getBoundingClientRect();
        event.offsetX = event.targetTouches[0].clientX - rect.left;
        event.offsetY = event.targetTouches[0].clientY - rect.top;
      }
      if (this.mode === "Crop" && this.boundingBoxes.length) {
        // only one crop area can exist at a time: clear the previous one before drawing a new one
        this.boundingBoxes = [];
        const canvas = this.$refs.canvas;
        canvas
          .getContext("2d")
          .drawImage(this.image, 0, 0, canvas.width, canvas.height);
      }
      this.startX = event.offsetX / this.scale;
      this.startY = event.offsetY / this.scale;
      this.isDrawing = true;
    },
    drawContent(event) {
      if (this.preventDrawing) return;
      if (event.type == "touchmove") {
        const rect = event.target.getBoundingClientRect();
        event.offsetX = event.targetTouches[0].clientX - rect.left;
        event.offsetY = event.targetTouches[0].clientY - rect.top;
      }
      if (this.isDrawing) {
        const canvas = this.$refs.canvas;
        const ctx = canvas.getContext("2d");

        // Redraw image & existing boxes
        ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
        this.drawBoundingBoxes();

        const currentX = event.offsetX / this.scale;
        const currentY = event.offsetY / this.scale;
        const width = currentX - this.startX;
        const height = currentY - this.startY;

        if (this.mode === "Labels") {
          ctx.strokeStyle = "red";
          ctx.strokeRect(this.startX, this.startY, width, height);
        } else if (this.mode === "Redact") {
          draw_utils.drawRedactRect(
            ctx,
            this.startX,
            this.startY,
            width,
            height,
          );
        } else if (this.mode === "Crop") {
          draw_utils.drawCropRect(
            ctx,
            this.startX,
            this.startY,
            width,
            height,
            this.scale,
          );
        }
      }
    },
    finishDrawing(event) {
      if (this.preventDrawing) {
        if (this.removeMode) {
          this.findBoundingBoxAndRemove(event);
        }
        return;
      }
      this.isDrawing = false;
      if (event.type == "touchend") {
        const rect = event.target.getBoundingClientRect();
        event.offsetX = event.changedTouches[0].clientX - rect.left;
        event.offsetY = event.changedTouches[0].clientY - rect.top;
      }
      const endX = event.offsetX / this.scale;
      const endY = event.offsetY / this.scale;
      // ignore bounding boxes that are too small
      if (
        Math.abs(endX - this.startX) > 10 &&
        Math.abs(endY - this.startY) > 10
      ) {
        this.boundingBoxes = this.boundingBoxes.concat({
          startX: this.startX,
          startY: this.startY,
          endX,
          endY,
          boundingSource: this.$t(
            "ContributionAssistant.ManualBoundingBoxSource",
          ),
          status: -1,
        });
      }
      this.extractLabels();
      const lastBoundingBox = this.boundingBoxes[this.boundingBoxes.length - 1];
      if (lastBoundingBox) {
        this.drawSingleBoundingBox(lastBoundingBox);
      }
    },
    drawSingleBoundingBox(rect) {
      const ctx = this.$refs.canvas.getContext("2d");
      ctx.lineWidth = 1 / this.scale;
      const { startX, startY, endX, endY } = rect;
      const width = endX - startX;
      const height = endY - startY;
      // set text & color
      if (this.mode === "Labels") {
        let text = "";
        let color = "red";
        constants.PRICE_TAG_STATUS_LIST.some((statusObj) => {
          if (rect.status === statusObj.key) {
            text = this.$t(statusObj.text);
            color = statusObj.color;
            return true;
          }
        });
        draw_utils.drawLabelRect(
          ctx,
          startX,
          startY,
          width,
          height,
          this.scale,
          color,
          text,
        );
      } else if (this.mode === "Redact") {
        draw_utils.drawRedactRect(ctx, startX, startY, width, height);
      } else if (this.mode === "Crop") {
        draw_utils.drawCropRect(ctx, startX, startY, width, height, this.scale);
      }
    },
    drawBoundingBoxes() {
      const ctx = this.$refs.canvas.getContext("2d");
      ctx.lineWidth = 1 / this.scale;
      this.boundingBoxes.forEach((rect) => {
        this.drawSingleBoundingBox(rect);
      });
    },
    async extractLabels() {
      this.$emit("extracting");
      let extractedLabels = [];
      const originalCanvas = document.createElement("canvas");
      const ctx = originalCanvas.getContext("2d");
      for (let i = 0; i < this.boundingBoxes.length; i++) {
        const rect = this.boundingBoxes[i];
        const { startX, startY, endX, endY, boundingSource } = rect;
        const width = Math.abs(endX - startX);
        const height = Math.abs(endY - startY);

        originalCanvas.width = width;
        originalCanvas.height = height;
        ctx.drawImage(
          this.image,
          Math.min(startX, endX),
          Math.min(startY, endY),
          width,
          height,
          0,
          0,
          width,
          height,
        );

        const y_min = Math.min(startY, endY) / this.image.height;
        const y_max = Math.max(startY, endY) / this.image.height;
        const x_min = Math.min(startX, endX) / this.image.width;
        const x_max = Math.max(startX, endX) / this.image.width;

        extractedLabels[i] = {
          imageSrc: originalCanvas.toDataURL(),
          blob: await new Promise((resolve) =>
            originalCanvas.toBlob(resolve, "image/webp"),
          ),
          boundingSource: boundingSource,
          boundingBox: [y_min, x_min, y_max, x_max],
          redactBoundingBox: [x_min, y_min, x_max, y_max],
          status: rect.status,
          id: rect.id || null,
        };
      }
      this.$emit("extractedLabels", extractedLabels);
    },
    findBoundingBoxAndRemove(event) {
      const xPos = event.offsetX / this.scale;
      const yPos = event.offsetY / this.scale;
      const box = this.boundingBoxes.find((rect) =>
        draw_utils.isPointInRect(xPos, yPos, rect),
      );
      if (box) {
        this.removeBoundingBox(this.boundingBoxes.indexOf(box));
      }
    },
    removeBoundingBox(index) {
      this.boundingBoxes.splice(index, 1);
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(this.image, 0, 0, canvas.width, canvas.height);
      this.drawBoundingBoxes();
      this.extractLabels();
    },
  },
};
</script>
