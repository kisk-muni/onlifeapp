import Layout from '../components/Layout'
import { withApollo } from '../lib/apollo'
import withAuth from "../lib/withAuth"
import { useApolloClient } from "@apollo/react-hooks"
import firebase from "firebase/app"
import FirebaseAuth from '../components/FirebaseAuth'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'

const MainLoading = styled.div`
    height: 100 vh;
    width: 100%;
    font-size: 48px;
    text-align: center;
`

const SignIn = ({loading, error, user}) => {
    let load = true
    if (user && !loading) {
        load = false
    }    
    return (<Layout>
        <Flex flexWrap='wrap'>
            <Box
                width={[ 1 ]}
                p={3}>
            {
                ((loading)) && <MainLoading>Načítání…</MainLoading>
            }
            {   
                (!user && !loading) && <FirebaseAuth />
            }
        </Box>
        </Flex>
    </Layout>) 
  }

export default withAuth(withApollo()(SignIn))  