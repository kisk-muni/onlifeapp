import {
    Badge,
    Box,
    Button,
    Card,
    Checkbox,
    Container,
    Flex,
    Grid,
    Heading,
    Input,
    Label,
    Link,
    NavLink,
    Radio,
    Select,
    Slider,
    Text,
    Textarea
  } from 'theme-ui'
  import StarterLayout from 'components/StarterLayout'
  import { NextSeo } from 'next-seo'
  import theme from 'theme'
  //import ColorSwitcher from '../components/color-switcher'
  
  export default () => (
    <StarterLayout>
      <NextSeo noindex title="Design" />
      <Box sx={{bg: 'snow'}}>  
        <Box as="header" sx={{ color: 'text' }}>
          <Container sx={{ pt: 5, pb: [3, 4], textAlign: 'center' }}>
            <Heading as="h1" variant="specialtitle" >
              Design system
            </Heading>
          </Container>
        </Box>
        <Box as="section" sx={{ py: 4 }}>
          <Container>
            <Heading variant="headline">Containers</Heading>
          </Container>
          {Object.keys(theme.layout).map(key => (
            <Container
              key={key}
              variant={key}
              sx={{
                my: 3,
                py: 3,
                border: '2px dashed',
                borderColor: 'primary-accent-5',
                borderRadius: 'default'
              }}
            >
              {key}
            </Container>
          ))}
        </Box>
        <Box
          as="main"
          sx={{ bg: 'snow', color: 'text', py: 4, h2: { mt: 4 } }}
        >
          <Container>
            <Heading variant="headline">Text</Heading>
            <Card sx={{ columnCount: [null, 2] }}>
              {Object.keys(theme.text).map(key => {
                const Component = key.includes('head') ? Heading : Text
                return (
                  <Component key={key} variant={key} sx={{ mt: 0, mb: 3 }}>
                    {key}
                  </Component>
                )
              })}
            </Card>
            <Heading variant="headline">Buttons</Heading>
            {Object.keys(theme.buttons).map(key => (
              <Button key={key} variant={key} sx={{ mr: 3, mb: 3 }}>
                {key} btn
              </Button>
            ))}
            <Heading variant="headline">Cards</Heading>
            <Grid
              columns={[null, 2, 3]}
              gap={3}
              sx={{ code: { mt: 1, ml: -1, fontSize: 0 } }}
            >
              {Object.keys(theme.cards).map(key => (
                <Card variant={key} key={key} p={[3, 4]}>
                  {key}
                </Card>
              ))}
              <Card
                sx={{
                  backgroundImage: t => t.util.gx('instagram', 'red'),
                  color: 'white'
                }}
              >
                <Heading variant="headline" as="h3" my={0}>
                  Gradient BG
                </Heading>
                <Text as="code" variant="styles.code">
                  theme.util.gx('color1', 'color2')
                </Text>
              </Card>
              <Card>
                <Heading
                  variant="headline"
                  as="h3"
                  sx={t => t.util.gxText('instagram', 'blue')}
                  my={0}
                >
                  Gradient text
                </Heading>
                <Text as="code" variant="styles.code">
                  theme.util.gxText('color1', 'color2')
                </Text>
              </Card>
            </Grid>
            <Heading variant="headline">Forms</Heading>
            <Grid gap={3} columns={[null, 2]} as="form" variant="cards.sunken">
              <Label>
                Full name
                <Input placeholder="Zach Latta" />
              </Label>
              <Label>
                How are you primarily associated with Hack Club?
                <Select>
                  <option value="" disabled hidden>
                    Select one…
                  </option>
                  <option value="club-leader">I lead a club</option>
                  <option value="club-member">I am a club member</option>
                  <option value="slack-member">I am active on Slack</option>
                  <option value="alum">I am a Hack Club alum</option>
                  <option value="none">None of the above</option>
                </Select>
              </Label>
              <Label variant="labelHoriz">
                <Checkbox />
                Remember me
              </Label>
              <Flex sx={{ flexWrap: 'wrap' }}>
                <Label variant="labelHoriz">
                  <Radio name="letter" /> Alpha
                </Label>
                <Label variant="labelHoriz">
                  <Radio name="letter" /> Bravo
                </Label>
                <Label variant="labelHoriz">
                  <Radio name="letter" /> Charlie
                </Label>
              </Flex>
              <Label>
                Why do you want to come?
                <Textarea placeholder="Write a few sentences." />
              </Label>
              <Label>
                Slider
                <Slider color="red" />
              </Label>
              <Button
                as="button"
                type="submit"
                children="RSVP"
                sx={{ gridColumn: [null, 'span 2'] }}
              />
            </Grid>
            <Heading variant="headline">Logo</Heading>
            <Heading
              sx={t => t.util.gxText('instagram', '#0000dc')}
              as="h1" 
            >
              ONLIFE
            </Heading>
            <Heading
              sx={t => t.util.gxText('instagram', '#0000dc')}
              as="h1"
              variant="ultratitle" 
            >
              ONLIFE
            </Heading>
            <Heading variant="headline">Badges</Heading>
            {Object.keys(theme.badges).map(key => (
              <Badge
                key={key}
                variant={key}
                mr={3}
                color={key === 'outline' ? 'muted' : null}
              >
                {key}
              </Badge>
            ))}
            <Heading variant="headline">Colors</Heading>
            {Object.keys(theme.colors).map(key => (
              key != 'modes' && <Box sx={{ bg: key, py: 4, px: 3 }}>
                <Grid columns={2}>
                  <Text>{key}</Text>
                  <Flex sx={{justifyContent: 'flex-end'}}>
                    <Text>{theme.colors[key]}</Text>
                  </Flex>
                </Grid>
              </Box>
            ))}
            <Text as="pre" variant="styles.pre">
              {JSON.stringify(theme, null, 2)}
            </Text>
          </Container>
        </Box>
      </Box>
    </StarterLayout>
  )