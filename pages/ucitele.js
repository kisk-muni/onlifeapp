/** @jsx jsx */
import { jsx, Text, Heading, Box, Grid, Container, Button } from 'theme-ui'
import { NextSeo } from 'next-seo'
import StarterLayout from 'components/StarterLayout'

const features = [
  {
    heading: 'Aktivita',
    description: 'Sledujte, jak se žákům daří v jednotlivých tématech.',
  },
  {
    heading: 'Materiály',
    description: 'Získejte ucelený přehled kurzu.',
  },
  {
    heading: 'Třídy',
    description: 'Snadno spravujte více tříd z jednoho účtu.'
  }
]

const SignIn = () => (
  <StarterLayout>
    <NextSeo title="Pro učitele" />
    <Box sx={{py: 6}}>
      <Container>
        <Heading variant="specialtitle" as="h1" sx={t => t.util.gxText('instagram', 'primary')}>Učte s námi<br/>informační<br/>gramotnost!</Heading>
        <Button variant="lg" sx={{mt: 4, bg: 'foreground'}}>Připojit se jako učitel</Button>
      </Container>
    </Box>
    <Box>
      <Container>
        <Grid columns={[3]} gap={2}>
          {
            features.map(feature => <Box sx={{p: 5, bg: 'primary-accent-1'}}>
                <Text variant="eyebrow" sx={{fontSize: '16px!important'}}>{feature.heading}</Text>
                <Heading variant="heading">{feature.description}</Heading>
              </Box>)
          }
        </Grid>
      </Container>
    </Box>
    {
      /*
        <SignInPage
      features={features}
      logo="ONLIFE pro učitele"
      isForStudents={false}
      registerTeacher
      heading="Učte s námi informační gramotnost"
    />
      */
    }
  </StarterLayout>
  )

export default SignIn