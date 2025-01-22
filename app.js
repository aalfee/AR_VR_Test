import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.146.0/build/three.module.js';
import * as THREEx from 'https://cdnjs.cloudflare.com/ajax/libs/ar.js/2.1.1/aframe-ar.min.js';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('AR-window') });
renderer.setSize(window.innerWidth, window.innerHeight);

const objectLoader = new OBJLoader();
const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 1.4);
orbit.update(); 


objectLoader.load('head.obj', (head) => {
    //data.children[0].material = new THREE.MeshBasicMaterial({color: 0x00ff00})    
    head.scale.set(0.038,0.042,0.038);
    head.position.set(0, -0.5, 0);
    head.rotation.x = -1.55;
    scene.add(head); });


const BackgroundGeometry = new THREE.PlaneGeometry(50, 50);
const BackgroundMaterial = new THREE.MeshPhongMaterial({
    color: 0x0000FF, // Dark background for contrast
    side: THREE.DoubleSide,
    opacity: 0.7,
    transparent: true
});
const Background = new THREE.Mesh(BackgroundGeometry, BackgroundMaterial);
scene.add(Background);
Background.position.z = -1;


const ambientLight = new THREE.AmbientLight(0xffffff, 0.15); // Soft ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFA500, 0.85); // Adjusted light intensity
directionalLight.position.set(5, -5, 50);
directionalLight.rotation.z = -5;

scene.add(directionalLight);

const pointLight2 = new THREE.PointLight(0x800080, 7, 13); // Bright point light for highlights
pointLight2.position.set(-6, 2, 10);
scene.add(pointLight2);



    const arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });
    arToolkitSource.init(function onReady() {
        onResize();
    });

    window.addEventListener('resize', function () {
        onResize();
    });

    function onResize() {
        arToolkitSource.onResize();
        arToolkitSource.copySizeTo(renderer.domElement);
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
        }
    }

    const arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'https://rawgit.com/jeromeetienne/AR.js/master/aframe/examples/marker-training/examples/camera_para.dat',
        detectionMode: 'mono',
        maxDetectionRate: 30,
    });
    arToolkitContext.init(function () {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    const markerRoot = new THREE.Group();
    scene.add(markerRoot);

    // Add a marker to place the jewelry model
    const marker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
        type: 'pattern',
        patternUrl: 'https://rawgit.com/jeromeetienne/AR.js/master/aframe/examples/marker-training/examples/pattern-hiro.patt',
    });


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    console.log(camera.position);
}
animate();



window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});



/*
let scene, camera, renderer, model;

function init() {
    // Set up the scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.6);
    document.getElementById('vr-view').appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.AmbientLight(0x404040);  // Ambient light
    scene.add(light);
    


    // Load your jewelry 3D model
    const loader = new THREE.OBJLoader();
    loader.load('head.obj', function (object) {
        model = object;
        scene.add(model);
    });

    

    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        if (model) model.rotation.y += 0.01;  // Rotate the model
        renderer.render(scene, camera);
    }

    animate();
}

// Initialize the VR viewer
init();


// AR.js setup
function initAR() {
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('ar-view').appendChild(renderer.domElement);

    const arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });
    arToolkitSource.init(function onReady() {
        onResize();
    });

    window.addEventListener('resize', function () {
        onResize();
    });

    function onResize() {
        arToolkitSource.onResize();
        arToolkitSource.copySizeTo(renderer.domElement);
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
        }
    }

    const arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: 'https://rawgit.com/jeromeetienne/AR.js/master/aframe/examples/marker-training/examples/camera_para.dat',
        detectionMode: 'mono',
        maxDetectionRate: 30,
    });
    arToolkitContext.init(function () {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    const markerRoot = new THREE.Group();
    scene.add(markerRoot);

    // Add a marker to place the jewelry model
    const marker = new THREEx.ArMarkerControls(arToolkitContext, markerRoot, {
        type: 'pattern',
        patternUrl: 'https://rawgit.com/jeromeetienne/AR.js/master/aframe/examples/marker-training/examples/pattern-hiro.patt',
    });



*/
