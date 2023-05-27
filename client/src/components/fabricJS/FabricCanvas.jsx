import React, { useCallback, useEffect, useRef } from "react";
import { fabric } from "fabric";
import {
    setCanvas,
    setCanvasElenment,
    setHight,
    setMaxHight,
    setMaxWidth,
    setWidth,
    setImageProportion
} from "../../store/reducers/ToolSlice";
import { useDispatch, useSelector } from "react-redux";
import addImage from "./addImage";
import useAddText from "./useAddText";
import { zoomDelta, enclose } from "../../services/utils/zoomDelta";

function getMouse(options, canvas) {
    const pointer = canvas.getPointer(options.e);
    const posX = pointer.x;
    const posY = pointer.y;
    return { posX, posY };
}

const FabricCanvas = () => {
    const canvasRef = useRef(null);
    const addText = useAddText();
    const canvasWrapperRef = useRef(null);
    const dispatch = useDispatch();
    let active_obj = useRef([]);
    const { downTools, previewImg, curTool, canvas } = useSelector(
        (state) => state.toolReducer.states[state.toolReducer.curState]
    );

    const applyFilter = useCallback(() => {
        canvasRef.current.style.filter = `${downTools[2].filters[0].name}(${downTools[2].filters[0].value}%) 
            ${downTools[2].filters[1].name}(${downTools[2].filters[1].value}%) 
            ${downTools[2].filters[2].name}(${downTools[2].filters[2].value}%)
            ${downTools[2].filters[3].name}(${downTools[2].filters[3].value}%)
            ${downTools[2].filters[4].name}(${downTools[2].filters[4].value}px)
            ${downTools[2].filters[5].name}(${downTools[2].filters[5].value}%)
            ${downTools[2].filters[6].name}(${downTools[2].filters[6].value}%)
            ${downTools[2].filters[7].name}(${downTools[2].filters[7].value}deg)`;
        canvasRef.current.style.transform = `rotate(${downTools[4].value}deg)`;
    }, [canvasRef, downTools]);

    useEffect(() => {
        if (canvasRef.current !== null) {
            applyFilter();
        }
    }, [applyFilter]);

    useEffect(() => {
        const canvas = new fabric.Canvas(canvasRef.current, {
            allowTouchScrolling: true,
        });
        canvas.allowTouchScrolling = true;
        canvas.setHeight(canvasWrapperRef.current?.clientHeight || 0);
        canvas.setWidth(canvasWrapperRef.current?.clientWidth || 0);
        dispatch(
            setMaxHight({ height: canvasWrapperRef.current?.clientHeight })
        );
        dispatch(setMaxWidth({ width: canvasWrapperRef.current?.clientWidth }));
        dispatch(setCanvas({ canvas: canvas }));
        dispatch(setCanvasElenment({ canvas: canvasRef.current }));
        addImage(
            previewImg,
            canvas,
            canvasWrapperRef.current?.clientHeight,
            canvasWrapperRef.current?.clientWidth,
            dispatch,
            setHight,
            setWidth,
            setImageProportion
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(canvas){
            canvas.__eventListeners = undefined;
        }
        if (curTool === "Text" && canvas) {
            canvas.on("selection:created", function (options) {
                active_obj.current = canvas.getActiveObjects();
            });
            canvas.on("mouse:up", function (options) {
                if (active_obj.current[0] || options.target != null) {
                    active_obj.current = canvas.getActiveObjects();
                    return;
                }
                const cords = getMouse(options, canvas);
                const obj = addText(canvas, cords);
                if(obj){
                    canvas.setActiveObject(addText(canvas, cords));
                }
                // canvas.setActiveObject(addText(canvas, cords));
                active_obj.current = canvas.getActiveObjects();
            });
        } else {
            if (canvas) {
                canvas.__eventListeners = undefined;
            }
        }
        if (canvas) {
            canvas.on("mouse:wheel", function (opt) {
                zoomDelta(canvas, opt.e.deltaY, opt.e.offsetX, opt.e.offsetY);
                enclose(canvas, {
                    br: { x: downTools[6].width, y: downTools[6].height },
                    tl: { x: 0, y: 0 },
                });
                opt.e.preventDefault();
                opt.e.stopPropagation();
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [curTool, downTools]);

    return (
        <div
            className="canvas-wrapper w-full h-full flex justify-center"
            ref={canvasWrapperRef}
        >
            <canvas
                className="border border-white "
                ref={canvasRef}
                onLoad={applyFilter}
            />
        </div>
    );
};

export default FabricCanvas;
