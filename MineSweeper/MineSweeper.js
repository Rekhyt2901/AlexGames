let size = 128;
let clientWidth = document.documentElement.clientWidth;
let clientHeight = document.documentElement.clientHeight;
let gridWidth = (clientWidth - clientWidth % size) / size;
let gridHeight = (clientHeight - clientHeight % size) / size;
let grid = [];

let numberOfMines = gridWidth * gridHeight * 0.1;
let mineArray = [];
let expandArray = [];
let markedArray = [];
let won = true;

let start = true;
let timerStarted = false;
let timer = 0;

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
        this.img;
        this.surroundingMines = 0;
        this.alreadyPushed = false;
        this.marked = false;
    }
}

function preload() {
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
            grid[randomX][randomY].img = unopened;
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
    displayText();
    displayTimer();
    displayBottomText();
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
    fill("#444444");
    rect(gridWidth * size, 0, clientWidth - gridWidth * size, gridHeight * size);
    rect(0, gridHeight * size, clientWidth, clientHeight - gridHeight * size);
}

function displayText() {
    if (start) {
        textSize(clientHeight * 0.13);
        textAlign(LEFT, TOP);
        fill("#444444");
        rect(10, 5, (gridWidth - 1) * size, clientHeight * 0.13 * 2.9)
        fill("#000000");
        text("Open Cell with LMB", size * 0.2, 0 + size * 0.1);
        text("Mark Mine with M/F/A/D", size * 0.2, clientHeight * 0.13 + size * 0.1);
        text("Press R to Restart", size * 0.2, clientHeight * 0.13 * 2 + size * 0.1);
    }
}

function displayTimer() {
    if (timerStarted) {
        timer++;
        if (timer % 60 === 0) print(timer / 60);
    }
}

function displayBottomText() {
    textSize(clientHeight * 0.05);
    textAlign(LEFT, TOP);
    fill("#000000");
    text(gridWidth + "x" + gridHeight + " Mine Field (" + int(numberOfMines) + "Mines)", 0, gridHeight * size + size * 0.05);
    text("Resize Window and Press R for Different Sizes!", 0, gridHeight * size + size * 0.05 + clientHeight * 0.05);
}

function mouseClicked() {
    start = false;
    timerStarted = true;
    if (mouseButton === LEFT && (mouseX - mouseX % size) / size < gridWidth && (mouseY - mouseY % size) / size < gridHeight) {
        if (!grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size].hasMine) {
            setEmptyImage(grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size]);
            if (grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size].surroundingMines === 0) {
                expand(grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size]);
            }
        } else {
            youLost(grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size]);
        }
        checkIfWon(true);
    }
}

function keyPressed() {
    start = false;
    timerStarted = true;
    if (keyCode === 87 || keyCode === 65 || keyCode === 83 || keyCode === 68 || keyCode === 77 || keyCode === 70) {
        if (grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size].img === unopened || grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size].img === marked) {
            grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size].marked = (grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size].marked) ? false : true;
            if (grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size].marked) {
                markedArray.push(grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size]);
                grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size].img = marked;
            } else {
                grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size].img = unopened;
                for (i = 0; i < markedArray.length; i++) {
                    if (grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size] === markedArray[i]) {
                        markedArray.splice(i, 1);
                        break;
                    }
                }
            }
        }
        checkIfWon(false);
    }
    if (keyCode === 82) {
        window.location.reload(false);
    }
}

function setRandoms() {
    randomX = int(random(gridWidth));
    randomY = int(random(gridHeight));
}

