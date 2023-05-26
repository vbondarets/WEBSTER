import { fabric } from 'fabric';


const addImage = (previewImg, canvas, height, width, dispatch, setHight, setWidth) => {
    const baseImg = new Image();
    baseImg.src = previewImg;

    fabric.Image.fromURL(previewImg, function (img) {
        let rHeight = 1;
        let rWidth = 1;
        let rFinal = 1;
        if (baseImg.width > width || baseImg.height > height) {
            rHeight = height / baseImg.height;
            rWidth = width / baseImg.width;
            rFinal = rWidth > rHeight ? rHeight : rWidth;
        }
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: rFinal,
            scaleY: rFinal,
        });
        canvas.setDimensions({
            width: baseImg.width * rFinal ,
            height: baseImg.height * rFinal
        });
        canvas.renderAll()
        dispatch(setHight({ height: baseImg.height * rFinal }));
        dispatch(setWidth({ width: baseImg.width * rFinal }));
        console.log(`canvas heigth: ${height}, width: ${width}\n image heigth: ${baseImg.height}, width: ${baseImg.width}, new image heigth: ${ baseImg.height * rFinal}, width: ${baseImg.width * rFinal}`)
    });

}

export default addImage;
