import Layout from '../components/Layout'
import { withApollo } from '../lib/apollo'
import withAuth from "../lib/withAuth"
import { useApolloClient } from "@apollo/react-hooks"
import firebase from "firebase/app"
import FirebaseAuth from '../components/FirebaseAuth'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'
import { Button } from 'theme-ui'

const MainLoading = styled.div`
    height: 100 vh;
    width: 100%;
    font-size: 48px;
    text-align: center;
`

function LogoutButton() {
    const client = useApolloClient();
    return (
        <Button
        onClick={() => {
            firebase.auth().signOut().then(function() {
            client.writeData({ data: { isLoggedIn: false } });
            localStorage.clear();
            }).catch(function(error) {
            // An error happened.
            });
        }}
        >
        Odhlásit se
        </Button>
    );
}

const Profile = ({loading, error, user}) => {
    let load = true
    if (user && !loading) {
        load = false
    }    
    return (<Layout>
        <Flex flexWrap='wrap'>
            <Box
                maxWidth={1240}
                px={35}
                mx="auto"
                width={[ 1 ]}>
            {
                ((loading)) && <MainLoading>🌍</MainLoading>
            }   
            
            {
                (user && !load) && <div>
                    <h1>Ahoj! </h1>
                    <h2>Jméno: {user.displayName ? user.displayName : 'Neznámé'}</h2>
                    <h2>Fotka: {user.photoURL ? <img height={64} src={user.photoURL} /> : 'Neznámá'}</h2>
                    <h2>Email: {user.email}</h2>
                    <LogoutButton />
                </div>
            }
            {   
                (!user && !loading) && <FirebaseAuth />
            }
        </Box>
        </Flex>
    </Layout>) 
  }

export default withAuth(withApollo()(Profile))  