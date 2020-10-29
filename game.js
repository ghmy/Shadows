var canvas;
var canvasContext;
var walls = [];  // LineSegments
var lightBeams = [];  // Vectors
var lightSourceX;
var lightSourceY;

function getMousePos(evt){
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return{
		x:mouseX,
		y:mouseY
	}
}

window.onload = function() {
	canvas = document.getElementById('canvas');
	canvasContext = canvas.getContext('2d');
    canvasContext.font = "15px Arial";
    lightSourceX = 50;
    lightSourceY = 50;

    for(let i = 0; i < 1800; i++){
        lightBeams.push(new Vector(new Position(Math.sin(toRadians(i/5)), Math.cos(toRadians(i/5)))));        
    }

    for(let i = 0; i < 10; i++){
        var randomX1 = Math.floor(Math.random() * canvas.width); 
        var randomY1 = Math.floor(Math.random() * canvas.height); 
        var randomX2 = Math.floor(Math.random() * canvas.width); 
        var randomY2 = Math.floor(Math.random() * canvas.height); 
        walls.push(new LineSegment(new Position(randomX1, randomY1), new Position(randomX2, randomY2)));
    }

    // Kenarlar
    walls.push(new LineSegment(new Position(0, 0), new Position(0, canvas.height)));
    walls.push(new LineSegment(new Position(0, 0), new Position(canvas.width, 0)));
    walls.push(new LineSegment(new Position(canvas.width, 0), new Position(canvas.width, canvas.height)));
    walls.push(new LineSegment(new Position(0, canvas.height), new Position(canvas.width, canvas.height)));
	
	var framesPerSecond = 60;
	setInterval(function(){
        findEndPoints();
		draw();
	}, 1000 / framesPerSecond);

	canvas.addEventListener('mousemove', function(evt){
		var mousePos = getMousePos(evt);
        lightSourceX = mousePos.x;
        lightSourceY = mousePos.y;
	});
}

function toRadians(angle){
    return Math.PI * angle / 180;
}

function findEndPoints(){
    let minDistance;
    for(let i = 0; i < lightBeams.length; i++){
        minDistance = Infinity;
        for(let j = 0; j < walls.length; j++){
            let point = lightBeams[i].getIntersectionPoint(walls[j]);
            if(point != undefined){
                let dist = (point.x - lightSourceX) * (point.x - lightSourceX) + (point.y - lightSourceY) * (point.y - lightSourceY);
                if(dist < minDistance){
                    minDistance = dist;
                    lightBeams[i].setEndPoint(new Position(point.x, point.y));
                }
            }
        }
    }
}

function draw(){
	drawBackground();
    drawLightSource();
    drawWalls();
    drawLightBeams();
}

function drawBackground(){
    canvasContext.fillStyle = 'black';
	canvasContext.fillRect(0,0, canvas.width, canvas.height);
}

function drawLightSource(){
    canvasContext.fillStyle = 'white';
	canvasContext.beginPath();
	canvasContext.arc(lightSourceX, lightSourceY, 4, 0, Math.PI*2, true);
	canvasContext.fill();
}

function drawWalls(){
    walls.forEach(drawWall)
}

function drawWall(wall){
    wall.draw();
}

function drawLightBeams(){
    lightBeams.forEach(drawBeam)
}

function drawBeam(beam){
    beam.draw();
}