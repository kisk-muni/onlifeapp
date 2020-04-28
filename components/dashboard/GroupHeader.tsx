/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import { jsx, Link as Lstyle, Button, Text, Flex } from 'theme-ui'
import ProfileDropdown from "../ProfileDropdown"
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { MenuItem, Icon } from "@blueprintjs/core"
import { Select } from "@blueprintjs/select"
import { useRouter } from 'next/router'

interface Student {
  id: string
  name: string
  email: string
  picture: string
}

interface Group {
  id: string
  name: string
  invitationCode: string
  students: Student[]
}

interface GroupSelectItem {
  id: string
  name: string
  link: string
}

function itemRenderer(group: GroupSelectItem, {modifiers}: {modifiers: {active: boolean} }) {
  return (
    <Link href={group.link}><MenuItem
        active={modifiers.active}
        key={group.id}
        text={group.name}
    /></Link>
  );
}

export const GROUP_HEADER = gql`
query Group($id: ID!) {
  user {
    name
    photoURL
    email 
    id
  }
  groupsSelect {
    id
    name
    link
  }
  group(id: $id) {
    id
    name
    invitationCode
    students {
      id
      name
      picture
      email
    }
  }
}
`

interface HeaderQueryData {
  user: {
    name: string
    photoURL: string
    email: string
    id: string
  },
  groupsSelect: GroupSelectItem[],
  group: Group
}

interface HeaderQueryVars {
  id: string | string[]
}

const GroupHeader = () => {
  const router = useRouter();

  return (
  <header sx={{
      variant: 'styles.dashboard.header',
      width: '100%',
      zIndex: 18
  }}>
    <Flex sx={{
      mx: 'auto',
      px: 35,
      alignItems: 'center',
    }}>
      <Link passHref href="/">
        <Lstyle 
          sx={{
            variant: 'styles.navlogo',
            fontWeight: 700,
            fontSize: 5,
          }}>
          OnLife
        </Lstyle>
      </Link>
      <Query<HeaderQueryData, HeaderQueryVars> query={GROUP_HEADER} variables={{id: router.query.id}} >
      {({loading, data, error}) => {
        if (loading === false && data && data?.user && data?.group && data?.groupsSelect) {
          return (
            <Fragment>
              <Select
                onItemSelect={(item) => {
                  console.log('selected', item)
                }}
                items={data!.groupsSelect}
                filterable={false}
                activeItem={null}
                itemRenderer={itemRenderer}
                >
                <Button variant="groupSelect">{data?.group.name} <Icon icon="caret-down" iconSize={14} sx={{mb: '2px'}} /></Button>
              </Select>
              { data?.group.students.length > 0 &&
                <Text sx={{fontSize: 2, display: 'inline'}}>Kód pro pozvání: <span sx={{letterSpacing: '2px', fontSize: 3}}>{data?.group.invitationCode}</span></Text>
              }
              <div sx={{ mx: 'auto' }} />
              <Link passHref href="/">
                <Lstyle
                  sx={{
                    variant: 'styles.navlink',
                    ml: 4,
                    py: 2,
                  }}>
                  Kurz
                </Lstyle>
              </Link>
              <Link passHref href="/ucitel">
                <Lstyle
                  sx={{
                    variant: 'styles.navlink',
                    ml: 4,
                    py: 2,
                  }}>
                  Přehled tříd
                </Lstyle>
              </Link>
              <ProfileDropdown
                loading={false}
                sx={{ml: 4}}
                photoURL={data!.user.photoURL}
                name={data!.user.name}
                email={data!.user.email} />
            </Fragment>
          )
        }
        return <Fragment>
          <span sx={{
            display: 'inline-block',
            ml: 4,
            background: '#eee',
            borderRadius: '6px',
            position: 'relative',
            height: '32px',
            my: 2,
            width: '124px',
          }}></span>
          <span sx={{
            display: 'inline-block',
            ml: 4,
            background: '#eee',
            borderRadius: '6px',
            position: 'relative',
            py: 2,
            height: '18px',
            width: '124px',
          }}></span>
          <div sx={{ mx: 'auto' }} />
          <span sx={{
            display: 'inline-block',
            ml: 4,
            background: '#eee',
            borderRadius: '6px',
            position: 'relative',
            py: 2,
            height: '18px',
            width: '124px',
          }}></span>
          <span sx={{
            display: 'inline-block',
            ml: 4,
            background: '#eee',
            borderRadius: '6px',
            position: 'relative',
            py: 2,
            height: '18px',
            width: '124px',
          }}></span>
          <div sx={{
              display: 'inline-block',
              height: '32px',
              width: '32px',
              marginLeft: '.6em',
              background: '#eee',
              borderRadius: '50%'
          }}></div>
        </Fragment>
      }}
      </Query>
    </Flex>
  </header>
  )
}

export default GroupHeader
