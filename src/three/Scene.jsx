// src/Scene.tsx
import {
	Circle,
	Html,
	OrbitControls,
	Stats,
	Image,
	useProgress,
} from '@react-three/drei';
import { extend, Canvas, useFrame, useLoader } from '@react-three/fiber';
import React, { useRef, useState, useEffect, Suspense } from 'react';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { easing, geometry } from 'maath';

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry });

import {
	PerspectiveCamera,
	Group,
	Vector3,
	TextureLoader,
	CubeTextureLoader,
} from 'three';
import { mx_bilerp_0 } from 'three/src/nodes/materialx/lib/mx_noise.js';
import Model from './PyramidTextured.jsx';

function Loader() {
	const { progress } = useProgress();
	//console.log(progress);
	return <Html center>{progress} % loaded</Html>;
}

const Scene = () => {
	// const gltf = useLoader(GLTFLoader, '/models/pyramid.glb');
	// const texLoader = new TextureLoader();

	const texLoader = new CubeTextureLoader();
	const skybox = texLoader.load([
		'tex/seeingred_lf.png',
		'tex/seeingred_rt.png',
		'tex/seeingred_up.png',
		'tex/seeingred_dn.png',
		'tex/seeingred_ft.png',
		'tex/seeingred_bk.png',
	]);

	const camera = new PerspectiveCamera();
	camera.fov = 60;
	camera.position.set(0, 4, -1);
	camera.lookAt(new Vector3(0, 6, 50));

	const [imgIndex, setImgIndex] = useState(0);
	const [imgData, setImgData] = useState([]); // TODO create marco metadata interface

	function incrementIndex() {
		setImgIndex((imgIndex + 1) % imgData.length);
	}

	function decrementIndex() {
		setImgIndex((imgIndex - 1 + imgData.length) % imgData.length);
	}

	// Fetch image metadata
	useEffect(() => {
		async function init() {
			const res = await fetch('/marcomanifest.json');
			const json = await res.json();
			setImgData(json);
		}
		init();
	}, []);

	// useFrame(() => {
	// 	camera.position.set(-20, 50, -20);
	// 	//camera.lookAt(new Vector3(0, 0, 0));
	// 	camera.lookAt(new Vector3(0, 10, 50));
	// })

	return (
		<Canvas
			camera={camera}
			shadows
			gl={{ preserveDrawingBuffer: true, antialias: false }}
			scene={{ background: skybox }}
		>
			<Suspense fallback={<Loader />}>
				<directionalLight
					position={[-10, 10, -10]}
					castShadow
					intensity={Math.PI * 1}
				/>
				<pointLight
					position={[-7, 2, 10]}
					color={'orange'}
					intensity={10}
					distance={50}
					decay={1}
				/>
				<pointLight
					position={[7, 2, 10]}
					color={'orange'}
					intensity={10}
					distance={50}
					decay={1}
				/>

				<Model />
				{imgData.map((data, index) => {
					const realIndex = (index + imgIndex) % imgData.length;
					const pos = -5 * (realIndex - 4);
					const offset = pos == 0 ? 0 : 1.5 * Math.sign(pos);
					if (0 > realIndex > 8) return <></>;
					return (
						<Image
							zoom={1}
							scale={
								realIndex == 4 ? 5 : 3 - Math.abs(pos) * 0.04
							}
							toneMapped
							rotation={[0, Math.PI, 0]}
							position={[
								pos + offset,
								realIndex == 4 ? 5 : 3.25,
								14.5,
							]}
							url={data.original.substring(1)}
						>
							<roundedPlaneGeometry args={[1, 16 / 9, 0.08]} />
						</Image>
					);
				})}
				<Html
					castShadow
					occlude
					receiveShadow
					transform
					position={[3.5, 4, 13]}
				>
					<button>⮞</button>
				</Html>
				<Html
					castShadow
					occlude
					receiveShadow
					transform
					position={[-3.5, 4, 13]}
				>
					<button>⮜</button>
				</Html>
				<Html occlude receiveShadow position={[-3.5, 4, 7]}>
					<iframe
						width="315"
						height="200"
						src="https://www.youtube.com/embed/videoseries?si=gsuz0kyUHqX6-N3E&amp;list=PL9A5z1iPQIu-kNxJAE7faWNa4qgSOF9D3"
						title="YouTube video player"
						frameborder="0"
						allow="autoplay; clipboard-write; encrypted-media"
						referrerpolicy="strict-origin-when-cross-origin"
					></iframe>
				</Html>
				<OrbitControls target={[0, 4, 5]} />
			</Suspense>
		</Canvas>
	);
};

export default Scene;
