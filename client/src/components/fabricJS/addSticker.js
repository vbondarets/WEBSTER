import { fabric } from 'fabric';
import getScale from '../../services/utils/getScale';

const addSticker = (canvas, imageUrl, proportion) => {
    const baseImg = new Image();
    baseImg.src = imageUrl;

    const canvasWidth = canvas.getWidth();
    const canvasHeight = canvas.getHeight();

    fabric.Image.fromURL(imageUrl, function (myImg) {
        let scale = getScale(baseImg.width, baseImg.height, canvasWidth, canvasHeight, proportion) * 0.7;

        const img = myImg.set({ 
            scaleX: scale,
            scaleY: scale,
            left: (baseImg.width * scale) < canvasWidth ? canvasWidth / 2 - (baseImg.width * scale) / 2 : 0, 
            top: (baseImg.height * scale) < canvasHeight ? canvasHeight / 2 - (baseImg.height * scale) / 2 : 0, 
            // width: baseImg.width * proportion, 
            // height: baseImg.height * proportion 
        });
        canvas.add(img);
        canvas.setActiveObject(img);
    });
}

export default addSticker