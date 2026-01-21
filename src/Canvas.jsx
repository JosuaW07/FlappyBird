import React, {useEffect, useRef, useState} from 'react'
import GameLoop from "./GameLoop.js"
import cloud from "./assets/cloud.png"

const Canvas = ({ballColor, ...props}) => {

    //canvas
    const canvasheight = 600;
    let canvaswidht = 900;
    //Pipes
    let Pipeswidth = 80;

    const [birdposition, setBirdposition] = useState(-300)
    const [pipes, setPipes] = useState([]);
    const canvasRef = useRef(null)

    useEffect(() => {
        GameLoop(({verticalPosition, pipes}) => {
            setBirdposition(verticalPosition);
            setPipes(pipes);
        })
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = '#33FFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Clouds
        const image = new Image(100, 100)
        image.src = cloud;

        image.onload = ()=>{

            ctx.drawImage(image, 100, -50, 1000, 500)


            // pipes
            ctx.fillStyle = '#4ddd3b';
            pipes.forEach(pipe => {
                const gapStart = canvasheight - pipe.gapY

                const gapEnd = gapStart + pipe.gapSize;
                ctx.fillRect(pipe.x, 0, Pipeswidth, gapStart);

                ctx.fillRect(pipe.x, gapEnd, Pipeswidth, canvasheight - gapEnd);
            });


            // ball
            if (ballColor.substring(0, 2) === "/s") {
                const image = new Image(50, 50)
                image.src = ballColor
                ;
                image.onload = () => {
                    ctx.drawImage(image, 50, -birdposition -50, 100, 100
                    )
                }
            } else {
                ctx.beginPath();
                ctx.arc(100, -birdposition, 25, 0, Math.PI * 2, true);
                ctx.fillStyle = ballColor;
                ctx.fill();
            }

        }

    }, [Pipeswidth, ballColor, birdposition, pipes])

    return <canvas ref={canvasRef} width={canvaswidht} height={canvasheight} {...props} className="mainCanvas"/>

}

export default Canvas