import * as admin from "firebase-admin";

// ✅ Vérifier si Firebase Admin est déjà initialisé
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

// ✅ Exporter Firebase Auth côté serveur
export const adminAuth = admin.auth();
