import { fabric } from 'fabric';
import { useSelector } from 'react-redux';

const useAddText = (canvas, cords) => {
    const { downTools } = useSelector(
        (state) => state.toolReducer.states[state.toolReducer.curState]
    );
    
    const func  = (canvas, cords) => {
        console.log("abiba")
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
    return func
}

export default useAddText
