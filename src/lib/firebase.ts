import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAB0m4xGKYwPgHnCmDW2zwIT3_zs4cson4",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "artha-ai-3a610.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "artha-ai-3a610",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "artha-ai-3a610.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "789198408235",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:789198408235:web:7955186132607f6b46786e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-BXCB7V6G2Z"
};

// Initialize Firebase App safely
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Configure Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    if (error?.code === 'auth/unauthorized-domain') {
      // Return null or throw specific error to be handled by context
      return null;
    }
    if (error?.code === 'auth/popup-blocked' || error?.code === 'auth/popup-closed-by-user') {
      return null;
    }
    return null;
  }
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};

export { onAuthStateChanged };
export type { User };
