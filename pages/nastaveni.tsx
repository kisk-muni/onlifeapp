/** @jsx jsx */
import { jsx, Flex, Box, Heading, Text, Input, Button, Card, Checkbox, Label, Container } from 'theme-ui'
import DashboardLayout from 'components/dashboard/DashboardLayout'
import Header from 'components/Header'
import { NextPage } from 'next'
import withAuthRedirect from 'utils/withAuthRedirect' 
import { NextSeo } from 'next-seo'
import useUser from 'data/useUser'

const SettingsPage: NextPage = () => {
  const userQuery = useUser()
  return (
    <DashboardLayout header={<Header />}>
      <NextSeo title="Nastavení" />
      <Container variant="narrow">
        <Box sx={{mt: 4}}>
          <Heading sx={{fontSize: 7, mb: 4}}>Nastavení</Heading>
          <Card sx={{bg: 'background', mb: 4, p: '0!important', overflow: 'hidden'}}>
            <Box sx={{p: [3,4]}}>
              <Heading variant="heading" sx={{mb: 2}}>Vaše Jméno</Heading>
              <Text sx={{fontSize: 2, mb: 3}}>Zadejte prosím své celé jméno, nebo jméno které se vám líbí.</Text>
              <Input
                sx={{mt: 3, fontSize: 2, width: '100%', border: '1px solid', borderRadius: '3px', borderColor: 'primary-accent-3' }}
                defaultValue={userQuery.user.name}
              />
            </Box>
            <Flex sx={{bg: 'primary-accent-1', borderTop: '1px solid #eaeaea', py: [2,3], px: [3,4], alignItems: 'baseline', justifyContent: 'space-between'}}>
              <Box>
                <Text sx={{color: 'primary-accent-4', fontSize: 2}}>Validace</Text>
              </Box>
              <Box>
                <Button>Uložit</Button>
              </Box>
            </Flex>
          </Card>
  
          <Card sx={{bg: 'background', mb: 4, p: '0!important', overflow: 'hidden'}}>
            <Box sx={{p: [3,4]}}>
              <Heading variant="heading" sx={{mb: 2}}>Opustit třídu</Heading>
              <Text sx={{fontSize: 2, mb: 3}}>
                Tato akce odpojí váš účet od třídy. Majitel vaší stávající třídy tak ztratí přístup k: Vašemu profilu, Aktivitě a Výsledcích v kurzu.
              </Text>
              <Label sx={{fontWeight: 400, display: 'flex', flexDirection: 'row'}}>
                <Checkbox
                  defaultChecked={false}
                />
                <span>Potvrzuji, že chci třídu opustit.</span>
              </Label>
            </Box>
            <Flex sx={{bg: 'primary-accent-1', borderTop: '1px solid #eaeaea', py: [2,3], px: [3,4], alignItems: 'baseline', justifyContent: 'flex-end'}}>
              <Box>
                <Button sx={{bg: '#e00'}}>Uložit</Button>
              </Box>
            </Flex>
          </Card>
  
          <Card sx={{bg: 'background', mb: 4, p: '0!important', overflow: 'hidden'}}>
            <Box sx={{p: [3,4]}}>
              <Heading variant="heading" sx={{mb: 2}}>Smazat OnLife Účet</Heading>
              <Text sx={{fontSize: 2, mb: 3}}>
                Tato akce zařadí váš účet do fronty k odstranění všech dat vašeho OnLife účtu, včetně: Tříd, Aktivit, Výsledků kvízů, Pokusů o připojení ke třídě.
              </Text>
              <Label sx={{fontWeight: 400, display: 'flex', flexDirection: 'row'}}>
                <Checkbox
                  defaultChecked={false}
                />
                <span>Potvrzuji, že chci zahájit proces mazání účtu pro účet: <b>Jméno Příjmení</b></span>
              </Label>
            </Box>
            <Flex sx={{bg: 'primary-accent-1', borderTop: '1px solid #eaeaea', py: [2,3], px: [3,4], alignItems: 'baseline', justifyContent: 'flex-end'}}>
              <Box>
                <Button sx={{bg: '#e00'}}>Uložit</Button>
              </Box>
            </Flex>
          </Card>
  
        </Box>
      </Container>
    </DashboardLayout>
  )
}

export default withAuthRedirect(SettingsPage)