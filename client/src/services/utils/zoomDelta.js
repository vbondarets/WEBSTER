import { fabric } from "fabric";

function zoomDelta(canvas, delta, x, y, maxZoom = 15, minZoom = 0.999) {
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    zoom = Math.min(zoom, maxZoom);
    zoom = Math.max(zoom, minZoom);
    const point = {
        x,
        y,
    };
    canvas.zoomToPoint(point, zoom);
}

/**
 * Выравнивание при зуме
 * @param  canvas The canvas to transform
 * @param  object Fabric object aCoords, need tl and br coords, {tl: {x, y}, br: {x, y}}
 */
function enclose(canvas, object) {
    const { br: brRaw, tl: tlRaw } = object;
    const T = canvas.viewportTransform;
    const br = fabric.util.transformPoint(brRaw, T);
    const tl = fabric.util.transformPoint(tlRaw, T);
    const { x: left, y: top } = tl;
    const { x: right, y: bottom } = br;
    const { width, height } = canvas;
    // calculate how far to translate to line up the edge of the object with
    // the edge of the canvas
    const dLeft = Math.abs(right - width);
    const dRight = Math.abs(left);
    const dUp = Math.abs(bottom - height);
    const dDown = Math.abs(top);
    // if the object is larger than the canvas, clamp translation such that
    // we don't push the opposite boundary past the edge
    const maxDx = Math.min(dLeft, dRight);
    const maxDy = Math.min(dUp, dDown);
    const leftIsOver = left < 0;
    const rightIsOver = right > width;
    const topIsOver = top < 0;
    const bottomIsOver = bottom > height;
    const translateLeft = rightIsOver && !leftIsOver;
    const translateRight = leftIsOver && !rightIsOver;
    const translateUp = bottomIsOver && !topIsOver;
    const translateDown = topIsOver && !bottomIsOver;
    const dx = translateLeft ? -maxDx : translateRight ? maxDx : 0;
    const dy = translateUp ? -maxDy : translateDown ? maxDy : 0;
    if (dx || dy) {
        T[4] += dx;
        T[5] += dy;
        canvas.requestRenderAll();
    }
}
export { zoomDelta, enclose };
