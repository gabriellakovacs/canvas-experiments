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


function Circle(centerPoint, radius) {
    this.center = centerPoint;
    this.radius = radius;
}


Circle.prototype.draw = function() {
    context.fillStyle = 'rgba(255, 255, 255, 0.3)';
    context.beginPath();
    context.arc(this.center.x, this.center.y, this.radius, 0, 360, false);
    context.fill();
    context.closePath();
}

Circle.prototype.update = function(moveTo) {
    this.center.x = moveTo.x;
    this.center.y = moveTo.y;
}


function clearCanvas(backgroundColor) {
    context.fillStyle = backgroundColor;
    context.fillRect(-w/2, -h/2, w, h);
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


function createCircles(nrOfCircles) {
    var circles = [];
    var circle;
    var circleCenter;

    for(var i = 0; i < nrOfCircles; i++) {
        circleCenter = new Point(Math.random() * 30, Math.random() * Math.sign(Math.random() * 2 - 1) * 30);
        circle = new Circle(circleCenter , 20);
        circles.push(circle);
    }

    return circles;
};

function updateCirclePositions(nrOfCircles, circles) {
    var circle;
    for(var i = 0; i < nrOfCircles; i++) {
        circle = circles[i];
        circleCenter = new Point(circle.center.x + step - i/10 , Math.pow(step/i * 10 , 2) * Math.sign((i % 2) * 2 - 1));
        circle.update(circleCenter);
    }
}

function drawCircles(nrOfCircles, circles) {
    var circle;
    for(var i = 0; i < nrOfCircles; i++) {
        circle = circles[i];
        circle.draw();
    }
}


function generateColor() {
    var red = Math.round(Math.random() * 255);
    var green = Math.round(Math.random() * 255);
    var blue = Math.round(Math.random() * 255);
    var opacity = Math.random();

    return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + opacity + ')';
}

//PARAMETERS -------------------------------
let centerPoint = new Point(w/2, h/2);
let backgroundColor = '#1d211e';

let circleColor = 'rgba(255, 0, 0, 0.3)';
context.fillStyle = circleColor;
clearCanvas(backgroundColor);

let nrOfCircles = 100;


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

var circles = createCircles(nrOfCircles);
//drawCircles(nrOfCircles, circles);


function still(step) {



    //backgroundColor = generateColor();
    clearCanvas(backgroundColor);

    context.strokeStyle = 'rgb(255, 0, 0)';


    //create bounding rectangle path
    context.beginPath();
    context.moveTo(-w/2, -h/2);
    context.lineTo(0, -h/2);
    context.lineTo(0, h/2);
    context.lineTo(-w/2, h/2);
    context.closePath();
    context.stroke();


    // only draw stuff inside this rectanle (half of the screen)
    //context.save();
    //context.clip();


    updateCirclePositions(nrOfCircles, circles);
    drawCircles(nrOfCircles, circles);

    //context.restore();
}

var step = 0;
function move() {
    var t = setInterval(function() {still(step++)}, 80);
}

move();

/* about the movement check this out
https://codepen.io/sean_codes/pen/LyyEQb
*/
