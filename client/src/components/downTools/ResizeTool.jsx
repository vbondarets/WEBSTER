import React, { useEffect, useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useSelector } from 'react-redux';
import { setHight, setWidth } from '../../store/reducers/ToolSlice';
import { useDispatch } from 'react-redux';

const ResizeTool = () => {
    const [isLock, setIsLock] = useState(true);
    const dispatch = useDispatch();
    const [proportions, setProportions] = useState();
    const { downTools , maxHeight, maxWidth} = useSelector((state) => state.toolReducer.states[state.toolReducer.curState]);

    useEffect(() => {
        if (isLock) {
            setProportions(downTools[6].width / downTools[6].height)
        }
        console.log(downTools[6].width / downTools[6].height);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLock]);

    useEffect(() => {
        if (downTools[6].height > maxHeight) {
            dispatch(setHight({ height: maxHeight}))
        }
        if (downTools[6].width > maxWidth) {
            dispatch(setWidth({ width: maxWidth}))
        }
        if (downTools[6].height < 0) {
            dispatch(setHight({ height: 0}))
        }
        if (downTools[6].width < 0) {
            dispatch(setWidth({ width: 0}))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [downTools[6].width, downTools[6].height]);

    return (
        <div className='resizeTools flex flex-row w-fit h-full mt-1 font-sans mx-auto space-x-6'>
            {console.log(maxHeight, maxWidth)}
            <input
                className='h-fit w-16 bg-transparent border border-mainFontColor pl-1 rounded'
                value={downTools[6].width}
                type="number"
                min={0}
                max={maxWidth + 1}
                onChange={event => {
                    if (isLock) {
                        dispatch(setHight({ height: Math.round(parseFloat(event.target.value / proportions))}))
                    }
                    dispatch(setWidth({ width: event.target.value}))
                }}
            />
            {isLock
                ?
                <LockIcon
                    onClick={() => { setIsLock(false) }}
                />
                :
                <LockOpenIcon
                    onClick={() => { setIsLock(true) }}
                />
            }
            <input
                className='h-fit w-16 bg-transparent border border-mainFontColor pl-1 rounded'
                // value={downTools[6].height}
                value={downTools[6].height}
                type="number"
                min={0}
                max={maxHeight + 1}
                onChange={event => {
                    if (isLock) {
                        dispatch(setWidth({ width: Math.round(parseFloat(event.target.value * proportions))}))
                    }
                    dispatch(setHight({ height: event.target.value}))
                }}
            />
        </div>
    )
}

export default ResizeTool