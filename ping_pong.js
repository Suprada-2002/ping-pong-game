//update loop
import Ball from "./Ball.js";
import Paddle from './Paddle.js';

const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const computerPaddle = new Paddle(document.getElementById("computer-paddle"));
const playerScoreElem = document.getElementById("player-score") 
const computerScoreElem = document.getElementById("computer-score");

let lastTime;

function update(time){
   // console.log(time);

    if(lastTime != null){
         //time between previous frame and new frame - delta
        const delta = time - lastTime;

        //update code
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()]);
        computerPaddle.update(delta, ball.y);

        const hue = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue("--hue")
          )

          document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if(isLose()){
            handleLose();
            console.log("YOU LOST");
        }

    }
    lastTime = time;
    window.requestAnimationFrame(update);
}

function isLose(){
    const rect = ball.rect();
    return rect.right >=window.innerWidth || rect.left <= 0
}

function handleLose(){
    const rect = ball.rect();
    if(rect.right>=window.innerWidth){
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent)+1;
    }else{
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent)+1;
    }
    ball.reset();
    computerPaddle.reset();
}

document.addEventListener('mousemove', e => {
    playerPaddle.position = (e.y/window.innerHeight) *100;
})

window.requestAnimationFrame(update);
/**
 *setinterval - bad - not super acurrate and may not run evey 10s interval & run in between frames
 * requestANimationFrame - anything changes on the screen it will run the code.
 */