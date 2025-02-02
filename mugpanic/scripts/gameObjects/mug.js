import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Mug extends BaseGameObject {
    name = 'Mug'
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;

    update = function() {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }
    }

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 8,
            right: this.x + this.width - 7,
            top: this.y + 14,
            bottom: this.y + this.height 
        }
        return bounds;
    }

    reactToCollision = function (collidingObject)   {
        if (collidingObject.name == "KitchenCounter") {
            this.x = this.previousX;
            this.y = this.previousY;
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("./images/ahhhhh.png", 10, 1);
    }
}

export {Mug}