let size = 100;
let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;
let gridWidth = (clientWidth - clientWidth%size) / size;
let gridHeight = (clientHeight - clientHeight%size) / size;
let grid = [];

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
        this.image;
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
    for(i = 0; i < gridWidth; i++) {
        grid[i] = [];
        for (j = 0; j < gridHeight; j++) {
            grid[i][j] = new Cell(i, j);
            grid[i][j].img = unopened;  
        }
    }
}

function draw() {
    image(unopened, 0, 0, 128, 128)
    //background(100);
    //fillCells();
    //fillAccess();
}

function fillCells() {
    for(i = 0; i < gridWidth; i++) {
        for (j = 0; j < gridHeight; j++) {
            image(grid[i][j].img, i*size, j*size);
        }
    }
}

function fillAccess() {
    fill("#00ff00");
    rect(gridWidth*size, 0, clientWidth - gridWidth*size, gridHeight*size);
    rect(0, gridHeight*size, gridWidth*size, clientHeight - gridHeight*size);
}