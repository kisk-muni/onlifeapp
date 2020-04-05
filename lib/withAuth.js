import firebase from "firebase/app"
import "firebase/auth"
import withFirebaseAuth from 'react-with-firebase-auth'
import initFirebase from '../utils/auth/initFirebase'

initFirebase()
firebase.auth().languageCode = 'cs'
let firebaseAppAuth = firebase.auth()
const providers = {}
export default withFirebaseAuth({providers, firebaseAppAuth});


