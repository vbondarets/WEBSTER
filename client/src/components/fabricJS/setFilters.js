import { fabric } from 'fabric';

const setFilters = (canvas, downTools, curFilter, newValue) => {
    if (canvas && downTools) {
        let objects = canvas.getActiveObjects();
        if(objects[0]){
            let image = objects[0];
            image.filters = []
            image.filters.push(new fabric.Image.filters.Brightness({ brightness: curFilter === 'Brightness' && newValue ? (newValue - 100) / 100 : (downTools[2].filters[0].value - 100) / 100}))
            image.filters.push(new fabric.Image.filters.Contrast({ contrast: curFilter === 'Contrast' && newValue ? (newValue - 100) / 100 : (downTools[2].filters[1].value - 100) / 100 }))
            image.filters.push(new fabric.Image.filters.Saturation({ saturation: curFilter === 'Saturation' && newValue ? (newValue - 100) / 100 : (downTools[2].filters[2].value - 100) / 100 }))
            image.applyFilters();
            canvas.renderAll()
        }

    }
}

export default setFilters