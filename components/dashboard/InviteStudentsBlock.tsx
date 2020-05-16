/** @jsx jsx */
import { jsx, Text, Heading, Grid, Button, Label, Link as Slink, AspectImage, Box, Flex, Input } from 'theme-ui'
import Link from 'next/link'
import { Popover, Callout } from '@blueprintjs/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const CopyButton = ({textToCopy}: {textToCopy: string}) => (
  <Popover popoverClassName="popover-success" hoverCloseDelay={300}>
    <CopyToClipboard text={textToCopy}> 
      <Button>
        Kopírovat
      </Button>
    </CopyToClipboard>
    <CopiedCallout />
  </Popover>
)

const StepNumber = ({number}: {number: number}) => (
  <Box sx={{
    lineHeight: '42px',
    flexGrow: 0,
    mr: 3,
    flexShrink: 0,
    flexBasis: '42px',
    height: '42px',
    textAlign: 'center',
    bg: '#ff943c',
    color: 'rgba(255, 255, 255, .8)',
    fontWeight: 700,
    fontSize: 1,
    borderRadius: '50%'
  }}>{number}</Box>
)

const CopiedCallout = () => <Callout intent="success"><span sx={{color: '#0d8050'}}>Zkopírováno do schránky</span></Callout>

const InviteStudentsBlock = ({invitationCode}: {invitationCode: string}) => {
  const link = process.env.SITE_URL + '/pridat-se-ke-tride?invitation=' + invitationCode
  return (
  <Grid columns={[2, '3fr 6fr']} gap={4}>
    <Box sx={{
      mb: 5,
      height: '100%',
    }}>
      <Heading sx={{fontSize: 6, mt: 4, mb: 2}}>Začněte pozváním studentů</Heading>
      <Text sx={{fontSize: 3, mb: 3}}>Kdokoli se v kurzu může připojit k vaší třídě<br />pomocí odkazu nebo zadáním kódu.</Text>
      { /* <Text sx={{fontSize: 2}}><Link passHref href="/"><Slink sx={{textDecoration: 'underline'}}>Jak se studenti připojí?</Slink></Link></Text> */}
      <Box sx={{mt: 5}}>
        <Flex sx={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch'}}>

        <Flex sx={{mb: 4, alignItems: 'baseline'}}>
            <StepNumber number={1} />
            <Box sx={{mb: 2}}>
              <Heading sx={{fontSize: 3, lineHeight: 1.5, mb: 2}}>Studenti se přihlásí na webu kurzu</Heading>
              <Text sx={{color: 'gray', fontSize: 2}}>
                Po přihlášení uvidí v horní části stránky tlačítko „Přidat se ke třídě“.
              </Text>  
            </Box>
          </Flex>

          <Flex sx={{mb: 4, alignItems: 'baseline'}}>
            <StepNumber number={2} />
            <Box sx={{mb: 2}}>
              <Heading sx={{fontSize: 3, lineHeight: 1.5, mb: 3}}>Po kliknutí na „Přidat se ke třídě“ budou vyzváni k zadání kódu</Heading>
              <Text sx={{color: 'gray', fontSize: 2, mb: 3}}>
                Pokud studentům zašlete odkaz pro připojení, bude tento kód na stránce již předvyplněn.
              </Text>
              <Heading sx={{fontSize: 1, mb: 2}}>Odkaz</Heading>
              <Flex sx={{alignItems: 'baseline', mb: 3}}>
                <Input
                  sx={{mr: 2, border: 'none', background: 'rgba(0, 0, 0, .08)', minWidth: 300}}
                  onFocus={(event) => event.target.select()}
                  defaultValue={link}
                  readOnly
                />
                <CopyButton textToCopy={link} />
              </Flex>
              <Heading sx={{fontSize: 1, mb: 2}}>Kód</Heading>
              <Flex sx={{alignItems: 'center'}}>
                <Input
                  sx={{mr: 2, border: 'none', background: 'rgba(0, 0, 0, .08)', maxWidth: 100}}
                  onFocus={(event) => event.target.select()}
                  defaultValue={invitationCode}
                  readOnly
                />
                <CopyButton textToCopy={invitationCode} />
              </Flex>
            </Box>
          </Flex>
          <Flex sx={{mb: 4, alignItems: 'baseline'}}>
            <StepNumber number={3} />
            <Box sx={{mb: 2}}>
              <Heading sx={{fontSize: 3, lineHeight: 1.5, mb: 2}}>Po připojení studentů uvidíte jejich aktivitu v kurzu</Heading>            
            </Box>
          </Flex>
        
        </Flex>
      </Box>
    </Box>
    <Box sx={{height: '100%', pl: 5}}>
      <Flex sx={{alignItems: 'flex-start'}}>
        <Box sx={{width: '100%'}}>
          <AspectImage
            ratio={330/223}
            sx={{position: 'absolute'}}
            src="/undraw_Group_chat_unwm.svg"
          />
        </Box>
      </Flex>
    </Box>
  </Grid>
  )
}

export default InviteStudentsBlock