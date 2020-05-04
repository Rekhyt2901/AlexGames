class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visited = false;
        this.top = true;
        this.right = true;
        this.bottom = true;
        this.left = true;
    }

}

let labWidth = 30;
let labHeight = 30;
let cellSize = 10;
let labyrinth = [];
let stack = [];

let startX;
let startY;
let finishX;
let finishY;

function setup() {
    createCanvas(labWidth * cellSize + cellSize, labHeight * cellSize + cellSize);
    background(100);
    for (i = 0; i < labHeight; i++) {
        labyrinth[i] = new Array(labWidth);
        for (j = 0; j < labWidth; j++) {
            labyrinth[i][j] = new Cell(i, j);
        }
    }
    let current = labyrinth[int(random(labWidth))][int(random(labHeight))];
    current.visited = true;
    stack.push(current);
    startX = int(random(labWidth));
    startY = int(random(labWidth));
    finishX = int(random(labWidth));
    finishY = int(random(labWidth));
}

function draw() {
    translate(cellSize / 2, cellSize / 2);
    background(100);
    for (y = 0; y < labHeight; y++) {
        for (x = 0; x < labWidth; x++) {
            drawCell(labyrinth[x][y]);
        }
    }
    if (stack.length > 0) {
        let current = stack.pop();
        highlight(current, "#fff");
        let next = findNeighbours(current);
        if (next) {
            stack.push(current);
            removeWalls(current, next);
            next.visited = true;
            stack.push(next);
        }
    } else {
        highlight(labyrinth[startX][startY], "#00ff00");
        highlight(labyrinth[finishX][finishY], "#ff0000");
        noLoop();
    }
}


function highlight(cell, color) {
    fill(color);
    rect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    fill(100);
}

function drawCell(cell) {
    if (cell.top) line(cell.x * cellSize, cell.y * cellSize, cell.x * cellSize + cellSize, cell.y * cellSize);
    if (cell.left) line(cell.x * cellSize, cell.y * cellSize, cell.x * cellSize, cell.y * cellSize + cellSize);
    if (cell.bottom) line(cell.x * cellSize, cell.y * cellSize + cellSize, cell.x * cellSize + cellSize, cell.y * cellSize + cellSize);
    if (cell.right) line(cell.x * cellSize + cellSize, cell.y * cellSize, cell.x * cellSize + cellSize, cell.y * cellSize + cellSize);

}

function findNeighbours(cell) {
    let unvisited = [];
    let tx = 0,
        ty = 0;
    if (cell.y > 0 && labyrinth[cell.x][cell.y - 1].visited === false) {
        tx = cell.x;
        ty = cell.y - 1;
        unvisited.push(labyrinth[cell.x][cell.y - 1]);
    }
    if (cell.x < labWidth - 1 && labyrinth[cell.x + 1][cell.y].visited === false) {
        tx = cell.x + 1;
        ty = cell.y;
        unvisited.push(labyrinth[cell.x + 1][cell.y]);
    }
    if (cell.y < labHeight - 1 && labyrinth[cell.x][cell.y + 1].visited === false) {
        tx = cell.x;
        ty = cell.y + 1;
        unvisited.push(labyrinth[cell.x][cell.y + 1]);
    }
    if (cell.x > 0 && labyrinth[cell.x - 1][cell.y].visited === false) {
        tx = cell.x - 1;
        ty = cell.y;
        unvisited.push(labyrinth[cell.x - 1][cell.y]);
    }
    if (unvisited.length === 0) return undefined;
    let idx = int(random(unvisited.length));
    result = unvisited[idx];
    return result;
}

function removeWalls(current, next) {
    if (current.x < next.x) {
        current.right = false;
        next.left = false;
    }
    if (current.x > next.x) {
        current.left = false;
        next.right = false;
    }
    if (current.y < next.y) {
        current.bottom = false;
        next.top = false;
    }
    if (current.y > next.y) {
        current.top = false;
        next.bottom = false;
    }
}