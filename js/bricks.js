class Bricks {
    constructor(brickRowCount, brickColumnCount, brickWidth, brickHeight, brickPadding, brickOffsetTop, brickOffsetLeft) {//בנאי של הלבנים
        this.brickRowCount = brickRowCount;//כמות בשורה
        this.brickColumnCount = brickColumnCount;//כמות בעמודה
        this.brickWidth = brickWidth;//רוחב הלבנה
        this.brickHeight = brickHeight;//גובה הלבנה
        this.brickPadding = brickPadding;//רווח
        this.brickOffsetTop = brickOffsetTop;//מרחק בין השורה למעלה לקנוס
        this.brickOffsetLeft = brickOffsetLeft;//מרחק בין העמודה השמאלית לקנווס
        this.bricksArr = [];//מערך לבנים
        this.fillBricks();//ממלא לבנים
        this.drawBricks();//מצייר אותם
    }
    fillBricks() {//מילוי מטריצה
        for (let c = 0; c < this.brickColumnCount; c++) {
            this.bricksArr[c] = [];
            for (let r = 0; r < this.brickRowCount; r++) {
                this.bricksArr[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
    }
    drawBricks() {
        for (let c = 0; c < this.brickColumnCount; c++) {
            for (let r = 0; r < this.brickRowCount; r++) {
                if (this.bricksArr[c][r].status == 1) {
                    let brickX = (r * (this.brickWidth + this.brickPadding)) + this.brickOffsetLeft;
                    let brickY = (c * (this.brickHeight + this.brickPadding)) + this.brickOffsetTop;
                    this.bricksArr[c][r].x = brickX;
                    this.bricksArr[c][r].y = brickY;
                    ctx.beginPath();
                    ctx.rect(brickX, brickY, this.brickWidth, this.brickHeight);//ציור הלבנה
                    ctx.fillStyle = "#DDA0DD";//צבע
                    ctx.fill();//מילוי בצבע
                    ctx.closePath();
                }
            }
        }
    }
}