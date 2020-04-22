/** @jsx jsx */
import { useState, Fragment } from 'react'
import { jsx, Heading, Text, Flex, Box, Button } from 'theme-ui'
import { withApollo } from '../apollo/client'
import StarterLayout from '../components/StarterLayout'
import ReactCodeInput from 'react-code-input'

const JoinGroupPage = () => {
  const [clickedJoin, setClickedJoin] = useState(false)

  return (
    <StarterLayout>
      <Flex sx={{alignSelf: 'center', height: '100%', flexDirection: 'column', alignItems: 'center'}}>
        {
          !clickedJoin ? 
          <Fragment>
            <Heading sx={{
              fontSize: 7,
              textAlign: 'center',
              mt: 6
            }}>Zadejte kód pro připojení ke třídě</Heading>
            <Text sx={{
              mt: 3,
              mb: 4,
              fontSize: 4,
              textAlign: 'center'
            }}>Kód získáte od svého učitele<br/></Text>
            <ReactCodeInput
              type='text'
              fields={6}
              inputStyle={{
                margin: '8px',
                border: '1px solid #e5e5e5',
                boxShadow: '0 1px 7px 0 rgba(0,0,0,0.1)',
                width: '72px',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '32px',
                height: '92px',
              }}
              inputStyleInvalid={{
                margin: '8px',
                border: '1px solid red',
                boxShadow: '0 1px 7px 0 rgba(0,0,0,0.1)',
                width: '72px',
                borderRadius: '6px',
                textAlign: 'center',
                fontSize: '32px',
                height: '92px',
                color: 'red',
              }}
            />
            <Button
              onClick={() => setClickedJoin(true)}
              sx={{
                mt: 4,
                fontWeight: 500,
                fontSize: 5
              }}
            >
              Přidat se
            </Button>
          </Fragment>
          : 
          <Fragment>
            <Heading sx={{
              fontSize: 7,
              textAlign: 'center',
              mt: 7
            }}>Souhlasíte s udělením přístupu majiteli třídy k vaší<br/>aktivitě a výsledkům na službě OnLife?</Heading>
            <Button
              onClick={() => setClickedJoin(true)}
              sx={{
                mt: 4,
                fontWeight: 500,
                fontSize: 5
              }}
            >
              Souhlasím, chci se přidat ke třídě
            </Button>
            <Button
              onClick={() => setClickedJoin(false)}
              variant="secondary"
              sx={{
                mt: 4,
                fontWeight: 500,
                fontSize: 5
              }}
            >
              Nesohlasím
            </Button>
          </Fragment>
        }
      </Flex>
    </StarterLayout>
  )
}

export default withApollo(JoinGroupPage)