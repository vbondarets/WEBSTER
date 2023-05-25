import React from "react"
import { useEffect, useRef } from "react"
import { fabric } from "fabric"
import { useFabricJSEditor } from "./editor"
// import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setCanvas, setHight, setWidth } from "../../../store/reducers/ToolSlice";

/**
 * Fabric canvas as component
 */
const FabricJSCanvas = ({ className, onReady }) => {
  // const { downTools, previewImg } = useSelector((state) => state.toolReducer.states[state.toolReducer.curState]);
  const dispatch = useDispatch();
  const canvasEl = useRef(null)
  const canvasElParent = useRef(null)

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current);

    // let context = canvas.getContext("2d");
    // let img = new Image();
    // img.onload = function () {
    //   context.filter = `${downTools[2].filters[0].name} (${downTools[2].filters[0].value}%) 
    //         ${downTools[2].filters[1].name} (${downTools[2].filters[1].value}%) 
    //         ${downTools[2].filters[2].name} (${downTools[2].filters[2].value}%)
    //         ${downTools[2].filters[3].name} (${downTools[2].filters[3].value}%)
    //         ${downTools[2].filters[4].name} (${downTools[2].filters[4].value}px)
    //         ${downTools[2].filters[5].name} (${downTools[2].filters[5].value}%)
    //         ${downTools[2].filters[6].name} (${downTools[2].filters[6].value}%)
    //         ${downTools[2].filters[7].name} (${downTools[2].filters[7].value}deg)`;
    //   context.drawImage(this, 0, 0, downTools[6].width, downTools[6].height);
    //   context.filter = "none"; // reset filter
    // };
    // img.src = previewImg;
    const setCurrentDimensions = () => {
      canvas.setHeight(canvasElParent.current?.clientHeight || 0)
      canvas.setWidth(canvasElParent.current?.clientWidth || 0)
      dispatch(setHight({ height: canvasElParent.current?.clientHeight }));
      dispatch(setWidth({ width: canvasElParent.current?.clientWidth }));
      // console.log(downTools[6].height, downTools[6].width)
      // canvas.setHeight(downTools[6].height)
      // canvas.setWidth(downTools[6].width)
      dispatch(setCanvas({ canvas: canvasEl.current }));
      canvas.renderAll()
    }
    const resizeCanvas = () => {
      setCurrentDimensions()
    }
    setCurrentDimensions()

    window.addEventListener("resize", resizeCanvas, false)

    if (onReady) {
      onReady(canvas)
      // console.log(canvasEl.current);
      // dispatch(setCanvas({canvas: canvasEl.current}));
    }

    return () => {
      canvas.dispose()
      window.removeEventListener("resize", resizeCanvas)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={canvasElParent} className={className} style={{ width: '100%', height: '100%' }}>
      {/* {console.log(downTools[6].height, downTools[6].width)} */}
      <canvas ref={canvasEl} />
    </div>
  )

}

export { FabricJSCanvas, useFabricJSEditor }
