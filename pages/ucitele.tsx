/** @jsx jsx */
import { jsx, Text, Heading, Flex, Box, Card, Grid, Container, Button } from 'theme-ui'
import { NextSeo } from 'next-seo'
import Image from 'next/image'
import Link from 'next/link'
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
      <Container sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <Heading variant="specialtitle" as="h1" sx={{textAlign: 'center'}}>Učte s námi<br/>informační<br/>gramotnost.</Heading>
        <Link passHref href="/api/registrace-ucitele">
          <Button as="a" variant="lg" sx={{mt: 4, backgroundImage: t => t.util.gx('instagram', 'primary'), display: 'block'}}>Zaregistrovat se jako učitel</Button>
        </Link>
      </Container>
    </Box>
    <Box sx={{py: [5, 6, 6], bg: 'snow'}}>
      <Container>
        <Grid columns={[2]}>
          <Flex sx={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <Box>
              <Heading variant="ultratitle">
                Vytvářejte<br/>a spravujte<br/>třídy.
              </Heading>
            </Box>
          </Flex>
          <Flex sx={{ alignItems: 'center', justifyContent: 'center'}}>
            <Card
              key={1}
              sx={{
                height: 160,
                p: '20px!important',
                width: 250,
                mx: 3,
              }}
            >
              <Heading as="h2" sx={{fontSize: 3}}>
                Moje nová třída
              </Heading>
            </Card>
            <Card
              key={1}
              sx={{
                height: 160,
                p: '20px!important',
                width: 250,
                mx: 3,
              }}
            >
              <Heading as="h2" sx={{fontSize: 3}}>
                Prváci 2020
              </Heading>
            </Card>
            <Card
              key={1}
              sx={{
                height: 160,
                p: '20px!important',
                width: 250,
                mx: 3,
              }}
            >
              <Heading as="h2" sx={{fontSize: 3}}>
                3.B
              </Heading>
            </Card>
          </Flex>
        </Grid>
      </Container>
    </Box>
    <Box sx={{py: [5, 6, 6], bg: 'background'}}>
      <Container>
        <Grid columns={[2]}>
          <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end'}}>
              <Image
                src="/screen-trida.png"
                alt="Obrázek práce s materiály"
                width={1427}
                height={878}
                sx={{borderRadius: 'default', boxShadow: 'elevated'}}
              />
          </Flex>
          <Flex sx={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <Box>
              <Heading variant="ultratitle">
                Vybírejte<br/>vhodná<br/>témata.
              </Heading>
            </Box>
          </Flex>
        </Grid>
      </Container>
    </Box>
    <Box sx={{py: [5, 6, 6], bg: 'snow'}}>
      <Container>
        <Grid columns={[2]}>
          <Flex sx={{justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <Box>
              <Heading variant="ultratitle">
                Sledujute,<br/>jak se žákům<br/>daří.
              </Heading>
            </Box>
          </Flex>
          <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end'}}>
            <Image
              src="/screen-stats.png"
              alt="Obrázek statistiky odpovědí kvízové otázky."
              width={648}
              height={421}
              sx={{borderRadius: 'default', boxShadow: 'elevated'}}
            />
          </Flex>
        </Grid>
      </Container>
    </Box>
  </StarterLayout>
  )

export default SignIn