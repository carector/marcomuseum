import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';



//import {setupFirebase, getDb} from './fb/fb.ts';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Only reading public info from firebase so we only need the projectId
const firebaseConfig = {
	projectId: 'marcomuseum',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App db={db} />
	</StrictMode>
);
