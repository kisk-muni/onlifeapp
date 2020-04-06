import { Menu, MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core"
import firebase from "firebase/app"
import Router from 'next/router'
import { Link as Lstyle } from 'theme-ui'
import { useApolloClient } from "@apollo/react-hooks"
// import { Mutation } from "@apollo/react-components";
import gql from 'graphql-tag'


const ProfileDropdown = ({photoURL, name, email, navlink}) => {
    
    const client = useApolloClient();

    return (
        <Popover content={<Menu>
            {name && <MenuDivider title={email} />}
                <MenuItem
                    onClick={() => {
                        firebase.auth().signOut().then(function() {
                            localStorage.clear();
                            client.resetStore()
                            Router.push('/')
                        }).catch(function(error) {
                            // An error happened.
                        });
                    }}
                    icon="log-out"
                    text="Odhlásit se" />
            </Menu>}

        position={Position.BOTTOM}>
            <Lstyle
                sx={{
                    variant: navlink || 'styles.navlink',
                    ml: 4,
                    py: 2,
                }}>
                {photoURL && <img src={photoURL} style={{height: 32, marginRight: '.6em', position: 'relative', bottom: -10, borderRadius: '50%'}} /> }{name ? name : email }
            </Lstyle>
        </Popover>
    )
}

export default ProfileDropdown