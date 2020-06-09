const xAxis = new THREE.Vector3(1, 0, 0); //Red, Orange
const yAxis = new THREE.Vector3(0, 1, 0); //White, Yellow
const zAxis = new THREE.Vector3(0, 0, 1); //Blue, Green

const clockWise90 = Math.PI / 2;
const counterWise90 = -Math.PI / 2;

const rotationPointW = new THREE.Vector3(0, -1, 0);
const rotationPointY = new THREE.Vector3(0, 1, 0);
const rotationPointB = new THREE.Vector3(0, 0, 1);
const rotationPointG = new THREE.Vector3(0, 0, -1);
const rotationPointR = new THREE.Vector3(1, 0, 0);
const rotationPointO = new THREE.Vector3(-1, 0, 0);

const pointAboveYellow = new THREE.Vector3(0, 3, 0);
const pointFrontYellow = new THREE.Vector3(0, 1, -3);
const pointLeftYellow = new THREE.Vector3(-3, 1, 0);
const pointBackYellow = new THREE.Vector3(0, 1, 3);
const pointRightYellow = new THREE.Vector3(3, 1, 0);

const pointAbove = new THREE.Vector3(0, 3, 0);
const pointFront = new THREE.Vector3(0, 0, -3);
const pointLeft = new THREE.Vector3(-3, 0, 0);
const pointBack = new THREE.Vector3(0, 0, 3);
const pointRight = new THREE.Vector3(3, 0, 0);
const pointBelow = new THREE.Vector3(0, -3, 0);

let OLLId = "";
let pllColor;
let PLLCornersId = "";
let PLLEdgesId = "";

let whiteGroup = new THREE.Object3D();
let yellowGroup = new THREE.Object3D();
let blueGroup = new THREE.Object3D();
let greenGroup = new THREE.Object3D();
let redGroup = new THREE.Object3D();
let orangeGroup = new THREE.Object3D();

let dir = new THREE.Vector3();
const step = 1 / 20;
let angleStep = Math.PI / 40;
let t = 0;

let lastTimeExecuted = Date.now();
let intervall = 400;

let horizontalCamAngle;
let verticalCamAngle;

//Cross Algs
let CrossG1 = "BUL";
let CrossG2 = "UL";
let CrossG3 = "DlFLU";
let CrossG4 = "urUU";

let CrossB1 = "FuRUU";
let CrossB2 = "uRUU";
let CrossB3 = "fuRUU";
let CrossB4 = "Ul";

let CrossR1 = "rfU";
let CrossR2 = "RRfRRU";
let CrossR3 = "RfrU";
let CrossR4 = "fU";

let CrossO1 = "LFU";
let CrossO2 = "FU";
let CrossO3 = "lFLU";
let CrossO4 = "LLFLLU";

let CrossW1 = "FFU";
let CrossW2 = "dFFU";
let CrossW3 = "DDFFU";
let CrossW4 = "DFFU";

//PLL Algorithms
let Ua = "rUrururURURR";
let Ub = "LuLULULulull";
let Z = "RRLLDRRLLURLFFRRLLBBRLUU";
let H = "RRLLDRRLLUURRLLDRRLL";
let Aa = "RbRFFrBRFFRR";
let Ab = "lBlffLblffll";
let E = "RbrFRBrfRBrFRbrf";
let Ra = "RuruRURDruRdrUUru";
let Rb = "rUURUUrFRUrurfRRu";
let Ja = "rUlUURurUURLu";
let Jb = "RUrfRUrurFRRuru";
let T = "RUrurFRRuruRUrf";
let F = "rufRUrurFRRuruRUrUR";
let V = "rUrubrBBubUbRBR";
let Y = "FRuruRUrfRUrurFRf";
let Na = "RUrURUrfRUrurFRRurUURur";
let Nb = "rURurfuFRUrFrfRuR";
let Ga = "RRUrUruRuRRDurURdU";
let Gb = "fuFRRDbUBuBdRR";
let Gc = "RRuRuRUrURRdURurDu";
let Gd = "dRUruDRRuRurUrURRU";

let absoluteEdgeSwitchGreen = "lUlululULULL";
let absoluteEdgeSwitchBlue = "rUrururURURR";
let absoluteEdgeSwitchRed = "bUbububUBUBB";
let absoluteEdgeSwitchOrange = "fUfufufUFUFF";

let PLLCornersMap = {};
PLLCornersMap["2013"] = "U" + Aa + "u"; //Blau-Orange ist richtig
PLLCornersMap["1203"] = "UU" + Ab + "UU";

PLLCornersMap["1320"] = "u" + Ab + "U"; //Blau-Rot ist richtig
PLLCornersMap["3021"] = "UU" + Aa + "UU";

PLLCornersMap["2130"] = Ab; //Grün-Rot ist richtig
PLLCornersMap["3102"] = "u" + Aa + "U";

PLLCornersMap["0231"] = "U" + Ab + "u"; //Grün Orange ist richtig
PLLCornersMap["0312"] = Aa;

PLLCornersMap["1032"] = "U" + E + "u"; //Anderer Algorithmus Cases
PLLCornersMap["3210"] = E;

