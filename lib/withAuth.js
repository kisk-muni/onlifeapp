import firebase from "firebase/app"
import "firebase/auth"
import withFirebaseAuth from 'react-with-firebase-auth'
import initFirebase from '../utils/auth/initFirebase'

initFirebase()
const firebaseAppAuth = firebase.auth();
const providers = {}
const withAuth = withFirebaseAuth({providers, firebaseAppAuth});
export default withAuth
