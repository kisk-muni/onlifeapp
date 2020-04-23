/** @jsx jsx */
import { useState, Fragment } from 'react'
import { Mutation } from '@apollo/react-components'
import { jsx, Heading, Text, Flex, Box, Button } from 'theme-ui'
import { useRouter } from 'next/router'
import { withApollo } from '../apollo/client'
import { Spinner } from "@blueprintjs/core"
import gql from 'graphql-tag'
import { MutationFunction, MutationResult } from 'react-apollo'
import StarterLayout from '../components/StarterLayout'
import Reveal from '../components/Reveal'
import ReactCodeInput from 'react-code-input'

const FadeSpinner = () => <Reveal delay={1000} duration={1000}><Spinner intent="none" size={32} sx={{my: 7}} /></Reveal> 

const GroupThumbnail = ({ name }: { name: string }) => <Reveal delay={0} duration={1000}>
  <Box>
  <img
    src="/undraw_team_ih79.svg"
    sx={{
      display: 'block',
      maxWidth: '124px',
      mx: 'auto',
      mt: 5,
      mb: 3,
      borderRadius: '8px',
      boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
      background: '#fff',
      padding: '4px'
    }} />
    <Heading as="h3" sx={{
    fontSize: 4,
    textAlign: 'center',
    mb: 4,
    display: 'block',
    fontWeight: 500}}>
      {name}
    </Heading>
</Box></Reveal>

const SurpassedMaxAttempts = () => 
  <Fragment>
    <Heading as="h3" sx={{
      fontSize: 4,
      textAlign: 'center',
      mb: 4,
      display: 'block',
      fontWeight: 500
    }}>
      Překročili jste maximální počet pokusů.<br/>Zkuste to prosím později.
    </Heading>
  </Fragment>

interface JoinResult {
  joinGroup: {
    joined: boolean
  }
};

const JOIN_GROUP = gql`
  mutation JoinGroup {
    joinGroup {
      joined
    }
  }
`;

const JoinGroupWithConsent = ({ name }: { name: string }) => {
  const router = useRouter()
  return (
    <Mutation<JoinResult> mutation={JOIN_GROUP} onCompleted={(data: JoinResult) => {
      if (data.joinGroup.joined) {
        router.push('/')
      }
    }}>
      {(joinGroup: MutationFunction, mutation: MutationResult<JoinResult>) => {

        if (mutation.loading) {
          return <FadeSpinner />
        }

        if (!mutation.loading && mutation.data) {
          if (mutation.data?.joinGroup.joined) {
            return <Heading sx={{
              fontSize: 3,
              textAlign: 'center',
              mt: 4
            }}>
              Přesměrování …
            </Heading>
          }
          return <Heading sx={{
              fontSize: 6,
              textAlign: 'center',
              mt: 4
            }}>
              Něco se porouchalo, zkuste to prosím později :(
            </Heading>
        }

        return (
          <Reveal delay={0} duration={300} >
            <Flex sx={{alignSelf: 'center', height: '100%', flexDirection: 'column', alignItems: 'center'}}>
              <GroupThumbnail name={name} />
              <Heading sx={{
                fontSize: 6,
                textAlign: 'center',
                mt: 4
              }}>Souhlasíte s udělením přístupu majiteli třídy k Vaší<br/>aktivitě a výsledkům v kurzu OnLife?</Heading>
              <Button
                onClick={() => {
                  console.log('Join Group clicked')
                  joinGroup()
                }}
                sx={{
                  mt: 4,
                  fontWeight: 500,
                  fontSize: 4
                }}
              >
                Souhlasím, přidat se ke třídě
              </Button>
              <Button
                variant="secondary"
                onClick={() => router.reload()}
                sx={{
                  mt: 4,
                  fontWeight: 500,
                  fontSize: 4
                }}
              >
                Nesouhlasím
              </Button>
            </Flex>
          </Reveal>
        )
      }}
    </Mutation>
  )
}

const JOIN_GROUP_ATTEMPT = gql`
  mutation JoinGroupAttempt($input: JoinGroupAttemptInput!) {
    joinGroupAttempt(input: $input) {
      name
      surpassedMaxAttempts
    }
  }
`;

interface AttemptResult {
  joinGroupAttempt: {
    name: string
    surpassedMaxAttempts: string
  }
};


interface AttemptVariables {
  input: {
    code: string
  }
}

const JoinGroupPage = () => {
  const [clickedJoin, setClickedJoin] = useState(false)
  const [invitationCode, setInvitationCode] = useState('')

  return (
    <StarterLayout>
      <Mutation<AttemptResult, AttemptVariables> mutation={JOIN_GROUP_ATTEMPT}>
        {(joinGroupAttempt: MutationFunction<AttemptResult, AttemptVariables>, mutation: MutationResult<AttemptResult>) => (
          <Flex sx={{alignSelf: 'center', height: '100%', flexDirection: 'column', alignItems: 'center'}}>
            {mutation.loading && <FadeSpinner />}
            {
              !mutation.loading &&
              !mutation?.data?.joinGroupAttempt?.name &&
              !mutation?.data?.joinGroupAttempt?.surpassedMaxAttempts && 
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
                  onChange={(value: string) => setInvitationCode(value)}
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
                  disabled={(invitationCode.length !== 6)}
                  onClick={() => joinGroupAttempt({variables: {input: {code: invitationCode}}})}
                  sx={{
                    bg: (invitationCode.length !== 6) ? 'gray!important' : 'primary',
                    mt: 4,
                    transition: 'background .2s',
                    fontWeight: 500,
                    fontSize: 5
                  }}
                >
                  Pokračovat
                </Button>
              </Fragment>
            }
            {
              !mutation.loading && mutation?.data?.joinGroupAttempt?.name && 
              <JoinGroupWithConsent name={mutation.data.joinGroupAttempt.name} />
            }
            {
              !mutation.loading &&
              mutation?.data?.joinGroupAttempt?.surpassedMaxAttempts && 
                <SurpassedMaxAttempts />
            }
          </Flex>
        )}
      </Mutation>
    </StarterLayout>
  )
}

export default withApollo(JoinGroupPage)