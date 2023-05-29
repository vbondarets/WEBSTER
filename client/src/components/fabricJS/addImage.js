import { fabric } from 'fabric';
import getScale from '../../services/utils/getScale';


const addImage = (previewImg, canvas, height, width, dispatch, setHight, setWidth, setImageProportion, rotate) => {
    const baseImg = new Image();
    baseImg.src = previewImg;

    fabric.Image.fromURL(baseImg.src, function (img) {
        let scale = getScale(img.width, img.height, width, height);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: scale,
            scaleY: scale,
            rotate: rotate
        });
        canvas.setDimensions({
            width: img.width * scale ,
            height: img.height * scale
        });
        canvas.renderAll()
        dispatch(setHight({ height: Math.round(img.height * scale)}));
        dispatch(setWidth({ width: Math.round(img.width * scale)}));
        dispatch(setImageProportion({ proportion: scale }));
    });

}

export default addImage;
