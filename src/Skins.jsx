import Canvasball from "./Canvasball.jsx";
import flugzeug from "./assets/bombardini.png"
//import multi from "./assets/multi.png"
import flappy from "./assets/Flappy-Bird.png"
import cat from "./assets/cat.png"
import rutschmanSkin from "./assets/rutschman.png"
import mockSkin from "./assets/mock.png"
import {useEffect, useState} from "react";
import eventBus from "./eventBus.js";
import lockedSkin from "./assets/questionmarkbox.webp"
import goldenLockedSkin from "./assets/goldenquestionmarkbox.png"
import redglowLockedSkin from "./assets/redglowquestionmarkbox.png"
import bannanaboySkin from "./assets/bannanaboy.png"
import obamaSkin from "./assets/Obama.png"
import dogSkin from "./assets/doghead.png"
import gebertSkin from "./assets/gebert2.png"



export default function Skins({onSkinSelect}) {

    const orange = '#FF8C00'
    const green = '#004e00'
    const red = '#ff0000'
    const blue = '#0015ff'

    const [mock, setmock] = useState(lockedSkin)
    const [obama, setobama] = useState(lockedSkin)
    const [bannanaboy, setbannanaboy] = useState(lockedSkin)
    const [dog, setdog] = useState(goldenLockedSkin)
    const [rutschman, setrutschman] = useState(goldenLockedSkin)
    const [gebert, setgebert] = useState(redglowLockedSkin)



    useEffect(() => {
        const handleScore = (score) => {
            if (score >= 10) {
                setmock(mockSkin);
            }
            if (score >= 20) {
                setbannanaboy(bannanaboySkin)
            }
            if (score >= 30) {
                setobama(obamaSkin)
            }
            if (score >= 50) {
                setdog(dogSkin)
            }
            if (score >= 75) {
                setrutschman(rutschmanSkin)
            }
            if (score >= 100) {
                setgebert(gebertSkin)
            }


        }
        eventBus.on('score', handleScore);
        return () => eventBus.off('score', handleScore);
    })


    return (
        <div className={"Skins"}>
            <h2>Skins</h2>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={orange}
                    onClick={() => onSkinSelect(orange)}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={green}
                    onClick={() => onSkinSelect(green)}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={red}
                    onClick={() => onSkinSelect(red)}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={blue}
                    onClick={() => onSkinSelect(blue)}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={flugzeug}
                    onClick={() => onSkinSelect(flugzeug)}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={flappy}
                    onClick={() => onSkinSelect(flappy)}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={cat}
                    onClick={() => onSkinSelect(cat)}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={mock}
                    onClick={() => {
                        if (mock === mockSkin) {
                            onSkinSelect(mock)
                        }
                    }}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={bannanaboy}
                    onClick={() => {
                        if (bannanaboy === bannanaboySkin) {
                            onSkinSelect(bannanaboy)
                        }
                    }}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={obama}
                    onClick={() => {
                        if (obama === obamaSkin) {
                            onSkinSelect(obama)
                        }
                    }}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={dog}
                    onClick={() => {
                        if (dog === dogSkin) {
                            onSkinSelect(dog)
                        }
                    }}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={rutschman}
                    onClick={() => {
                        if (rutschman === rutschmanSkin) {
                            onSkinSelect(rutschman)
                        }
                    }}
                />
            </div>
            <div className={"BallCanvas"}>
                <Canvasball
                    ballColor={gebert}
                    onClick={() => {
                        if (gebert === gebertSkin) {
                            onSkinSelect(gebert)
                        }
                    }}
                />
            </div>
        </div>

    )
}