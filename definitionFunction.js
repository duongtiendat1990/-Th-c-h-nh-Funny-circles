function createCircles() {
    for (let i = 0; i < n; i++) {
        let radiusValue = randomRadius();
        circles[i] = {
            x : randomXCoordinate(),
            y : randomYCoordinate(),
            radius : radiusValue,
            vx : randomVelocity(),
            vy : randomVelocity(),
            color : getRandomColor(),
            // collision: 0,
            mass : getMass(radiusValue),
        };
    }
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

function checkOverlappedCircles() {
    for (let i = 0; i<n; i++){
        for (let j = n-1; j>0,j!==i;j--){
            var distance_x = Math.abs(circles[i].x - circles[j].x);
            var distance_y = Math.abs(circles[i].y - circles[j].y);
            console.log('circles[i].x= ' + circles[i].x + ' ; circles[j].x= ' + circles[j].x + ' ; distance_x= ' + distance_x);
            console.log('circles[i].y= ' + circles[i].y + ' ; circles[j].y= ' + circles[j].y + ' ; distance_y= ' + distance_y);
            var distance = Math.sqrt(distance_x * distance_x + distance_y * distance_y);
            if (distance <= (circles[i].radius + circles[j].radius)) {
                circles[i].x = randomXCoordinate();
                circles[i].y = randomYCoordinate();
                circles[j].x = randomXCoordinate();
                circles[j].y = randomYCoordinate();
                checkOverlappedCircles();
            }
        }
    }
}

function moveCircles() {
    let pen = canvas.getContext('2d');
    pen.clearRect(0, 0, maxWidth, maxHeight);
    for (let circle of circles) {
        if (circle.x > (maxWidth - circle.radius - circle.vx) || circle.x < (circle.radius - circle.vx)) {
            circle.vx = -1 * (circle.vx);
        }
        if (circle.y > (maxHeight - circle.radius - circle.vy) || circle.y < (circle.radius - circle.vy)) {
            circle.vy = -1 * (circle.vy);
        }
        checkBallsCollide();
        pen.beginPath();
        pen.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
        pen.fillStyle = circle.color;
        pen.fill();
        pen.stroke();
        circle.x += circle.vx;
        circle.y += circle.vy;
    }
}

function checkBallsCollide() {
    for (let i = 0; i < n; i++) {
        for (let j = n-1; j>0,j!==i;j--) {
            distance_x = Math.abs(circles[i].x - circles[j].x);
            distance_y = Math.abs(circles[i].y - circles[j].y);
            distance = Math.sqrt(distance_x * distance_x + distance_y * distance_y);
            if (distance <= (circles[i].radius + circles[j].radius)) {
                collideBalls(i, j);
                // circles[i].collision = 1;
                // circles[j].collision = 1;
            }
            // else if (distance > (circles[i].radius + circles[j].radius)) {
            //     circles[i].collision = 0;
            //     circles[j].collision = 0;
            // }
        }
    }
}

function collideBalls(i, j) {
    // var ax = (circles[i].vx * (circles[i].mass - circles[j].mass) + (2 * circles[j].mass * circles[j].vx)) / (circles[i].mass + circles[j].mass);
    // var ay = (circles[i].vy * (circles[i].mass - circles[j].mass) + (2 * circles[j].mass * circles[j].vy)) / (circles[i].mass + circles[j].mass);
    // circles[j].vx = (circles[j].vx * (circles[j].mass - circles[i].mass) + (2 * circles[i].mass * circles[i].vx)) / (circles[i].mass + circles[j].mass);
    // circles[j].vy = (circles[j].vy * (circles[j].mass - circles[i].mass) + (2 * circles[i].mass * circles[i].vy)) / (circles[i].mass + circles[j].mass);
    // circles[i].vx = ax;
    // circles[i].vy = ay;
    dx = circles[i].x - circles[j].x;
    dy = circles[i].y - circles[j].y;
    collision_angle = Math.atan2(dy, dx);
    magnitude_1 = Math.sqrt(circles[i].vx * circles[i].vx + circles[i].vy * circles[i].vy);
    magnitude_2 = Math.sqrt(circles[j].vx * circles[j].vx + circles[j].vy * circles[j].vy);
    direction_1 = Math.atan2(circles[i].vy, circles[i].vx);
    direction_2 = Math.atan2(circles[j].vy, circles[j].vx);
    // circles[i].vx = ((magnitude_1 * Math.cos(direction_1 - collision_angle) * (circles[i].mass - circles[j].mass)
    //     + 2 * circles[j].mass * magnitude_2 * Math.cos(direction_2 - collision_angle))/(circles[i].mass + circles[j].mass))
    //     * Math.cos(collision_angle) + (magnitude_1 * Math.sin(direction_1 - collision_angle) * Math.sin(collision_angle));
    // circles[i].vy = ((magnitude_1 * Math.cos(direction_1 - collision_angle) * (circles[i].mass - circles[j].mass)
    //     + 2 * circles[j].mass * magnitude_2 * Math.cos(direction_2 - collision_angle))/(circles[i].mass + circles[j].mass))
    //     * Math.sin(collision_angle) + (magnitude_1 * Math.sin(direction_1 - collision_angle) * Math.sin(collision_angle));
    // circles[j].vx = ((magnitude_2 * Math.cos(direction_2 - collision_angle) * (circles[j].mass - circles[i].mass)
    //     + 2 * circles[i].mass * magnitude_1 * Math.cos(direction_1 - collision_angle))/(circles[j].mass + circles[i].mass))
    //     * Math.cos(collision_angle) + (magnitude_2 * Math.sin(direction_2 - collision_angle) * Math.sin(collision_angle));
    // circles[j].vy = ((magnitude_2 * Math.cos(direction_2 - collision_angle) * (circles[j].mass - circles[i].mass)
    //     + 2 * circles[i].mass * magnitude_1 * Math.cos(direction_1 - collision_angle))/(circles[j].mass + circles[i].mass))
    //     * Math.sin(collision_angle) + (magnitude_2 * Math.sin(direction_2 - collision_angle) * Math.sin(collision_angle));


    new_vx_1 = magnitude_1 * Math.cos(direction_1 - collision_angle);
    new_vy_1 = magnitude_1 * Math.sin(direction_1 - collision_angle);
    new_vx_2 = magnitude_2 * Math.cos(direction_2 - collision_angle);
    new_vy_2 = magnitude_2 * Math.sin(direction_2 - collision_angle);
    final_vx_1 = ((circles[i].mass - circles[j].mass) * new_vx_1 + (circles[j].mass + circles[j].mass) * new_vx_2) / (circles[i].mass + circles[j].mass);
    final_vx_2 = ((circles[i].mass + circles[i].mass) * new_vx_1 + (circles[j].mass - circles[i].mass) * new_vx_2) / (circles[i].mass + circles[j].mass);
    final_vy_1 = new_vy_1;
    final_vy_2 = new_vy_2;
    circles[i].vx = Math.cos(collision_angle) * final_vx_1 + Math.cos(collision_angle + Math.PI / 2) * final_vy_1;
    circles[i].vy = Math.sin(collision_angle) * final_vx_1 + Math.sin(collision_angle + Math.PI / 2) * final_vy_1;
    circles[j].vx = Math.cos(collision_angle) * final_vx_2 + Math.cos(collision_angle + Math.PI / 2) * final_vy_2;
    circles[j].vy = Math.sin(collision_angle) * final_vx_2 + Math.sin(collision_angle + Math.PI / 2) * final_vy_2;
    circles[i].color = getRandomColor();
    circles[j].color = getRandomColor();
}
