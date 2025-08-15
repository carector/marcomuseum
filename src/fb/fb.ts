// Imports
const { initializeApp } = require('firebase/app');
const {
	initializeFirestore,
	collection,
	getDocs,
} = require('firebase/firestore');
const { getAnalytics } = require('firebase/analytics');
const { initializeAuth } = require('firebase/auth');
const admin = require('firebase-admin');

require('dotenv').config(); // TODO: Figure out why this is required for anything using .env file

// Firebase setup
let db;
let app;
let auth;
let adminApp;

const setup = async () => {
	// Set up config
	const firebaseConfig = {
		apiKey: process.env.FIREBASE_API_KEY,
		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
		projectId: process.env.FIREBASE_PROJECT_ID,
		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.FIREBASE_APP_ID,
	};

	// Verify .env fields
	for (const [key, value] of Object.entries(firebaseConfig)) {
		if (value === undefined) {
			console.error(
				`Error initializing Firebase: ${key} not present in environment file`
			);
			return;
		}
	}

	// Connect to app + db
	app = initializeApp(firebaseConfig);
	db = initializeFirestore(app, {
		experimentalForceLongPolling: true,
	});
	auth = initializeAuth(app);

	adminApp = admin.initializeApp(firebaseConfig);
	console.log('Firebase initialized');
};

export const setupFirebase = function () {
	setup();
};
export const getDb = function () {
	return db;
};
export const getAuth = function () {
	return auth;
};

export const getAdminApp = function () {
	return adminApp;
};
