let size = 50;
let gridWidth = Math.floor(document.documentElement.clientWidth / size);
let gridHeight = Math.floor(document.documentElement.clientHeight / size - 1);
let grid = [];

let date = new Date();
let lastTime = 0;
let currentTime;

let youLost = false;
let start = true;

let score = 1;
let snakeArray = [];
let direction;

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let randomPosition = new Position();
let applePosition = new Position();

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.apple = false;

    }
}

function setup() {
    createCanvas(gridWidth*size, gridHeight * size + size);
    background(10);
    for (i = 0; i < gridWidth; i++) {
        grid[i] = [];
        for (j = 0; j < gridHeight; j++) {
            grid[i][j] = new Cell(i, j);
        }
    }
    setRandoms();
    grid[randomPosition.x][randomPosition.y].apple = true;
    applePosition = new Position(randomPosition.x, randomPosition.y);
    setRandoms();
    snakeArray.push(new Position(floor(gridWidth / 2), floor(gridHeight / 2)));
}

function draw() {
    background(5);
    if (start) {
        fill("#ffffff");
        textSize(size);
        textAlign(CENTER, CENTER);
        text("Click and use WASD to start", gridHeight * size / 2, gridHeight * size / 2);
    }
    fill("#102060");
    rect(0, gridHeight * size, document.documentElement.clientWidth, 2 * size);
    updateApple();
    moveSnake();
    for (i = 0; i < gridWidth; i++) {
        for (j = 0; j < gridHeight; j++) {
            fill("#ff2222");
            if (grid[i][j].apple) circle(i * size + size / 2, j * size + size / 2, size * 0.9)
        }
    }
    for (i = 0; i < snakeArray.length; i++) {
        fill("#00ff50");
        rect(snakeArray[i].x * size, snakeArray[i].y * size, size, size);
    }
    fill("#ffffff");
    textSize(size);
    textAlign(LEFT, BASELINE);
    text("Snake-Length: " + score, 0.1 * size, gridHeight * size + size * 0.8);
    if (youLost) {
        noLoop();
        textSize(size * 1.3);
        textAlign(CENTER, CENTER);
        fill("#ff5555");
        circle(gridWidth * size / 2, gridHeight * size / 2, size * 9);
        fill("#ffffff");
        text("You Lost!", gridWidth * size / 2, gridHeight * size / 2 - size * 1.5);
        text("Snake-Length:", gridWidth * size / 2, gridHeight * size / 2);
        text(score, gridWidth * size / 2, gridHeight * size / 2 + size * 2);
    }
}

function moveSnake() {
    date = new Date();
    currentTime = date.getTime();
    if (currentTime - lastTime > 200) {
        if (direction == "up") {
            for (i = 0; i < snakeArray.length; i++) {
                if (snakeArray[0].x == snakeArray[i].x && snakeArray[0].y - 1 == snakeArray[i].y || snakeArray[0].y - 1 < 0) youLost = true;
            }
            if (!snakeArray[0].y - 1 < 0) snakeArray.unshift(new Position(snakeArray[0].x, snakeArray[0].y - 1));
        }
        if (direction == "left") {
            for (i = 0; i < snakeArray.length; i++) {
                if (snakeArray[0].x - 1 == snakeArray[i].x && snakeArray[0].y == snakeArray[i].y || snakeArray[0].x - 1 < 0) youLost = true;
            }
            if (!snakeArray[0].x - 1 < 0) snakeArray.unshift(new Position(snakeArray[0].x - 1, snakeArray[0].y));
        }
        if (direction == "right") {
            for (i = 0; i < snakeArray.length; i++) {
                if (snakeArray[0].x + 1 == snakeArray[i].x && snakeArray[0].y == snakeArray[i].y || snakeArray[0].x + 1 > gridWidth - 1) youLost = true;
            }
            if (snakeArray[0].x < gridWidth - 1) snakeArray.unshift(new Position(snakeArray[0].x + 1, snakeArray[0].y));
        }
        if (direction == "down") {
            for (i = 0; i < snakeArray.length; i++) {
                if (snakeArray[0].x == snakeArray[i].x && snakeArray[0].y + 1 == snakeArray[i].y || snakeArray[0].y + 1 > gridHeight - 1) youLost = true;
            }
            if (snakeArray[0].y < gridHeight - 1) snakeArray.unshift(new Position(snakeArray[0].x, snakeArray[0].y + 1));
        }
        if (snakeArray.length > score) snakeArray.pop();
        lastTime = date.getTime();
    }
}

function keyPressed() {
    if (keyCode == 87) direction = "up";
    if (keyCode == 65) direction = "left";
    if (keyCode == 83) direction = "down";
    if (keyCode == 68) direction = "right";
}

function updateApple() {
    if (grid[applePosition.x][applePosition.y] == grid[snakeArray[0].x][snakeArray[0].y] && grid[applePosition.x][applePosition.y].apple) {
        grid[applePosition.x][applePosition.y].apple = false;
        snakeArray.push(new Position(applePosition.x, applePosition.y));
        setRandoms();
        applePosition = new Position(randomPosition.x, randomPosition.y);
        grid[applePosition.x][applePosition.y].apple = true;
        score++;
    }
}

function setRandoms() {
    randomPosition.x = int(random(grid.length));
    randomPosition.y = int(random(grid[randomPosition.x].length));
}

function mouseClicked() {
    start = false;
}