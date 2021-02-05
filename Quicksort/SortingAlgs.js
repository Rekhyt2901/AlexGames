let numberOfElements = 100;
let amountOfComparisons = 0;
let amountOfSwitches = 0;

let sortArray = [];

let canvasWidth = document.documentElement.clientWidth;
let canvasHeight = document.documentElement.clientHeight;

let pillarWidth = canvasWidth / numberOfElements * 0.8;
let pillarMargin = canvasWidth / numberOfElements * 0.1;

numberOfElements = 1000000; // mach weg nur zum große Arrays testen

let color1 = "#00ff00";
let color2 = "#ffff00";
let change = true;

let randomizeButton;
let inverseButton;
let quickSort;

let waitTimeInput;
let waitTime = 100;
let submitButton;


function setup() {
    createCanvas(canvasWidth, canvasHeight);
    background(10);
    for (i = 0; i < numberOfElements; i++) {
        sortArray[i] = i + 1;
    }
    sortArray.sort(() => 0.5 - Math.random());
    let buttonOffsetY = canvasHeight * 0.9;
    randomizeButton = createButton("Randomize");
    randomizeButton.position(0, buttonOffsetY);
    randomizeButton.mousePressed(randomize);

    inverseButton = createButton("Inverse");
    inverseButton.position(0, buttonOffsetY + randomizeButton.height);
    inverseButton.mousePressed(inverse);
    inverseButton.size(randomizeButton.width, randomizeButton.height);

    quickSort = createButton("Sort with QuickSort");
    quickSort.position(randomizeButton.width, buttonOffsetY);
    quickSort.mousePressed(quickie);

    waitTimeInput = createInput("200");
    waitTimeInput.position(randomizeButton.width, buttonOffsetY + randomizeButton.height);
    waitTimeInput.input(updateWaitTime);
    waitTimeInput.size(randomizeButton.height * 0.7);

    submitButton = createButton("Submit Speed");
    submitButton.position(randomizeButton.width + waitTimeInput.width, buttonOffsetY + randomizeButton.height);
    submitButton.mousePressed(updateWaitTime);
    submitButton.size(quickSort.width, randomizeButton.height);
}

function draw() {
    change = true;
    let offsetX = 0;
    background("rgba(0, 0, 0, 1)");
    for (i = 0; i < sortArray.length; i++) {
        if (change) {
            fill(color1);
        } else {
            fill(color2)
        }
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

function quickie() {
    // console.log(sortArray);
    console.time("QuickSort");
    sortArray = sortWithQuickSort(sortArray);
    console.timeEnd("QuickSort");
    // console.log(sortArray);
}

function sortWithQuickSort(quickArray) {
    if (quickArray.length > 1) {
        let pivot = quickArray[0];
        let smaller = [];
        let greater = [];

        for (let i = 1; i < quickArray.length; i++) {
            if (quickArray[i] <= pivot) smaller.push(quickArray[i]);
            if (quickArray[i] > pivot) greater.push(quickArray[i]);
        }
        quickArray = [];
        smaller = sortWithQuickSort(smaller);
        greater = sortWithQuickSort(greater);
        for (let i = 0; i < smaller.length; i++) quickArray.push(smaller[i]);
        quickArray.push(pivot)
        for (let i = 0; i < greater.length; i++) quickArray.push(greater[i]);
        return quickArray;
    } else {
        if (quickArray.length === 0) {
            return [];
        } else {
            return quickArray;
        }
    }
}

function timer(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function updateWaitTime() {
    waitTime = waitTimeInput.value();
}