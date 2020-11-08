/** @jsx jsx */
import { useState, useCallback, Fragment } from 'react'
import { jsx, Heading, Text, Flex, Button, Spinner } from 'theme-ui'
import { useRouter } from 'next/router'
import StarterLayout from 'components/StarterLayout'
import ReactCodeInput from 'react-code-input'
import { NextPage } from 'next'
import JoinGroup from 'components/JoinGroup'
import { Response } from 'pages/api/join-group-attempt'
import { NextSeo } from 'next-seo'
import withAuthRedirect from 'utils/withAuthRedirect'

const JoinGroupPage: NextPage = () => {
  const router = useRouter()
  const [invitationCode, setInvitationCode] = useState(typeof router.query.invitation == 'string' ? router.query.invitation : '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const handleDismiss = useCallback(() => {
    setInvitationCode('')
    setLoading(false)
    setSuccess(false)
    setGroupName('')
    setErrorMessage('')
    setErrorMessage('')
  }, []);
  const handleSubmit = useCallback(async () => {
    setLoading(true)
    setSuccess(false)
    setGroupName('')
    setErrorMessage('')
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/join-group-attempt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: invitationCode
      })
    })
    .then(async (response) => {
      const resultGroup: Response = await response.json()
      setLoading(false)
      if (response.ok) {
        setSuccess(true)
        setGroupName(resultGroup.name)
      } else {
        setErrorMessage(resultGroup.message)
      }
    })
    .catch((err) => {
      console.log("ahooj.", err)
      setLoading(false)
      setErrorMessage('Vypadá to, že jste ztratili spojení. Zkontrolujte to a zkuste to znovu.')
    })
  }, [invitationCode]);
  return (
    <StarterLayout>
      <NextSeo title="Přidat se ke třídě" />
      <Flex sx={{alignSelf: 'center', height: '100%', flexDirection: 'column', alignItems: 'center'}}>
        {
          loading && <Spinner size={24} />
        } 
        {
          ((!success && !loading ) || errorMessage !== '') && <Fragment>
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
              errorMessage !== '' && 
              <div sx={{mt: 3, color: 'error'}}>
                <span>{errorMessage}</span>
              </div>
            }
            <Button
              disabled={(
                invitationCode.length !== 6
              )}
              onClick={handleSubmit}
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
          success && !loading && <JoinGroup name={groupName} onDissmiss={handleDismiss} />
        }
      </Flex>
    </StarterLayout>
  )
}

export default withAuthRedirect(JoinGroupPage)