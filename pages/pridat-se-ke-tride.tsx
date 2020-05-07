/** @jsx jsx */
import { useState, Fragment } from 'react'
import { jsx, Heading, Text, Flex, Button } from 'theme-ui'
import { useRouter } from 'next/router'
import { withApollo } from '../apollo/client'
import StarterLayout from '../components/StarterLayout'
import FadeSpinner from '../components/FadeSpinner'
import { useJoinGroupAttemptMutation } from '../apollo/joinGroupAttempt.graphql'
import ReactCodeInput from 'react-code-input'
import { NextPage } from 'next'
import JoinGroup from '../components/JoinGroup'
import withAuthRedirect from '../utils/withAuthRedirect' 

const JoinGroupPage: NextPage = () => {
  const router = useRouter()
  const [invitationCode, setInvitationCode] = useState(typeof router.query.invitation == 'string' ? router.query.invitation : '')
  const [joinGroupAttempt, { data, loading, error }] = useJoinGroupAttemptMutation()
  let PageContent
  if (loading) {
    PageContent = <FadeSpinner />
  }
  if (!data?.joinGroupAttempt?.name) {
    PageContent = 
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
          value={invitationCode}
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
        {
          error && 
          <div sx={{mt: 3, color: 'error'}}>{error.graphQLErrors.map(({ message }, i) => (
            <span key={i}>{message}</span>
          ))}</div>
        }
        <Button
          disabled={(
            invitationCode.length !== 6
          )}
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
  } else {
    // User can decide whether to join the group
    PageContent = <JoinGroup name={data.joinGroupAttempt.name} />
  }

  return (
    <StarterLayout>
      <Flex sx={{alignSelf: 'center', height: '100%', flexDirection: 'column', alignItems: 'center'}}>
        {PageContent}
      </Flex>
    </StarterLayout>
  )
}

export default withApollo(withAuthRedirect(JoinGroupPage, {roles: ['student'], next: 'pridat-se-ke-tride'}))