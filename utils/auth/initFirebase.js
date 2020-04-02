import firebase from 'firebase/app'
import 'firebase/auth'
import config from './firebaseConfig'


export default () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
}