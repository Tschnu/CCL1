import { global } from "./global.js";
import { Mug } from "../gameObjects/mug.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { KitchenCounter } from "../gameObjects/kitchenCounter.js";
import { Fire } from "../gameObjects/obstacle.js";
import { Flame } from "../gameObjects/bigflame.js";


function gameLoop(totalRunningTime) { 
    if (global.gameOver || global.gameWon) {
        return;
    }
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime;
    global.deltaTime /= 1000;
    global.prevTotalRunningTime = totalRunningTime;
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height);
    
    for (var i = 0; i < global.allGameObjects.length; i++) {
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }

    checkGameStatus(); 

    if (global.gameWon) {
        showEndScreen();
    }
    
    requestAnimationFrame(gameLoop);
}



function startTimer() {
    const timeDisplay = document.getElementById("timeRemaining");
    global.timeLeft = 60;
    global.timer = setInterval(() => {
        if (global.timeLeft > 0) {
            global.timeLeft--;
            timeDisplay.textContent = global.timeLeft;
        } else {
            clearInterval(global.timer); 
            if (!global.gameOver && !global.gameWon) { 
                global.timeoutGameOver = true;
                global.backgroundMusikStop();
                document.getElementById("gameContainer").style.display = "none";
                document.getElementById("timeoutGameOverScreen").style.display = "block";
                global.playTimerGameOverSound();
            }
        }
    }, 1000);
    
}



function checkGameStatus() {    
    if (global.playerObject.x > 17650) { 
        global.gameWon = true;
        document.getElementById("gameContainer").style.display = "none";
        const winScreen = document.getElementById("winScreen");
        winScreen.style.display = "block";
        global.backgroundMusikStop();
        global.stopTimer();
    }

    if (global.playerObject.y >= 700) {
        global.gameOver = true;
        global.backgroundMusikStop();
        document.getElementById("gameContainer").style.display = "none";
        document.getElementById("gameOverScreen").style.display = "block";
        global.stopTimer();
        global.playFallGameOverSound();
    }
}



document.getElementById("retryButton").addEventListener("click", () => {
    location.reload();
});

document.getElementById("retryButtonWin").addEventListener("click", () => {
    location.reload();
});

document.getElementById("retryButtonTime").addEventListener("click", () => {
    location.reload();
});


function showEndScreen() {
    const winScreen = document.getElementById("winScreen");
    winScreen.style.display = "block"; 
    backgroundMusikStop();
}


function setupGame() {

    global.playerObject = new Mug(100, 100, 125, 140);
    global.leftMoveTrigger = new MoveTrigger(0, 0, 10, 900, 0);
    global.rightMoveTrigger = new MoveTrigger(800, -100, 20, 900, 0);
    new KitchenCounter(465, 450, 165, 10); //Sink
    new KitchenCounter(630, 315, 20, 135); //Hahn
    new KitchenCounter(650, 450, 160, 10); //Sink2
    new KitchenCounter(0, 460, 1250, 40); //First Counter 
    new KitchenCounter(1502, 395, 1000, 40); //Komode
    new KitchenCounter(1667, 295, 65, 100); //kleine Kerze
    new KitchenCounter(1752, 205, 75, 190); //große Kerze
    new KitchenCounter(2247, 245, 130, 150); //Bilderrahmen
    new KitchenCounter(2800, 465, 1805, 40); // Second Counter
    new KitchenCounter(3200, 335, 70, 130); // Glas
    new KitchenCounter(3360, 200, 125, 265); // Krug
    new KitchenCounter(4808, 400, 25, 40); //Broom
    new KitchenCounter(5083, 435, 400, 135); //first Trash
    new KitchenCounter(5683, 435, 400, 135); //second Trash
    new KitchenCounter(6283, 435, 400, 135); //third Trash
    new KitchenCounter(6933, 465, 1805, 135); //third Counter
    new KitchenCounter(7138, 275, 160, 190); //Kaffee
    new KitchenCounter(8746, 430, 500, 140); // Herd
    new KitchenCounter(8806, 310, 130, 125); // topf
    new KitchenCounter(9216, 400, 90, 15); //Stiel Pfanne
    new KitchenCounter(9556, 465, 2735, 15); //fourth Counter
    new KitchenCounter(10131, 330, 220, 135); //Obst
    new KitchenCounter(11336, 270, 340, 195); //Microwelle
    new KitchenCounter(12541, 430, 25, 140); //Chair 1
    new KitchenCounter(12766, 480, 750, 90); //Tisch
    new KitchenCounter(13081, 405, 70, 75); //Salt n Pepper
    new KitchenCounter(13716, 430, 25, 140); //Chair 2
    new KitchenCounter(13991, 315, 60, 50); //Frog
    new KitchenCounter(14230, 375, 65, 65); //Capybara
    new KitchenCounter(14541, 465, 2735, 15); //fifth Counter
    new KitchenCounter(14921, 415, 130, 55); //plates
    new KitchenCounter(16246, 355, 80, 110); //Regalthingy 1
    new KitchenCounter(16326, 260, 140, 205); // Books
    new KitchenCounter(16466, 355, 80, 110); //Regalthingy 1
    new KitchenCounter(16546, 145, 385, 320); //Pot
    new KitchenCounter(16965, 145, 1035, 25); //Shelf


    new Fire (1777, 155, 25, 50); //Kerze
    new Flame (9041, 300, 160, 105); //Feuer
    
    }
    document.getElementById("startButton").addEventListener("click", () => {
        // playerName = document.getElementById("theName").value.trim();
        // if (!playerName) {
        //     playerName = "The Human";
        // }
        document.getElementById("startScreen").style.display = "none"; 
        document.getElementById("gameContainer").style.display = "block"; 
        startTimer();
        setupGame();
        global.backgroundMusikAhh();
        
    });

    document.getElementById("controlButton").addEventListener("click", () => {
        document.getElementById("startScreen").style.display = "none"; 
        document.getElementById("control").style.display = "block"; 
    });
    document.getElementById("back").addEventListener("click", () => {
        location.reload(); 
    });

    document.getElementById("rulesButton").addEventListener("click", () => {
        document.getElementById("startScreen").style.display = "none"; 
        document.getElementById("rules").style.display = "block"; 
    });
    document.getElementById("backRules").addEventListener("click", () => {
        location.reload(); 
    });



requestAnimationFrame(gameLoop);


// document.addEventListener("visibilitychange", () => {
//     if (!document.hidden) {
//       global.deltaTime = performance.now();
//     } 
// });