function checkForMines(cell) {
    if (!grid[cell.x][cell.y].hasMine) {
        if (cell.x < gridWidth - 1 && cell.y < gridHeight - 1 && grid[cell.x + 1][cell.y + 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.x < gridWidth - 1 && grid[cell.x + 1][cell.y].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.x < gridWidth - 1 && cell.y > 0 && grid[cell.x + 1][cell.y - 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.y < gridHeight - 1 && grid[cell.x][cell.y + 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.y > 0 && grid[cell.x][cell.y - 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.x > 0 && cell.y < gridHeight - 1 && grid[cell.x - 1][cell.y + 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.x > 0 && grid[cell.x - 1][cell.y].hasMine) grid[cell.x][cell.y].surroundingMines++;
        if (cell.x > 0 && cell.y > 0 && grid[cell.x - 1][cell.y - 1].hasMine) grid[cell.x][cell.y].surroundingMines++;
    }
}

function setEmptyImage(cell) {
    switch (cell.surroundingMines) {
        case 0:
            cell.img = empty;
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

function expand(cell) {
    let i = 0;
    resetAlreadyPushed();
    expandArray.push(grid[cell.x][cell.y]);
    grid[cell.x][cell.y].alreadyPushed = true;
    while (i < expandArray.length) {
        addNeighbours(grid[expandArray[i].x][expandArray[i].y]);
        i++;
    }
    for (j = 0; j < expandArray.length; j++) {
        setEmptyImage(grid[expandArray[j].x][expandArray[j].y]);
    }
}

function addNeighbours(cell) {
    if (cell.surroundingMines === 0) {
        if (cell.x < gridWidth - 1 && !grid[cell.x + 1][cell.y].alreadyPushed) {
            expandArray.push(grid[cell.x + 1][cell.y]);
            grid[cell.x + 1][cell.y].alreadyPushed = true;
        }
        if (cell.y < gridHeight - 1 && !grid[cell.x][cell.y + 1].alreadyPushed) {
            expandArray.push(grid[cell.x][cell.y + 1]);
            grid[cell.x][cell.y + 1].alreadyPushed = true;
        }
        if (cell.x > 0 && !grid[cell.x - 1][cell.y].alreadyPushed) {
            expandArray.push(grid[cell.x - 1][cell.y]);
            grid[cell.x - 1][cell.y].alreadyPushed = true;
        }
        if (cell.y > 0 && !grid[cell.x][cell.y - 1].alreadyPushed) {
            expandArray.push(grid[cell.x][cell.y - 1]);
            grid[cell.x][cell.y - 1].alreadyPushed = true;
        }
        //Diagonalen
        if (cell.x < gridWidth - 1 && cell.y < gridHeight - 1 && !grid[cell.x + 1][cell.y + 1].alreadyPushed) {
            expandArray.push(grid[cell.x + 1][cell.y + 1]);
            grid[cell.x + 1][cell.y + 1].alreadyPushed = true;
        }
        if (cell.x < gridWidth - 1 && cell.y > 0 && !grid[cell.x + 1][cell.y - 1].alreadyPushed) {
            expandArray.push(grid[cell.x + 1][cell.y - 1]);
            grid[cell.x + 1][cell.y - 1].alreadyPushed = true;
        }
        if (cell.x > 0 && cell.y < gridHeight - 1 && !grid[cell.x - 1][cell.y + 1].alreadyPushed) {
            expandArray.push(grid[cell.x - 1][cell.y + 1]);
            grid[cell.x - 1][cell.y + 1].alreadyPushed = true;
        }
        if (cell.x > 0 && cell.y > 0 && !grid[cell.x - 1][cell.y - 1].alreadyPushed) {
            expandArray.push(grid[cell.x - 1][cell.y - 1]);
            grid[cell.x - 1][cell.y - 1].alreadyPushed = true;
        }
    }
}

function resetAlreadyPushed() {
    for (i = 0; i < gridWidth; i++) {
        for (j = 0; j < gridHeight; j++) {
            grid[i][j].alreadyPushed = false;
        }
    }
}

function checkIfWon(accessedFromClick) {
    won = true;
    for (i = 0; i < gridWidth; i++) {
        for (j = 0; j < gridHeight; j++) {
            if (accessedFromClick && grid[(mouseX - mouseX % size) / size][(mouseY - mouseY % size) / size].hasMine) won = false;
            if (grid[i][j].img === unopened) won = false;
            if (!grid[i][j].hasMine && grid[i][j].img === marked) won = false;
        }
    }
    if (won) youWon();

}

function youWon() {
    timerStarted = false;
    fillCells();
    noLoop();
    displayWinText();
}

async function displayWinText() {
    await delay(50);
    textSize(clientHeight * 0.13);
    textAlign(CENTER, CENTER);
    fill("#ff5555");
    circle(gridWidth * size / 2, gridHeight * size / 2, gridHeight * size);
    fill("#ffffff");
    text("You Won!", gridWidth * size / 2, gridHeight * size / 2 - clientHeight * 0.2);
    text("Grid Size:" + gridWidth + "x" + gridHeight, gridWidth * size / 2, gridHeight * size / 2);
    text("Time: " + parseFloat((timer / 60).toFixed(2)), gridWidth * size / 2, gridHeight * size / 2 + clientHeight * 0.2);
}

function youLost(cell) {
    timerStarted = false;
    for (i = 0; i < mineArray.length; i++) {
        grid[mineArray[i].x][mineArray[i].y].img = mine;
    }
    for (i = 0; i < markedArray.length; i++) {
        if (!markedArray[i].hasMine && markedArray[i].img === marked) grid[markedArray[i].x][markedArray[i].y].img = markedWrong;
    }
    grid[cell.x][cell.y].img = clickedMine;
    fillCells();
    noLoop();
    displayLossText();
}

async function displayLossText() {
    await delay(50);
    textSize(clientHeight * 0.13);
    textAlign(CENTER, CENTER);
    fill("#ff5555");
    circle(gridWidth * size / 2, gridHeight * size / 2, gridHeight * size);
    fill("#ffffff");
    text("You Lost!", gridWidth * size / 2, gridHeight * size / 2 - clientHeight * 0.2);
    text("Be Smarter!", gridWidth * size / 2, gridHeight * size / 2);
    text("Press R!", gridWidth * size / 2, gridHeight * size / 2 + clientHeight * 0.2);
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}