/** @jsx jsx */
import { Box } from 'reflexbox'
import { jsx, Text, Heading } from 'theme-ui'

export const DemoGroupBox = () => (
  <Box sx={{variant: 'styles.helpcard'}}>
    <Heading as='h3' sx={{fontWeight: 600, fontSize: '16px', mb: '6px'}}>Prozkoumat zkušební třídu</Heading>
    
  </Box>
)

export const HelpBox = () => (
  <Box sx={{variant: 'styles.helpcard'}}>
    <Heading as='h3' sx={{fontWeight: 600, fontSize: '16px', mb: '6px'}}>Potřebujete pomoc?</Heading>
    <Text>Třída </Text>
  </Box>
)
