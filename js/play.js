let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d"); //אתחול הקנווס
let rightPressed = false;
let leftPressed = false;
ctx.fillStyle = "#FDF5E6";
ctx.font = '60px serif';
ctx.fillText('PRESS START', canvas.width / 2 - 170, canvas.height / 2 + 100);
document.addEventListener('DOMContentLoaded', domLoaded);
let game = new Game(0, 3);

function domLoaded(e) {
    game.drawLives();
    game.drawScore();
    let btnPlay = document.getElementById("play-button");
    btnPlay.addEventListener("click", draw);
    let btnReplay = document.getElementById("re-play-button");
    btnReplay.addEventListener("click", game.redrew);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.sounds.music.play();
    game.bricks.drawBricks();
    game.paddle.drawPaddle();
    game.drawScore();
    game.drawLives();
    game.ball.drawBall();
    game.paddle.movePaddel();
    game.ball.moveBall();
    game.collisionDetection();
    game.ball.deviation(game.paddle);
    game.win();
    game.fails();
    requestAnimationFrame(draw);
}