let PLLEdgesMap = {};
PLLEdgesMap["0312"] = "UU" + Ub + "UU";
PLLEdgesMap["0231"] = "UU" + Ua + "UU";

PLLEdgesMap["3102"] = "U" + Ub + "u";
PLLEdgesMap["2130"] = "U" + Ua + "u";

PLLEdgesMap["3021"] = Ub;
PLLEdgesMap["1320"] = Ua;

PLLEdgesMap["2013"] = "u" + Ub + "U";
PLLEdgesMap["1203"] = "u" + Ua + "U";

PLLEdgesMap["1032"] = "U" + Z + "u";
PLLEdgesMap["3210"] = Z;

PLLEdgesMap["2301"] = H;

//OLL Algorithms
let OCLL1 = "RUUruRUruRur";
let OCLL2 = "RUURRuRRuRRUUR";
let OCLL3 = "RRDrUURdrUUr";
let OCLL4 = "LFrflFRf";
let OCLL5 = "rFRbrfRB";
let OCLL6 = "RUUruRur";
let OCLL7 = "RUrURUUr";
let T1 = "RUrurFRf";
let T2 = "FRUruf";
let S1 = "lBBRBrBL";
let S2 = "lFFrfRfL";
let C1 = "RURRurFRURuf";
let C2 = "rurFRfUR";
let W1 = "RUrfRUrurFRurFRf"; //y2
let W2 = "RUrURururFRf";
let E1 = "LFrflRURur";
let E2 = "RUruLrFRfL";
let P1 = "ruFURurfR";
let P2 = "RUburURBr";
let P3 = "rufUFR"; //y
let P4 = "FURurf"; //y2
let I1 = "FURurURurf"; //y2
let I2 = "ruRurUfUFB";
let I3 = "rFRURuRRfRRurURUr"; //y
let I4 = "lbLurURurURlBL";
let F1 = "RUrurFRRUruf";
let F2 = "RUrUrFRfRUUr";
let F3 = "RUURRFRfRUUr";
let F4 = "FRuruRUrf";
let K1 = "LfluLFlbUB";
let K2 = "rFRUrfRFuf";
let K3 = "lbLruRUlBl";
let K4 = "LFlRUruLfl";
let A1 = "RUruRurfuFRUr"; //y
let A2 = "FURUUruRUUruf"; //y'
let A3 = "RUrURUUrFRUruf";
let A4 = "ruRurUURFRUruf";
let L1 = "FRUruRUruf";
let L2 = "fluLUluLUF";
let L3 = "LfLLBLLFLLbL";
let L4 = "lBLLfLLbLLFl";
let L5 = "lbRbrBRbrBBL";
let L6 = "LFrFRfrFRFFl";
let B1 = "LFrFRFFl";
let B2 = "lbRbrBBL";
let B3 = "lRRBrBRBBrBLr";
let B4 = "LrrfRfrFFRflR";
let B5 = "LfluLUFul";
let B6 = "rFRUrufUR";
let O1 = "RUURRFRfUUrFRf";
let O2 = "FRUrufBULulb";
let O3 = "BULulbuFRUruf";
let O4 = "bULulbUFRUruf";
let O5 = "RUrUrFRfUUrFRf";
let O6 = "LFrFRFFllbRbrBBL";
let O7 = "lRFRFrfLrrFRf";
let O8 = "lRBRBrbLLRRFRfl";

let OLLMap = {};
OLLMap["00001111"] = OCLL1;
OLLMap["00002112"] = OCLL2;
OLLMap["00000011"] = OCLL3;
OLLMap["00001001"] = OCLL4;
OLLMap["00000201"] = OCLL5;
OLLMap["00002021"] = OCLL6;
OLLMap["00001210"] = OCLL7;

OLLMap["10101001"] = T1;
OLLMap["10102002"] = T2;

OLLMap["10011202"] = S1;
OLLMap["00112021"] = S2;

OLLMap["10102200"] = C1;
OLLMap["01010220"] = C2;

OLLMap["11000201"] = W1;
OLLMap["01101020"] = W2;

OLLMap["01100000"] = E1;
OLLMap["10100000"] = E2;

OLLMap["00111001"] = P1;
OLLMap["10011001"] = P2;
OLLMap["11000220"] = P3;
OLLMap["10012002"] = P4;

OLLMap["10102112"] = I1;
OLLMap["01011221"] = I2;
OLLMap["01012222"] = I3;
OLLMap["10102222"] = I4;

OLLMap["01102101"] = F1;
OLLMap["11001012"] = F2;
OLLMap["10010201"] = F3;
OLLMap["01100201"] = F4;

OLLMap["10101210"] = K1;
OLLMap["10102101"] = K2;
OLLMap["10101202"] = K3;
OLLMap["10102021"] = K4;

OLLMap["11000022"] = A1;
OLLMap["00110110"] = A2;
OLLMap["01101100"] = A3;
OLLMap["11000011"] = A4;

OLLMap["00111221"] = L1;
OLLMap["01102112"] = L2;
OLLMap["00112112"] = L3;
OLLMap["10012112"] = L4;
OLLMap["10012222"] = L5;
OLLMap["00112222"] = L6;

