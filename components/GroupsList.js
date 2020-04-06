import { useQuery, useSubscription } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { Query } from 'react-apollo';
import { Mutation } from '@apollo/react-components'
import { MenuDivider } from '@blueprintjs/core';

const GET_GROUPS = gql`
  query CurrentUserGroups($id: String!) {
    currentUserGroups(id: $id) @client {
      id
    }
  }
`;

export const GroupsListM = () => (
  <Query query>

  </Query>
)

/* const GetGroups = gql`
  query($userId: String!) {
    groups @firestore(ref: "/groups/$userId$", type: "Group") {
      name @value
    }
  }
`; */

/* const CurrentUser = gql`
  query CurrentUser($id: String!) {
    currentUser(id: $id) @client {
      id
      isTeacher
    }
  }
`; */

const IS_LOGGED_IN = gql`
query CurrentUser {
  user @client {
    isLoggedIn
    name
    email 
    id
  }
}
`;

function GroupsList(uid) {
  // {({data}) => (data.user.isLoggedIn ? <div>logged</div> : <div>not logged</div>)}
  return <Query query={IS_LOGGED_IN} variables={{id: "8sXott8IxgU2Sfo2ipoX9aJ6Qu72"}}>
    {({loading, error, data}) => {
      if (loading) {
        return <div>loading</div>
      }
      if (error) {
        return <div>error</div>
      }
      return (<div>{JSON.stringify({data})}</div>)
    }} 
  </Query>

    const { loading, error, data } = useQuery(GetGroups, {
      variables: { id: uid }
    });
  
    if (loading) return <div>Loading!</div>;
    if (error) return `Error! ${error}`;
  
    /* if (data.groups || Array.isArray(data.groups)) {
      console.log(data)
      return (
        <div>{data.groups.map(user => (
          <div>{user.name}</div>
      ))}</div>
      );
    } */
    console.log(data)
    return <div>no groups</div> 
}

export default GroupsList