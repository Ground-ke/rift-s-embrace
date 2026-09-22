import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as signOut, i as signInWithPopup, r as onAuthStateChanged, t as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
import "../_libs/firebase.mjs";
import { d as doc, s as setDoc, t as getDoc } from "../_libs/@firebase/firestore+[...].mjs";
import { a as isFirebaseConfigured, n as auth, r as db } from "./config-Lt0fTSJK.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-auth-context-Bh46mYen.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var supabaseUrl = {
	"BASE_URL": "/",
	"DEV": true,
	"MODE": "production",
	"PROD": false,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "sb_publishable_rFq7_mUx7innuPuzywPUug_vNXUUY7j",
	"VITE_SUPABASE_URL": "https://gndycaanxqmophhhvnoy.supabase.co/rest/v1/"
}["VITE_SUPABASE_URL"] || "";
var supabaseAnonKey = {
	"BASE_URL": "/",
	"DEV": true,
	"MODE": "production",
	"PROD": false,
	"SSR": true,
	"TSS_DEV_SERVER": "false",
	"TSS_DEV_SSR_STYLES_BASEPATH": "/",
	"TSS_DEV_SSR_STYLES_ENABLED": "true",
	"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
	"TSS_INLINE_CSS_ENABLED": "false",
	"TSS_ROUTER_BASEPATH": "",
	"TSS_SERVER_FN_BASE": "/_serverFn/",
	"VITE_SUPABASE_ANON_KEY": "sb_publishable_rFq7_mUx7innuPuzywPUug_vNXUUY7j",
	"VITE_SUPABASE_URL": "https://gndycaanxqmophhhvnoy.supabase.co/rest/v1/"
}["VITE_SUPABASE_ANON_KEY"] || "";
var supabaseClient = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
var isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
var _jsxFileName = "/app/applet/src/lib/auth/admin-auth-context.tsx";
var AdminAuthContext = (0, import_react.createContext)(void 0);
var STORAGE_KEY = "rift_admin_session";
var PRESET_ACCOUNTS = {
	admin: {
		id: "usr-admin-erastus",
		email: "erastus.n.gathungu@gmail.com",
		name: "Erastus Gathungu (Organizer)",
		role: "admin"
	},
	scanner: {
		id: "usr-scanner-gate",
		email: "scanner.milimani@verve.co.ke",
		name: "Gate Alpha Security",
		role: "scanner"
	},
	customer: {
		id: "usr-customer-amara",
		email: "amara.vance@example.com",
		name: "Amara Vance (Attendee)",
		role: "customer"
	}
};
function AdminAuthProvider({ children }) {
	const [user, setUser] = (0, import_react.useState)(null);
	const [firebaseUser, setFirebaseUser] = (0, import_react.useState)(null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		let unsubscribeFirebase = null;
		if (isFirebaseConfigured && auth) try {
			unsubscribeFirebase = onAuthStateChanged(auth, async (fbUser) => {
				if (!isMounted) return;
				setFirebaseUser(fbUser);
				if (fbUser && fbUser.email) {
					const normalizedEmail = fbUser.email.toLowerCase();
					let role = "customer";
					const isBootstrappedOrganizer = normalizedEmail === "erastus.n.gathungu@gmail.com";
					let isFirestoreAdmin = false;
					try {
						if ((await getDoc(doc(db, "admins", fbUser.uid))).exists()) isFirestoreAdmin = true;
					} catch {}
					if (isBootstrappedOrganizer || isFirestoreAdmin || normalizedEmail.includes("admin") || normalizedEmail.includes("verve")) {
						role = "admin";
						try {
							await setDoc(doc(db, "admins", fbUser.uid), {
								email: normalizedEmail,
								name: fbUser.displayName || "Erastus Gathungu",
								role: "admin",
								createdAt: (/* @__PURE__ */ new Date()).toISOString()
							}, { merge: true });
						} catch {}
					} else if (normalizedEmail.includes("scanner")) role = "scanner";
					try {
						await setDoc(doc(db, "users", fbUser.uid), {
							uid: fbUser.uid,
							email: normalizedEmail,
							displayName: fbUser.displayName || normalizedEmail.split("@")[0],
							role,
							createdAt: (/* @__PURE__ */ new Date()).toISOString()
						}, { merge: true });
					} catch {}
					const activeUser = {
						id: fbUser.uid,
						email: normalizedEmail,
						name: fbUser.displayName || normalizedEmail.split("@")[0],
						role,
						avatarUrl: fbUser.photoURL || void 0,
						isFirebase: true
					};
					setUser(activeUser);
					localStorage.setItem(STORAGE_KEY, JSON.stringify(activeUser));
					setIsLoading(false);
					return;
				}
				checkStoredOrPreset();
			});
		} catch (err) {
			console.warn("Firebase Auth listener error:", err);
			checkStoredOrPreset();
		}
		else checkStoredOrPreset();
		async function checkStoredOrPreset() {
			if (!isMounted) return;
			try {
				if (isSupabaseConfigured && supabaseClient) {
					const { data: { session } } = await supabaseClient.auth.getSession();
					if (session?.user) {
						const role = session.user.email?.includes("admin") ? "admin" : "customer";
						setUser({
							id: session.user.id,
							email: session.user.email || "admin@verve.co.ke",
							name: session.user.user_metadata?.["name"] || "Event Staff",
							role
						});
						setIsLoading(false);
						return;
					}
				}
				const stored = localStorage.getItem(STORAGE_KEY);
				if (stored) try {
					const parsed = JSON.parse(stored);
					setUser(parsed);
				} catch {
					localStorage.removeItem(STORAGE_KEY);
					setUser(PRESET_ACCOUNTS.admin);
				}
				else {
					setUser(PRESET_ACCOUNTS.admin);
					localStorage.setItem(STORAGE_KEY, JSON.stringify(PRESET_ACCOUNTS.admin));
				}
			} catch (err) {
				console.warn("Auth fallback warning:", err);
				setUser(PRESET_ACCOUNTS.admin);
			} finally {
				setIsLoading(false);
			}
		}
		return () => {
			isMounted = false;
			if (unsubscribeFirebase) unsubscribeFirebase();
		};
	}, []);
	/**
	* Firebase Google Sign-In Popup
	*/
	const signInWithGoogle = async () => {
		setIsLoading(true);
		try {
			if (!isFirebaseConfigured || !auth) throw new Error("Firebase Authentication is not configured.");
			const provider = new GoogleAuthProvider();
			provider.setCustomParameters({ prompt: "select_account" });
			const fbUser = (await signInWithPopup(auth, provider)).user;
			if (!fbUser || !fbUser.email) throw new Error("No user email returned from Google authentication.");
			const email = fbUser.email.toLowerCase();
			try {
				await setDoc(doc(db, "admins", fbUser.uid), {
					email,
					name: fbUser.displayName || email.split("@")[0],
					role: "admin",
					createdAt: (/* @__PURE__ */ new Date()).toISOString()
				}, { merge: true });
				await setDoc(doc(db, "users", fbUser.uid), {
					uid: fbUser.uid,
					email,
					displayName: fbUser.displayName || email.split("@")[0],
					role: "admin",
					createdAt: (/* @__PURE__ */ new Date()).toISOString()
				}, { merge: true });
			} catch (dbErr) {
				console.warn("Firestore user sync note:", dbErr);
			}
			const activeUser = {
				id: fbUser.uid,
				email,
				name: fbUser.displayName || email.split("@")[0],
				role: "admin",
				avatarUrl: fbUser.photoURL || void 0,
				isFirebase: true
			};
			setUser(activeUser);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(activeUser));
			return { success: true };
		} catch (err) {
			console.error("Firebase Google Sign-In Error:", err);
			const code = typeof err === "object" && err !== null && "code" in err ? String(err.code) : "";
			let message = err instanceof Error ? err.message : "Google authentication failed.";
			if (code === "auth/popup-blocked") message = "Google Sign-In popup was blocked by your browser. Please allow popups for this site or use the organizer credentials below.";
			else if (code === "auth/unauthorized-domain") message = "This domain is not yet listed in Firebase Authorized Domains. Add your domain (including *.vercel.app if deploying to Vercel) in the Firebase Console under Authentication > Settings > Authorized Domains.";
			else if (code === "auth/cancelled-popup-request" || code === "auth/popup-closed-by-user") message = "Sign-in popup was closed before completion. Please try again.";
			return {
				success: false,
				message
			};
		} finally {
			setIsLoading(false);
		}
	};
	/**
	* Standard Email or Preset Sign In
	*/
	const signIn = async (email, targetRole = "admin") => {
		setIsLoading(true);
		try {
			const normalizedEmail = email.trim().toLowerCase();
			let assignedRole = targetRole;
			if (normalizedEmail.includes("scanner")) assignedRole = "scanner";
			else if (normalizedEmail.includes("guest") || normalizedEmail.includes("customer")) assignedRole = "customer";
			else if (normalizedEmail.includes("admin") || normalizedEmail.includes("erastus") || normalizedEmail.includes("verve")) assignedRole = "admin";
			const activeUser = {
				id: `usr-${Date.now()}`,
				email: normalizedEmail,
				name: normalizedEmail.split("@")[0].replace(".", " ").toUpperCase(),
				role: assignedRole
			};
			setUser(activeUser);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(activeUser));
			return { success: true };
		} catch (err) {
			return {
				success: false,
				message: err instanceof Error ? err.message : "Authentication failed."
			};
		} finally {
			setIsLoading(false);
		}
	};
	const signOut$1 = async () => {
		try {
			if (auth && auth.currentUser) await signOut(auth);
		} catch (err) {
			console.debug("Firebase sign out note:", err);
		}
		if (isSupabaseConfigured && supabaseClient) try {
			await supabaseClient.auth.signOut();
		} catch {}
		localStorage.removeItem(STORAGE_KEY);
		setUser(null);
		setFirebaseUser(null);
	};
	const switchTestRole = (newRole) => {
		const preset = PRESET_ACCOUNTS[newRole];
		setUser(preset);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(preset));
	};
	const role = user?.role || null;
	const isAuthenticated = Boolean(user);
	const isAdmin = role === "admin";
	const isScanner = role === "scanner" || role === "admin";
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminAuthContext.Provider, {
		value: {
			user,
			role,
			isLoading,
			isAuthenticated,
			isAdmin,
			isScanner,
			firebaseUser,
			isFirebaseConfigured,
			signIn,
			signInWithGoogle,
			signOut: signOut$1,
			switchTestRole
		},
		children
	}, void 0, false, {
		fileName: _jsxFileName,
		lineNumber: 375,
		columnNumber: 5
	}, this);
}
function useAdminAuth() {
	const context = (0, import_react.useContext)(AdminAuthContext);
	if (!context) throw new Error("useAdminAuth must be used within an AdminAuthProvider");
	return context;
}
//#endregion
export { PRESET_ACCOUNTS as n, useAdminAuth as r, AdminAuthProvider as t };
