// src/Scene.tsx
import {
	Circle,
	Html,
	OrbitControls,
	Stats,
	Image,
	useProgress,
} from '@react-three/drei';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import React, { useRef, Suspense } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { easing } from 'maath';
import { PerspectiveCamera, Group, Vector3 } from 'three';

function Loader() {
	const { progress } = useProgress();
	console.log(progress);
	return <Html center>{progress} % loaded</Html>;
}

const Scene: React.FC = () => {
	const gltf = useLoader(GLTFLoader, '/models/pyramid.glb');
	const camera = new PerspectiveCamera();
	camera.fov = 50;
	camera.position.set(0, 1.5, 8);
	camera.lookAt(new Vector3(0, 10, 50));

	// useFrame(() => {
	// 	camera.position.set(-20, 50, -20);
	// 	camera.lookAt(new Vector3(0, 0, 0));
	// })

	return (
		<Suspense fallback={<Loader />}>
			<Canvas
				camera={camera}
				shadows
				gl={{ preserveDrawingBuffer: true, antialias: false }}
			>
				<directionalLight
					position={[-1.3, 6.0, -1]}
					castShadow
					intensity={Math.PI * 1}
				/>
				<primitive
					object={gltf.scene}
					position={[0, 1, 0]}
					children-0-castShadow
				/>
				<Image
					url="/img/Snapchat-496015648.jpg"
					position={[2, 1.5, 18]}
					scale={4}
				></Image>
				<OrbitControls target={[0, 1, 0]} />
			</Canvas>
		</Suspense>
	);
};

export default Scene;
