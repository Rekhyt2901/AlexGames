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

class Cell {
    constructor(x, y, path) {
        this.x = x;
        this.y = y;
        this.path = path;
    }
}

let labWidth = 100;
let labHeight = 50;
let size = 10;

let lab = [];

let randomX;
let randomY;

let stack = [];
let current;

function setup() {
    randomX = int(random(labWidth));
    randomY = int(random(labHeight));
    createCanvas(labWidth*size, labHeight*size);
    for (i = 0; i < labWidth; i++) {
        lab[i] = [];
        for (j = 0; j < labHeight; j++) {
            lab[i][j] = new Cell(i, j, false);
        }
    }
    lab[randomX][randomY].path = true;
    stack.push(lab[randomX][randomY]);
}

function draw() {
    if (stack.length > 0) {
        currentIndex = int(random(stack.length));
        current = stack[currentIndex];
        if (current.x + 2 < labWidth - 1 && !lab[current.x + 2][current.y].path
            && !lab[current.x + 1][current.y + 1].path
            && !lab[current.x + 1][current.y - 1].path
            && !lab[current.x + 2][current.y + 1].path
            && !lab[current.x + 2][current.y - 1].path) {
            lab[current.x + 1][current.y].path = true;
            stack.push(lab[current.x + 1][current.y]);
        }
        if (current.x - 2 > 0 && !lab[current.x - 2][current.y].path
            && !lab[current.x - 1][current.y + 1].path
            && !lab[current.x - 1][current.y - 1].path
            && !lab[current.x - 2][current.y + 1].path
            && !lab[current.x - 2][current.y - 1].path) {
            lab[current.x - 1][current.y].path = true;
            stack.push(lab[current.x - 1][current.y]);
        }
        if (current.y + 2 < labHeight - 1 && !lab[current.x][current.y + 2].path
            && !lab[current.x + 1][current.y + 1].path
            && !lab[current.x - 1][current.y + 1].path
            && !lab[current.x + 1][current.y + 2].path
            && !lab[current.x - 1][current.y + 2].path) {
            lab[current.x][current.y + 1].path = true;
            stack.push(lab[current.x][current.y + 1]);
        }
        if (current.y - 2 > 0 && !lab[current.x][current.y - 2].path
            && !lab[current.x + 1][current.y - 1].path
            && !lab[current.x - 1][current.y - 1].path
            && !lab[current.x + 1][current.y - 2].path
            && !lab[current.x - 1][current.y - 2].path) {
            lab[current.x][current.y - 1].path = true;
            stack.push(lab[current.x][current.y - 1]);
        }
        stack.splice(currentIndex, 1);
    }
    displayLab();
}

function displayLab() {
    for (i = 0; i < labWidth; i++) {
        for (j = 0; j < labHeight; j++) {
            if (lab[i][j].path) {
                fill("#ffffff");
                rect(i * size, j * size, size, size);
            } else {
                fill("#000000");
                rect(i * size, j * size, size, size);
            }
        }
    }
}