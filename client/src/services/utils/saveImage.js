const saveImage = (previewImg, downTools) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        ctx.filter = `${downTools[2].filters[0].name}(${downTools[2].filters[0].value}%) 
            ${downTools[2].filters[1].name}(${downTools[2].filters[1].value}%) 
            ${downTools[2].filters[2].name}(${downTools[2].filters[2].value}%)
            ${downTools[2].filters[3].name}(${downTools[2].filters[3].value}%)
            ${downTools[2].filters[4].name}(${downTools[2].filters[4].value}px)
            ${downTools[2].filters[5].name}(${downTools[2].filters[5].value}%)
            ${downTools[2].filters[6].name}(${downTools[2].filters[6].value}%)
            ${downTools[2].filters[7].name}(${downTools[2].filters[7].value}deg)`;
        ctx.translate(canvas.width / 2, canvas.height / 2);
        if (downTools[4].value !== 0) {
            ctx.rotate((downTools[4].value * Math.PI) / 180);
        }
        // ctx.scale(flipHorizontal, flipVertical);
        ctx.drawImage(
            image,
            -canvas.width / 2,
            -canvas.height / 2,
            canvas.width,
            canvas.height
        );

        const link = document.createElement("a");
        link.download = "image.jpg";
        link.href = canvas.toDataURL();
        link.click();
    };

    image.src = previewImg;
};
export default saveImage;