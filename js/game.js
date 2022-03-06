class Game {
    constructor(score, lives) {
        this.ball = new Ball(14, canvas.width / 2, canvas.height - 30, 8, -8);
        this.paddle = new Paddle(15, 110, (canvas.width - 160) / 2);
        this.bricks = new Bricks(14, 6, 65, 25, 10, 40, 30);
        this.score = score;
        this.lives = lives;
    }
    sounds = { //מנגינות
        gameOver: new Audio('./sounds/gameOver.mp3'),
        music: new Audio('./sounds/music.mp3'),
        winner: new Audio('./sounds/winner.mp3'),
    }
    drawScore() {
        ctx.font = "25px Arial";
        ctx.fillStyle = "#FDF5E6";
        ctx.fillText("Score: " + this.score, 65, 30);
    }
    drawLives() {
        ctx.font = "25px Arial";
        ctx.fillStyle = "#FDF5E6";
        ctx.clearRect(canvas.width - 230, 0, 230, 40); //מנקה כל פעם שמשתנה
        ctx.fillText("Lives: " + this.lives, canvas.width - 150, 30);
    }
    collisionDetection() { //זיהוי התנגשות באבן
        for (let c = 0; c < this.bricks.brickColumnCount; c++) {
            for (let r = 0; r < this.bricks.brickRowCount; r++) {
                let b = this.bricks.bricksArr[c][r];
                if (b.status == 1) {
                    if (this.ball.x > b.x && this.ball.x < b.x + this.bricks.brickWidth && this.ball.y > b.y && this.ball.y < b.y + this.bricks.brickHeight) {
                        this.ball.dy = -1 * (this.ball.dy);
                        b.status = 0; //משנה את הסטטוס כך זה לא יצייר את הלבנה
                        this.score++; //מעלה את הנקודות
                    }
                }
            }
        }
    }
    win() { //ניצחון
        if (this.score == this.bricks.brickRowCount * this.bricks.brickColumnCount) {
            this.sounds.music.pause() //עצירת מנגינת המשחק שפועלת
            this.sounds.winner.play() //מפעיל את מנגינת הניצחון
            ctx.fillStyle = "#FFD700";
            ctx.font = '100px serif';
            ctx.fillText('YOU WIN!!!', canvas.width / 2 - 240, canvas.height / 2 - 70);
            ctx.fillStyle = "#FDF5E6";
            ctx.font = '50px serif';
            ctx.fillText("Click 're-start' to start a new game", canvas.width / 2 - 320, canvas.height / 2 + 130);
            document.getElementById("re-play-button").className = "show"; //מראה את הכפתור של "שחק שוב"
            document.getElementById("play-button").className = "hide";
            delay();
        }
    }
    fails() {
        if (!this.lives) { //אם לא נשאר חיים לשחק
            this.sounds.music.pause()
            this.sounds.gameOver.currentTime = 0; //מחזיר את המנגינה לשניה אפס
            this.sounds.gameOver.play() //מפעיל את מנגינת הפסילה
            ctx.fillStyle = "#8B0000";
            ctx.font = '100px serif';
            ctx.fillText('GAME OVER', canvas.width / 2 - 300, canvas.height / 2 - 90);
            ctx.fillStyle = "#FDF5E6";
            ctx.font = '50px serif';
            ctx.fillText("You got:" + this.score + ' ' + 'points', canvas.width / 2 - 180, canvas.height / 2 + 80);
            ctx.fillText("Click 're-start' to start a new game", canvas.width / 2 - 330, canvas.height / 2 + 160);
            document.getElementById("re-play-button").className = "show"; //מראה את הכפתור של "שחק שוב
            document.getElementById("play-button").className = "hide"; //מחביא את הכפתור שחק
            this.drawLives();
            this.drawScore();
            delay();
            return;
        }
    }
    redrew() { //פונקציה לכפתור REDROW 
        game.sounds.gameOver.pause();
        game.sounds.music.currentTime = 0;
        game.lives = 4;
        game.score = 0;
        game.ball.x = canvas.width / 2;
        game.ball.y = canvas.height - 30;
        game.paddle.x = (canvas.width - 160) / 2;
        game.bricks.fillBricks();
        draw();
    }

}