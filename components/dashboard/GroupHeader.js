/** @jsx jsx */
import { Fragment } from 'react'
import Link from 'next/link'
import { jsx, Link as Lstyle, Button, Text, Flex } from 'theme-ui'
import ProfileDropdown from "../ProfileDropdown"
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { MenuItem, Icon } from "@blueprintjs/core"
import { Select } from "@blueprintjs/select"

function itemRenderer(group, {modifiers}) {
  return (
    <Link href={group.link}><MenuItem
        active={modifiers.active}
        key={group.id}
        text={group.name}
    /></Link>
);
}

export const CURRENT_USER = gql`
{
  user {
    name
    photoURL
    email 
    id
  }
}
`

const GroupHeader = ({ description = 'Kurz informační gramotnosti pro studenty středních škol', showDescription = false }) => (
  <header sx={{
      variant: 'styles.dashboard.header',
      width: '100%',
      zIndex: 18
  }}>
    <Flex sx={{
      mx: 'auto',
      px: 35,
      alignItems: 'baseline',
    }}>
      <Link passHref href="/">
        <Lstyle 
          sx={{
            variant: 'styles.navlogo',
            letterSpacing: '.03em',
            fontSize: 5,
          }}>
          OnLife
        </Lstyle>
      </Link>
      <Select
        onItemSelect={(item) => {
          console.log('selected', item)
        }}
        items={[
          {link: '/u', name: 'Přehled tříd'},
          {link: '/trida/ldksahfhjskldafsldfks', name: 'Jiná třída'},
          {link: '/trida/ldksahfhjskldafsldfks', name: 'Jiná třída'},
          {link: '/trida/ldksahfhjskldafsldfks', name: 'Jiná třída'},
          {link: '/trida/ldksahfhjskldafsldfks', name: 'Jiná třída'}
        ]}
        filterable={false}
        activeItem={{id: 'idecko', name: 'Jméno třídy'}}
        itemRenderer={itemRenderer}
        >
        <Button variant="groupSelect">Jméno třídy <Icon icon="caret-down" iconSize={14} sx={{mb: '2px'}} /></Button>
      </Select>
      <Text sx={{display: 'inline'}}>Kód pro pozvání: KJMNDFSA</Text>
      <div sx={{ mx: 'auto' }} />
      <Query query={CURRENT_USER} >
        {({loading, data}) => {
          if (loading === false && data.user !== null) {
            return <Fragment>
                <ProfileDropdown
                  sx={{ml: 4}}
                  photoURL={data.user.photoURL}
                  name={data.user.name}
                  email={data.user.email} />
              </Fragment>
          } else {
            return <Fragment>
              <Link passHref href="/prihlaseni">
                <Lstyle
                  sx={{
                    variant: 'styles.dashboard.navlink',
                    ml: 4,
                    py: 2,
                  }}>
                  Přihlásit se
                </Lstyle>
              </Link>
              <Link passHref href="/registrace">
                <Button
                  sx={{
                    ml: 4,
                    py: 2,
                    px: 3
                  }}>
                  Zaregistrovat se
                </Button>
              </Link>
            </Fragment>
          }
        }}
      </Query>
    </Flex>
  </header>
)

export default GroupHeader
