import playicon from "./assets/playicon1.png"
import pauseicon from "./assets/pauseicon2.png"
import audioplaying from "./assets/audiobutton.png"
import audiomuted from "./assets/audiomuted.png"
import eventBus, {getPause} from "./eventBus.js";
import {useRef, useState} from "react";
import {useEffect} from "react";
import backgroundaudio from "./assets/suno.mp3";


export default function UI() {

    const [pauseButtonIcon, setPauseButtonIcon] = useState(playicon)
    const [audiobuttonIcon, setAudiobuttonIcon] = useState(audiomuted)

    const audioRef = useRef(null);

    useEffect(() => {
        const handler = () => {
            if (getPause()){
                setPauseButtonIcon(playicon)
                audioRef.current.pause()
            } else {
                setPauseButtonIcon(pauseicon)
                audioRef.current.play()
            }
        };

        eventBus.on("changedpause", handler);
        return () => eventBus.off("changedpause", handler);
    }, []);



    function handlePause() {
        eventBus.emit("clickpause")
    }

    function handleAudio() {
        if (audioRef.current.muted) {
            audioRef.current.muted = false;
            setAudiobuttonIcon(audioplaying)
        } else {
            audioRef.current.muted = true;
            setAudiobuttonIcon(audiomuted)
        }
    }

    useEffect(() => {
        const keyHandler = (event) => {
            if (event.code === "KeyM") {
                handleAudio();
                console.log("audio");
            }
        };

        eventBus.on("death", restartAudio)

        function restartAudio(){
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }

        document.addEventListener("keydown", keyHandler);

        return () => {
            document.removeEventListener("keydown", keyHandler);
        };
    }, []);

    return (
        <div id="UI">
            <img src={pauseButtonIcon} id="UIbutton" alt="Playbutton" onClick={handlePause}/>
            <img src={audiobuttonIcon} id="UIbutton" alt="Audiobutton" onClick={handleAudio}/>
            <audio ref={audioRef} controls autoPlay loop muted hidden={true}>
                <source src={backgroundaudio} type="audio/mp3"/>
            </audio>
        </div>
    )
}