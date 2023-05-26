import { fabric } from 'fabric';

const resizeCanvas = (previewImg, canvas, height, width) => {
    const baseImg = new Image();
    baseImg.src = previewImg;
    canvas.setDimensions({
        width: width,
        height: height
    });
    fabric.Image.fromURL(previewImg, function (img) {
        // let rHeight = 1;
        // let rWidth = 1;
        // let rFinal = 1;
        // if (baseImg.width > width || baseImg.height > height) {
        //     rHeight = height / baseImg.height;
        //     rWidth = width / baseImg.width;
        //     rFinal = rWidth > rHeight ? rHeight : rWidth;
        // }
        // console.log(`canvas heigth: ${height}, width: ${width}\n image heigth: ${baseImg.height}, width: ${baseImg.width}`)
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: width/baseImg.width ,
            scaleY: height / baseImg.height,
        });
        canvas.renderAll()
    });

}

export default resizeCanvas;
