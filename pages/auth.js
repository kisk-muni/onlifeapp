import React from 'react'
import { withApollo } from '../lib/apollo'
import * as firebase from "firebase/app";
import "firebase/auth";
import {
  FirebaseAuthProvider,
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseAuthedAnd
} from "@react-firebase/auth";

const config = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
}

const Auth = () => {
  return (
    <div>
      <p>Sign in</p>
      <div>
      <FirebaseAuthProvider {...config} firebase={firebase}>
      <div>
        <button
          onClick={() => {
            const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(googleAuthProvider);
          }}
        >
          Sign In with Google
        </button>
        <button
          data-testid="signin-anon"
          onClick={() => {
            firebase.auth().signInAnonymously();
          }}
        >
          Sign In Anonymously
        </button>
        <button
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          Sign Out
        </button>
        <FirebaseAuthConsumer>
          {({ isSignedIn, user, providerId }) => {
            return (
              <pre style={{ height: 300, overflow: "auto" }}>
                {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
              </pre>
            );
          }}
        </FirebaseAuthConsumer>
        <div>
          <IfFirebaseAuthed>
            {() => {
              return <div>You are authenticated</div>;
            }}
          </IfFirebaseAuthed>
          <IfFirebaseAuthedAnd
            filter={({ providerId }) => providerId !== "anonymous"}
          >
            {({ providerId }) => {
              return <div>You are authenticated with {providerId}</div>;
            }}
          </IfFirebaseAuthedAnd>
        </div>
      </div>
    </FirebaseAuthProvider>
      </div>
    </div>
  )
}

export default withApollo()(Auth)
