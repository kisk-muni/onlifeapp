/** @jsx jsx */
import { Fragment } from 'react'
import { jsx, Heading, Flex, Box, Button } from 'theme-ui'
import Reveal from '../components/Reveal'
import { UserDocument } from '../apollo/user.graphql'
import { useJoinGroupMutation } from '../apollo/joinGroup.graphql'
import { AppNotifier } from '../utils/notifier'
import { useRouter } from 'next/router'
import FadeSpinner from './FadeSpinner'

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
    </Box>
  </Reveal>

const JoinGroup = ({ name }: { name: string }) => {
  const router = useRouter()
  const [joinGroup, { data, loading, error }] = useJoinGroupMutation({
    refetchQueries: [{ query: UserDocument }],
    onCompleted: (data) => {
      if (data.joinGroup.joined) {
        // prevent ssr
        if (AppNotifier !== null) {
          AppNotifier.show({
            message: 'Nyní jste ve třídě',
            intent: 'success',
          })
        }
        router.push('/')
      }
    }
  });

  if (loading) {
    return <FadeSpinner />
  }

  if (!loading && data) {
    if (data?.joinGroup.joined) {
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
        {
          error ? 
            <Fragment>
              <div sx={{mt: 3, color: 'error'}}>{error.graphQLErrors.map(({ message }, i) => (
                <span key={i}>{message}</span>
                ))}</div>
              <Button
                onClick={() => router.reload()}
                sx={{
                  mt: 4,
                  fontWeight: 500,
                  fontSize: 4
                }}
              >
                Zadat kód znovu
              </Button>
            </Fragment>
            :
            <Fragment>
              <Button
                onClick={() => {
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
          </Fragment>
        }
      </Flex>
    </Reveal>
  )
}

export default JoinGroup