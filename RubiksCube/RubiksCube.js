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
let intervall = 350;

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
const font = fontLoader.load("https://rekhyt2901.github.io/AlexGames/IndexAssets/font.json", function (font) {
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

function addHTMLButtons() {
    document.getElementById("turnYellow").onclick = function () { turnY(false); };
    document.getElementById("turnWhite").onclick = function () { turnW(false); };
    document.getElementById("turnBlue").onclick = function () { turnB(false); };
    document.getElementById("turnGreen").onclick = function () { turnG(false); };
    document.getElementById("turnRed").onclick = function () { turnR(false); };
    document.getElementById("turnOrange").onclick = function () { turnO(false); };
    document.getElementById("solve").onclick = function () { solve() };
}



function solve() {
    alert("Geht leider noch nicht :(");
}
