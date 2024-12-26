import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { envs } from '../config/envs';

const serviceAccount: ServiceAccount = {
  projectId: envs.firebaseProjectId,
  privateKey: envs.firebasePrivateKey,
  clientEmail: envs.firebaseClientEmail,
};

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'atlantic-coast-imports.firebasestorage.app',
});
