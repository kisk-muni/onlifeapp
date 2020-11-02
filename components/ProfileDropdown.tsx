/** @jsx jsx */
import { jsx } from 'theme-ui'
import { useState } from 'react'
import { Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core"
import Router from 'next/router'
import Link from 'next/link'
import { Link as Lstyle, Flex, Avatar } from 'theme-ui'
import { AppNotifier } from '../utils/notifier'
import { mutate } from 'swr'

export const ProfileDropdownPlaceholder = () => 
<Flex sx={{alignItems: 'center', py: '4px'}}>
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
}

const ProfileDropdown = ({photoURL, name, email, ...props}: ProfileDropdownProps) => {
  const [loading, setLoading] = useState(false)
  return (
    <Popover
      position={Position.BOTTOM}
    >
      <Lstyle
        {...props}
        sx={{
          variant: 'styles.navlink',
        }}>
        <Flex sx={{alignItems: 'center'}}>
          <span sx={{display: ['none', null, 'block']}}>{ name ? name : email } </span>
          <Avatar
            sx={{ml: 2}}
            src={photoURL}
          />
        </Flex>
      </Lstyle>
      <Menu sx={{zIndex: 101}}>
          <Link href="/nastaveni"><MenuItem text="Nastavení" /></Link>
          <MenuDivider />
          <Link href="/api/logout"><MenuItem text="Odhlásit se" /></Link>
        </Menu>
    </Popover>)
  }
  
  export default ProfileDropdown