OLLMap["01101210"] = B1;
OLLMap["11000121"] = B2;
OLLMap["10011210"] = B3;
OLLMap["00110121"] = B4;
OLLMap["10101020"] = B5;
OLLMap["10100102"] = B6;

OLLMap["11112222"] = O1;
OLLMap["11112112"] = O2;
OLLMap["11111202"] = O3;
OLLMap["11112021"] = O4;
OLLMap["11110102"] = O5;
OLLMap["11110011"] = O6;
OLLMap["11110022"] = O7;
OLLMap["11110000"] = O8;

//Builds 3d Array;
let cubiesArray = [];
for (i = 0; i < 3; i++) {
    cubiesArray[i] = [];
    for (j = 0; j < 3; j++) {
        cubiesArray[i][j] = [];
    }
}

let normalArray = [];

//Scene and Light
const scene = new THREE.Scene();
const light = new THREE.AmbientLight(0xffffff, 2);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth * 0.8 / window.innerHeight, 0.1, 1000);
window.addEventListener("resize", onWindowResize, false);
camera.position.set(0, 1.5, 5);
function onWindowResize() {
    camera.aspect = window.innerWidth * 0.8 / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
}

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth * 0.8, window.innerHeight);
renderer.setClearColor(0xddffdd, 1);
document.body.appendChild(renderer.domElement);

//Ray Caster
const raycaster = new THREE.Raycaster();

//Loading Manager
const manager = new THREE.LoadingManager();
manager.onLoad = function () {
    //console.log('Loading complete!');
    addListeners();
    addHTMLButtons();
    render();
};
manager.onError = function (url) {
    console.log('There was an error loading ' + url);
};

//glTF Loader
const glTFLoader = new THREE.GLTFLoader(manager);

//Font Loader
const fontLoader = new THREE.FontLoader();
const font = fontLoader.load("../IndexAssets/font.json", function (font) {
    let textGeometry = new THREE.TextGeometry("Left Click (+shift) on Centers to turn sides!", {
        font: font,
        size: 1,
        height: 0,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0,
        bevelSize: 0,
        bevelOffset: 0,
        bevelSegments: 0
    });
    let text = new THREE.Mesh(textGeometry, new THREE.MeshPhongMaterial({ color: 0x0000, specular: 0xffffff }));
    text.position.set(-11.25, 4, -20);
    scene.add(text);
});

//Event Listener
const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

//Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.minDistance = 8;
controls.enableZoom = false;
controls.enablePan = false;

//Loads all my Models
loadglTFModels();
function loadglTFModels() {
    //first Layer
    addglTF("CornerBOW", 0, 0, 2);
    addglTF("EdgeBW", 1, 0, 2);
    addglTF("CornerBRW", 2, 0, 2);

    addglTF("EdgeOW", 0, 0, 1);
    addglTF("CenterW", 1, 0, 1);
    addglTF("EdgeRW", 2, 0, 1);

    addglTF("CornerGOW", 0, 0, 0);
    addglTF("EdgeGW", 1, 0, 0);
    addglTF("CornerGRW", 2, 0, 0);

    //second Layer
    addglTF("EdgeBO", 0, 1, 2);
    addglTF("CenterB", 1, 1, 2);
    addglTF("EdgeBR", 2, 1, 2);

    addglTF("CenterO", 0, 1, 1);
    addglTF("Middle", 1, 1, 1);
    addglTF("CenterR", 2, 1, 1);

    addglTF("EdgeGO", 0, 1, 0);
    addglTF("CenterG", 1, 1, 0);
    addglTF("EdgeGR", 2, 1, 0);


    //third Layer
    addglTF("CornerBOY", 0, 2, 2);
    addglTF("EdgeBY", 1, 2, 2);
    addglTF("CornerBRY", 2, 2, 2);

    addglTF("EdgeOY", 0, 2, 1);
    addglTF("CenterY", 1, 2, 1);
    addglTF("EdgeRY", 2, 2, 1);

    addglTF("CornerGOY", 0, 2, 0);
    addglTF("EdgeGY", 1, 2, 0);
    addglTF("CornerGRY", 2, 2, 0);
}

function addglTF(glTFName, x, y, z) {
    glTFLoader.load("glTFFiles/" + glTFName + ".glb", function (gltf) {
        gltf.scene.scale.set(40, 40, 40);
        gltf.scene.position.set(x - 1, y - 1, z - 1);
        cubiesArray[x][y][z] = gltf.scene;
        normalArray.push(gltf.scene);
        if (x === 1 && y === 1 && z === 1) gltf.scene.scale.set(74, 74, 74);
        scene.add(gltf.scene);
    });
}

function addListeners() {
    //White Center
    domEvents.addEventListener(cubiesArray[1][0][1], "click", function (event) {
        chooseEvent(event, 1, 0, 1);
    });
    //Yellow Center
    domEvents.addEventListener(cubiesArray[1][2][1], "click", function (event) {
        chooseEvent(event, 1, 2, 1);
    });
    //Blue Center
    domEvents.addEventListener(cubiesArray[1][1][2], "click", function (event) {
        chooseEvent(event, 1, 1, 2);
    });
    //Green Center
    domEvents.addEventListener(cubiesArray[1][1][0], "click", function (event) {
        chooseEvent(event, 1, 1, 0);
    });
    //Red Center
    domEvents.addEventListener(cubiesArray[2][1][1], "click", function (event) {
        chooseEvent(event, 2, 1, 1);
    });
    //Orange Center
    domEvents.addEventListener(cubiesArray[0][1][1], "click", function (event) {
        chooseEvent(event, 0, 1, 1);
    });
}

