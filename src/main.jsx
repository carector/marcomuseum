import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
//import App from './App.jsx';
import Scene from './three/Scene.jsx';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		{/* <div style={{ width: '100vw', height: '100vh' }}>
			<Scene></Scene>
		</div> */}
		
		<div style={{ width: '100vw', height: '100vh' }}>
			<Scene></Scene>
			{/* <ScrollHome/> */}
			{/* <div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
				}}
			>
				{}
				
			</div> */}
		</div>
	</StrictMode>
);
