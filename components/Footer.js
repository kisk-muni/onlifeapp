/** @jsx jsx */
import { jsx, Link as Lstyle } from 'theme-ui'
import Link from 'next/link'

const Footer = () => (
    <footer
        sx={{
            fontSize: 1,
            color: 'background',
            bg: 'text',
            variant: 'styles.footer',
        }}>
        <div
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            maxWidth: 1240,
            mx: 'auto',
            px: 35,
            py: 4,
        }}>
        <Link href="/">
            <Lstyle sx={{ variant: 'styles.navlink', p: 2 }}>
                Home
            </Lstyle>
        </Link>
        <Link href="/">
            <Lstyle sx={{ variant: 'styles.navlink', p: 2 }}>
                Blog
            </Lstyle>
        </Link>
        <Link href="/">
            <Lstyle sx={{ variant: 'styles.navlink', p: 2 }}>
                About
            </Lstyle>
        </Link>
        <div sx={{ mx: 'auto' }} />
            <div sx={{ p: 2 }}>© 2020 Masarykova univerzita</div>
        </div>
    </footer>
)

export default Footer