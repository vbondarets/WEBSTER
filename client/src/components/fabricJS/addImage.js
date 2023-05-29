import { fabric } from 'fabric';
import getScale from '../../services/utils/getScale';


const addImage = (previewImg, canvas, height, width, dispatch, setHight, setWidth, setImageProportion) => {
    const baseImg = new Image();
    baseImg.src = previewImg;

    fabric.Image.fromURL(previewImg, function (img) {
        let scale = getScale(baseImg.width, baseImg.height, width, height);
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: scale,
            scaleY: scale,
        });
        canvas.setDimensions({
            width: baseImg.width * scale ,
            height: baseImg.height * scale
        });
        canvas.renderAll()
        dispatch(setHight({ height: baseImg.height * scale }));
        dispatch(setWidth({ width: baseImg.width * scale }));
        dispatch(setImageProportion({ proportion: scale }));
        //console.log(`canvas heigth: ${height}, width: ${width}\n image heigth: ${baseImg.height}, width: ${baseImg.width}, new image heigth: ${ baseImg.height * scale}, width: ${baseImg.width * scale}`)
    });

}

export default addImage;
