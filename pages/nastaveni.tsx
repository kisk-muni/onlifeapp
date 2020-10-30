/** @jsx jsx */
import { jsx, Flex, Box, Heading, Text, Input, Button, Checkbox, Label } from 'theme-ui'
import DashboardLayout from 'components/dashboard/DashboardLayout'
import Header from 'components/Header'
import { NextPage } from 'next'
import withAuthRedirect from 'utils/withAuthRedirect' 
import { NextSeo } from 'next-seo'

const SettingsPage: NextPage = () => (
  <DashboardLayout
    header={<Header />}
    stickHeaderByDefault
  >
    <NextSeo title="Nastavení" />
    <Flex sx={{maxWidth: 960, px: 35, mx: 'auto', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{mt: 4}}>
        <Heading sx={{fontSize: 7, mb: 4}}>Nastavení (ve vývoji)</Heading>
        
        <Box sx={{borderRadius: '6px', bg: 'background', border: '1px solid #eaeaea', mb: '18px', overflow: 'hidden'}}>
          <Box sx={{p: 20}}>
            <Heading sx={{mb: 2}}>Vaše Jméno</Heading>
            <Text>Zadejte prosím své celé jméno, nebo jméno které se vám líbí.</Text>
            <Input
              sx={{mt: 3, width: 300}}
              defaultValue='Hello'
            />
          </Box>
          <Flex sx={{bg: '#fafafa', borderTop: '1px solid #eaeaea', px: 20, py: 10, alignItems: 'baseline', justifyContent: 'space-between'}}>
            <Box>
              <Text sx={{color: '#666'}}>Validace</Text>
            </Box>
            <Box>
              <Button>Uložit</Button>
            </Box>
          </Flex>
        </Box>

        <Box sx={{borderRadius: '6px', bg: 'background', border: '1px solid #eaeaea', mb: '18px', overflow: 'hidden'}}>
          <Box sx={{p: 20}}>
            <Heading sx={{mb: 2}}>Váš Email</Heading>
            <Text>Zadejte prosím emailovou adresu, pomocí které se chcete přihlašovat.</Text>
            <Input
              sx={{mt: 3, width: 300}}
              defaultValue='Hello'
            />
          </Box>
          <Flex sx={{bg: '#fafafa', borderTop: '1px solid #eaeaea', px: 20, py: 10, alignItems: 'baseline', justifyContent: 'space-between'}}>
            <Box>
              <Text sx={{color: '#666'}}>Validace</Text>
            </Box>
            <Box>
              <Button>Uložit</Button>
            </Box>
          </Flex>
        </Box>

        <Box sx={{borderRadius: '6px', bg: 'background', border: '1px solid #eaeaea', mb: '18px', overflow: 'hidden'}}>
          <Box sx={{p: 20}}>
            <Heading sx={{mb: 2}}>Opustit třídu</Heading>
            <Text sx={{mb: 3}}>
              Tato akce odpojí váš účet od třídy. Majitel vaší stávající třídy tak ztratí přístup k:<br/>
              Vašemu profilu, Aktivitě, Výsledcích v kurzu.
            </Text>
            <Label sx={{fontWeight: 400}}>
              <Checkbox
                defaultChecked={false}
              />
              <span>Potvrzuji, že chci třídu opustit.</span>
            </Label>
          </Box>
          <Flex sx={{bg: '#fafafa', borderTop: '1px solid #eaeaea', px: 20, py: 10, alignItems: 'baseline', justifyContent: 'flex-end'}}>
            <Box>
              <Button sx={{bg: '#e00'}}>Uložit</Button>
            </Box>
          </Flex>
        </Box>

        <Box sx={{borderRadius: '6px', bg: 'background', border: '1px solid #eaeaea', mb: '18px', overflow: 'hidden'}}>
          <Box sx={{p: 20}}>
            <Heading sx={{mb: 2}}>Smazat OnLife Účet</Heading>
            <Text sx={{mb: 3}}>
              Tato akce zařadí váš účet do fronty k odstranění všech dat vašeho OnLife účtu, včetně:<br/>
              Tříd, Aktivit, Výsledků kvízů, Pokusů o připojení ke třídě.
            </Text>
            <Label sx={{fontWeight: 400}}>
              <Checkbox
                defaultChecked={false}
              />
              <span>Potvrzuji, že chci zahájit proces mazání účtu pro účet: <b>Jméno Příjmení</b></span>
            </Label>
          </Box>
          <Flex sx={{bg: '#fafafa', borderTop: '1px solid #eaeaea', px: 20, py: 10, alignItems: 'baseline', justifyContent: 'flex-end'}}>
            <Box>
              <Button sx={{bg: '#e00'}}>Uložit</Button>
            </Box>
          </Flex>
        </Box>

      </Box>
    </Flex>
  </DashboardLayout>
)

export default withAuthRedirect(SettingsPage)