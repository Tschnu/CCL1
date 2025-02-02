import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class KitchenCounter extends BaseGameObject {
    name = "KitchenCounter";
    blockGravityForces = true;

    


    draw = function () {
    }
    
    constructor (x, y, width, height) {
        super(x, y, width, height);
    }
}

export {KitchenCounter};