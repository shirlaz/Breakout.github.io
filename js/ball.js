class Ball {
    constructor(ballRadius, x, y, dx, dy) {//הבנאי של הכדור
        this.ballRadius = ballRadius;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
    drawBall() {//פונקציה שמצירת את הכדור
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);//נתונים לגודל הכדור
        ctx.fillStyle = "#FDF5E6";
        ctx.fill();
        ctx.closePath();
    }
    moveBall() {//הזזת הכדור
        this.x += this.dx;//מיקום שבו הוא נמצא + המרחק אליו הכדור זז
        this.y += this.dy;//כנ"ל בציר ה Y
    }
    deviation(paddle) { //זיהוי חרידה מהצדדים בציר ה-X
        if (this.x + this.dx > canvas.width - this.ballRadius || this.x + this.dx < this.ballRadius) {
            this.dx = -1 * (this.dx);//אם זיהה חריגה משנה כיוון לצד השני
        }
        if (this.y + this.dy < this.ballRadius) {
            this.dy = -1 * (this.dy);//אם זיהה חריגה משנה כיוון לצד השני
        } else if (this.y + this.dy > canvas.height - this.ballRadius) {
            if (this.x > paddle.paddleX && this.x < paddle.paddleX + paddle.paddleWidth) {
                this.dy = -1 * (this.dy);
            } else {
                game.lives--;
                if (game.lives) {
                    this.x = canvas.width / 2;
                    this.y = canvas.height - 30;
                    paddle.paddleX = (canvas.width - paddle.paddleWidth) / 2;
                }
            }
        }
    }
}
