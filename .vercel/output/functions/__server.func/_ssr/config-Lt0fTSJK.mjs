import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import { n as getAuth } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { d as doc, f as getFirestore, n as getDocFromServer } from "../_libs/@firebase/firestore+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/config-Lt0fTSJK.js
var firebase_applet_config_default = {
	projectId: "robotic-synapse-43t6m",
	appId: "1:1091566340279:web:f27c060d76df7327092532",
	apiKey: "AIzaSyClX1zUIfqnFK3VJpSxKCH3vb5uww0QXLo",
	authDomain: "robotic-synapse-43t6m.firebaseapp.com",
	firestoreDatabaseId: "ai-studio-riftsembrace-48b92d68-fb99-42e2-b7e5-f301859f199f",
	storageBucket: "robotic-synapse-43t6m.firebasestorage.app",
	messagingSenderId: "1091566340279",
	measurementId: "",
	oAuthClientId: "1091566340279-1uega98bhauhmc2rlk807flnmli5jf34.apps.googleusercontent.com",
	recaptchaSiteKey: ""
};
var isFirebaseConfigured = Boolean(firebase_applet_config_default && firebase_applet_config_default.apiKey && firebase_applet_config_default.projectId);
var app = getApps().length === 0 ? initializeApp(firebase_applet_config_default) : getApp();
var db = getFirestore(app, firebase_applet_config_default.firestoreDatabaseId);
var auth = getAuth(app);
var OperationType = /* @__PURE__ */ function(OperationType) {
	OperationType["CREATE"] = "create";
	OperationType["UPDATE"] = "update";
	OperationType["DELETE"] = "delete";
	OperationType["LIST"] = "list";
	OperationType["GET"] = "get";
	OperationType["WRITE"] = "write";
	return OperationType;
}({});
function handleFirestoreError(error, operationType, path) {
	const errInfo = {
		error: error instanceof Error ? error.message : String(error),
		authInfo: {
			userId: auth.currentUser?.uid,
			email: auth.currentUser?.email,
			emailVerified: auth.currentUser?.emailVerified,
			isAnonymous: auth.currentUser?.isAnonymous,
			tenantId: auth.currentUser?.tenantId,
			providerInfo: auth.currentUser?.providerData?.map((provider) => ({
				providerId: provider.providerId,
				email: provider.email
			})) || []
		},
		operationType,
		path
	};
	console.error("Firestore Error: ", JSON.stringify(errInfo));
	throw new Error(JSON.stringify(errInfo));
}
if (typeof window !== "undefined") {
	async function testConnection() {
		try {
			await getDocFromServer(doc(db, "test", "connection"));
		} catch (error) {
			if (error instanceof Error && error.message.includes("the client is offline")) console.error("Please check your Firebase configuration.");
		}
	}
	testConnection();
}
//#endregion
export { isFirebaseConfigured as a, handleFirestoreError as i, auth as n, db as r, OperationType as t };
