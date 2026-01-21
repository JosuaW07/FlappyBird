import {useEffect, useRef} from "react"




const Canvas = ({ballColor, onClick, ...props}) => {
    const canvasRef = useRef(null)
    const canvasWidth = 50;

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (ballColor.substring(0, 2) === "/s") {

            const image = new Image(50, 50)
            image.src = ballColor;
            image.onload = ()=> {
                ctx.drawImage(image, 0,0,canvasWidth, canvasWidth

                )
            }
        } else {
            ctx.beginPath();
            ctx.arc(canvasWidth / 2, canvasWidth / 2, 25, 0, Math.PI * 2, true);
            ctx.fillStyle = ballColor;
            ctx.fill();
        }

    }, [ballColor])
    return <canvas ref={canvasRef} width={canvasWidth} height={canvasWidth} {...props} onClick={onClick}/>
}
export default Canvas

