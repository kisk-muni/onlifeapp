/** @jsx jsx */
import { jsx, Text, Link as Lstyle, Container, Box } from 'theme-ui'
import Link from 'next/link'

const Footer = () => (
<footer sx={{py: 4}}>
    <Container as="nav" sx={{display: 'flex'}}>
        <Text sx={{color: 'gray', display: 'inline',  pr: 3, py: 2, fontSize: 2}}>© 2020 Masarykova Univerzita</Text>
        <Box sx={{mx: 'auto'}}></Box>
        <Link href="/">
            <Lstyle sx={{ variant: 'styles.footerlink', px: 3, py: 2, fontSize: 2 }}>
                O aplikaci
            </Lstyle>
        </Link>
        <Link href="/obsah">
            <Lstyle sx={{ variant: 'styles.footerlink', px: 3, py: 2, fontSize: 2 }}>
                Obsah
            </Lstyle>
        </Link>
        <Link href="/ucitele">
            <Lstyle sx={{ variant: 'styles.footerlink', px: 3, py: 2, fontSize: 2 }}>
                Pro učitele
            </Lstyle>
        </Link>
        <Link href="/podminky-sluzby">
            <Lstyle sx={{ variant: 'styles.footerlink', px: 3, py: 2, fontSize: 2 }}>
                Podmínky služby
            </Lstyle>
        </Link>
    </Container>
</footer>
)

export default Footer