class LineSegment{
    constructor(a, b){ // a ve b position
        this.a = a;
        this.b = b;
    }
    draw(){
        canvasContext.strokeStyle = 'white';
        canvasContext.lineWidth = 1;
        canvasContext.beginPath();
        canvasContext.moveTo(this.a.x, this.a.y);
        canvasContext.lineTo(this.b.x, this.b.y);
        canvasContext.stroke();
    }
}