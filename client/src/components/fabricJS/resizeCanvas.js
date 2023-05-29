import { fabric } from 'fabric';

const resizeCanvas = (previewImg, canvas, height, width, downTools) => {
    const baseImg = new Image();
    baseImg.src = previewImg;
    canvas.setDimensions({
        width: width,
        height: height
    });
    fabric.Image.fromURL(previewImg, function (img) {
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: width / baseImg.width,
            scaleY: height / baseImg.height,
        });
        canvas.renderAll()
    });
}

export default resizeCanvas;
