import React, { useCallback, useEffect, useRef } from 'react'
import { fabric } from 'fabric'
import { setCanvas, setCanvasElenment, setHight, setWidth } from '../../store/reducers/ToolSlice';
import { useDispatch, useSelector } from 'react-redux';
import addImage from './addImage';


const FabricCanvas = () => {
    const canvasRef = useRef(null);
    const canvasWrapperRef = useRef(null)
    const dispatch = useDispatch();
    // const addImage = useAddImage();
    const { downTools, previewImg} = useSelector(
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
        const canvas = new fabric.Canvas(canvasRef.current, {allowTouchScrolling: true});
        canvas.allowTouchScrolling = true;
        canvas.setHeight(canvasWrapperRef.current?.clientHeight || 0);
        canvas.setWidth(canvasWrapperRef.current?.clientWidth || 0);
        dispatch(setHight({ height: canvasWrapperRef.current?.clientHeight }));
        dispatch(setWidth({ width: canvasWrapperRef.current?.clientWidth }));
        dispatch(setCanvas({ canvas: canvas }));
        dispatch(setCanvasElenment({canvas: canvasRef.current}))

        window.addEventListener('resize', resizeCanvas, false);

        function resizeCanvas() {
            canvas.setDimensions({
                width: canvasWrapperRef.current?.clientWidth || 0,
                height: canvasWrapperRef.current?.clientHeight || 0
            });
        }
        addImage(downTools, previewImg, canvas, canvasWrapperRef.current?.clientHeight, canvasWrapperRef.current?.clientWidth);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div
            className='canvas-wrapper w-full h-full flex justify-center'
            ref={canvasWrapperRef}
        >
            <canvas
                className='border border-white '
                ref={canvasRef}
                onLoad={applyFilter}
            />
        </div>
    )
}

export default FabricCanvas