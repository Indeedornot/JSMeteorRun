const game = document.getElementById('game');
const gameWidth = game.offsetWidth;
const gameHeight = game.offsetHeight;

const player = document.getElementById('player');
const playerHeight = player.offsetHeight;
const playerWidth = player.offsetWidth;
let playerX = 0;
let playerY = 0;
const playerMoveX = 20;
const playerMoveY = 20;

const obstacles = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName("obstacles");
const obstacleMoveX = 10;
const obstacleMoveY = 10;
const obstacleSpawnOffsetTop = obstacles[0].offsetTop;
const obstacleSpawnOffsetLeft = obstacles[0].offsetLeft;

//1 2 3 x
//2 
//3
//y

document.addEventListener('keydown', (e) => {
    if (e.code === "ArrowUp") playerY -= playerMoveY
    else if (e.code === "ArrowDown") playerY += playerMoveY
    else if (e.code === "ArrowLeft") playerX -= playerMoveX
    else if (e.code === "ArrowRight") playerX += playerMoveX
    playerX = inBoxPosition(playerX, 0, gameWidth, playerWidth, playerMoveX);
    playerY = inBoxPosition(playerY, 0, gameHeight, playerHeight, playerMoveY);
    player.style.left = playerX + "px";
    player.style.top = playerY + "px";
});

function getRandomInt(max): number {
    return Math.floor(Math.random() * max);
}

function inBoxPosition(currPos: number, lowerBound: number, upperBound: number, size: number, moveGrid: number): number {
    if (currPos < lowerBound) {
        currPos = upperBound + currPos - size;
    } else if (currPos + size > upperBound) {
        currPos = currPos - upperBound + size;
    }

    return Math.floor(currPos / size) * size;
}

function between(x, min, max) {
    return x >= min && x <= max;
}

let randomObstaclePos = setInterval(function () {
    for (let obstacle of obstacles) {
        let obstacleWidth = obstacle.offsetWidth;
        let obstacleHeight = obstacle.offsetHeight;
        let obstacleX = obstacle.offsetLeft;
        let obstacleY = obstacle.offsetTop;
        let choice = getRandomInt(9);
        //234
        //105
        //876
        switch (choice) {
            case 0:
                break;
            case 1:
                obstacleX = obstacleX - obstacleMoveX;
                break;
            case 2:
                obstacleX = obstacleX - obstacleMoveX;
                obstacleY = obstacleY - obstacleMoveY;
                break;
            case 3:
                obstacleY = obstacleY - obstacleMoveY;
                break;
            case 4:
                obstacleX = obstacleX - obstacleMoveX;
                obstacleY = obstacleY - obstacleMoveY;
                break;
            case 5:
                obstacleX = obstacleX - obstacleMoveX;
                break;
            case 6:
                obstacleX = obstacleX - obstacleMoveX;
                obstacleY = obstacleY + obstacleMoveY;
                break;
            case 7:
                obstacleY = obstacleY + obstacleMoveY;
                break;
            case 8:
                obstacleX = obstacleX - obstacleMoveX;
                obstacleY = obstacleY + obstacleMoveY;
                break;
        }
        obstacleX = inBoxPosition(obstacleX, 0, gameWidth, obstacleWidth, obstacleMoveX);
        obstacleY = inBoxPosition(obstacleY, 0, gameHeight, obstacleHeight, obstacleMoveY);
        obstacle.style.top = obstacleY + "px";
        obstacle.style.left = obstacleX + "px";
    }
}, 1000)

let debug = setInterval(function () {
    // console.group("Player");
    // console.log("X: " + playerX);
    // console.log("Y: " + playerY);
    // console.groupEnd();
    for (let i = 0; i < obstacles.length; i++) {
        console.group("Obstacle " + i);
        console.log("X: " + obstacles[i].style.left);
        console.log("Y: " + obstacles[i].style.top);
        console.groupEnd();
    }
}, 1000)

let isColliding = setInterval(function () {
    for (let obstacle of obstacles) {
        if (playerX == obstacle.offsetLeft && playerY == obstacle.offsetTop){
            alert("You lost");
            location.reload();
        }
    }
}, 50)

let addObstacle = setInterval(function(){
    let obstacle = document.createElement("div");
    obstacle.classList.add("obstacles");
    obstacle.style.top = String(obstacleSpawnOffsetTop);
    obstacle.style.left = String(obstacleSpawnOffsetLeft);
    game.appendChild(obstacle);
}, 1000)

//#region timer
const timer = document.getElementById('timer');
timer.innerHTML = "1";

let timerInterval = window.setInterval(function(){
    let newValue = parseInt(timer.innerHTML) + 1;
    timer.innerHTML = String(padLeadingZeros( newValue, 4));
}, 1000);

//adds zeros to number
function padLeadingZeros(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

//#endregion