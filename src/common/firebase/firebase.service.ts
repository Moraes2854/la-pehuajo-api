
// const admin = require('firebase-admin');
// const firebaseCredentials = require('../../config/firebase.credentials.json');
// const config = require('../../config');

// class FirebaseHandler {
//   constructor( firebaseStorageUrl ){
//     this.firebaseStorageUrl = firebaseStorageUrl;
//     this.initialize();
//     this.auth = admin.auth();
//   }

//   initialize(){
//     admin.initializeApp({
//       credential: admin.credential.cert(firebaseCredentials)
//     });
//   }

//   getAuth(){
//     return this.auth;
//   }

//   getBucket(){
//     const bucket = admin.storage().bucket(this.firebaseStorageUrl);
//     return bucket;
//   }

//   sendMessage( token, title, body, key1, key2 ){
//     const message = {
//       token,
//       notification: {
//         title,
//         body
//       },
//       // data: {
//       //   key1,
//       //   key2,
//       // }
//     }
//     admin.messaging().send(message)
//     .then( response => console.log( 'Message sent succesfully: ', response ) )
//     .catch( error => console.log( 'Error sending message: ', error ) )
//   }

//   verifyToken( idToken ) {
//     admin.auth().verifyIdToken(idToken)
//     .then( decodedToken  => {
//       console.log(decodedToken);
//       const uid = decodedToken.uid;
//       console.log('User ID:', uid);
//     })
//     .catch((error) => {
//       console.error('Error verifying ID token:', error);
//     });
//   }
// }


// global.firebaseHandler = new FirebaseHandler(config.firebaseStorageUrl);
