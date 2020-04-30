import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY as string,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN as string,
  databaseURL: process.env.FIREBASE_DATABASE_URL as string,
  projectId: process.env.FIREBASE_PROJECT_ID as string,
}

export default () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
}