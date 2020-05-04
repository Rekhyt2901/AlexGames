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

function setup() {
    createCanvas(660, 270);
    stroke(lit);
    strokeWeight(10);
    fill("rgba(40, 40, 0, 0.01)");
    
}

function draw() {
    let dateTime = new Date().toLocaleString();         //Date and time
    let time = dateTime.split(" ")[1].split(":");       //[0] = h, [1] = m, [2] = s

    hours = [time[0].charAt(0), time[0].charAt(1)];
    minutes = [time[1].charAt(0), time[1].charAt(1)];
    seconds = [time[2].charAt(0), time[2].charAt(1)];

    background(100);
    drawUnlits();

    translate(30, 35);
    update(hours[0]);
    translate(0, 0); // first hour digit
    if(topmost) line(0, -20, 100, -20);     // top
    if(topLeft) line(-10, -10, -10, 90);    // left-top 
    if(topRight) line(110, -10, 110, 90);    // right-top
    if(middle) line(0, 100, 100, 100);     // middle
    if(bottomLeft) line(-10, 110, -10, 210);   // left-bottom
    if(bottomRight) line(110, 110, 110, 210);   // right-bottom
    if(bottommost) line(0, 220, 100, 220);     // bottom

    update(hours[1]);
    translate(160, 0); // second hour digit
    if(topmost) line(0, -20, 100, -20);     // top
    if(topLeft) line(-10, -10, -10, 90);    // left-top 
    if(topRight) line(110, -10, 110, 90);    // right-top
    if(middle) line(0, 100, 100, 100);     // middle
    if(bottomLeft) line(-10, 110, -10, 210);   // left-bottom
    if(bottomRight) line(110, 110, 110, 210);   // right-bottom
    if(bottommost) line(0, 220, 100, 220);     // bottom

    translate(20, 0);
    if(seconds[1] % 2 === 0) {
        circle(120, 80, 10);        // top seperator circle
        circle(120, 120, 10);       // bottom seperator circle
    }

    update(minutes[0]);
    translate(160, 0); // first minute digit
    if(topmost) line(0, -20, 100, -20);     // top
    if(topLeft) line(-10, -10, -10, 90);    // left-top 
    if(topRight) line(110, -10, 110, 90);    // right-top
    if(middle) line(0, 100, 100, 100);     // middle
    if(bottomLeft) line(-10, 110, -10, 210);   // left-bottom
    if(bottomRight) line(110, 110, 110, 210);   // right-bottom
    if(bottommost) line(0, 220, 100, 220);     // bottom

    update(minutes[1]);
    translate(160, 0); // second minute digit
    if(topmost) line(0, -20, 100, -20);     // top
    if(topLeft) line(-10, -10, -10, 90);    // left-top 
    if(topRight) line(110, -10, 110, 90);    // right-top
    if(middle) line(0, 100, 100, 100);     // middle
    if(bottomLeft) line(-10, 110, -10, 210);   // left-bottom
    if(bottomRight) line(110, 110, 110, 210);   // right-bottom
    if(bottommost) line(0, 220, 100, 220);     // bottom

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
    translate(30, 35);

    update(hours[0]);
    translate(0, 0); // first hour digit
    if(!topmost) line(0, -20, 100, -20);     // top
    if(!topLeft) line(-10, -10, -10, 90);    // left-top 
    if(!topRight) line(110, -10, 110, 90);    // right-top
    if(!middle) line(0, 100, 100, 100);     // middle
    if(!bottomLeft) line(-10, 110, -10, 210);   // left-bottom
    if(!bottomRight) line(110, 110, 110, 210);   // right-bottom
    if(!bottommost) line(0, 220, 100, 220);     // bottom

    update(hours[1]);
    translate(160, 0); // second hour digit
    if(!topmost) line(0, -20, 100, -20);     // top
    if(!topLeft) line(-10, -10, -10, 90);    // left-top 
    if(!topRight) line(110, -10, 110, 90);    // right-top
    if(!middle) line(0, 100, 100, 100);     // middle
    if(!bottomLeft) line(-10, 110, -10, 210);   // left-bottom
    if(!bottomRight) line(110, 110, 110, 210);   // right-bottom
    if(!bottommost) line(0, 220, 100, 220);     // bottom

    translate(20, 0);
    if(!seconds[1] % 2 === 0) {
        circle(120, 80, 10);        // top seperator circle
        circle(120, 120, 10);       // bottom seperator circle
    }

    update(minutes[0]);
    translate(160, 0); // first minute digit
    if(!topmost) line(0, -20, 100, -20);     // top
    if(!topLeft) line(-10, -10, -10, 90);    // left-top 
    if(!topRight) line(110, -10, 110, 90);    // right-top
    if(!middle) line(0, 100, 100, 100);     // middle
    if(!bottomLeft) line(-10, 110, -10, 210);   // left-bottom
    if(!bottomRight) line(110, 110, 110, 210);   // right-bottom
    if(!bottommost) line(0, 220, 100, 220);     // bottom

    update(minutes[1]);
    translate(160, 0); // second minute digit
    if(!topmost) line(0, -20, 100, -20);     // top
    if(!topLeft) line(-10, -10, -10, 90);    // left-top 
    if(!topRight) line(110, -10, 110, 90);    // right-top
    if(!middle) line(0, 100, 100, 100);     // middle
    if(!bottomLeft) line(-10, 110, -10, 210);   // left-bottom
    if(!bottomRight) line(110, 110, 110, 210);   // right-bottom
    if(!bottommost) line(0, 220, 100, 220);     // bottom

    stroke(lit);
    resetMatrix();
}