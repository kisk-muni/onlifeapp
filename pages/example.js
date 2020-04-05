import Layout from '../components/Layout'
import { withApollo } from '../lib/apollo'
import { NonIdealState } from "@blueprintjs/core"
import withAuth from "../lib/withAuth"
import { useApolloClient } from "@apollo/react-hooks"
import firebase from "firebase/app"
import FirebaseAuth from '../components/FirebaseAuth'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'
import gql from 'graphql-tag'
import { useQuery, useSubscription } from '@apollo/react-hooks'
import { Text, Heading, Input, Button } from 'theme-ui'
import { useForm } from 'react-hook-form'

const MainLoading = styled.div`
    height: 100 vh;
    width: 100%;
    font-size: 48px;
    text-align: center;
`

const GetGroups = gql`
  query($userId: String!) {
    groups @firebase(ref: "/groups/$userId$", type: "Group") {
      name @value
    }
  }
`;
const CreateFirstGroupForm = () => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = data => { console.log(data) }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input sx={{mb: 2}} name="groupName" defaultValue="" placeholder="Jméno třídy např. 3. A" ref={register({ required: true })} />
      {errors.groupName && <span>This field is required</span>}
      
      <Button sx={{left: 4}} style={{float: "right"}}>Pokračovat</Button>
    </form>
  )
}

function GroupsList({ uid }) {
  const { loading, error, data } = useQuery(GetGroups, {
    variables: { userId: uid }
  });

  if (loading) return <div>Loading!</div>;
  if (error) return `Error! ${error}`;

  if (data.groups || Array.isArray(data.groups)) {
    console.log(data)
    return (
      <div>{data.groups.map(user => (
        <div>{user.name}</div>
    ))}</div>
    );
  }
  console.log(data)
  return <div>no groups</div>
  
}

const Example = ({loading, error, user}) => {
    let load = true
    if (user && !loading) {
        load = false
    }    
    return (<Layout>
        <Flex flexWrap='wrap'>
            <Box
                maxWidth={1240}
                px={35}
                mx="auto"
                width={[ 1 ]}>
                
                <Box>
                  <Box
                    width={[1, 1/2, 1/3]}
                    mx="auto"
                  >
                    <Heading sx={{ mt: 4, mb: 3, fontSize: 4 }} as="h2">Začněte vytvořením třídy</Heading>
                    <CreateFirstGroupForm />
                  </Box>
                </Box>


            {
                ((loading)) && <MainLoading>🌍Loading…</MainLoading>
            }   
            
            {
                (user && !load) && <div>
                    <h1>Ahoj! </h1>
                    <h2>Jméno: {user.displayName ? user.displayName : 'Neznámé'}</h2>
                    <h2>Fotka: {user.photoURL ? <img height={64} src={user.photoURL} /> : 'Neznámá'}</h2>
                    <h2>Email: {user.email}</h2>
                </div>
            }
        </Box>
        </Flex>
    </Layout>) 
  }

export default withApollo()(withAuth(Example))