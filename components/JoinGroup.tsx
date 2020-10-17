/** @jsx jsx */
import { useState, Fragment, useCallback } from 'react'
import { jsx, Heading, Flex, Box, Button } from 'theme-ui'
import Reveal from '../components/Reveal'
import { AppNotifier } from '../utils/notifier'
import { useRouter } from 'next/router'
import FadeSpinner from './FadeSpinner'
import { Response } from '../pages/api/join-group'

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

const JoinGroup = ({ name, onDissmiss }: { name: string, onDissmiss: () => void }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const handleSubmit = useCallback(async () => {
    setLoading(true)
    setSuccess(false)
    setErrorMessage('')
    await fetch(`${process.env.SITE_URL}/api/join-group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(async (response) => {
      const resultGroup: Response = await response.json()
      setLoading(false)
      if (response.ok && resultGroup?.joined) {
        setSuccess(true)
        if (AppNotifier !== null) {
          AppNotifier.show({
            message: 'Nyní jste ve třídě',
            intent: 'success',
          })
        }
        router.push('/')
      } else {
        setErrorMessage(resultGroup?.message)
      }
    })
    .catch(() => {
      setLoading(false)
      setErrorMessage('Vypadá to, že jste ztratili spojení. Zkontrolujte to a zkuste to znovu.')
    })
  }, []);

  if (loading || success) {
    return <FadeSpinner />
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
          errorMessage !== '' ? 
            <Fragment>
              <div sx={{mt: 3, color: 'error'}}>{errorMessage}</div>
              <Button
                onClick={() => onDissmiss()}
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
                onClick={handleSubmit}
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
                onClick={() => onDissmiss()}
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