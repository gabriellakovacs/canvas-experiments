const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

let w = window.innerWidth;
let h = window.innerHeight;

const pi = Math.PI;

canvas.width = w;
canvas.height = h;

context.translate(canvas.width / 2, canvas.height / 2);


//FUNCTIONS ---------------------------------
function Point (x, y){
    this.x = x;
    this.y = y;
}


function Ractangle(centerPoint, sideLength) {
    this.centerPoint = centerPoint;
    this.centerPoint.x = centerPoint.x;
    this.centerPoint.y = centerPoint.y;
    this.sideLength = sideLength;
}


Ractangle.prototype.draw = function() {
    context.beginPath();
    context.rect(this.centerPoint.x - this.sideLength / 2,  this.centerPoint.y - this.sideLength / 2, this.sideLength, this.sideLength);
    context.stroke();
}

function RandomShape() {
    this.shapeCenter = new Point(Math.random() * w - w/2, Math.random() * h - h/2);
    this.nrOfVertices = Math.random() * (30 - 3) + 3;
    this.shapeRadius =  Math.random() * (30 - 8) + 8;
    this.vertices = [];
    this.vertex;

    for(var i = 0; i <= this.nrOfVertices; i++) {
        this.vertex = new Point(this.shapeCenter.x + Math.sign(Math.random() * 2 - 1) * Math.random() * this.shapeRadius, 
                           this.shapeCenter.y + Math.sign(Math.random() * 2 - 1) * Math.random() * this.shapeRadius);
        this.vertices.push(this.vertex); 
        console.log('this.vertex ' + this.vertex );
    }
}

RandomShape.prototype.draw = function() {
   
    context.beginPath();
    context.moveTo(this.vertices[0].x, this.vertices[0].y);

    context.fillStyle = 'rgba(255, 255, 255, 0.3)'

    for(var i = 1; i <= this.nrOfVertices; i++) {
        context.lineTo(this.vertices[i].x, this.vertices[i].y);
    }

    context.closePath();
    context.fill();
}

function clearCanvas(backgroundColor) {
    context.fillStyle = backgroundColor;
    context.fillRect(-w/2, -h/2, w, h);
}


function drawTriangles(p1, p2, p3) {

    generateColor();
    context.beginPath();
    context.moveTo(p1.x, p1.y);
    context.lineTo(p2.x, p2.y);
    context.lineTo(p3.x, p3.y);
    context.lineTo(p1.x, p1.y);
    context.stroke();
    context.closePath();
}


function generateColor() {
    var red = Math.round(Math.random() * 255);
    var green = Math.round(Math.random() * 255);
    var blue = Math.round(Math.random() * 255);
    var opacity = Math.random();

    return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + opacity + ')';
}


function getDistance(p1, p2) {
    return Math.sqrt(Math.pow((p1.x - p2.x), 2) + Math.pow((p1.y - p2.y), 2))
}


function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();

    //return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
    return new Point(evt.clientX, evt.clientY);
};


function getMousePosToCenterRatio(mousePos, centerPoint, maxDistFromCenter) {
    let mousePosDistFromCenter = getDistance(mousePos, centerPoint);

    return mousePosDistFromCenter / maxDistFromCenter;
};


//PARAMETERS -------------------------------
let centerPoint = new Point(w/2, h/2);
let backgroundColor = '#1d211e';

let rectangleColor = 'rgba(9, 70, 155, 0.4)';
// let rectangleStrokeW = 6;
// let rectangleW = rectangleStrokeW * 2 * 10;

// let maxDistFromCenter = getDistance(new Point(0, 0), centerPoint);

clearCanvas(backgroundColor);

//let centerList = generateRecangleCenters(rectangleW, rectangleStrokeW);


//drawRectangles(centerList, rectangleW, rectangleColor, rectangleStrokeW, 0);



//MAIN FUNCTION -----------------------------  

// window.onresize = function() {
//     w = window.innerWidth;
//     h = window.innerHeight;


//     canvas.width = w;
//     canvas.height = h;

//     centerPoint = new Point(w/2, h/2);
//     maxDistFromCenter = getDistance(new Point(0, 0), centerPoint);

//     clearCanvas(backgroundColor);

//     // centerList = generateRecangleCenters(rectangleW, rectangleStrokeW);


//     // drawRectangles(centerList, rectangleW, rectangleColor, rectangleStrokeW, 0);
// };  


// canvas.addEventListener('mousemove', function(evt) {

//     //backgroundColor = generateColor();

//     //clearCanvas(backgroundColor);
    
//     let mousePos = getMousePos(canvas, evt);

//     console.log('mouse x ' + mousePos.x);
//     console.log('mouse y ' + mousePos.y);

//     mousePos.x -= w/2;
//     mousePos.y -= h/2;

//     //let mousePosToCenterRatio = getMousePosToCenterRatio(mousePos, centerPoint, maxDistFromCenter);
//     //
//     context.fillStyle = generateColor();

//     //context.scale(-1, -1);
    

//     // create bounding rectangle path
//     context.beginPath();
//     context.moveTo(-w/2, -h/2);
//     context.lineTo(0, -h/2);
//     context.lineTo(0, h/2);
//     context.lineTo(-w/2, h/2);
//     context.closePath();

//     // stroke the rectangle so we can see it
//     // context.fillStyle = 'rgba(0, 0, 0, 0.5)';
//     // context.lineWidth = 1;
//     //context.stroke();    

//     // use rectangle as clip, 
//     context.save();
//     context.clip();

//     //fill rect in again with yellow
//     //RED
//     context.fillStyle = 'rgba(255, 0, 0, 1)';


//     context.beginPath();
//     context.moveTo(mousePos.x + 10, mousePos.y + 10);
//     context.lineTo(mousePos.x + 60, mousePos.y + 50);
//     context.lineTo(mousePos.x + 110, mousePos.y + 50);
//     context.lineTo(mousePos.x + 10, mousePos.y + 10);
//     context.fill();
//     context.closePath();

//     context.restore(); 




//     //----------------------------
//     // flip context horizontally
//     //----------------------------
    
//     context.save();
//     context.scale(-1, 1);
//     //BLUE
//     context.fillStyle = 'rgba(0, 0, 255, 1)';

//     context.beginPath();
//     context.moveTo(mousePos.x + 10, mousePos.y + 10);
//     context.lineTo(mousePos.x + 60, mousePos.y + 50);
//     context.lineTo(mousePos.x + 110, mousePos.y + 50);
//     context.lineTo(mousePos.x + 10, mousePos.y + 10);
//     context.fill();
//     context.closePath();

//     //----------------------------
//     // flip context back
//     //----------------------------
//     context.restore(); 

// }, false);  
// 

canvas.addEventListener('click', function(evt) {
    console.log('clicked');
    var shape = new RandomShape();
    shape.draw();
}, false)
