import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import App from './App.jsx';
import Scene from './three/Scene.jsx';
import {
	CubeTextureLoader
} from 'three';
import { Canvas } from '@react-three/fiber';

const texLoader = new CubeTextureLoader();
	const skybox = texLoader.load([
		'tex/seeingred_lf.png',
		'tex/seeingred_rt.png',
		'tex/seeingred_up.png',
		'tex/seeingred_dn.png',
		'tex/seeingred_ft.png',
		'tex/seeingred_bk.png',
	]);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<div style={{ width: '100vw', height: '100vh' }}>
			<Canvas
				shadows
				gl={{ preserveDrawingBuffer: true, antialias: false }}
				scene={{ background: skybox }}
				// flat
			>
				<Scene />
			</Canvas>
		</div>
	</StrictMode>
);
