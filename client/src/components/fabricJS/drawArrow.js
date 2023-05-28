// import { fabric } from 'fabric';

const drawArrow = (canvas, downTools) => {
    // let arrow, isDown;
    // let fromx, fromy, tox, toy, angle ;
    // const color = `rgba(${downTools[3].curColor.rgb.r}, ${downTools[3].curColor.rgb.g}, ${downTools[3].curColor.rgb.b}, ${downTools[3].curColor.rgb.a})`

    // canvas.on('mouse:down', function (o) {
    //     if (canvas.getActiveObjects().length > 0) {
    //         return
    //     }
    //     isDown = true;
    //     const pointer = canvas.getPointer(o.e);
    //     fromx = pointer.x
    //     fromy = pointer.y
    //     tox = pointer.x
    //     toy = pointer.y
    //     const points = [pointer.x, pointer.y, pointer.x, pointer.y];
    //     // const color = `rgba(${downTools[3].curColor.rgb.r}, ${downTools[3].curColor.rgb.g}, ${downTools[3].curColor.rgb.b}, ${downTools[3].curColor.rgb.a})`

    //     arrow = new fabric.Line(points, {
    //         strokeWidth: downTools[3].size,
    //         fill: color,
    //         stroke: color,
    //         originX: 'center',
    //         originY: 'center'
    //     });
    //     canvas.add(arrow);

    // });

    // canvas.on('mouse:move', function (o) {
    //     if (!isDown) return;
    //     const pointer = canvas.getPointer(o.e);
    //     tox = pointer.x
    //     toy = pointer.y
    //     angle = Math.atan2(toy - fromy, tox - fromx) * (180 / Math.PI) + 90;
    //     console.log(`angle: ${angle > 0 ? angle / 2 : angle}`)
    //     arrow.set({ x2: pointer.x, y2: pointer.y });
    //     canvas.renderAll();
    // });

    // canvas.on('mouse:up', function (o) {
    //     console.log(tox, toy)

    //     const tri = new fabric.Triangle({
    //         top: toy - (10 * downTools[3].size) / 2,
    //         left: tox - (10 * downTools[3].size) / 2,
    //         width: 10 * downTools[3].size,
    //         height: 10 * downTools[3].size,
    //         fill: color,
    //         stroke: color,
    //         angle: angle
    //     });
        
    //         canvas.add(tri);
        

    //     isDown = false;
    // });
    // let fromx, fromy, tox, toy;
    // const color = `rgba(${downTools[3].curColor.rgb.r}, ${downTools[3].curColor.rgb.g}, ${downTools[3].curColor.rgb.b}, ${downTools[3].curColor.rgb.a})`
    // canvas.on('mouse:down', function (event) {
    //     const pointer = canvas.getPointer(event.e);
    //     fromx = pointer.x;
    //     fromy = pointer.y;
    // });
    // canvas.on('mouse:up', function (event) {
    //     const pointer = canvas.getPointer(event.e);
    //     tox = pointer.x;
    //     toy = pointer.y;
    //     //this.drawArrow(startX, startY, endX, endY);

    //     const angle = Math.atan2(toy - fromy, tox - fromx);

    //     const headlen = downTools[3].size * 10;  // arrow head size

    //     // bring the line end back some to account for arrow head.
    //     tox = tox - (headlen) * Math.cos(angle);
    //     toy = toy - (headlen) * Math.sin(angle);

    //     // calculate the points.
    //     const points = [
    //         {
    //             x: fromx,  // start point
    //             y: fromy
    //         }, {
    //             x: fromx - (headlen / 4) * Math.cos(angle - Math.PI / 2),
    //             y: fromy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
    //         }, {
    //             x: tox - (headlen / 4) * Math.cos(angle - Math.PI / 2),
    //             y: toy - (headlen / 4) * Math.sin(angle - Math.PI / 2)
    //         }, {
    //             x: tox - (headlen) * Math.cos(angle - Math.PI / 2),
    //             y: toy - (headlen) * Math.sin(angle - Math.PI / 2)
    //         }, {
    //             x: tox + (headlen) * Math.cos(angle),  // tip
    //             y: toy + (headlen) * Math.sin(angle)
    //         }, {
    //             x: tox - (headlen) * Math.cos(angle + Math.PI / 2),
    //             y: toy - (headlen) * Math.sin(angle + Math.PI / 2)
    //         }, {
    //             x: tox - (headlen / 4) * Math.cos(angle + Math.PI / 2),
    //             y: toy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
    //         }, {
    //             x: fromx - (headlen / 4) * Math.cos(angle + Math.PI / 2),
    //             y: fromy - (headlen / 4) * Math.sin(angle + Math.PI / 2)
    //         }, {
    //             x: fromx,
    //             y: fromy
    //         }
    //     ];

    //     const pline = new fabric.Polyline(points, {
    //         fill: color, //'white',
    //         stroke: color, //'black',
    //         // opacity: 1,
    //         strokeWidth: downTools[3].size,
    //         originX: 'left',
    //         originY: 'top',
    //         selectable: true
    //     });

    //     canvas.add(pline);

    //     canvas.isDown = false;
    //     canvas.off('mouse:down').off('mouse:move').off('mouse:up')

    //     canvas.renderAll();
    // });
}

export default drawArrow