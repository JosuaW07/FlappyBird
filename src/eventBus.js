// eventBus.js
import mitt from "mitt";
const eventBus = mitt()

let isPaused = false;

export function setPause(value) {
    isPaused = value;
    eventBus.emit('pausechange', isPaused);
}

export function getPause() {
    return isPaused;
}

export default eventBus;

