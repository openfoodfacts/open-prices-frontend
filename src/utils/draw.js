// Fills a rect with solid black, hiding whatever is underneath.
function drawRedactRect(ctx, x, y, width, height) {
  ctx.fillStyle = "black";
  ctx.fillRect(x, y, width, height);
}

// Draws a dashed blue outline marking the area to keep.
function drawCropRect(ctx, x, y, width, height, scale) {
  ctx.strokeStyle = "#2196F3";
  ctx.lineWidth = 2 / scale;
  ctx.setLineDash([6 / scale, 4 / scale]);
  ctx.strokeRect(x, y, width, height);
  ctx.setLineDash([]);
}

/**
 * Draws a status-colored rect with a small text chip above its top-left corner.
 * Color/text lookup (i18n, status constants) stays with the caller.
 */
function drawLabelRect(ctx, x, y, width, height, scale, color, text) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.strokeRect(x, y, width, height);
  ctx.font = `bold ${8 / scale}px sans-serif `;
  const textWidth = ctx.measureText(text).width + 4;
  const left = Math.min(x, x + width);
  const top = Math.min(y, y + height);
  const chipHeight = 8 / scale;
  ctx.strokeRect(left, top - chipHeight, textWidth, chipHeight);
  ctx.fillRect(left, top - chipHeight, textWidth, chipHeight);
  ctx.fillStyle = "white";
  ctx.fillText(text, left + 3, top - 3);
}

/**
 * Computes the scale and CSS size needed to fit an image in a canvas container,
 * capping the height to maxHeight (unless forceFullImageHeight) instead of letting
 * a tall image overflow.
 */
function computeCanvasFit({
  containerWidth,
  imageWidth,
  imageHeight,
  maxHeight,
  forceFullImageHeight,
}) {
  let scale = containerWidth / imageWidth;
  let cssWidth = "100%";
  let cssHeight = null;
  if (!forceFullImageHeight && maxHeight < imageHeight) {
    const aspectRatio = imageHeight / imageWidth;
    const heightFor100PercentWidth = containerWidth * aspectRatio;
    const idealHeight = Math.min(maxHeight, heightFor100PercentWidth);
    cssWidth = "auto";
    scale = idealHeight / imageHeight;
    cssHeight = idealHeight + "px";
  }
  return { scale, cssWidth, cssHeight };
}

/**
 * Whether point (x, y) falls within rect's bounds, regardless of drag direction
 * (rect.startX/endX and startY/endY may be in either order).
 */
function isPointInRect(x, y, rect) {
  const x_min = Math.min(rect.startX, rect.endX);
  const y_min = Math.min(rect.startY, rect.endY);
  const x_max = Math.max(rect.startX, rect.endX);
  const y_max = Math.max(rect.startY, rect.endY);
  return x_min <= x && x <= x_max && y_min <= y && y <= y_max;
}

export default {
  drawRedactRect,
  drawCropRect,
  drawLabelRect,
  computeCanvasFit,
  isPointInRect,
};
