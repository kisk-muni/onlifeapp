import * as admin from 'firebase-admin'

export const verifyIdToken = (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON_STRING as string)),
      databaseURL: process.env.FIREBASE_DATABASE_URL as string
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch(error => {
      throw error
    })
}