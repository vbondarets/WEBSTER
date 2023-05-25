// import { useSelector } from 'react-redux';
import { fabric } from 'fabric';


const addImage = (downTools, previewImg, canvas, height, width) => {
    // const { downTools, previewImg, canvas} = useSelector(
    //     (state) => state.toolReducer.states[state.toolReducer.curState]
    // );
    const baseImg = new Image();
    baseImg.src = previewImg;

    fabric.Image.fromURL(previewImg, function (img) {
        // uncomment the 2 lines below and you'll get an error
        // console.log(downTools[2])
        // img.filters.push(new fabric.Image.filters.Brightness({brightness: (downTools[2].filters[0].value - 100) / 100 }));
        // img.filters.push(new fabric.Image.filters.Contrast({contrast:(downTools[2].filters[1].value - 100) / 100}));
        // img.filters.push(new fabric.Image.filters.Saturation({saturation:(downTools[2].filters[2].value - 100) / 100}));
        // // img.filters.push(new fabric.Image.filters.Grayscale(downTools[3]));
        // img.filters.push(new fabric.Image.filters.Blur({blur:downTools[3].filters[4].value}));
        // // img.filters.push(new fabric.Image.filters.Sepia(downTools[5]));
        // // img.filters.push(new fabric.Image.filters.Invert(downTools[6]));
        // img.filters.push(new fabric.Image.filters.HueRotation({rotation: downTools[3].filters[7].value}));
        // img.applyFilters();
        // img.scale( baseImg.width > width || baseImg.height > height ? ((width / baseImg.width > height / baseImg.height) ? height / baseImg.height : width / baseImg.width) : 1);
        // canvas.add(img).renderAll();
        // console.log(canvas.getActiveObjects());
        let rHeight = 1;
        let rWidth = 1;
        let rFinal = 1;
        if (baseImg.width > width || baseImg.height > height) {
            rHeight = height / baseImg.height;
            rWidth = width / baseImg.width;
            rFinal = rWidth > rHeight ? rHeight : rWidth;
        }


        console.log(`canvas heigth: ${height}, width: ${width}\n image heigth: ${baseImg.height}, width: ${baseImg.width}`)
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            scaleX: rFinal,
            scaleY: rFinal,
            // scaleX: (baseImg.width > width || baseImg.height > height) && (baseImg.height > baseImg.width ? height / baseImg.height : width / baseImg.width),
            // scaleY: (baseImg.width > width || baseImg.height > height) && (baseImg.height > baseImg.width ? height / baseImg.height : width / baseImg.width ),
            // left: baseImg.width * rFinal < width ? width / 2 - baseImg.width * rFinal / 2 : 0,
            // top: baseImg.height * rFinal < height ? height / 2 - baseImg.height * rFinal / 2 : 0,
        });
        canvas.setDimensions({
            width: baseImg.width * rFinal ,
            height: baseImg.height * rFinal
        });
        canvas.renderAll()
    });

}

export default addImage;
// module.exports = AddImage