class Paddle {//בנאי של המשוט
    constructor(paddleHeight, paddleWidth, paddleX) {
        this.paddleHeight = paddleHeight;
        this.paddleWidth = paddleWidth;
        this.paddleX = paddleX;
        this.registerMoveEvents();
        this.drawPaddle();
    }
    drawPaddle() {
        ctx.beginPath();
        ctx.rect(this.paddleX, canvas.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle = "#DDA0DD";
        ctx.fill();
        ctx.closePath();
    }
    //שימוש במקלדת כשזה לחוץ
    keyDownHandler(e) {
        if (e.code == "ArrowRight") {
            rightPressed = true;
        } else if (e.code == 'ArrowLeft') {
            leftPressed = true;
        }
    }
    //שימוש במקלדת כשזה לא לחוץ
    keyUpHandler(e) {
        if (e.code == 'ArrowRight') {
            rightPressed = false;
        } else if (e.code == 'ArrowLeft') {
            leftPressed = false;
        }
    }
    mouseMoveHandler(e) {
        this;
        let relativeX = e.clientX - canvas.offsetLeft;
        if (relativeX > 0 && relativeX < canvas.width) {
            this.paddleX = relativeX - this.paddleWidth / 2;
        }
    }
    registerMoveEvents() {
        document.addEventListener("keydown", this.keyDownHandler);
        document.addEventListener("keyup", this.keyUpHandler);
        let onMouseMoveWithPaddle = this.mouseMoveHandler.bind(this);
        document.addEventListener("mousemove", onMouseMoveWithPaddle);
    }
    movePaddel() {
        if (rightPressed && this.paddleX < canvas.width - this.paddleWidth) {
            this.paddleX += 7;
        } else if (leftPressed && this.paddleX > 0) {
            this.paddleX -= 7;
        }
    }
}