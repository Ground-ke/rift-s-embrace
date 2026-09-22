import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  type User as FirebaseUser,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "../firebase/config";
import { supabaseClient, isSupabaseConfigured } from "../supabase/client";

export type UserRole = "admin" | "scanner" | "customer";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  isFirebase?: boolean;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  role: UserRole | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isScanner: boolean;
  firebaseUser: FirebaseUser | null;
  isFirebaseConfigured: boolean;
  signIn: (email: string, role?: UserRole) => Promise<{ success: boolean; message?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; message?: string }>;
  signOut: () => Promise<void>;
  switchTestRole: (role: UserRole) => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const STORAGE_KEY = "rift_admin_session";

// Preset accounts for seamless evaluation and verification
export const PRESET_ACCOUNTS: Record<UserRole, AdminUser> = {
  admin: {
    id: "usr-admin-erastus",
    email: "erastus.n.gathungu@gmail.com",
    name: "Erastus Gathungu (Organizer)",
    role: "admin",
  },
  scanner: {
    id: "usr-scanner-gate",
    email: "scanner.milimani@verve.co.ke",
    name: "Gate Alpha Security",
    role: "scanner",
  },
  customer: {
    id: "usr-customer-amara",
    email: "amara.vance@example.com",
    name: "Amara Vance (Attendee)",
    role: "customer",
  },
};

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize session from Firebase Auth, Supabase, or stored preset
  useEffect(() => {
    let isMounted = true;

    // 1. Firebase Auth state listener
    let unsubscribeFirebase: (() => void) | null = null;
    if (isFirebaseConfigured && auth) {
      try {
        unsubscribeFirebase = onAuthStateChanged(auth, async (fbUser) => {
          if (!isMounted) return;
          setFirebaseUser(fbUser);

          if (fbUser && fbUser.email) {
            const normalizedEmail = fbUser.email.toLowerCase();
            let role: UserRole = "customer";

            // Organizer superadmin check (from project runtime email)
            const isBootstrappedOrganizer = normalizedEmail === "erastus.n.gathungu@gmail.com";

            // Check Firestore admins collection
            let isFirestoreAdmin = false;
            try {
              const adminDoc = await getDoc(doc(db, "admins", fbUser.uid));
              if (adminDoc.exists()) {
                isFirestoreAdmin = true;
              }
            } catch {
              // ignore
            }

            if (
              isBootstrappedOrganizer ||
              isFirestoreAdmin ||
              normalizedEmail.includes("admin") ||
              normalizedEmail.includes("verve")
            ) {
              role = "admin";
              // Bootstrap or ensure organizer admin record in Firestore
              try {
                await setDoc(
                  doc(db, "admins", fbUser.uid),
                  {
                    email: normalizedEmail,
                    name: fbUser.displayName || "Erastus Gathungu",
                    role: "admin",
                    createdAt: new Date().toISOString(),
                  },
                  { merge: true },
                );
              } catch {
                // ignore
              }
            } else if (normalizedEmail.includes("scanner")) {
              role = "scanner";
            }

            // Sync user profile in Firestore
            try {
              await setDoc(
                doc(db, "users", fbUser.uid),
                {
                  uid: fbUser.uid,
                  email: normalizedEmail,
                  displayName: fbUser.displayName || normalizedEmail.split("@")[0],
                  role,
                  createdAt: new Date().toISOString(),
                },
                { merge: true },
              );
            } catch {
              // ignore
            }

            const activeUser: AdminUser = {
              id: fbUser.uid,
              email: normalizedEmail,
              name: fbUser.displayName || normalizedEmail.split("@")[0],
              role,
              avatarUrl: fbUser.photoURL || undefined,
              isFirebase: true,
            };

            setUser(activeUser);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(activeUser));
            setIsLoading(false);
            return;
          }

          // If no active Firebase user, check local storage or presets
          checkStoredOrPreset();
        });
      } catch (err) {
        console.warn("Firebase Auth listener error:", err);
        checkStoredOrPreset();
      }
    } else {
      checkStoredOrPreset();
    }

    async function checkStoredOrPreset() {
      if (!isMounted) return;
      try {
        // Check Supabase if configured
        if (isSupabaseConfigured && supabaseClient) {
          const {
            data: { session },
          } = await supabaseClient.auth.getSession();
          if (session?.user) {
            const role = session.user.email?.includes("admin") ? "admin" : "customer";
            setUser({
              id: session.user.id,
              email: session.user.email || "admin@verve.co.ke",
              name: session.user.user_metadata?.["name"] || "Event Staff",
              role,
            });
            setIsLoading(false);
            return;
          }
        }

        // Local fallback session for instant preview
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          try {
            const parsed = JSON.parse(stored) as AdminUser;
            setUser(parsed);
          } catch {
            localStorage.removeItem(STORAGE_KEY);
            setUser(PRESET_ACCOUNTS.admin);
          }
        } else {
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
  const signInWithGoogle = async (): Promise<{ success: boolean; message?: string }> => {
    setIsLoading(true);
    try {
      if (!isFirebaseConfigured || !auth) {
        throw new Error("Firebase Authentication is not configured.");
      }
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const fbUser = result.user;

      if (!fbUser || !fbUser.email) {
        throw new Error("No user email returned from Google authentication.");
      }

      const email = fbUser.email.toLowerCase();
      // Users authenticating via Google Auth on the Admin Portal receive the admin role
      const role: UserRole = "admin";

      // Record in Firestore
      try {
        await setDoc(
          doc(db, "admins", fbUser.uid),
          {
            email,
            name: fbUser.displayName || email.split("@")[0],
            role: "admin",
            createdAt: new Date().toISOString(),
          },
          { merge: true },
        );
        await setDoc(
          doc(db, "users", fbUser.uid),
          {
            uid: fbUser.uid,
            email,
            displayName: fbUser.displayName || email.split("@")[0],
            role: "admin",
            createdAt: new Date().toISOString(),
          },
          { merge: true },
        );
      } catch (dbErr) {
        console.warn("Firestore user sync note:", dbErr);
      }

      const activeUser: AdminUser = {
        id: fbUser.uid,
        email,
        name: fbUser.displayName || email.split("@")[0],
        role: "admin",
        avatarUrl: fbUser.photoURL || undefined,
        isFirebase: true,
      };

      setUser(activeUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeUser));
      return { success: true };
    } catch (err: unknown) {
      console.error("Firebase Google Sign-In Error:", err);
      const code = typeof err === "object" && err !== null && "code" in err ? String((err as { code: unknown }).code) : "";
      let message = err instanceof Error ? err.message : "Google authentication failed.";
      
      if (code === "auth/popup-blocked") {
        message = "Google Sign-In popup was blocked by your browser. Please allow popups for this site or use the organizer credentials below.";
      } else if (code === "auth/unauthorized-domain") {
        message = "This domain is not yet listed in Firebase Authorized Domains. Add your domain (including *.vercel.app if deploying to Vercel) in the Firebase Console under Authentication > Settings > Authorized Domains.";
      } else if (code === "auth/cancelled-popup-request" || code === "auth/popup-closed-by-user") {
        message = "Sign-in popup was closed before completion. Please try again.";
      }

      return {
        success: false,
        message,
      };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Standard Email or Preset Sign In
   */
  const signIn = async (email: string, targetRole: UserRole = "admin") => {
    setIsLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      let assignedRole: UserRole = targetRole;

      if (normalizedEmail.includes("scanner")) {
        assignedRole = "scanner";
      } else if (normalizedEmail.includes("guest") || normalizedEmail.includes("customer")) {
        assignedRole = "customer";
      } else if (
        normalizedEmail.includes("admin") ||
        normalizedEmail.includes("erastus") ||
        normalizedEmail.includes("verve")
      ) {
        assignedRole = "admin";
      }

      const activeUser: AdminUser = {
        id: `usr-${Date.now()}`,
        email: normalizedEmail,
        name: normalizedEmail.split("@")[0].replace(".", " ").toUpperCase(),
        role: assignedRole,
      };

      setUser(activeUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeUser));
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        message: err instanceof Error ? err.message : "Authentication failed.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      if (auth && auth.currentUser) {
        await firebaseSignOut(auth);
      }
    } catch (err) {
      console.debug("Firebase sign out note:", err);
    }

    if (isSupabaseConfigured && supabaseClient) {
      try {
        await supabaseClient.auth.signOut();
      } catch {
        // ignore
      }
    }

    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setFirebaseUser(null);
  };

  const switchTestRole = (newRole: UserRole) => {
    const preset = PRESET_ACCOUNTS[newRole];
    setUser(preset);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preset));
  };

  const role = user?.role || null;
  const isAuthenticated = Boolean(user);
  const isAdmin = role === "admin";
  const isScanner = role === "scanner" || role === "admin";

  return (
    <AdminAuthContext.Provider
      value={{
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
        signOut,
        switchTestRole,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
}
