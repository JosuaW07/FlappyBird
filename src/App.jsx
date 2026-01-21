import Canvas from "./Canvas.jsx";
// import "./mvp.css"
import Score from "./Score.jsx";
import "./App.css";
import "react-router-dom"
import Skins from "./Skins.jsx";
import {useState} from "react";
import LootboxenShop from "./LootboxenShop.jsx";
import UI from "./UI.jsx";

function App() {
    const [skin, setSkin] = useState('#FF8C00');

    const handleSkinClick = (newSkin) => {
        setSkin(newSkin);
    };


    return (
        <>
            <h1>Flappy ball</h1>
            <div id="game">
                <div id="gameUI">
                    <Canvas
                        ballColor={skin}
                    />
                    <UI/>
                </div>
                <Score/>
            </div>
            <Skins onSkinSelect={handleSkinClick}/>
        </>
    )
}

export default App
