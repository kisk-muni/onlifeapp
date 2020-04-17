import React, { Component } from 'react'
import NewFirebaseAuth from '../components/NewFirebaseAuth'
import { setSession } from '../utils/auth/firebaseSessionHandler'
import initFirebase from '../utils/auth/initFirebase'
import firebase from "firebase"
import { Flex, Box } from 'reflexbox'
import Router from 'next/router'
import { jsx, Text, Heading } from 'theme-ui'
import LoginLayout from '../components/LoginLayout'


class Login extends Component {
    constructor(props) {
      super(props);
    }
  
    async componentDidMount() {
      //const { apolloClient } = this.props;
  
      // If the user is already signed, they don't need to be here
      //const { loggedInUser } = await checkLoggedIn(apolloClient);
      //if (loggedInUser.user) {
      //  redirect(context, "/");
      //}
  
      // Firebase
      initFirebase();
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
        if (user) {
          return setSession(user)
            .then(() => firebase.auth().signOut())
//           .then(() => clearAuthDataCache(apolloClient))
            .then(() => Router.push("/"));
        }
      });
    }
  
    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
      this.unregisterAuthObserver();
    }
  
    render() {
      return (<LoginLayout>
        <Flex flexWrap='wrap'>
            <Box
                width={[ 1 ]}
                p={3}>
                <Heading sx={{fontWeight: 600, textAlign: 'center', fontSize: 4, display: 'block', mb: 4}}>Zaregistrujte se do OnLife</Heading>
                <Text sx={{textAlign: 'center', fontSize: 2, display: 'block', mb: 4}}>
                    Vyberte si jednu z možností pro přihlášení. 
                </Text>
                <NewFirebaseAuth />
            </Box>
        </Flex>
        </LoginLayout>);
    }
}

export default Login