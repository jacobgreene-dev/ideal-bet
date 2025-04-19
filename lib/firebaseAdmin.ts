// lib/firebaseAdmin.ts
import { getApps, getApp, initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Tell TypeScript to treat the import as a ServiceAccount
import serviceAccountJson from "../serviceAccountKey.json";
const serviceAccount = serviceAccountJson as ServiceAccount;

const app = getApps().length
  ? getApp()
  : initializeApp({
      credential: cert(serviceAccount),
    });

const adminDb = getFirestore(app);

export { adminDb };
