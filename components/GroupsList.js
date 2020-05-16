/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import { Box } from 'reflexbox'
import { jsx, Heading } from 'theme-ui'

export const GroupsList = (props) => (
  <Fragment>
    {props.groups.map(group => (
      <Link href={"/trida?trida="+group.id}><Box
        key={group.id}
        sx={{variant: 'styles.groupListItem' }}
        >
          <span sx={{ borderRadius: '8px', display: 'block', height: '16px', width: '32px', mb: 2, position: 'relative', bottom: '-1px', background: group.color}}></span>
          <Heading as="h3" sx={{fontSize: 5}}>
            {group.name}
          </Heading>
      </Box></Link>
    ))}
  </Fragment>
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

