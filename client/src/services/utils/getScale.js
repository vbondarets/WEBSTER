
const getScale = (imgWidth, imgHeight, canvasWidth, canvasHeight, proportion=1) => {
    let rHeight = 1;
    let rWidth = 1;
    let rFinal = 1;
    if ((imgWidth * proportion) > canvasWidth || (imgHeight * proportion) > canvasHeight) {
        rHeight = canvasHeight / (imgHeight * proportion);
        rWidth = canvasWidth / (imgWidth * proportion);
        rFinal = rWidth > rHeight ? rHeight : rWidth;
    }
    return rFinal;
}

export default getScale