let numberOfElements = 100;
let amountOfComparisons = 0;
let amountOfSwitches = 0;

let sortArray = [];

let canvasWidth = document.documentElement.clientWidth;
let canvasHeight = document.documentElement.clientHeight;

let pillarWidth = canvasWidth / numberOfElements * 0.8;
let pillarMargin = canvasWidth / numberOfElements * 0.1;

let color1 = "#00ff00";
let color2 = "#ffff00";
let change = true;

let randomizeButton;
let inverseButton;
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

    inverseButton = createButton("Inverse");
    inverseButton.position(0, buttonOffsetY + randomizeButton.height);
    inverseButton.mousePressed(inverse);
    inverseButton.size(randomizeButton.width, randomizeButton.height);

    sortSelection = createButton("Sort with Selection Sort");
    sortSelection.position(randomizeButton.width, buttonOffsetY);
    sortSelection.mousePressed(selectionSort);

    sortInsertion = createButton("Sort with Insertion Sort");
    sortInsertion.position(randomizeButton.width + sortSelection.width, buttonOffsetY);
    sortInsertion.mousePressed(insertionSort);

    sortBubble = createButton("Sort with Bubble Sort");
    sortBubble.position(randomizeButton.width + sortSelection.width + sortInsertion.width, buttonOffsetY);
    sortBubble.mousePressed(bubbleSort);

    waitTimeInput = createInput("200");
    waitTimeInput.position(randomizeButton.width, buttonOffsetY + randomizeButton.height);
    waitTimeInput.input(updateWaitTime);
    waitTimeInput.size((sortSelection.width + sortInsertion.width)*0.975, randomizeButton.height*0.7);

    submitButton = createButton("Submit Speed");
    submitButton.position(randomizeButton.width + waitTimeInput.width, buttonOffsetY + randomizeButton.height);
    submitButton.mousePressed(updateWaitTime);
    submitButton.size(sortBubble.width, randomizeButton.height);
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
    for (i = sortArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [sortArray[i], sortArray[j]] = [sortArray[j], sortArray[i]];
    }
}

function inverse() {
    for (i = 0; i < sortArray.length; i++) {
        sortArray[i] = numberOfElements - i;
    }
}

async function selectionSort() {
    amountOfComparisons = 0;
    amountOfSwitches = 0;
    for (nextUnsortedIndex = 0; nextUnsortedIndex < sortArray.length - 1; nextUnsortedIndex++) {
        highlighted2 = nextUnsortedIndex;
        await timer(waitTime);
        let smallestIndex = nextUnsortedIndex;
        for (i = nextUnsortedIndex; i < sortArray.length; i++) {
            amountOfComparisons++;
            if (sortArray[i] < sortArray[smallestIndex]) {
                smallestIndex = i;
            }
        }
        highlighted1 = smallestIndex;
        amountOfSwitches++;
        await timer(waitTime*2);
        highlighted1 = undefined;
        [sortArray[smallestIndex], sortArray[nextUnsortedIndex]] = [sortArray[nextUnsortedIndex], sortArray[smallestIndex]];
    }
    print("Selection Sort");
    print("amount of Comparisons: " + amountOfComparisons);
    print("amount of switches: " + amountOfSwitches);
    highlighted1 = undefined;
    highlighted2 = undefined;
}

async function insertionSort() {
    amountOfComparisons = 0;
    amountOfSwitches = 0;
    for (currentIndex = 1; currentIndex < sortArray.length; currentIndex++) {
        highlighted2 = currentIndex;
        await timer(waitTime);
        let currentlySorting = sortArray[currentIndex];
        let j = currentIndex;
        while (j > 0 && sortArray[j - 1] > currentlySorting) {
            amountOfComparisons++;
            amountOfComparisons++;
            highlighted1 = j;
            sortArray[j] = sortArray[j - 1];
            amountOfSwitches++;
            j--;
        }
        sortArray[j] = currentlySorting;
    }
    print("Insertion Sort");
    print("amount of Comparisons: " + amountOfComparisons);
    print("amount of switches: " + amountOfSwitches);
    highlighted1 = undefined;
    highlighted2 = undefined;
}

async function bubbleSort() {
    amountOfComparisons = 0;
    amountOfSwitches = 0;
    for (lastUnsorted = sortArray.length - 1; lastUnsorted > 0; lastUnsorted--) {
        await timer(waitTime);
        for (i = 0; i < lastUnsorted; i++) {
            amountOfComparisons++;
            if (sortArray[i] > sortArray[i + 1]) {
                highlighted2 = i;
                highlighted1 = i + 1;
                [sortArray[i], sortArray[i + 1]] = [sortArray[i + 1], sortArray[i]];
                amountOfSwitches++;
            }
        }
    }
    print("Bubble Sort");
    print("amount of Comparisons: " + amountOfComparisons);
    print("amount of switches: " + amountOfSwitches);
    highlighted1 = undefined;
    highlighted2 = undefined;
}

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function updateWaitTime() {
    waitTime = waitTimeInput.value();
}