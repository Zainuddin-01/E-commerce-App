const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json'); // path to your downloaded service account key JSON

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const uid = 'qCwGt7ZYgdh594BKWdDtx59XYFX2';

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`✅ Admin claim set for user: ${uid}`);
  })
  .catch((error) => {
    console.error('❌ Error setting admin claim:', error);
  });
