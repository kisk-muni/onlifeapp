/** @jsx jsx */
import { jsx } from 'theme-ui'
import { mutate } from 'swr'
import { Fragment, useState } from 'react'
import { Classes, Dialog, Spinner } from "@blueprintjs/core"
import { Button, Heading, Input, Card, Text } from 'theme-ui'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

interface IProps {
  hasUserGroup: boolean
}

type FormData = any;

export function CreateGroupDialog(props: IProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [groupName, setGroupName] = useState('')
  const [groupId, setGroupId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { register, handleSubmit, errors } = useForm<FormData>()
  let dialogContent
  if (loading) {
    dialogContent = <Spinner intent="primary" size={32} sx={{my: '100px'}} />
  }
  if (!success) {
    dialogContent = <form>
        <div sx={{px: 2, py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 'default'}} className={Classes.DIALOG_BODY}>
          <Heading as="h2" sx={{fontSize: 5, mb: 3, mt: 2}}>Pojmenujte vaši třídu</Heading>
          <Heading as="h4" sx={{
            fontSize: '16px',
            mb: 4,
            color: '#555',
            fontWeight: 400}}>
              Zvolené jméno uvidí i vaši žáci. 
          </Heading>
          
          <Input
            sx={{variant: errors?.name ? 'styles.forms.simpleinputError' : 'styles.forms.simpleinput',fontSize: 2, textAlign: 'center', maxWidth: '260px'}}
            placeholder="Zadejte jméno třídy, např. 4. A"
            type="text"
            name="name"
            ref={register({
              required: {value: true, message: "Zadejte jméno."},
              maxLength: {value: 100, message: "Jméno může být dlouhé maximálně 100 znaků."}
              })}/>
            
            {errors?.name && <Text sx={{variant: 'styles.simpleErrorMessageText'}}>{errors.name.message}</Text>}
            {errorMessage !== '' && <Text sx={{variant: 'styles.simpleErrorMessageText'}}>Třídu se nepovedlo založit.</Text>}
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS} sx={{display: 'flex', justifyContent: 'center', pb: 2}}>
            <Button type="button" variant="secondary" sx={{mr: 3}} onClick={() => setIsOpen(false)}>Zrušit</Button>
            <Button
              type="submit"
              onClick={handleSubmit(async (data: FormData) => {
                setLoading(true)
                await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/group/create`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    name: data.name
                  })
                })
                .then(async (response) => {
                  const resultGroup: {name: string, id: string} = await response.json()
                  setLoading(false)
                  setSuccess(true)
                  setGroupName(resultGroup.name)
                  setGroupId(resultGroup.id)
                  mutate('/api/groups')
                })
                .catch(err => {
                  setLoading(false)
                  setErrorMessage(err?.message || 'An error ocurred. Try again in a few minutes.');
                })
              })}
              title="Založit">Založit</Button>
          </div>
      </div>
    </form>
  }
  if (success) {
    dialogContent = <div className={Classes.DIALOG_BODY}>
      <img
        src="/undraw_team_ih79.svg"
        sx={{
          display: 'block',
          maxWidth: '124px',
          mx: 'auto', mt: 4,
          mb: 3,
          borderRadius: '8px',
          border: '1px solid #eaeaea',
          background: '#fff',
          padding: '4px'
        }} />
      <Heading as="h3" sx={{
        fontSize: '18px',
        textAlign: 'center',
        mb: 4,
        display: 'block',
        fontWeight: 600}}>
          {groupName}
      </Heading>
      <Text as="h3" sx={{
        fontSize: '16px',
        textAlign: 'center',
        mt: 3,
        mb: 4,
        color: '#1d7324',
        display: 'block',
        fontWeight: 400}}>
          Třída  založena
      </Text>
      <div sx={{textAlign: 'center'}}>
        <Link href={"/aktivita?trida=" + groupId}>
          <Button sx={{mx: 'auto'}} type="submit" title="Pokračovat">Pokračovat</Button>
        </Link>  
      </div>
    </div>
  }
  if (!props.hasUserGroup) {
    return (
      <Fragment>
        <Button
          onClick={() => setIsOpen(true)}
          variant="buttons.lg"
        >
            Založit třídu
        </Button>
        <Dialog
          autoFocus
          sx={{background: '#fff', boxShadow: '0 30px 60px rgba(0,0,0,0.12)'}}
          isOpen={isOpen}>
            {dialogContent}
        </Dialog>
      </Fragment>
    )
  }
  return <Fragment>
      <Card
        variant="interactive"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ":hover,:focus": {
            cursor: "pointer",
            boxShadow: "elevated",
          }
        }}
        onClick={() => setIsOpen(true)}>
          <div sx={{mb: 2, fontSize: 7, fontWeight: 300}}>+</div> Založit třídu
      </Card>
      <Dialog
        autoFocus
        sx={{background: '#fff', boxShadow: '0 30px 60px rgba(0,0,0,0.12)'}}
        isOpen={isOpen}>
          {dialogContent}
      </Dialog>
    </Fragment>
}