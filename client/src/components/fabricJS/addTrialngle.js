import { fabric } from 'fabric';

const addTrialngle = (canvas, downTools, pointer) => {
    const color = `rgba(${downTools[3].curColor.rgb.r}, ${downTools[3].curColor.rgb.g}, ${downTools[3].curColor.rgb.b}, ${downTools[3].curColor.rgb.a})`

    if (canvas.getActiveObjects().length > 0) {
        return
    }

    const triangle = new fabric.Triangle({
        top: pointer.y - (10 * downTools[3].size) / 2,
        left: pointer.x - (10 * downTools[3].size) / 2,
        width: 10 * downTools[3].size,
        height: 10 * downTools[3].size,
        fill: color,
        stroke: color,
    });
    canvas.add(triangle);
    return triangle

}

export default addTrialngle