import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Scene from './three/Scene.tsx';

//import {setupFirebase, getDb} from './fb/fb.ts';

// import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';

// Only reading public info from firebase so we only need the projectId
// const firebaseConfig = {
// 	projectId: 'marcomuseum',
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* <div style={{ width: '100vw', height: '100vh' }}>
			<Scene></Scene>
		</div> */}
		<div style={{ width: '100vw', height: '100vh' }}>
			<Scene></Scene>
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
