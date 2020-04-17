import * as admin from 'firebase-admin'

export const verifyIdToken = token => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON_STRING)),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(error => {
      throw error
    })
}