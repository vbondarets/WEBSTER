import React from "react"
import { useEffect, useRef } from "react"
import { fabric } from "fabric"
import { useFabricJSEditor } from "./editor"
import { useSelector } from 'react-redux';

/**
 * Fabric canvas as component
 */
const FabricJSCanvas = ({ className, onReady }) => {
  const { downTools } = useSelector((state) => state.toolReducer.states[state.toolReducer.curState]);
  const canvasEl = useRef(null)
  const canvasElParent = useRef(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current)
    const setCurrentDimensions = () => {
      canvas.setHeight(canvasElParent.current?.clientHeight || 0)
      canvas.setWidth(canvasElParent.current?.clientWidth || 0)
      // console.log(downTools[6].height, downTools[6].width)
      // canvas.setHeight(downTools[6].height)
      // canvas.setWidth(downTools[6].width)
      canvas.renderAll()
    }
    const resizeCanvas = () => {
      setCurrentDimensions()
    }
    setCurrentDimensions()

    window.addEventListener("resize", resizeCanvas, false)

    if (onReady) {
      onReady(canvas)
    }

    return () => {
      canvas.dispose()
      window.removeEventListener("resize", resizeCanvas)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
    <div ref={canvasElParent} className={className} style={{width: '100%', height: '100%'}}>
      {/* {console.log(downTools[6].height, downTools[6].width)} */}
      <canvas ref={canvasEl} />
    </div>
  )
  
}

export { FabricJSCanvas, useFabricJSEditor }
