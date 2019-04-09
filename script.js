let canvas = document.getElementById('myCanvas');
canvas.height = window.innerHeight -22;
canvas.width = window.innerWidth -10;
const maxWidth = canvas.width;
const maxHeight = canvas.height;
let n = parseInt(prompt(' Enter number of balls'));
let circles = new Array(n);
for (let i = 0; i < n; i++) {
    let radiusValue = randomRadius();
    circles[i] = {
        x : randomXCoordinate(),
        y : randomYCoordinate(),
        radius : radiusValue,
        dx : randomVelocity(),
        dy : randomVelocity(),
        color : getRandomColor(),
        mass : getMass(radiusValue),
    };
}

function getRandomHex() {
    return Math.floor(Math.random()*255);
}

function getRandomColor() {
    let red = getRandomHex();
    let blue = getRandomHex();
    let green = getRandomHex();
    return 'rgb(' + red + ',' + blue + ',' + green + ')';
}

function randomXCoordinate() {
    let ranX = Math.random();
    let xCoordinate = ranX * (maxWidth - 100) + 50;
    if (xCoordinate) {
        return xCoordinate;
    }
    else return randomXCoordinate()
}

function randomYCoordinate() {
    let ranY = Math.random();
    let yCoordinate = ranY * (maxHeight - 100) + 50;
    if (yCoordinate) {
        return yCoordinate;
    }
    else return randomXCoordinate()
}

function randomRadius() {
    return Math.floor(Math.random()*20) + 20;
}

function getMass(radius) {
    let mass = Math.PI * Math.pow(radius,2);
    return mass;
}

function randomVelocity() {
    let velocity = Math.floor(Math.random()*6 - 3 );
    if (velocity){
        if (velocity<0){
            velocity -= 3;
            return velocity;
        } else if (velocity>0){
            velocity +=3;
            return velocity;
        } else if (velocity === 0) {
            return randomVelocity();
        }
    } else return randomVelocity()
}
function moveCircles() {
    let pen = canvas.getContext('2d');
    pen.clearRect(0, 0, maxWidth, maxHeight);
    for (let circle of circles) {
        if (circle.x > (maxWidth - circle.radius) || circle.x < circle.radius) {
            circle.dx = -1 * (circle.dx);
        }
        if (circle.y > (maxHeight - circle.radius) || circle.y < circle.radius) {
            circle.dy = -1 * (circle.dy);
        }
        // for (let i=0; i<n;i++){
        //     for (let j=i+1;j<n;j++){
        //         if (Math.sqrt(Math.pow((circles[i].x-circles[j].x),2)
        //             + Math.pow((circles[i].y-circles[j].y),2)) <= circles[i].radius+circles[j].radius){
        //             circles[i].vx = -circles[i].vx;
        //             circles[i].vy = -circles[i].vy;
        //             circles[j].vx = -circles[j].vx;
        //             circles[j].vy = -circles[j].vy;
        //
        //             circles[i].dx = (circles[i].dx * (circles[i].mass - circles[j].mass) + (2 * circles[j].mass * circles[j].dx)) / (circles[i].mass + circles[j].mass);
        //             circles[i].dy = (circles[i].dy * (circles[i].mass - circles[j].mass) + (2 * circles[j].mass * circles[j].dy)) / (circles[i].mass + circles[j].mass);
        //             circles[j].dx = (circles[j].dx * (circles[j].mass - circles[i].mass) + (2 * circles[i].mass * circles[i].dx)) / (circles[i].mass + circles[j].mass);
        //             circles[j].dy = (circles[j].dy * (circles[j].mass - circles[i].mass) + (2 * circles[i].mass * circles[i].dy)) / (circles[i].mass + circles[j].mass);
        //
        //             circles[i].color = getRandomColor();
        //             circles[j].color = getRandomColor();
        //         }
        //     }
        // }
        pen.beginPath();
        pen.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        pen.fillStyle = circle.color;
        pen.fill();
        pen.stroke();

        circle.x += circle.dx;
        circle.y += circle.dy;
    }
}
setInterval(moveCircles,10);
