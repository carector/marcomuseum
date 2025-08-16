import * as THREE from 'three';

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

let camera: THREE.PerspectiveCamera,
	scene: THREE.Scene,
	renderer: THREE.WebGLRenderer;

init();

function init() {
	const container = document.createElement('div');
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		0.25,
		20
	);
	camera.position.set(0, 0.1, 0.2)
    camera.rotation.set(0, 0, 0);
    camera.far = 10000

	scene = new THREE.Scene();

    const light = new THREE.AmbientLight( 0xfffffff ); // soft white light
    scene.add( light );

	// model

	const loader = new GLTFLoader();
	loader.load('models/Pyramid.glb', async function (gltf) {
		const model = gltf.scene;

		// wait until the model can be added to the scene without blocking due to shader compilation

		await renderer.compileAsync(model, camera, scene);
        model.scale.set(0.1, 0.1, 0.1);
		scene.add(model);

		render();
	});

	const texLoader = new THREE.CubeTextureLoader();
	const texture = texLoader.load([
		'tex/pos-x.jpg',
		'tex/neg-x.jpg',
		'tex/pos-y.jpg',
		'tex/neg-y.jpg',
		'tex/pos-z.jpg',
		'tex/neg-z.jpg',
	]);
	scene.background = texture;

	renderer = new THREE.WebGLRenderer({ antialias: false });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	// renderer.toneMapping = THREE.ACESFilmicToneMapping;
	// renderer.toneMappingExposure = 1;
	container.appendChild(renderer.domElement);

	const controls = new OrbitControls(camera, renderer.domElement);
	controls.addEventListener('change', render); // use if there is no animation loop
	controls.minDistance = 2;
	controls.maxDistance = 10;
	//controls.target.set(0, 0, -0.2);
	controls.update();

	window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

	render();
}

//

function render() {
	renderer.render(scene, camera);
}
