function drawRedactRect(ctx, x, y, width, height) {
  ctx.fillStyle = "black"
  ctx.fillRect(x, y, width, height)
}

function drawCropRect(ctx, x, y, width, height, scale) {
  ctx.strokeStyle = "#2196F3"
  ctx.lineWidth = 2 / scale
  ctx.setLineDash([6 / scale, 4 / scale])
  ctx.strokeRect(x, y, width, height)
  ctx.setLineDash([])
}

export default {
  drawRedactRect,
  drawCropRect,
}
