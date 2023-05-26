import { fabric } from 'fabric';

const addText = (canvas, downTools, cords) => {
    const object = new fabric.Textbox("text", { 
        type: 'text',
        left: cords.posX,
        top: cords.posY,
        fontSize: downTools[5].size,
        fontFamily: downTools[5].curFont === 'TNR' ? 'Times New Roman' : downTools[5].curFont,
        fill: `rgba(${downTools[5].curColor.rgb.r}, ${downTools[5].curColor.rgb.g}, ${downTools[5].curColor.rgb.b}, ${downTools[5].curColor.rgb.a})`,
        textAlign: downTools[5].curPosition
      })
      object.set({ text: downTools[5].curFont === 'TNR' ? 'Times New Roman' : downTools[5].curFont })
      canvas.add(object)
      return object
}

export default addText