//Render Loop
function render() {
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function chooseEvent(event, x, y, z) {
    shift = event.origDomEvent.shiftKey;
    if (x === 1 && y === 0 && z === 1) turnW(shift);
    if (x === 1 && y === 2 && z === 1) turnY(shift);
    if (x === 1 && y === 1 && z === 2) turnB(shift);
    if (x === 1 && y === 1 && z === 0) turnG(shift);
    if (x === 2 && y === 1 && z === 1) turnR(shift);
    if (x === 0 && y === 1 && z === 1) turnO(shift);
}

function getIntersecting(rotationPoint, pt2x, pt2y, pt2z) {
    let point2 = new THREE.Vector3(pt2x - 1, pt2y - 1, pt2z - 1);
    let direction = dir.subVectors(rotationPoint, point2).normalize();
    raycaster.set(rotationPoint, direction);
    let intersectingObjects = raycaster.intersectObjects(normalArray, true);

    //scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000));
    return intersectingObjects[2].object.parent.parent;
}

function getYellowEdge(startPoint, targetX, targetY, targetZ) {
    let direction = dir.subVectors(new THREE.Vector3(targetX, targetY, targetZ), startPoint).normalize();
    raycaster.set(startPoint, direction);
    let foundColor = raycaster.intersectObjects(normalArray, true)[0].object.material.color;
    if (foundColor.r === 1 && foundColor.g === 1 && foundColor.b === 0) {
        OLLId += "0";
    } else {
        OLLId += "1";
    }
    //scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000));
}

function getYellowCorner(startPoint, targetX, targetY, targetZ) {
    let direction = dir.subVectors(new THREE.Vector3(targetX, targetY, targetZ), startPoint).normalize();
    raycaster.set(startPoint, direction);
    let foundColor = raycaster.intersectObjects(normalArray, true)[0].object.material.color;
    //scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000));

    if (foundColor.r === 1 && foundColor.g === 1 && foundColor.b === 0) {
        OLLId += "0";
    } else {
        startPoint = new THREE.Vector3(targetX * 2, targetY, targetZ * 2);
        direction = dir.subVectors(new THREE.Vector3(0, targetY, targetZ), startPoint).normalize();
        raycaster.set(startPoint, direction);
        //scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 300, 0xff0000));

        foundColor = raycaster.intersectObjects(normalArray, true)[0].object.material.color;
        if (foundColor.r === 1 && foundColor.g === 1 && foundColor.b === 0) {
            OLLId += "1";
        } else {
            OLLId += "2";
        }

    }
}

function buildOLLId() {
    OLLId = "";

    getYellowEdge(pointAboveYellow, 0, 1, -1); //Green Edge
    getYellowEdge(pointAboveYellow, 1, 1, 0); //Red Edge
    getYellowEdge(pointAboveYellow, 0, 1, 1); //Blue Edge
    getYellowEdge(pointAboveYellow, -1, 1, 0); //Orange Edge

    getYellowCorner(pointAboveYellow, -1, 1, -1); //Green-Orange Corner //Green
    getYellowCorner(pointAboveYellow, 1, 1, -1); //Green-Red Corner //Green
    getYellowCorner(pointAboveYellow, 1, 1, 1); //Blue-Red Corner //Blue
    getYellowCorner(pointAboveYellow, -1, 1, 1); //Blue-Orange Corner //Blue
}

function turnY(shift) {
    if (Date.now() - lastTimeExecuted > intervall) {
        let x = 1;
        let y = 2;
        let z = 1;
        yellowGroup = new THREE.Object3D();
        scene.add(yellowGroup);

        yellowGroup.attach(cubiesArray[x][y][z]);
        yellowGroup.attach(getIntersecting(rotationPointY, x + 1, y, z));
        yellowGroup.attach(getIntersecting(rotationPointY, x - 1, y, z));
        yellowGroup.attach(getIntersecting(rotationPointY, x, y, z + 1));
        yellowGroup.attach(getIntersecting(rotationPointY, x, y, z - 1));
        yellowGroup.attach(getIntersecting(rotationPointY, x + 1, y, z + 1));
        yellowGroup.attach(getIntersecting(rotationPointY, x + 1, y, z - 1));
        yellowGroup.attach(getIntersecting(rotationPointY, x - 1, y, z + 1));
        yellowGroup.attach(getIntersecting(rotationPointY, x - 1, y, z - 1));

        animateGroup(t, !shift, yellowGroup, "y");
        lastTimeExecuted = Date.now();
    }
}

function turnW(shift) {
    if (Date.now() - lastTimeExecuted > intervall) {
        let x = 1;
        let y = 0;
        let z = 1;
        whiteGroup = new THREE.Object3D();
        scene.add(whiteGroup);

        whiteGroup.attach(cubiesArray[x][y][z]);
        whiteGroup.attach(getIntersecting(rotationPointW, x + 1, y, z));
        whiteGroup.attach(getIntersecting(rotationPointW, x - 1, y, z));
        whiteGroup.attach(getIntersecting(rotationPointW, x, y, z + 1));
        whiteGroup.attach(getIntersecting(rotationPointW, x, y, z - 1));
        whiteGroup.attach(getIntersecting(rotationPointW, x + 1, y, z + 1));
        whiteGroup.attach(getIntersecting(rotationPointW, x + 1, y, z - 1));
        whiteGroup.attach(getIntersecting(rotationPointW, x - 1, y, z + 1));
        whiteGroup.attach(getIntersecting(rotationPointW, x - 1, y, z - 1));

        animateGroup(t, shift, whiteGroup, "y");
        lastTimeExecuted = Date.now();
    }
}

function turnB(shift) {
    if (Date.now() - lastTimeExecuted > intervall) {
        let x = 1;
        let y = 1;
        let z = 2;
        blueGroup = new THREE.Object3D();
        scene.add(blueGroup);

        blueGroup.attach(cubiesArray[x][y][z]);
        blueGroup.attach(getIntersecting(rotationPointB, x + 1, y, z));
        blueGroup.attach(getIntersecting(rotationPointB, x - 1, y, z));
        blueGroup.attach(getIntersecting(rotationPointB, x, y + 1, z));
        blueGroup.attach(getIntersecting(rotationPointB, x, y - 1, z));
        blueGroup.attach(getIntersecting(rotationPointB, x + 1, y + 1, z));
        blueGroup.attach(getIntersecting(rotationPointB, x + 1, y - 1, z));
        blueGroup.attach(getIntersecting(rotationPointB, x - 1, y + 1, z));
        blueGroup.attach(getIntersecting(rotationPointB, x - 1, y - 1, z));

        animateGroup(t, !shift, blueGroup, "z");
        lastTimeExecuted = Date.now();
    }
}

function turnG(shift) {
    if (Date.now() - lastTimeExecuted > intervall) {
        let x = 1;
        let y = 1;
        let z = 0;
        greenGroup = new THREE.Object3D();
        scene.add(greenGroup);

        greenGroup.attach(cubiesArray[x][y][z]);
        greenGroup.attach(getIntersecting(rotationPointG, x + 1, y, z));
        greenGroup.attach(getIntersecting(rotationPointG, x - 1, y, z));
        greenGroup.attach(getIntersecting(rotationPointG, x, y + 1, z));
        greenGroup.attach(getIntersecting(rotationPointG, x, y - 1, z));
        greenGroup.attach(getIntersecting(rotationPointG, x + 1, y + 1, z));
        greenGroup.attach(getIntersecting(rotationPointG, x + 1, y - 1, z));
        greenGroup.attach(getIntersecting(rotationPointG, x - 1, y + 1, z));
        greenGroup.attach(getIntersecting(rotationPointG, x - 1, y - 1, z));

        animateGroup(t, shift, greenGroup, "z");
        lastTimeExecuted = Date.now();
    }
}

function turnR(shift) {
    if (Date.now() - lastTimeExecuted > intervall) {
        let x = 2;
        let y = 1;
        let z = 1;
        redGroup = new THREE.Object3D();
        scene.add(redGroup);

        redGroup.attach(cubiesArray[x][y][z]);
        redGroup.attach(getIntersecting(rotationPointR, x, y, z + 1));
        redGroup.attach(getIntersecting(rotationPointR, x, y, z - 1));
        redGroup.attach(getIntersecting(rotationPointR, x, y + 1, z));
        redGroup.attach(getIntersecting(rotationPointR, x, y - 1, z));
        redGroup.attach(getIntersecting(rotationPointR, x, y + 1, z + 1));
        redGroup.attach(getIntersecting(rotationPointR, x, y - 1, z + 1));
        redGroup.attach(getIntersecting(rotationPointR, x, y + 1, z - 1));
        redGroup.attach(getIntersecting(rotationPointR, x, y - 1, z - 1));

        animateGroup(t, !shift, redGroup, "x");
        lastTimeExecuted = Date.now();
    }
}

function turnO(shift) {
    if (Date.now() - lastTimeExecuted > intervall) {
        let x = 0;
        let y = 1;
        let z = 1;
        orangeGroup = new THREE.Object3D();
        scene.add(orangeGroup);

        orangeGroup.attach(cubiesArray[x][y][z]);
        orangeGroup.attach(getIntersecting(rotationPointO, x, y, z + 1));
        orangeGroup.attach(getIntersecting(rotationPointO, x, y, z - 1));
        orangeGroup.attach(getIntersecting(rotationPointO, x, y + 1, z));
        orangeGroup.attach(getIntersecting(rotationPointO, x, y - 1, z));
        orangeGroup.attach(getIntersecting(rotationPointO, x, y + 1, z + 1));
        orangeGroup.attach(getIntersecting(rotationPointO, x, y - 1, z + 1));
        orangeGroup.attach(getIntersecting(rotationPointO, x, y + 1, z - 1));
        orangeGroup.attach(getIntersecting(rotationPointO, x, y - 1, z - 1));

        animateGroup(t, shift, orangeGroup, "x");
        lastTimeExecuted = Date.now();
    }
}

function animateGroup(t, inverse, group, axis) {
    if (t >= 1) {
        t = 0;
        return;
    }
    angleStep = Math.PI / 40;
    if (inverse) angleStep = -Math.PI / 40;
    t += step;
    if (axis === "x") group.rotation.x += angleStep;
    if (axis === "y") group.rotation.y += angleStep;
    if (axis === "z") group.rotation.z += angleStep;
    requestAnimationFrame(() => animateGroup(t, inverse, group, axis));
}


//Vertical < 45 = Yellow;
//Vertical > 135 = White;
//Vertcial > 45 && < 135 = Red/Green/Blue/Orange

//Horz zwischen -45 und 45 = Blau
//Horz zwischen 45 und 135 = Rot
//Horz zwischen 135 und 180 && -180 und -135 = Grün
//Horz zwischen -45 und -135 = Orange 
function up(inverse) {
    updateCameraAngles();
    turnY(inverse);
}

function down(inverse) {
    updateCameraAngles();
    turnW(inverse);
}

function front(inverse) {
    updateCameraAngles();
    if (-45 <= horizontalCamAngle && horizontalCamAngle < 45) turnB(inverse);
    if (45 <= horizontalCamAngle && horizontalCamAngle < 135) turnR(inverse);
    if (135 <= horizontalCamAngle && horizontalCamAngle < 180 || -180 <= horizontalCamAngle && horizontalCamAngle < -135) turnG(inverse)
    if (-135 <= horizontalCamAngle && horizontalCamAngle < -45) turnO(inverse);
}

function back(inverse) {
    updateCameraAngles();
    if (-45 <= horizontalCamAngle && horizontalCamAngle < 45) turnG(inverse);
    if (45 <= horizontalCamAngle && horizontalCamAngle < 135) turnO(inverse);
    if (135 <= horizontalCamAngle && horizontalCamAngle < 180 || -180 <= horizontalCamAngle && horizontalCamAngle < -135) turnB(inverse)
    if (-135 <= horizontalCamAngle && horizontalCamAngle < -45) turnR(inverse);
}

function right(inverse) {
    updateCameraAngles();
    if (-45 <= horizontalCamAngle && horizontalCamAngle < 45) turnR(inverse);
    if (45 <= horizontalCamAngle && horizontalCamAngle < 135) turnG(inverse);
    if (135 <= horizontalCamAngle && horizontalCamAngle < 180 || -180 <= horizontalCamAngle && horizontalCamAngle < -135) turnO(inverse)
    if (-135 <= horizontalCamAngle && horizontalCamAngle < -45) turnB(inverse);
}

function left(inverse) {
    updateCameraAngles();
    if (-45 <= horizontalCamAngle && horizontalCamAngle < 45) turnO(inverse);
    if (45 <= horizontalCamAngle && horizontalCamAngle < 135) turnB(inverse);
    if (135 <= horizontalCamAngle && horizontalCamAngle < 180 || -180 <= horizontalCamAngle && horizontalCamAngle < -135) turnR(inverse)
    if (-135 <= horizontalCamAngle && horizontalCamAngle < -45) turnG(inverse);
}

function updateCameraAngles() {
    horizontalCamAngle = controls.getAzimuthalAngle() * (180 / Math.PI);
    verticalCamAngle = controls.getPolarAngle() * (180 / Math.PI);
}

function addHTMLButtons() {
    document.getElementById("turnUp").onclick = function () { up(false); };
    document.getElementById("turnDown").onclick = function () { down(false); };
    document.getElementById("turnFront").onclick = function () { front(false); };
    document.getElementById("turnBack").onclick = function () { back(false); };
    document.getElementById("turnRight").onclick = function () { right(false); };
    document.getElementById("turnLeft").onclick = function () { left(false); };
    document.getElementById("dotCornerLine").onclick = function () { dotCornerLine(); };
    document.getElementById("rightSune").onclick = function () { rightSune(); };
    document.getElementById("leftSune").onclick = function () { leftSune(); };
    document.getElementById("edgeSwitchRight").onclick = function () { edgeSwitchRight() };
    document.getElementById("edgeSwitchLeft").onclick = function () { edgeSwitchLeft() };
    document.getElementById("cornerSwitchRight").onclick = function () { cornerSwitchRight() };
    document.getElementById("cornerSwitchLeft").onclick = function () { cornerSwitchLeft() };
    document.getElementById("scramble").onclick = function () { scramble() };
    document.getElementById("solveCross").onclick = function () { solveCross() };
    document.getElementById("solveLL").onclick = function () { solveOLL(true) };
    document.getElementById("solveOLL").onclick = function () { solveOLL(false) };
    document.getElementById("solvePLL").onclick = function () { solvePLLEdges(true, false) };
    document.getElementById("solvePLLEdges").onclick = function () { solvePLLEdges(false, false) };
    document.getElementById("solvePLLCorners").onclick = function () { solvePLLCorners() };
}

// uU, dD, fF, bB, rR, lL
//uppercase = clockwise
//lowercase = counter clockwise
async function executeAlgorithm(algorithm, absolute) {
    algorithm = [...algorithm];
    for (i = 0; i < algorithm.length; i++) {
        let side = algorithm[i];
        await delay(intervall + 1);
        if (!absolute) {
            if (side === "U") up(false);
            if (side === "D") down(false);
            if (side === "F") front(false);
            if (side === "B") back(false);
            if (side === "R") right(false);
            if (side === "L") left(false);

            if (side === "u") up(true);
            if (side === "d") down(true);
            if (side === "f") front(true);
            if (side === "b") back(true);
            if (side === "r") right(true);
            if (side === "l") left(true);
        } else {
            if (side === "U") turnY(false);
            if (side === "D") turnW(false);
            if (side === "F") turnB(false);
            if (side === "B") turnG(false);
            if (side === "R") turnR(false);
            if (side === "L") turnO(false);

            if (side === "u") turnY(true);
            if (side === "d") turnW(true);
            if (side === "f") turnB(true);
            if (side === "b") turnG(true);
            if (side === "r") turnR(true);
            if (side === "l") turnO(true);
        }
    }
}

async function solveCross() {
    for (j = 0; j < 4; j++) {
        //Green Side
        if (getCubieColor(pointFront, 0, 1, -1) === "white") { executeAlgorithm(CrossG1, true); await delay(intervall) }  //Top
        else if (getCubieColor(pointFront, -1, 0, -1) === "white") { executeAlgorithm(CrossG2, true); }  //Right
        else if (getCubieColor(pointFront, 0, -1, -1) === "white") { executeAlgorithm(CrossG3, true); await delay(intervall) }  //Bottom
        else if (getCubieColor(pointFront, 1, 0, -1) === "white") { executeAlgorithm(CrossG4, true); }  //Left

        //Blue Side
        else if (getCubieColor(pointBack, 0, 1, 1) === "white") { executeAlgorithm(CrossB1, true); await delay(intervall) }  //Top
        else if (getCubieColor(pointBack, 1, 0, 1) === "white") { executeAlgorithm(CrossB2, true); }  //Right
        else if (getCubieColor(pointBack, 0, -1, 1) === "white") { executeAlgorithm(CrossB3, true); await delay(intervall) }  //Bottom
        else if (getCubieColor(pointBack, -1, 0, 1) === "white") { executeAlgorithm(CrossB4, true); }  //Left

        //Red Side
        else if (getCubieColor(pointRight, 1, 1, 0) === "white") { executeAlgorithm(CrossR1, true); }  //Top
        else if (getCubieColor(pointRight, 1, 0, -1) === "white") { executeAlgorithm(CrossR2, true); await delay(intervall * 2) }  //Right
        else if (getCubieColor(pointRight, 1, -1, 0) === "white") { executeAlgorithm(CrossR3, true); }  //Bottom
        else if (getCubieColor(pointRight, 1, 0, 1) === "white") { executeAlgorithm(CrossR4, true); }  //Left

        //Orange Side
        else if (getCubieColor(pointLeft, -1, 1, 0) === "white") { executeAlgorithm(CrossO1, true); }  //Top
        else if (getCubieColor(pointLeft, -1, 0, 1) === "white") { executeAlgorithm(CrossO2, true); }  //Right
        else if (getCubieColor(pointLeft, -1, -1, 0) === "white") { executeAlgorithm(CrossO3, true); }  //Bottom
        else if (getCubieColor(pointLeft, -1, 0, -1) === "white") { executeAlgorithm(CrossO4, true); await delay(intervall * 2) }  //Left

        //White Side
        else if (getCubieColor(pointBelow, 0, -1, 1) === "white") { executeAlgorithm(CrossW1, true); }  //Top
        else if (getCubieColor(pointBelow, 1, -1, 0) === "white") { executeAlgorithm(CrossW2, true); } //Right
        else if (getCubieColor(pointBelow, 0, -1, -1) === "white") { executeAlgorithm(CrossW3, true); await delay(intervall) } //Bottom
        else if (getCubieColor(pointBelow, -1, -1, 0) === "white") { executeAlgorithm(CrossW4, true); } //Left
        await delay(intervall * 5);
    }
    solvePLLEdges(false, true);
}

async function solveOLL(PLL) {
    for (i = 0; i < 4; i++) {
        buildOLLId();
        if (OLLId === "00000000") {
            console.log("OLL Already Solved");
            if(PLL) solvePLLEdges(true, false);
            return;
        }
        if (OLLMap[OLLId] != null) {
            console.log("OLLId: " + OLLId);
            executeAlgorithm(OLLMap[OLLId], true);
            if(PLL) {
                await delay((intervall+40) *OLLMap[OLLId].length);
                solvePLLEdges(true, false);
            }
            return;
        }
        up();
        await delay(intervall + 1);
    }
    console.log("Not a Valid OLL case.");
}

async function solvePLLCorners() {
    buildPLLCornersId();
    console.log("PLLCornersId: " + PLLCornersId);
    if (PLLCornersId === "0123") {
        console.log("PLL Already Solved");
        return;
    }
    if (PLLCornersMap[PLLCornersId] != undefined) {
        executeAlgorithm(PLLCornersMap[PLLCornersId], true);
        return;
    }
    console.log("Not a Valid PLL Corners case.");
}

function buildPLLCornersId() {
    // greenOrange = 0, greenRed = 1, blueRed = 2, blueOrange = 3
    PLLCornersId = "";

    let greenOrange = getCubieColor(pointFrontYellow, -1, 1, -1) + getCubieColor(pointLeftYellow, -1, 1, -1);
    let greenRed = getCubieColor(pointFrontYellow, 1, 1, -1) + getCubieColor(pointRightYellow, 1, 1, -1);
    let blueRed = getCubieColor(pointBackYellow, 1, 1, 1) + getCubieColor(pointRightYellow, 1, 1, 1);
    let blueOrange = getCubieColor(pointBackYellow, -1, 1, 1) + getCubieColor(pointLeftYellow, -1, 1, 1);

    addToPLLCornersId(greenOrange);
    addToPLLCornersId(greenRed);
    addToPLLCornersId(blueRed);
    addToPLLCornersId(blueOrange);
}

function getCubieColor(startPoint, targetX, targetY, targetZ) {
    let direction = dir.subVectors(new THREE.Vector3(targetX, targetY, targetZ), startPoint).normalize();
    raycaster.set(startPoint, direction);
    let foundColor = raycaster.intersectObjects(normalArray, true)[0].object.material.color;
    //scene.add(new THREE.ArrowHelper(raycaster.ray.direction, raycaster.ray.origin, 3, 0xff0000));
    if (foundColor.r > 0.8 && foundColor.g > 0.8 && foundColor.b > 0.8) return "white";
    if (foundColor.r === 1) {
        if (foundColor.g === 0) {
            return "red";
        } else {
            return "orange";
        }
    } else {
        if (foundColor.g === 0) {
            return "blue";
        } else {
            return "green";
        }
    }
}

function addToPLLCornersId(colorCombo) {
    if (colorCombo === "greenorange" || colorCombo === "orangegreen") PLLCornersId += 0;
    if (colorCombo === "greenred" || colorCombo === "redgreen") PLLCornersId += 1;
    if (colorCombo === "bluered" || colorCombo === "redblue") PLLCornersId += 2;
    if (colorCombo === "blueorange" || colorCombo === "orangeblue") PLLCornersId += 3;
}

async function solvePLLEdges(corners, cross) {
    for (i = 0; i < 4; i++) {
        buildPLLEdgesId();
        if (PLLEdgesId === "0123") {
            console.log("PLL Edges already solved");
            if (cross) executeAlgorithm("FFRRBBLL");
            if (corners) solvePLLCorners();
            return;
        }
        if (PLLEdgesMap[PLLEdgesId] != undefined) {
            console.log("PLLEdgesId: " + PLLEdgesId);
            if (cross) {
                executeAlgorithm(PLLEdgesMap[PLLEdgesId] + "FFRRBBLL", true);
            } else {
                executeAlgorithm(PLLEdgesMap[PLLEdgesId], true);
                if (corners) {
                    await delay((intervall+40) * PLLEdgesMap[PLLEdgesId].length);
                    solvePLLCorners();
                }
            }
            return;
        }
        up();
        await delay(intervall + 1);
    }
    console.log("Not a valid PLL Edges case.")
}

function buildPLLEdgesId() {
    PLLEdgesId = "";
    let color1 = getCubieColor(pointFrontYellow, 0, 1, -1); //Green
    let color2 = getCubieColor(pointRightYellow, -1, 1, 0); //Red
    let color3 = getCubieColor(pointBackYellow, 0, 1, 1); //Blue
    let color4 = getCubieColor(pointLeftYellow, 1, 1, 0); //Orange

    addColorToPLLEdgesId(color1);
    addColorToPLLEdgesId(color2);
    addColorToPLLEdgesId(color3);
    addColorToPLLEdgesId(color4);
}

function addColorToPLLEdgesId(color) {
    if (color === "green") PLLEdgesId += 0;
    if (color === "red") PLLEdgesId += 1;
    if (color === "blue") PLLEdgesId += 2;
    if (color === "orange") PLLEdgesId += 3;
}

function dotCornerLine() {
    executeAlgorithm("FRUruf", false);
}

function rightSune() {
    executeAlgorithm("RUrURuur", false);
}

function leftSune() {
    executeAlgorithm("luLulUUL", false);
}

function edgeSwitchRight() {
    executeAlgorithm("rUrururURURR", false);
}

function edgeSwitchLeft() {
    executeAlgorithm("LuLULULulull", false);
}

function cornerSwitchRight() {
    executeAlgorithm("RbRFFrBRFFRR", false);
}

function cornerSwitchLeft() {
    executeAlgorithm("lBlffLblffll", false);
}

async function scramble() {
    let lastTurnedSide = 0;
    let random;
    let randomBoolean;
    for (i = 0; i < 20; i++) {
        random = Math.random() * 6;
        random -= random % 1;
        if (random === lastTurnedSide) {
            i++;
            continue;
        }
        randomBoolean = Math.random() >= 0.5;
        await delay(intervall + 1);
        if (random === 0) turnY(randomBoolean);
        if (random === 1) turnW(randomBoolean);
        if (random === 2) turnB(randomBoolean);
        if (random === 3) turnG(randomBoolean);
        if (random === 4) turnR(randomBoolean);
        if (random === 5) turnO(randomBoolean);
        lastTurnedSide = random;
    }
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}
