import { cert, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {
  FIREBASE_PRIVATE_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_CLIENT_EMAIL,
} from "./env.js";

const serviceAccount = {
  projectId: FIREBASE_PROJECT_ID,
  privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: FIREBASE_CLIENT_EMAIL,
};

if (
  !serviceAccount.projectId ||
  !serviceAccount.privateKey ||
  !serviceAccount.clientEmail
) {
  throw new Error("Missing Firebase configuration in environment variables");
}

const app = initializeApp({
  credential: cert(serviceAccount),
});

export const db = getFirestore(app);
