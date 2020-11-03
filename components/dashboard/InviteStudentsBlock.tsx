/** @jsx jsx */
import { jsx, Text, Heading, Grid, Card, Flex, Input } from 'theme-ui'
import CopyButton from 'components/CopyButton'

const InviteStudentsBlock = ({invitationCode, ...props}: {invitationCode: string}) => {
  const link = process.env.NEXT_PUBLIC_SITE_URL + '/pridat-se-ke-tride?invitation=' + invitationCode
  return (
    <Grid columns={[3]} gap="32px" {...props}>
      <Card sx={{
        backgroundImage: t => t.util.gx('#18daff', '#5bffcd'),
        color: 'black'
      }}>
        <svg sx={{fill: 'black', mt: 4, mb: 4}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="48" height="48"><path fill-rule="evenodd" d="M1.592 2.712L2.38 7.25h4.87a.75.75 0 110 1.5H2.38l-.788 4.538L13.929 8 1.592 2.712zM.989 8L.064 2.68a1.341 1.341 0 011.85-1.462l13.402 5.744a1.13 1.13 0 010 2.076L1.913 14.782a1.341 1.341 0 01-1.85-1.463L.99 8z"></path></svg>
        <Heading variant="headling" sx={{fontSize: 5}}>1. Pozvěte studenty do webové aplikace ONLIFE</Heading>
        <Text variant="lead">Vyzvěte studenty k registraci v této webové aplikaci a předejte jim tajný kód pro připojení ke třídě.</Text>        
        <Heading variant="headline" sx={{fontSize: 3, mb: 2}}>Kód</Heading>
        <Flex sx={{alignItems: 'center', mb: 4}}>
          <Input
            sx={{mr: 3, fontSize: 3, px: 3, border: 'none', bg: 'white', maxWidth: 100}}
            onFocus={(event) => event.target.select()}
            defaultValue={invitationCode}
            readOnly
          />
          <CopyButton textToCopy={invitationCode} />
        </Flex>
      </Card>
      <Card sx={{
        backgroundImage: t => t.util.gx('#ff5858', '#ffd440'),
        color: 'black'
      }}>
        <svg sx={{fill: 'black', mt: 4, mb: 4}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="48" height="48"><path fill-rule="evenodd" d="M5.5 3.5a2 2 0 100 4 2 2 0 000-4zM2 5.5a3.5 3.5 0 115.898 2.549 5.507 5.507 0 013.034 4.084.75.75 0 11-1.482.235 4.001 4.001 0 00-7.9 0 .75.75 0 01-1.482-.236A5.507 5.507 0 013.102 8.05 3.49 3.49 0 012 5.5zM11 4a.75.75 0 100 1.5 1.5 1.5 0 01.666 2.844.75.75 0 00-.416.672v.352a.75.75 0 00.574.73c1.2.289 2.162 1.2 2.522 2.372a.75.75 0 101.434-.44 5.01 5.01 0 00-2.56-3.012A3 3 0 0011 4z"></path></svg>
        <Heading variant="headling" sx={{fontSize: 5}}>2. Studenti se přidají ke třídě</Heading>
        <Text variant="lead">Po přihlášení uvidí v horní části stránky tlačítko „Přidat se ke třídě“, na které kliknou.</Text>
        <Text variant="lead">Studenti na této stránce vyplní kód, který jste jim zaslali.</Text>
      </Card>
      <Card sx={{
        backgroundImage: t => t.util.gx('#fb558e', '#6f31b7'),
        color: 'white'
      }}>
        <svg sx={{fill: 'white', mt: 4, mb: 4}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="48" height="48"><path fill-rule="evenodd" d="M1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0zM0 8a8 8 0 1116 0A8 8 0 010 8zm11.78-1.72a.75.75 0 00-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4.5-4.5z"></path></svg>
        <Heading variant="headling" sx={{fontSize: 5}}>3. Uvidíte aktivitu studentů v kurzu</Heading>
        <Text variant="lead">Na této stránce uvidíte přehled studentské aktivity v jednotlivých kvízech.</Text>
      </Card>
    </Grid>
  )
}

export default InviteStudentsBlock