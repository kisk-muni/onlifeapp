import LoginLayout from '../components/LoginLayout'
import { withApollo } from '../lib/apollo'
import withAuthPage from "../lib/withApolloAuth"
import FirebaseAuth from '../components/FirebaseAuth'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'
import { Heading, Text } from 'theme-ui'

const SignIn = ({loading, isLoggedIn}) => {  
    return (<LoginLayout>
        <Flex flexWrap='wrap'>
            <Box
                width={[ 1 ]}
                p={3}>
                <Heading sx={{fontWeight: 600, textAlign: 'center', fontSize: 4, display: 'block', mb: 4}}>Přihlášení do OnLife</Heading>
                <Text sx={{textAlign: 'center', fontSize: 2, display: 'block', mb: 4}}>
                    Jste tu poprvé? Vyberte si jednu z možností pro připojení k Onlife.
                </Text>
            {
                loading && 
                <Text sx={{textAlign: 'center', fontSize: 2, display: 'block', mt: 5}}>
                    Načítání… 
                </Text>
            }
            {   
                (!isLoggedIn) && <FirebaseAuth />
            }
        </Box>
        </Flex>
    </LoginLayout>) 
  }

export default withApollo()(withAuthPage(SignIn))  