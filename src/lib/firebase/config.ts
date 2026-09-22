import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDocFromServer } from "firebase/firestore";
import firebaseConfig from "../../../firebase-applet-config.json";

// Resolve config with fallback to environment variables for Vercel and multi-environment deployments
const resolvedConfig = {
  ...firebaseConfig,
  apiKey:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_FIREBASE_API_KEY) ||
    firebaseConfig.apiKey,
  authDomain:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN) ||
    firebaseConfig.authDomain,
  projectId:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_FIREBASE_PROJECT_ID) ||
    firebaseConfig.projectId,
  storageBucket:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET) ||
    firebaseConfig.storageBucket,
  messagingSenderId:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID) ||
    firebaseConfig.messagingSenderId,
  appId:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_FIREBASE_APP_ID) ||
    firebaseConfig.appId,
  firestoreDatabaseId:
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_FIREBASE_FIRESTORE_DATABASE_ID) ||
    firebaseConfig.firestoreDatabaseId,
};

export const isFirebaseConfigured = Boolean(
  resolvedConfig && resolvedConfig.apiKey && resolvedConfig.projectId,
);

const app = getApps().length === 0 ? initializeApp(resolvedConfig) : getApp();

/* CRITICAL: The app will break without this line */
export const db = getFirestore(app, resolvedConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null,
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error("Firestore Error: ", JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// CRITICAL CONSTRAINT: Test connection on initialization when running in browser
if (typeof window !== "undefined") {
  async function testConnection() {
    try {
      await getDocFromServer(doc(db, "test", "connection"));
    } catch (error) {
      if (error instanceof Error && error.message.includes("the client is offline")) {
        console.error("Please check your Firebase configuration.");
      }
    }
  }
  testConnection();
}
