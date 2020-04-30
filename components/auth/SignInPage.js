/** @jsx jsx */
import { Component } from 'react'
import NewFirebaseAuth from '../NewFirebaseAuth'
import { setSession } from '../../utils/auth/firebaseSessionHandler'
import initFirebase from '../../utils/auth/initFirebase'
import firebase from "firebase"
import { Flex, Box } from 'reflexbox'
import Router from 'next/router'
import Link from 'next/link'
import { jsx, Text, Heading, Link as Lstyle } from 'theme-ui'
import SignUpLayout from './SignUpLayout'
import Feature from './Feature'
import clearAuthDataCache from '../../utils/clearAuthDataCache'
import { ApolloConsumer } from "react-apollo"

class SignInPage extends Component {
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
          if (this.props.registerTeacher) {
            let userRef = await firebase.firestore().collection("users").doc(userId).set({
              isTeacher: true
            }, {merge: true})
          }
          return setSession(user)
            .then(() => firebase.auth().signOut())
            .then(() => clearAuthDataCache(apolloClient))
            .then(() => {
              if (this.props.registerTeacher) {
                // teacher
                Router.push("/ucitel")
              } else {
                // student
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
      const { features, logo, heading, isForStudents = true } = this.props

      return (<SignUpLayout>
        <div sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          minWidth: '1px',
          width: '50vw',
          background: '#fafafa'
        }}></div>
        <Flex
          sx={{position: 'relative'}}
          maxWidth={1240}
          px={35}
          width={[1, 5/6]}
          mx="auto"
        >
          <Box sx={{
            mt: 4,
            mb: 5, 
          }}>
            <Link href="/">
              <Lstyle 
                sx={{
                  variant: 'styles.navlogo',
                  letterSpacing: '.03em',
                  fontSize: 5,
                }}>
                {logo}
              </Lstyle>
            </Link>
          </Box>
        </Flex>
        <Flex
          sx={{position: 'relative'}}
          maxWidth={1240}
          px={35}
          width={[1, 5/6]}
          mx="auto"
        >
          <Box
            width={[ 1/2 ]}
            pr={6}>
            <Flex flexDirection="column" justifyContent="flex-start" alignItems="stretch">
              {features.map(({heading, description}, index) => <Feature key={index} heading={heading} description={description} />)}
              <Box mt="3">
                <Heading sx={{textTransform: 'uppercase', mb: 3, color: 'gray', fontSize: 2}}>Kurz pro vás připravila</Heading>
                <img src="/muni-lg-cze-black.png" width="212px" />
              </Box>
            </Flex>
          </Box>
          <Box
            width={[ 1/2 ]}
            pl={6}>
            <Flex flexDirection="column" justifyContent="flex-start" alignItems="stretch">
              <Heading sx={{color: 'text', fontWeight: 700, fontSize: 7, mb: '50px'}}>
                {heading}
              </Heading>
              <Box width="400px" mr="auto">
                <NewFirebaseAuth />
              </Box>
              <Text color="grey" sx={{mt: 2, mb: 4, fontSize: 2, fontWeight: 400}}>
                Kliknutím na tlačítko souhlasíte s podmínkami a zásadami o soukromí naší služby.
              </Text>
              <Text sx={{pb: 4, mb: 5, fontSize: 2, fontWeight: 400, borderBottom: '1px solid', borderColor: 'darken'}}>
                Již máte účet? <Link passHref href="/prihlaseni"><Lstyle>Přihlaste se</Lstyle></Link> 
              </Text>
              {isForStudents && <Text sx={{mb: 5, fontSize: 2, fontWeight: 400}}>
                Jste učitel? <Link passHref href="/registrace-ucitele"><Lstyle>Zaregistrujte si učitelský účet</Lstyle></Link> 
              </Text>}
              {!isForStudents && <Text sx={{mb: 5, fontSize: 2, fontWeight: 400}}>
                Jste student? <Link passHref href="/registrace"><Lstyle>Zaregistrujte si studentský účet</Lstyle></Link> 
              </Text>}
            </Flex>
          </Box>
        </Flex>
      </SignUpLayout>);
    }
}

const SignInWithApolloConsumer = (props) => <ApolloConsumer>{ client => <SignInPage apolloClient={client} {...props} /> }</ApolloConsumer>

export default SignInWithApolloConsumer