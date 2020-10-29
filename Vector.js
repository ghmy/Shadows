class Vector{
    constructor(dir){
        this.dir = dir;
        this.endPoint = new Position(lightSourceX + 100 * dir.x, lightSourceY + 100 * dir.y);
    }
    setEndPoint(endPoint){
        this.endPoint = endPoint;
    }
    draw(){
        canvasContext.globalAlpha = 0.02;
        canvasContext.strokeStyle = 'white';
        canvasContext.lineWidth = 5;
        canvasContext.beginPath();
        canvasContext.moveTo(lightSourceX, lightSourceY);
        canvasContext.lineTo(this.endPoint.x, this.endPoint.y);
        canvasContext.stroke();      
        canvasContext.globalAlpha = 1;
    }

    getIntersectionPoint(lineSegment){
        const x3 = lightSourceX;
        const y3 = lightSourceY;
        const x4 = lightSourceX + this.dir.x;
        const y4 = lightSourceY + this.dir.y;

        const x1 = lineSegment.a.x;
        const y1 = lineSegment.a.y;
        const x2 = lineSegment.b.x;
        const y2 = lineSegment.b.y;

        const denom = (x1 - x2) * (y3 - y4) - (y1 - y2)*(x3 - x4);
        if(denom == 0) // LineSegment ve vector paralel
            return;
        const t = ((x1 - x3)*(y3-y4) - (y1 - y3)*(x3 - x4)) / denom;
        if(t >= 0 && t <= 1){
            const u = (-(x1 - x2)*(y1 - y3) + (y1 - y2)*(x1 - x3)) / denom;     
            if(u >= 0){
                return new Position(x1 + t*(x2 - x1), y1 + t * (y2 - y1));
            }  
        }
        return;
    }
}