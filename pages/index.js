import Layout from '../components/Layout'
import { withApollo } from '../lib/apollo'
import withAuth from "../lib/withAuth"
import { useApolloClient } from "@apollo/react-hooks"
import firebase from "firebase/app"
import FirebaseAuth from '../components/FirebaseAuth'
import styled from 'styled-components'
import { Flex, Box } from 'reflexbox'
import { Button } from 'theme-ui'
import gql from 'graphql-tag'
import { useQuery, useSubscription } from '@apollo/react-hooks'

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

const Index = ({loading, error, user}) => {
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
            {
                ((loading)) && <MainLoading>🌍Loading…</MainLoading>
            }   
            
            {
                (user && !loading) && <div>
                    <p>{user.uid}</p>
                    <GroupsList uid={user.uid} />
                </div>
            }
        </Box>
        </Flex>
    </Layout>) 
  }

export default withApollo()(withAuth(Index))