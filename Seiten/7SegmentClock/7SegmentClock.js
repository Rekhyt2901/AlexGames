let lit = "#f09500";
let unlit = "rgba(40, 40, 0, 0.2)";

let dateTime;
let time;
let hours;
let minutes;
let seconds;

let topmost;
let topLeft;
let topRight;
let middle;
let bottomLeft;
let bottomRight;
let bottommost;

let size = 100;

function setup() {
    createCanvas(6.6*size, 2.7*size);
    stroke(lit);
    strokeWeight(0.1*size);
    fill("rgba(40, 40, 0, 0.01)");
}

function draw() {
    if (document.body.clientWidth < 660) {
        document.getElementById("defaultCanvas0").style.transform = "rotate(90deg)";
        document.body.style.position = "relative";
        document.body.style.top = "210px";
        document.body.style.right = "180px";
    }
    if (document.body.clientWidth > 660) {
        document.getElementById("defaultCanvas0").style.transform = "rotate(0deg)";
        document.body.style.top = "0px";
        document.body.style.right = "0px";
    }
    let dateTime = new Date().toLocaleString();         //Date and time
    let time = dateTime.split(" ")[1].split(":");       //[0] = h, [1] = m, [2] = s

    hours = [time[0].charAt(0), time[0].charAt(1)];
    minutes = [time[1].charAt(0), time[1].charAt(1)];
    seconds = [time[2].charAt(0), time[2].charAt(1)];

    background(100);
    drawUnlits();

    translate(0.3*size, 0.35*size);
    update(hours[0]);
    translate(0, 0); // first hour digit
    if(topmost) line(0, -0.2*size, size, -0.2*size);     // top
    if(topLeft) line(-0.1*size, -0.1*size, -0.1*size, 0.9*size);    // left-top 
    if(topRight) line(1.1*size, -0.1*size, 1.1*size, 0.9*size);    // right-top
    if(middle) line(0, size, size, size);     // middle
    if(bottomLeft) line(-0.1*size, 1.1*size, -0.1*size, 2.1*size);   // left-bottom
    if(bottomRight) line(1.1*size, 1.1*size, 1.1*size, 2.1*size);   // right-bottom
    if(bottommost) line(0, 2.2*size, size, 2.2*size);     // bottom

    update(hours[1]);
    translate(1.6*size, 0); // second hour digit
    if(topmost) line(0, -0.2*size, size, -0.2*size);     // top
    if(topLeft) line(-0.1*size, -0.1*size, -0.1*size, 0.9*size);    // left-top 
    if(topRight) line(1.1*size, -0.1*size, 1.1*size, 0.9*size);    // right-top
    if(middle) line(0, size, size, size);     // middle
    if(bottomLeft) line(-0.1*size, 1.1*size, -0.1*size, 2.1*size);   // left-bottom
    if(bottomRight) line(1.1*size, 1.1*size, 1.1*size, 2.1*size);   // right-bottom
    if(bottommost) line(0, 2.2*size, size, 2.2*size);     // bottom

    translate(0.2*size, 0);
    if(seconds[1] % 2 === 0) {
        circle(1.2*size, 0.8*size, 0.1*size);        // top seperator circle
        circle(1.2*size, 1.2*size, 0.1*size);       // bottom seperator circle
    }

    update(minutes[0]);
    translate(1.6*size, 0); // first minute digit
    if(topmost) line(0, -0.2*size, size, -0.2*size);     // top
    if(topLeft) line(-0.1*size, -0.1*size, -0.1*size, 0.9*size);    // left-top 
    if(topRight) line(1.1*size, -0.1*size, 1.1*size, 0.9*size);    // right-top
    if(middle) line(0, size, size, size);     // middle
    if(bottomLeft) line(-0.1*size, 1.1*size, -0.1*size, 2.1*size);   // left-bottom
    if(bottomRight) line(1.1*size, 1.1*size, 1.1*size, 2.1*size);   // right-bottom
    if(bottommost) line(0, 2.2*size, size, 2.2*size);     // bottom

    update(minutes[1]);
    translate(1.6*size, 0); // second minute digit
    if(topmost) line(0, -0.2*size, size, -0.2*size);     // top
    if(topLeft) line(-0.1*size, -0.1*size, -0.1*size, 0.9*size);    // left-top 
    if(topRight) line(1.1*size, -0.1*size, 1.1*size, 0.9*size);    // right-top
    if(middle) line(0, size, size, size);     // middle
    if(bottomLeft) line(-0.1*size, 1.1*size, -0.1*size, 2.1*size);   // left-bottom
    if(bottomRight) line(1.1*size, 1.1*size, 1.1*size, 2.1*size);   // right-bottom
    if(bottommost) line(0, 2.2*size, size, 2.2*size);     // bottom
}

