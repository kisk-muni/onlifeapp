/** @jsx jsx */
import { Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core"
import Router from 'next/router'
import { Link as Lstyle, Box, Flex } from 'theme-ui'
import { jsx } from 'theme-ui'
import { useApolloClient } from "@apollo/react-hooks"
import { AppNotifier } from '../utils/notifier'

export const ProfileDropdownPlaceholder = () => 
<Flex sx={{alignItems: 'center', py: '8px'}}>
<span sx={{
  display: 'inline-block',
  ml: 4,
  background: '#eee',
  borderRadius: '6px',
  position: 'relative',
  py: 2,
  height: '21px',
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
</Flex>

interface ProfileDropdownProps {
  photoURL: string
  name: string
  email: string
  loading: boolean
}

const ProfileDropdown = ({photoURL, name, email, loading}: ProfileDropdownProps) => {
  const client = useApolloClient();
  if (loading) {
    return ProfileDropdownPlaceholder
  }
  return (
    <Popover
    content={
      <Menu sx={{zIndex: 80}}>
      {name && <MenuDivider title={email} />}
      <MenuItem
      onClick={async () => {
        await fetch("/api/logout", {
          method: "POST"
        });
        localStorage.clear();
        client.resetStore()
        if (AppNotifier !== null) {
          AppNotifier.show({
            message: 'Sbohem …',
            icon: "hand",
            intent: 'warning',
          })
        }
        Router.push('/')
      }}
      icon="log-out"
      text="Odhlásit se"
      />
      </Menu>
    }
    position={Position.BOTTOM}>
    <Lstyle
    sx={{
      variant: 'styles.navlink',
      ml: 4,
      py: 2,
    }}>
    <Flex sx={{alignItems: 'center'}}>
    {name ? name : email } {photoURL && <img src={photoURL} sx={{height: '32px', width: '32px', marginLeft: '.6em', display: 'inline-block', borderRadius: '50%'}} /> }
    </Flex>
    </Lstyle>
    </Popover>
    )
  }
  
  export default ProfileDropdown