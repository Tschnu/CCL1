const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.ctx.imageSmoothingEnabled = false;
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.backgroundShift = 0;
global.backgroundMaxShift = -18000;
global.gravityForce = 9.8;
global.pixelToMeter = 100;
global.leftMoveTrigger;
global.rightMoveTrigger;
global.gameWon = false;
global.gameOver = false;
global.timer = null;
global.timeLeft = 60;
global.timeoutGameOver = false;

global.timerSound = new Audio('./audio/scream.mp3');
global.fallSound = new Audio('./audio/break.mp3');
global.backgroundMusik = new Audio('./audio/musik.mp3')

global.playTimerGameOverSound = function() {
    if (this.timerGameOverSoundPlayed) return; 
    this.timerGameOverSoundPlayed = true;

    this.timerSound.volume = 0.8; 
    this.timerSound.play();
}

global.playFallGameOverSound = function () {
    this.fallSound.volume = 0.7;
    this.fallSound.currentTime = 0;
    this.fallSound.play();
}

global.backgroundMusikAhh = function () {
    this.backgroundMusik.volume = 0.7;
    this.backgroundMusik.currentTime = 0;
    this.backgroundMusik.play();
}

global.backgroundMusikStop = function () {
    this.backgroundMusik.pause();
}



global.stopTimer = function () {
    clearInterval(this.timer); 
}

global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = givenObject.index; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}


global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}


export { global }