import eventBus, {getPause, setPause} from "./eventBus.js";

let isRunning = false;
export default function GameLoop(onUpdate) {
    if (isRunning) return;
    isRunning = true;

    let verticalPosition = -300;
    let verticalMomentum = 0;
    const fall = 1600;
    const rise = 600;

    const pipeSpacing = 400;
    const pipeWidth = 80;
    const gapSize = 300;
    const initialPipeSpeed = 4
    let pipeSpeed = initialPipeSpeed;
    const cloudSpeed = initialPipeSpeed - 1;
    const birdX = 100;
    const canvasHeight = 600;

    let lastTime = performance.now();
    let pipes = [];
    let jumpRequest = false;

    let highScore = 0;
    let score = 0;



    function InitPipes() {
        pipes = [];
        for (let i = 0; i < 3; i++) {
            const pipePosition = 700 + i * pipeSpacing;
            pipes.push(spawnPipeAt(pipePosition));
        }
    }

    function spawnPipeAt(x) {
        return {
            x,
            gapY: Math.random() * 600 + 100,

            gapSize
        };
    }

    function update() {
        if(getPause()){
            return
        }


        const now = performance.now();
        const delta = (now - lastTime) / 1000;
        lastTime = now;


        // Ball
        if (jumpRequest) {
            verticalMomentum = rise;
            jumpRequest = false;
        }


        verticalMomentum += (-fall) * delta;
        verticalPosition += verticalMomentum * delta;
        if (verticalPosition <= -600) {
            verticalPosition = -600;
        }


        for (let i = 0; i < pipes.length; i++) {
            pipes[i].x -= pipeSpeed;

            const correctedGapY = canvasHeight - pipes[i].gapY;

            if (
                birdX > pipes[i].x &&
                birdX < pipes[i].x + pipeWidth &&
                (-verticalPosition < correctedGapY || -verticalPosition > correctedGapY + gapSize)
            ) {
                score = 0;
                document.querySelector("#score").innerHTML = "Score " + 0
                InitPipes();
                verticalPosition = -300;
                verticalMomentum = 0;
                pipeSpeed = 4;
                eventBus.emit("death")
                eventBus.emit("clickpause")

            } else if (birdX > pipes[i].x + pipeWidth && !pipes[i].isScored) {
                pipes[i].isScored = true;
                score++;
                console.log(pipeSpeed)
                if (pipeSpeed < initialPipeSpeed + 3) {
                    pipeSpeed += 0.3;
                }
                document.querySelector("#score").innerHTML = "Score " + score
                if (score > highScore) {
                    highScore = score;
                    document.querySelector("#highscore").innerHTML = "Highscore " + score
                }
                eventBus.emit(
                    'score', score,
                    )
            }


            if (pipes[i].x < -pipeWidth) {
                const maxX = Math.max(...pipes.map(p => p.x));
                pipes[i] = spawnPipeAt(maxX + pipeSpacing);
                pipes.isInPipe = false;
            }
        }


        onUpdate({
            verticalPosition,
            pipes: [...pipes],
            cloudSpeed
        });
        requestAnimationFrame(update);
    }



    InitPipes();
    update();







    document.addEventListener('keydown', function (event) {
        if (event.code === 'Space') {
            jumpRequest = true;
        }
    });




    document.addEventListener('keypress', function (event) {
        if (event.code === 'KeyA' + '') {
            eventBus.emit("clickpause")
        }
    });

    document.addEventListener('keypress', function (event) {
        if (event.code === 'Space' && getPause() === true) {
            eventBus.emit("clickpause")
        }
    });

    eventBus.on("clickpause", function() {
        if (getPause()){
            setPause(false);
            console.log ("unpause")
            lastTime = performance.now();
            update();
        } else {
            setPause(true)
            console.log ("paused")
        }

        eventBus.emit("changedpause", getPause());
    })


}