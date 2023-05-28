import { fabric } from "fabric";

const drawLine = (canvas, downTools) => {
    let line, isDown;
    canvas.on('mouse:down', function (o) {
        if (canvas.getActiveObjects().length > 0) {
            return
        }
        isDown = true;
        const pointer = canvas.getPointer(o.e);
        const points = [pointer.x, pointer.y, pointer.x, pointer.y];
        const color = `rgba(${downTools[3].curColor.rgb.r}, ${downTools[3].curColor.rgb.g}, ${downTools[3].curColor.rgb.b}, ${downTools[3].curColor.rgb.a})`

        line = new fabric.Line(points, {
            strokeWidth: downTools[3].size,
            fill: color,
            stroke: color,
            originX: 'center',
            originY: 'center'
        });
        canvas.add(line);

    });

    canvas.on('mouse:move', function (o) {
        if (!isDown) return;
        const pointer = canvas.getPointer(o.e);
        line.set({ x2: pointer.x, y2: pointer.y });
        canvas.renderAll();
    });

    canvas.on('mouse:up', function (o) {
        isDown = false;
    });
}

export default drawLine