/** @jsx jsx */
import { Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core"
import Router from 'next/router'
import { Link as Lstyle } from 'theme-ui'
import { jsx } from 'theme-ui'
import { useApolloClient } from "@apollo/react-hooks"
import logout from '../utils/auth/logout'
// import { Mutation } from "@apollo/react-components";
import gql from 'graphql-tag'


const ProfileDropdown = ({photoURL, name, email}) => {
    
    const client = useApolloClient();

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
                        position: 'relative',
                        py: 2,
                        pr: '50px',
                    }}>
                    {name ? name : email } {photoURL && <img src={photoURL} sx={{height: '32px', marginLeft: '.6em', position: 'absolute', right: 0, bottom: '2px', borderRadius: '50%'}} /> }
                </Lstyle>
        </Popover>
    )
}

export default ProfileDropdown