import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Flame extends BaseGameObject {
    blockGravityForces = true;
    name = "Flame"

   


    reactToCollision = function(collidingObstacle) {
        if (collidingObstacle.name == "Mug") {
            collidingObstacle.x = collidingObstacle.previousX;
            collidingObstacle.y = collidingObstacle.previousY;
            document.getElementById("gameContainer").style.display = "none";
            document.getElementById("gameOverScreen").style.display = "block";
            global.backgroundMusikStop();
            global.stopTimer();
            global.playFallGameOverSound();
        }
        }
    


    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/fireg.png", 4, 1)

        this.animationData.firstSpriteIndex = 0; 
        this.animationData.lastSpriteIndex = 3;
        this.animationData.timePerSprite = 0.1;
    }
}

export {Flame}