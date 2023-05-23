import React, { useEffect, useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const ResizeTool = () => {
    const [valueH, setValueH] = useState(1080);
    const [valueW, setValueW] = useState(1920);
    const [isLock, setIsLock] = useState(true);
    const [proportions, setProportions] = useState()

    useEffect(() => {
        if (isLock) {
            setProportions(valueW / valueH)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLock]);

    useEffect(() => {
        if (valueH > 9999) {
            setValueH(parseInt(valueH.toString().slice(0,-1)))
        }
        if (valueW > 9999) {
            setValueW(parseInt(valueW.toString().slice(0,-1)))
        }
        if (valueH < 0) {
            setValueH(0)
        }
        if (valueW < 0) {
            setValueW(0)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valueH, valueW]);

    return (
        <div className='resizeTools flex flex-row w-fit h-full mt-1 font-sans mx-auto space-x-6'>
            <input
                className='h-fit w-16 bg-transparent border border-mainFontColor pl-1 rounded'
                value={valueW}
                type="number"
                min={0}
                max={9999}
                onChange={event => {
                    if (isLock) {
                        setValueH(event.target.value / proportions)
                        // console.log(`h(${valueH}) = w(${event.target.value}) / prop(${proportions})`)
                    }
                    setValueW(event.target.value)
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
                value={valueH}
                type="number"
                min={0}
                max={9999}
                onChange={event => {
                    if (isLock) {
                        setValueW(event.target.value * proportions)
                        
                    }
                    setValueH(event.target.value)
                }}
            />
        </div>
    )
}

export default ResizeTool