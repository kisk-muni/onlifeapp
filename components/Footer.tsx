/** @jsx jsx */
import { jsx, Text, Link as Lstyle, Container, Box } from 'theme-ui'
import Link from 'next/link'

const Footer = () => (
<footer sx={{py: 4}}>
    <Container as="nav" sx={{display: 'flex'}}>
        <Link href="/">
            <Lstyle sx={{ variant: 'styles.footerlink', pr: 3, py: 2, fontSize: 2 }}>
                O aplikaci
            </Lstyle>
        </Link>
        <Link href="/obsah">
            <Lstyle sx={{ variant: 'styles.footerlink', px: 3, py: 2, fontSize: 2 }}>
                Obsah
            </Lstyle>
        </Link>
        <Link href="/">
            <Lstyle sx={{ variant: 'styles.footerlink', px: 3, py: 2, fontSize: 2 }}>
                Kontakt
            </Lstyle>
        </Link>
        <Box sx={{mx: 'auto'}}></Box>
        <Text sx={{color: 'gray', display: 'inline',  pl: 3, py: 2, fontSize: 2}}>© 2020 Masarykova Univerzita</Text>
    </Container>
</footer>
)

export default Footer