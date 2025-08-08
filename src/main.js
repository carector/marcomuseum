import * as THREE from 'three';

const width = window.innerWidth, height = window.innerHeight;

// init

const camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
camera.position.z = 1;
camera.fov = 2;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );

const loader = new THREE.TextureLoader();
const texture = loader.load('marchive/Snapchat-1131782046.jpg');
texture.colorSpace = THREE.SRGBColorSpace;
const material = new THREE.MeshBasicMaterial({
	color: 0xFFFFFF,
	map: texture
});

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

const renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( width, height );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

// animation

function animate( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;
	//mesh.position.x = (-screen.width + (time%(screen.width*2)))/10000

	renderer.render( scene, camera );

}