import React, {useEffect, useRef, useState} from 'react'
import GameLoop from "./GameLoop.js";

const CanvasTest = props => {

    const [boxheight, setboxheight] = useState(50);
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')

        context.fillStyle = '#000000'
        context.fillRect(0, 0, context.canvas.width, boxheight)
    }, [boxheight]);

    useEffect(() => {
        document.addEventListener('keydown', function (event) {
            if (event.code === 'Space') {
                setboxheight(h=>h-10);
            }
        })
    }, []);

    return <canvas ref={canvasRef} {...props}/>
}

export default CanvasTest