let numberOfElements = 100;
let amountOfSwitches = 0;
let amountOfComparisons = 0;

let sortArray = [];

let canvasWidth = document.documentElement.clientWidth;
let canvasHeight = document.documentElement.clientHeight;

let pillarWidth = canvasWidth / numberOfElements * 0.8;
let pillarMargin = canvasWidth / numberOfElements * 0.1;

let color1 = "#00ff00";
let color2 = "#ffff00";
let change = true;

let randomizeButton;
let sortSelection;
let sortInsertion;
let sortBubble;

let waitTimeInput;
let waitTime = 100;
let submitButton;

let highlightedColor1 = "#ff0000";
let highlightedColor2 = "#0000ff";
let highlighted1;
let highlighted2;


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(10)
    for (i = 0; i < numberOfElements; i++) {
        //sortArray[i] = int(random(100)) + 1;
        sortArray[i] = i + 1;
    }
    let buttonOffsetY = canvasHeight * 0.9;
    randomizeButton = createButton("Randomize");
    randomizeButton.position(0, buttonOffsetY);
    randomizeButton.mousePressed(randomize);

    sortSelection = createButton("Sort with Selection Sort");
    sortSelection.position(randomizeButton.width, buttonOffsetY);
    sortSelection.mousePressed(selectionSort);

    sortInsertion = createButton("Sort with Insertion Sort");
    sortInsertion.position(randomizeButton.width + sortSelection.width, buttonOffsetY);
    sortInsertion.mousePressed(insertionSort);

    sortBubble = createButton("Sort with Bubble Sort");
    sortBubble.position(randomizeButton.width + sortSelection.width + sortInsertion.width, buttonOffsetY);
    sortBubble.mousePressed(bubbleSort);

    waitTimeInput = createInput(200);
    waitTimeInput.position(randomizeButton.width + sortSelection.width + sortInsertion.width + sortBubble.width, buttonOffsetY);
    waitTimeInput.input(updateWaitTime);

    submitButton = createButton("Submit");
    submitButton.position(randomizeButton.width + sortSelection.width + sortInsertion.width + sortBubble.width + waitTimeInput.width, buttonOffsetY);
    submitButton.mousePressed(updateWaitTime);
}

function draw() {
    change = true;
    background(10);
    let offsetX = 0;
    for (i = 0; i < sortArray.length; i++) {
        if (change) {
            fill(color1);
        } else {
            fill(color2)
        }
        if (i === highlighted1) fill(highlightedColor1);
        if (i === highlighted2) fill(highlightedColor2);
        change = (change) ? false : true;
        offsetX += pillarMargin;
        rect(offsetX, canvasHeight * 0.85 - canvasHeight * 0.8 * sortArray[i] / 100, pillarWidth, canvasHeight * 0.8 * sortArray[i] / 100);
        offsetX += pillarWidth;
        offsetX += pillarMargin;
    }
}

function randomize() {
    for (let i = sortArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [sortArray[i], sortArray[j]] = [sortArray[j], sortArray[i]];
    }
}

async function selectionSort() {
    for (nextUnsortedIndex = 0; nextUnsortedIndex < sortArray.length - 1; nextUnsortedIndex++) {
        highlighted2 = nextUnsortedIndex;
        await timer(waitTime);
        let smallestIndex = nextUnsortedIndex;
        for (i = nextUnsortedIndex; i < sortArray.length; i++) {
            if (sortArray[i] < sortArray[smallestIndex]) {
                smallestIndex = i;
                highlighted1 = i;
            }
        }
        [sortArray[smallestIndex], sortArray[nextUnsortedIndex]] = [sortArray[nextUnsortedIndex], sortArray[smallestIndex]];
    }
    highlighted1 = undefined;
    highlighted2 = undefined;
}

async function insertionSort() {
    for (currentIndex = 1; currentIndex < sortArray.length; currentIndex++) {
        highlighted2 = currentIndex;
        await timer(waitTime);
        let currentlySorting = sortArray[currentIndex];
        let j = currentIndex;
        while (j > 0 && sortArray[j - 1] > currentlySorting) {
            highlighted1 = j;
            sortArray[j] = sortArray[j - 1];
            j--;
        }
        sortArray[j] = currentlySorting;
    }
    highlighted1 = undefined;
    highlighted2 = undefined;
}

async function bubbleSort() {
    for (lastUnsorted = sortArray.length - 1; lastUnsorted > 0; lastUnsorted--) {
        await timer(waitTime);
        for (i = 0; i < lastUnsorted; i++) {
            if (sortArray[i] > sortArray[i + 1]) {
                highlighted2 = i;
                highlighted1 = i+1;
                [sortArray[i], sortArray[i + 1]] = [sortArray[i + 1], sortArray[i]];
            }
        }
    }
    highlighted1 = undefined;
    highlighted2 = undefined;
}

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function updateWaitTime() {
    waitTime = waitTimeInput.value();
}