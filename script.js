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
        vx : randomVelocity(),
        vy : randomVelocity(),
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
            circle.vx = -1 * (circle.vx);
        }
        if (circle.y > (maxHeight - circle.radius) || circle.y < circle.radius) {
            circle.vy = -1 * (circle.vy);
        }
        for (let i=0; i<n;i++){
            for (let j=i+1;j<n;j++){
                if (Math.sqrt(Math.pow((circles[i].x-circles[j].x),2)
                    + Math.pow((circles[i].y-circles[j].y),2)) <= circles[i].radius+circles[j].radius){
                    dx = circles[i].x-circles[j].x;
                    dy = circles[i].y-circles[j].y;
                    collisionision_angle = Math.atan2(dy, dx);
                    magnitude_1 = Math.sqrt(circles[i].vx*circles[i].vx+circles[i].vy*circles[i].vy);
                    magnitude_2 = Math.sqrt(circles[j].vx*circles[j].vx+circles[j].vy*circles[j].vy);
                    direction_1 = Math.atan2(circles[i].vy, circles[i].vx);
                    direction_2 = Math.atan2(circles[j].vy, circles[j].vx);
                    new_vx_1 = magnitude_1*Math.cos(direction_1-collisionision_angle);
                    new_vy_1 = magnitude_1*Math.sin(direction_1-collisionision_angle);
                    new_vx_2 = magnitude_2*Math.cos(direction_2-collisionision_angle);
                    new_vy_2 = magnitude_2*Math.sin(direction_2-collisionision_angle);
                    final_vx_1 = ((circles[i].mass-circles[j].mass)*new_vx_1+(circles[j].mass+circles[j].mass)*new_vx_2)/(circles[i].mass+circles[j].mass);
                    final_vx_2 = ((circles[i].mass+circles[i].mass)*new_vx_1+(circles[j].mass-circles[i].mass)*new_vx_2)/(circles[i].mass+circles[j].mass);
                    final_vy_1 = new_vy_1;
                    final_vy_2 = new_vy_2;
                    circles[i].vx = Math.cos(collisionision_angle)*final_vx_1+Math.cos(collisionision_angle+Math.PI/2)*final_vy_1;
                    circles[i].vy = Math.sin(collisionision_angle)*final_vx_1+Math.sin(collisionision_angle+Math.PI/2)*final_vy_1;
                    circles[j].vx = Math.cos(collisionision_angle)*final_vx_2+Math.cos(collisionision_angle+Math.PI/2)*final_vy_2;
                    circles[j].vy = Math.sin(collisionision_angle)*final_vx_2+Math.sin(collisionision_angle+Math.PI/2)*final_vy_2;
                    circles[i].color = getRandomColor();
                    circles[j].color = getRandomColor();
                }
            }
        }
        pen.beginPath();
        pen.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        pen.fillStyle = circle.color;
        pen.fill();
        pen.stroke();

        circle.x += circle.vx;
        circle.y += circle.vy;
    }
}
setInterval(moveCircles,10);
