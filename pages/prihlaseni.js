import React, { Component } from 'react'
import NewFirebaseAuth from '../components/NewFirebaseAuth'
import { setSession } from '../utils/auth/firebaseSessionHandler'
import initFirebase from '../utils/auth/initFirebase'
import firebase from "firebase"
import { Flex, Box } from 'reflexbox'
import Router from 'next/router'
import Link from 'next/link'
import { jsx, Text, Link as Lstyle, Heading } from 'theme-ui'
import StarterLayout from '../components/StarterLayout'
import { withApollo } from '../apollo/client'
import clearAuthDataCache from '../utils/clearAuthDataCache'
import { ApolloConsumer } from 'react-apollo'
import { NextSeo } from 'next-seo'


class Login extends Component {
    constructor(props) {
      super(props);
    }
  
    async componentDidMount() {
      const { apolloClient } = this.props;
  
      // If the user is already signed, they don't need to be here
      //const { loggedInUser } = await checkLoggedIn(apolloClient);
      //if (loggedInUser.user) {
      //  redirect(context, "/");
      //}
  
      // Firebase
      initFirebase();
      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
  
      this.unregisterAuthObserver = firebase.auth().onAuthStateChanged( async (user) => {
        if (user) {
          const userId = user.uid
          return setSession(user)
            .then(() => firebase.auth().signOut())
            .then(() => clearAuthDataCache(apolloClient))
            .then(() => {
              if (Router?.query?.next) {
                Router.push(Router.query.next)
              } else {
                Router.push("/")
              }
            })
        }
      });
    }
  
    // Make sure we un-register Firebase observers when the component unmounts.
    componentWillUnmount() {
      this.unregisterAuthObserver();
    }
  
    render() {
      return (<StarterLayout showDescription={() => true}>
        <NextSeo title="Přihlášení" />
        <Flex flexDirection="column" justifyContent="center" alignItems="stretch">
            <Box
              mt={5}
              width={[ 1 ]}
              p={3}>
              <Heading sx={{color: 'text', fontWeight: 700, fontSize: 7, textAlign: 'center'}}>
                Přihlaste se do OnLife
              </Heading>
              <Text sx={{textAlign: 'center', fontSize: 4, display: 'block', mt: 3, mb: 4}}>
                  Vyberte si jednu z možností pro přihlášení. 
              </Text>
            </Box>
            <Box width="400px" mx="auto">
              <NewFirebaseAuth />
              <Text sx={{mb: 6, mt: 3, textAlign: 'center', fontSize: 2, fontWeight: 400}}>
                Nemáte účet? <Link href="/registrace"><Lstyle>Zaregistrujte se</Lstyle></Link> 
              </Text>
            </Box>
        </Flex>
      </StarterLayout>);
    }
}

const LoginWithApolloConsumer = () => <ApolloConsumer>{ client => <Login apolloClient={client} /> }</ApolloConsumer>

export default withApollo(LoginWithApolloConsumer)