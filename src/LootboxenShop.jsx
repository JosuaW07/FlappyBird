import Canvasball from "./Canvasball.jsx";
import {useState} from "react";
import lotboxSkin from "./assets/lotbox.png";
import openlotboxSkin from "./assets/openlotbox.png"

export default function LootboxenShop(){
    const [lotbox, setlotbox] = useState(lotboxSkin)

    function buybox(){
        setlotbox(openlotboxSkin)
    }

    return(
        <>
            <h1>Shop</h1>
            <div className="BallCanvas">
                <Canvasball
                    ballColor={lotbox}
                    onClick={() => {
                        if (lotbox === openlotboxSkin) {
                            console.log("openAnimation")

                        }
                        else{
                            buybox()
                        }
                    }}
                />
            </div>
        </>
    )
}