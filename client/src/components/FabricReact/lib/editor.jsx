import { fabric } from "fabric"
import { CIRCLE, RECTANGLE, LINE, TEXT, FILL, STROKE } from "./dafaultShapes"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';

/**
 * Creates editor
 */
const buildEditor = (
  canvas,
  fillColor,
  strokeColor,
  _setFillColor,
  _setStrokeColor,
  scaleStep,
  downTools
) => {
  return {
    canvas,
    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE,
        fill: fillColor,
        stroke: strokeColor
      })
      canvas.add(object)
    },
    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE,
        fill: fillColor,
        stroke: strokeColor
      })
      canvas.add(object)
    },
    addLine: () => {
      const object = new fabric.Line(LINE.points, {
        ...LINE.options,
        stroke: strokeColor
      })
      canvas.add(object)
    },
    addText: (text) => {
      // use stroke in text fill, fill default is most of the time transparent
      // {
      //   type: 'text',
      //   left: 100,
      //   top: 100,
      //   fontSize: 16,
      //   fontFamily: 'Arial',
      //   fill: STROKE
      // }
      // const object = new fabric.Textbox(text, { ...TEXT, fill: strokeColor })
      // downTools[5].curFont
      console.log(downTools[5].curColor)
      // console.log(`rgba(${downTools[5].curColor.rgb.r}, ${downTools[5].curColor.rgb.g}, ${downTools[5].curColor.rgb.b}, ${downTools[5].curColor.rgb.a})`)
      const object = new fabric.Textbox(text, { 
        type: 'text',
        left: 100,
        top: 100,
        fontSize: downTools[5].size,
        fontFamily: downTools[5].curFont === 'TNR' ? 'Times New Roman' : downTools[5].curFont,
        // fill: `rgba(0, 0, 255, 1)`,
        fill: `rgba(${downTools[5].curColor.rgb.r}, ${downTools[5].curColor.rgb.g}, ${downTools[5].curColor.rgb.b}, ${downTools[5].curColor.rgb.a})`,
        textAlign: downTools[5].curPosition
      })
      object.set({ text: text })
      canvas.add(object)
    },
    updateText: text => {
      const objects = canvas.getActiveObjects()
      if (objects.length && objects[0].type === TEXT.type) {
        const textObject = objects[0]
        textObject.set({ text })
        canvas.renderAll()
      }
    },
    updateAlign: (align) => {
      const objects = canvas.getActiveObjects()
      if (objects.length && objects[0].type === TEXT.type) {
        const textObject = objects[0]
        textObject.set({ textAlign: align })
        canvas.renderAll()
      }
    },
    updateFont: (font) => {
      const objects = canvas.getActiveObjects()
      if (objects.length && objects[0].type === TEXT.type) {
        const textObject = objects[0]
        textObject.set({ fontFamily: font })
        canvas.renderAll()
      }
    },
    updateFontSize: (size) => {
      const objects = canvas.getActiveObjects()
      if (objects.length && objects[0].type === TEXT.type) {
        const textObject = objects[0]
        textObject.set({ fontSize: size })
        canvas.renderAll()
      }
    },
    deleteAll: () => {
      canvas.getObjects().forEach(object => canvas.remove(object))
      canvas.discardActiveObject()
      canvas.renderAll()
    },
    deleteSelected: () => {
      canvas.getActiveObjects().forEach(object => canvas.remove(object))
      canvas.discardActiveObject()
      canvas.renderAll()
    },
    fillColor,
    strokeColor,
    setFillColor: fill => {
      
      _setFillColor(fill)
      canvas.getActiveObjects().forEach(object => object.set({ fill }))
      canvas.renderAll()
    },
    setStrokeColor: stroke => {
      _setStrokeColor(stroke)
      canvas.getActiveObjects().forEach(object => {
        if (object.type === TEXT.type) {
          // use stroke in text fill
          object.set({ fill: stroke })
          return
        }
        object.set({ stroke })
      })
      canvas.renderAll()
    },
    zoomIn: () => {
      const zoom = canvas.getZoom()
      canvas.setZoom(zoom / scaleStep)
    },
    zoomOut: () => {
      const zoom = canvas.getZoom()
      canvas.setZoom(zoom * scaleStep)
    }
  }
}

const useFabricJSEditor = (props = {}) => {
  const { downTools } = useSelector((state) => state.toolReducer.states[state.toolReducer.curState]);
  const scaleStep = props.scaleStep || 0.5
  const { defaultFillColor, defaultStrokeColor } = props
  const [canvas, setCanvas] = useState(null)
  const [fillColor, setFillColor] = useState(defaultFillColor || FILL)
  const [strokeColor, setStrokeColor] = useState(defaultStrokeColor || STROKE)
  const [selectedObjects, setSelectedObject] = useState([])
  useEffect(() => {
    const bindEvents = canvas => {
      canvas.on("selection:cleared", () => {
        setSelectedObject([])
      })
      canvas.on("selection:created", e => {
        setSelectedObject(e.selected)
      })
      canvas.on("selection:updated", e => {
        setSelectedObject(e.selected)
      })
    }
    if (canvas) {
      bindEvents(canvas)
    }
  }, [canvas])

  return {
    selectedObjects,
    onReady: canvasReady => {
      console.log("Fabric canvas ready")
      setCanvas(canvasReady)
    },
    editor: canvas
      ? buildEditor(
          canvas,
          fillColor,
          strokeColor,
          setFillColor,
          setStrokeColor,
          scaleStep,
          downTools
        )
      : undefined
  }
}

export { buildEditor, useFabricJSEditor }
