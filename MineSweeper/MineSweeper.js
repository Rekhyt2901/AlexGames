let size = 128;
let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;
let gridWidth = (clientWidth - clientWidth % size) / size;
let gridHeight = (clientHeight - clientHeight % size) / size;
let grid = [];

let numberOfMines = 10;
let mineArray = [];

let randomX;
let randomY;

let unopened;
let marked;
let markedWrong;
let mine;
let mineClicked;
let empty;
let empty1;
let empty2;
let empty3;
let empty4;
let empty5;
let empty6;
let empty7;
let empty8;


class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.hasMine = false;
        this.image;
        this.surroundingMines = 0;
    }
}

function preload() {
    print("preloading");
    unopened = loadImage("res/Unopened.png");
    marked = loadImage("res/Marked.png");
    markedWrong = loadImage("res/MarkedWrong.png");
    mine = loadImage("res/Mine.png");
    clickedMine = loadImage("res/ClickedMine.png");
    empty = loadImage("res/Empty.png");
    empty1 = loadImage("res/Empty1.png");
    empty2 = loadImage("res/Empty2.png");
    empty3 = loadImage("res/Empty3.png");
    empty4 = loadImage("res/Empty4.png");
    empty5 = loadImage("res/Empty5.png");
    empty6 = loadImage("res/Empty6.png");
    empty7 = loadImage("res/Empty7.png");
    empty8 = loadImage("res/Empty8.png");
}

function setup() {
    createCanvas(clientWidth, clientHeight);
    background(100);
    for (i = 0; i < gridWidth; i++) { //makes the 2d grid array
        grid[i] = [];
        for (j = 0; j < gridHeight; j++) {
            grid[i][j] = new Cell(i, j);
            grid[i][j].img = unopened;
        }
    }
    for (i = 0; i < numberOfMines; i++) { // makes the mines
        setRandoms();
        if (!mineArray.includes(grid[randomX][randomY])) {
            grid[randomX][randomY].img = mine;
            grid[randomX][randomY].hasMine = true;
            mineArray.push(grid[randomX][randomY]);
        } else {
            i--;
        }
    }
    for (i = 0; i < gridWidth; i++) { //sets the surroundMines value of all cells
        for (j = 0; j < gridHeight; j++) {
            checkForMines(grid[i][j]);
        }
    }
}

function draw() {
    background(100);
    fillCells();
    fillAccess();
}

function fillCells() {
    for (i = 0; i < gridWidth; i++) {
        for (j = 0; j < gridHeight; j++) {
            image(grid[i][j].img, i * size, j * size);
        }
    }
}

function fillAccess() {
    strokeWeight(0);
    fill("#00ff00");
    rect(gridWidth * size, 0, clientWidth - gridWidth * size, gridHeight * size);
    rect(0, gridHeight * size, clientWidth, clientHeight - gridHeight * size);
}

function mouseClicked() {
    if (!grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size].hasMine) {
        setEmptyImage(grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size]);
    } else {
        youLost();
    }
}

function setRandoms() {
    randomX = int(random(gridWidth));
    randomY = int(random(gridHeight));
}

function checkForMines(cell) {
    if (!grid[cell.x][cell.y].hasMine) {
        if (cell.x < gridWidth-1 && cell.y < gridHeight-1 && grid[cell.x + 1][cell.y + 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.x < gridWidth-1 && grid[cell.x + 1][cell.y].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.x < gridWidth-1 && cell.y > 0 && grid[cell.x + 1][cell.y - 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.y < gridHeight-1 && grid[cell.x][cell.y + 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.y > 0 && grid[cell.x][cell.y - 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.x > 0 && cell.y < gridHeight-1 &&grid[cell.x - 1][cell.y + 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.x > 0 && grid[cell.x - 1][cell.y].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.x > 0 && cell.y > 0 && grid[cell.x - 1][cell.y - 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
    }
}

function setEmptyImage(cell) {
    switch (cell.surroundingMines) {
        case 0:
            cell.img = empty;
            expand();
            break;
        case 1:
            cell.img = empty1;
            break;
        case 2:
            cell.img = empty2;
            break;
        case 3:
            cell.img = empty3;
            break;
        case 4:
            cell.img = empty4;
            break;
        case 5:
            cell.img = empty5;
            break;
        case 6:
            cell.img = empty6;
            break;
        case 7:
            cell.img = empty7;
            break;
        case 8:
            cell.img = empty8;
            break;
    }
}

function expand() {
    
}

function youLost() {
    alert("you lost!");
}