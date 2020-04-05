import LoginLayout from '../components/LoginLayout'
import { withApollo } from '../lib/apollo'
import withAuth from "../lib/withAuth"
import FirebaseAuth from '../components/FirebaseAuth'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'
import { Heading, Text } from 'theme-ui'

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
                ((loading)) && <MainLoading>Načítání…</MainLoading>
            }
            {   
                (!user && !loading) && <FirebaseAuth />
            }
        </Box>
        </Flex>
    </LoginLayout>) 
  }

export default withAuth(withApollo()(SignIn))  