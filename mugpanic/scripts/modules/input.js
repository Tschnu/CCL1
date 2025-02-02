import { global } from "./global.js";
import { BaseGameObject } from "../gameObjects/baseGameObject.js";

function move(event) {

    switch(event.key) {
        case "d":
            if (global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(5, 9);
            global.playerObject.xVelocity = 400;
            global.playerObject.yVelocity = 0;
            console.log("velocity set");
            break;
        case "a":
            if (global.playerObject.xVelocity == 0)
                global.playerObject.switchCurrentSprites(0, 4);
            global.playerObject.xVelocity = -400;
            global.playerObject.yVelocity = 0;
            break;
        case " ":
                global.playerObject.setJumpForce(10);
            break;
        case "w":
                global.playerObject.setJumpForce(10);
            break;
    }
}

function stop(event) {
    switch(event.key) {
        case "d":
            global.playerObject.xVelocity = 0;
            break;
        case "a":
            global.playerObject.xVelocity = 0;
            break;
    }
}


document.addEventListener("keypress", move);
document.addEventListener("keyup", stop);