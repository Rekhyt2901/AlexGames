/**
Start with a grid full of walls.
Pick a cell, mark it as part of the maze.
Add the walls of the cell to the wall list.
While there are walls in the list:
    1. Pick a random wall from the list. If the cell on the opposite side isn't in the maze yet:
    Make the wall a passage and mark the cell on the opposite side as part of the maze.**
    Add the neighboring walls of the cell to the wall list.
    Remove the wall from the list.
*/



class cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.pathed = false;
        this.directionToPath = "start";
    }
}

let labWidth = 10;
let labHeight = 10;
let cellSize = 50;
let Labyrinth = [];
let current;
let stack = [];


function setup() {
    createCanvas(labWidth * cellSize, labHeight * cellSize);
    background(100);
    fill("#00ff00");

    for (i = 0; i < labWidth; i++) {
        Labyrinth[i] = [];
        for (j = 0; j < labHeight; j++) {
            Labyrinth[i][j] = new cell(i, j);
        }
    }
    //let randomX = int(random(labWidth));
    //let randomY = int(random(labHeight));
    let randomX = 5;
    let randomY = 5;
    Labyrinth[randomX][randomY].pathed = true;
    current = Labyrinth[randomX][randomY];
    addWallsToStack(current);
}

function draw() {
    randomWall();

    for (i = 0; i < labWidth; i++) {
        for (j = 0; j < labHeight; j++) {
            if (!Labyrinth[i][j].pathed) rect(Labyrinth[i][j].x * cellSize, Labyrinth[i][j].y * cellSize, cellSize, cellSize);
        }
    }
}

function randomWall() {
    print("doing randomWall of cell:" + cell);
    randomIndex = int(random(stack.length));
    print ("randomIndex: " + randomIndex);
    current = stack[randomIndex];
    print ("stack at randomIndex : " + stack[randomIndex]);
    if (current.directionToPath === "right" && !Labyrinth[current.x - 1][current.y].pathed
        || current.directionToPath === "left" && !Labyrinth[current.x + 1][current.y].pathed
        || current.directionToPath === "top" && !Labyrinth[current.x][current.y + 1].pathed
        || current.directionToPath === "bottom" && !Labyrinth[current.x][current.y - 1].pathed) {
        current.pathed = true;
        addWallsToStack(current);
    }
    stack.splice(randomIndex, 1);

}

function addWallsToStack(cell) {
    print("adding Walls of Cell: " + cell);
    if (!Labyrinth[cell.x + 1][cell.y].pathed) {
        Labyrinth[cell.x + 1][cell.y].directionToPath = "left";
        stack.push(Labyrinth[cell.x + 1][cell.y]);
    }
    if (!Labyrinth[cell.x - 1][cell.y].pathed) {
        Labyrinth[cell.x - 1][cell.y].directionToPath = "right";
        stack.push(Labyrinth[cell.x - 1][cell.y]);
    }
    if (!Labyrinth[cell.x][cell.y + 1].pathed) {
        Labyrinth[cell.x][cell.y + 1].directionToPath = "top";
        stack.push(Labyrinth[cell.x][cell.y + 1]);
    }
    if (!Labyrinth[cell.x][cell.y - 1].pathed) {
        Labyrinth[cell.x][cell.y - 1].directionToPath = "bottom";
        stack.push(Labyrinth[cell.x][cell.y - 1]);
    }
}