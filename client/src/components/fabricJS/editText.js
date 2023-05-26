import { fabric } from 'fabric';
const editText = (text, canvas) => {
    const objects = canvas.getActiveObjects()
    if (objects.length && objects[0].type === 'text') {
      const textObject = objects[0]
      textObject.set({ text })
      canvas.renderAll()
    }
}

export default editText