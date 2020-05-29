let shelf;
let test;
//Scene and Light
const scene = new THREE.Scene();
//const light = new THREE.AmbientLight(0xffffff, 0.1);
//scene.add(light);
const light2 = new THREE.DirectionalLight(0xffffff, 3);
light2.position.set(0, 20, 120);
scene.add(light2);

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
window.addEventListener("resize", onWindowResize, false);
camera.position.set(0, 0.9, 1.8);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x555555, 1);
document.body.appendChild(renderer.domElement);

//Orbit Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.minDistance = 0;
//controls.maxDistance = 100;
controls.enableRotate = true;
controls.enableZoom = true;
controls.enablePan = true;

//Loading Manager
const manager = new THREE.LoadingManager();
manager.onLoad = function () {
    console.log('Loading complete!');
    addEventListeners();
    render();
};
manager.onError = function (url) {
    console.log('There was an error loading ' + url);
};

//glTF Loader
const glTFLoader = new THREE.GLTFLoader(manager);

//Font Loader
/* const fontLoader = new THREE.FontLoader();
const font = fontLoader.load("/IndexAssets/font.json", function (font) {
    let textGeometry = new THREE.TextGeometry("Nothing for now", {
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
    let text = new THREE.Mesh(textGeometry, new THREE.MeshPhongMaterial({ color: 0x000000, specular: 0xffffff }));
    text.position.set(0, 0, -5);
    scene.add(text);
}); */

//Event Listener
const domEvents = new THREEx.DomEvents(camera, renderer.domElement);

//Render Loop
function render() {
    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

glTFLoader.load("IndexAssets/Shelf.glb", function (gltf) {
    gltf.scene.position.set(-0, -1.3, 0);
    shelf = gltf.scene;
    scene.add(gltf.scene);
});

function addEventListeners() {
    domEvents.addEventListener(shelf.children[2], "click", function (event) {
        window.open("RubiksCube/RubiksCube.html", "_blank");
    });
}

/* var rect = new THREE.Shape();
rect.moveTo(0, 0);
rect.lineTo(1, 0);
rect.lineTo(1, 1);
var geometry = new THREE.ShapeGeometry(rect);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var mesh = new THREE.Mesh(geometry, material);
scene.add(mesh); */