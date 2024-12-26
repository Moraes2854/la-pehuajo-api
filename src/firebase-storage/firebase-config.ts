import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import blablabla from '../config/firebase.credentials.json';
const firebaseCredentials = require('../config/firebase.credentials.json');

console.log(firebaseCredentials);

const serviceAccount: ServiceAccount = {
  projectId: firebaseCredentials.project_id,
  privateKey: firebaseCredentials.private_key,
  clientEmail: firebaseCredentials.client_email,
};

export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'atlantic-coast-imports.firebasestorage.app',
});
