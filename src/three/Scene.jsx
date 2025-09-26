// src/Scene.tsx
import {
	Circle,
	Html,
	OrbitControls,
	Stats,
	Image,
	useProgress,
} from '@react-three/drei';
import {
	extend,
	Canvas,
	useFrame,
	useLoader,
	useThree,
} from '@react-three/fiber';
import React, {
	useRef,
	useState,
	useEffect,
	Suspense,
	useLayoutEffect,
} from 'react';
import { easing, geometry } from 'maath';

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry });

import { PerspectiveCamera, Vector3, CubeTextureLoader } from 'three';
import Model from './PyramidTextured.jsx';

function Loader() {
	const { progress } = useProgress();
	//console.log(progress);
	return <Html center>{progress} % loaded</Html>;
}

const Scene = () => {
	// const gltf = useLoader(GLTFLoader, '/models/pyramid.glb');
	// const texLoader = new TextureLoader();

	const cameraRef = useRef(new PerspectiveCamera());

	const viewport = useThree((state) => state.viewport);
	useLayoutEffect(() => {
		cameraRef.current.fov = 30;
		cameraRef.current.position.set(0, 4, -1);
		cameraRef.current.lookAt(new Vector3(0, 6, 50));
		cameraRef.current.aspect = viewport.width / viewport.height;
		cameraRef.current.updateProjectionMatrix();
	}, [viewport]);

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
				if (0 > realIndex || realIndex > 8) return <></>;
				return (
					<Image
						zoom={1}
						scale={realIndex == 4 ? 5 : 3 - Math.abs(pos) * 0.04}
						toneMapped
						rotation={[0, Math.PI, 0]}
						position={[
							-pos - offset,
							realIndex == 4 ? 5 : 3.25,
							14.5,
						]}
						url={data.original.substring(1)}
					>
						<roundedPlaneGeometry args={[1, 16 / 9, 0.08]} />
					</Image>
				);
			})}
			{/* Index */}
			<Html
				castShadow
				occlude
				receiveShadow
				center
				position={[0, 10, 13]}
			>
				<h1>
					{imgIndex}/{imgData.length - 1}
				</h1>
			</Html>
			{/* Grid button */}
			<Html
				castShadow
				occlude
				receiveShadow
				center
				position={[3, 10, 13]}
			>
				<button onClick={() => {}}>Filters</button>
			</Html>
			{/* Fullscreen image button */}
			<Html
				castShadow
				occlude
				receiveShadow
				center
				position={[-3, 10, 13]}
			>
				<button onClick={() => {window.open(imgData[(4 - imgIndex + imgData.length) % imgData.length].original)}}>Source</button>
			</Html>
			{/* Left arrow */}
			<Html
				castShadow
				occlude
				receiveShadow
				transform
				position={[3.5, 4, 13]}
			>
				<button
					onClick={() => {
						decrementIndex();
					}}
				>
					⮞
				</button>
			</Html>
			{/* Right arrow */}
			<Html
				castShadow
				occlude
				receiveShadow
				transform
				position={[-3.5, 4, 13]}
			>
				<button
					onClick={() => {
						incrementIndex();
					}}
				>
					⮜
				</button>
			</Html>
			{/* Playlist */}
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
			</Html>{' '}
			<OrbitControls target={[0, 4, 5]} />
		</Suspense>
	);
};

export default Scene;
