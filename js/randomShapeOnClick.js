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

    context.fillStyle = 'rgba(255, 255, 255, 0.3)';

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

function getMousePos(canvas, evt) {
    let rect = canvas.getBoundingClientRect();

    //return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
    return new Point(evt.clientX, evt.clientY);
};

let backgroundColor = '#1d211e';

clearCanvas(backgroundColor);

canvas.addEventListener('click', function(evt) {
    var shape = new RandomShape();
    shape.draw();
}, false)
