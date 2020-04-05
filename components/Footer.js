/** @jsx jsx */
import { jsx, Text, Link as Lstyle } from 'theme-ui'
import Link from 'next/link'

const Footer = ({background}) => (
    <footer
        sx={{
            fontSize: 1,
            color: 'text',
            variant: 'styles.footer',
        }}>
        <div
        sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: 1240,
            mx: 'auto',
            px: 35,
            py: 4,
        }}>
        <Link href="/">
            <Lstyle sx={{ variant: 'styles.footerlink', p: 2 }}>
                Podpora
            </Lstyle>
        </Link>
        <Text sx={{color: 'gray', display: 'inline'}}>·</Text>
        <Link href="/">
            <Lstyle sx={{ variant: 'styles.footerlink', p: 2 }}>
                O kurzu
            </Lstyle>
        </Link>
        <Text sx={{color: 'gray', display: 'inline'}}>·</Text>
        <Link href="/">
            <Lstyle sx={{ variant: 'styles.footerlink', p: 2 }}>
                Kontakt
            </Lstyle>
        </Link>
        <Text sx={{color: 'gray', display: 'inline'}}>·</Text>
        <Text sx={{color: 'gray', display: 'inline', mx: 3}}>© 2020 Masarykova Univerzita</Text>
        </div>
    </footer>
)

export default Footer