function update(int) {
    topmost = (int == 2 || int == 3 || int == 5 || int == 6 || int == 7 || int == 8 || int == 9 || int == 0) ? true:false;
    topLeft = (int == 4 || int == 5 || int == 6 || int == 8 || int == 9 || int == 0) ? true:false;
    topRight = (int == 1 || int == 2 || int == 3 || int == 4 || int == 7 || int == 8 || int == 9 || int == 0) ? true:false;
    middle = (int == 2 || int == 3 || int == 4 || int == 5 || int == 6 || int == 8 || int == 9) ? true:false;
    bottomLeft = (int == 2 || int == 6 || int == 8 || int == 0) ? true:false;
    bottomRight = (int == 1 || int == 3 || int == 4 || int == 5 || int == 6 || int == 7 || int == 8 || int == 9 || int == 0) ? true:false;
    bottommost = (int == 2 || int == 3 || int == 5 || int == 6 || int == 8 || int == 9 || int == 0) ? true:false;
}

function drawUnlits() {
    stroke(unlit);
    translate(0.3*size, 0.35*size);

    update(hours[0]);
    translate(0, 0); // first hour digit
    if(!topmost) line(0, -0.2*size, size, -0.2*size);     // top
    if(!topLeft) line(-0.1*size, -0.1*size, -0.1*size, 0.9*size);    // left-top 
    if(!topRight) line(1.1*size, -0.1*size, 1.1*size, 0.9*size);    // right-top
    if(!middle) line(0, size, size, size);     // middle
    if(!bottomLeft) line(-0.1*size, 1.1*size, -0.1*size, 2.1*size);   // left-bottom
    if(!bottomRight) line(1.1*size, 1.1*size, 1.1*size, 2.1*size);   // right-bottom
    if(!bottommost) line(0, 2.2*size, size, 2.2*size);     // bottom

    update(hours[1]);
    translate(1.6*size, 0); // second hour digit
    if(!topmost) line(0, -0.2*size, size, -0.2*size);     // top
    if(!topLeft) line(-0.1*size, -0.1*size, -0.1*size, 0.9*size);    // left-top 
    if(!topRight) line(1.1*size, -0.1*size, 1.1*size, 0.9*size);    // right-top
    if(!middle) line(0, size, size, size);     // middle
    if(!bottomLeft) line(-0.1*size, 1.1*size, -0.1*size, 2.1*size);   // left-bottom
    if(!bottomRight) line(1.1*size, 1.1*size, 1.1*size, 2.1*size);   // right-bottom
    if(!bottommost) line(0, 2.2*size, size, 2.2*size);     // bottom

    translate(0.2*size, 0);
    if(!seconds[1] % 2 === 0) {
        circle(1.2*size, 80, 0.1*size);        // top seperator circle
        circle(1.2*size, 1.2*size, 0.1*size);       // bottom seperator circle
    }

    update(minutes[0]);
    translate(1.6*size, 0); // first minute digit
    if(!topmost) line(0, -0.2*size, size, -0.2*size);     // top
    if(!topLeft) line(-0.1*size, -0.1*size, -0.1*size, 0.9*size);    // left-top 
    if(!topRight) line(1.1*size, -0.1*size, 1.1*size, 0.9*size);    // right-top
    if(!middle) line(0, size, size, size);     // middle
    if(!bottomLeft) line(-0.1*size, 1.1*size, -0.1*size, 2.1*size);   // left-bottom
    if(!bottomRight) line(1.1*size, 1.1*size, 1.1*size, 2.1*size);   // right-bottom
    if(!bottommost) line(0, 2.2*size, size, 2.2*size);     // bottom

    update(minutes[1]);
    translate(1.6*size, 0); // second minute digit
    if(!topmost) line(0, -0.2*size, size, -0.2*size);     // top
    if(!topLeft) line(-0.1*size, -0.1*size, -0.1*size, 0.9*size);    // left-top 
    if(!topRight) line(1.1*size, -0.1*size, 1.1*size, 0.9*size);    // right-top
    if(!middle) line(0, size, size, size);     // middle
    if(!bottomLeft) line(-0.1*size, 1.1*size, -0.1*size, 2.1*size);   // left-bottom
    if(!bottomRight) line(1.1*size, 1.1*size, 1.1*size, 2.1*size);   // right-bottom
    if(!bottommost) line(0, 2.2*size, size, 2.2*size);     // bottom

    stroke(lit);
    resetMatrix();
}