import { fabric } from 'fabric';

const addCircle = (canvas, downTools, pointer) => {
    const color = `rgba(${downTools[3].curColor.rgb.r}, ${downTools[3].curColor.rgb.g}, ${downTools[3].curColor.rgb.b}, ${downTools[3].curColor.rgb.a})`

    if (canvas.getActiveObjects().length > 0) {
        return
    }
    const circle = new fabric.Circle({
        top: pointer.y - (5 * downTools[3].size),
        left: pointer.x - (5 * downTools[3].size),
        radius: 10 * downTools[3].size,
        fill: color,
        stroke: color,
    });

    canvas.add(circle);
    return circle
}

export default addCircle