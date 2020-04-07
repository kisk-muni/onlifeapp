/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Mutation } from '@apollo/react-components'
import gql from 'graphql-tag'
import { MutationFunction, MutationResult } from 'react-apollo'
import { Fragment, useState } from 'react'
import { Classes, Dialog, Spinner } from "@blueprintjs/core"
import { Button, Heading, Input, Text } from 'theme-ui'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
const ADD_GROUP = gql`
  mutation AddGroup($name: String!, $uid: String!) {
    addGroup(name: $name, uid: $uid) @client {
      id
      name
    }
  }
`;

interface IProps {
  hasUserGroup: boolean
  uid: string
}

interface TResult {
  addGroup: {
    id: string
    name: string
  }
};

interface TVariables {
  name: string
  uid: string
}

type FormData = {
  name: string
};

export function CreateGroupDialog(props: IProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm<FormData>()

  console.log(props.uid)

  // zobrazovat button v kondicionalu
  return <Mutation<TResult, TVariables> mutation={ADD_GROUP}>
    {(addGroup: MutationFunction<TResult, TVariables>, mutation: MutationResult<TResult>) => (<Fragment>
      <Button
        variant={props.hasUserGroup ? 'styles.groupListItemButton' : "createclass"}
        onClick={() => setIsOpen(true)}>
          <div sx={{mb: 2, fontSize: 5, fontWeight: 400}}>+</div>Založit třídu
      </Button> 
      <Dialog
        autoFocus
        isOpen={isOpen}>
          {mutation.loading && <Spinner intent="primary" size={32} sx={{my: 4}} />}
          {mutation.data?.addGroup?.id && 
            <div className={Classes.DIALOG_BODY}>
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
                  {mutation.data.addGroup.name}
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
                <Link href={"/trida/" + mutation.data.addGroup.id}>
                  <Button sx={{mx: 'auto'}} type="submit" title="Pokračovat">Pokračovat</Button>
                </Link>  
              </div>
            </div>
          }
          {!mutation.loading && !mutation?.data?.addGroup?.id &&
            <form>
              <div sx={{px: 2, py: 2}} className={Classes.DIALOG_BODY}>
                <Heading as="h3" sx={{fontSize: '18px', mb: 2}}>Pojmenujte vaši třídu</Heading>
                <Heading as="h4" sx={{
                  fontSize: '16px',
                  mb: 4,
                  color: '#555',
                  fontWeight: 400}}>
                    Jméno uvidí i vaši žáci. 
                </Heading>
                
                <Input
                  sx={{variant: errors?.name ? 'styles.forms.simpleinputError' : 'styles.forms.simpleinput',fontSize: 2}}
                  placeholder="Zadejte jméno třídy, např. 4. A"
                  type="text"
                  name="name"
                  ref={register({
                    required: {value: true, message: "Zadejte jméno."},
                    maxLength: {value: 100, message: "Jméno může být dlouhé maximálně 100 znaků."}
                    })}/>
                  
                  {errors?.name && <Text sx={{variant: 'styles.simpleErrorMessageText'}}>{errors.name.message}</Text>}
                  {mutation.error && <Text sx={{variant: 'styles.simpleErrorMessageText'}}>Třídu se nepovedlo založit. Zkuste to prosím později. {mutation.error.message}</Text>}
              </div>
              <div className={Classes.DIALOG_FOOTER}>
                <div className={Classes.DIALOG_FOOTER_ACTIONS}>
                  <Button type="button" variant="secondary" sx={{mr: 2}} onClick={() => setIsOpen(false)}>Zrušit</Button>
                  <Button
                    type="submit"
                    onClick={handleSubmit((data: FormData) => {
                      console.log(data)
                      addGroup({variables: {name: data.name, uid: props.uid}})
                    })}
                    title="Založit">Založit</Button>
                </div>
            </div>
          </form>
          }
      </Dialog>
    </Fragment>)}
  </Mutation>
}