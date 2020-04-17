/** @jsx jsx */
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import { Flex, Box } from 'reflexbox'
import Link from 'next/link'
import { jsx, Text, Button, Heading, Grid } from 'theme-ui'
import { MenuItem, Icon } from "@blueprintjs/core"
import { Select } from "@blueprintjs/select"

const students = [
  {id: '', name: 'Dalibor Černocký'},
  {id: '', name: 'Adam Melničák'},
  {id: '', name: 'Chief Keef'},
  {id: '', name: 'Adam Melničák'},
  {id: '', name: 'John Lennon'},
  {id: '', name: 'Dalibor Černocký'},
  {id: '', name: 'Adam Melničák'},
  {id: '', name: 'Chief Keef'},
  {id: '', name: 'Adam Melničák'},
  {id: '', name: 'John Lennon'},
  {id: '', name: 'Dalibor Černocký'},
  {id: '', name: 'Adam Melničák'},
  {id: '', name: 'Někdo'},
  {id: '', name: 'Chief Keef'},
  {id: '', name: 'Adam Melničák'},
  {id: '', name: 'John Lennon'},
  {id: '', name: 'Dalibor Černocký'},
  {id: '', name: 'Adam Melničák'},
  {id: '', name: 'Chief Keef'},
  {id: '', name: 'Adam Melničák'},
  {id: '', name: 'John Lennon'},
]

function itemRenderer(group, {modifiers}) {
  return (
    <Link href={group.link}><MenuItem
        active={modifiers.active}
        key={group.id}
        text={group.name}
    /></Link>
);
}

const Trida = () => {
  return (
    <StarterLayout>
      <Flex flexWrap="wrap" sx={{variant: 'styles.decoratedBox', overflow: 'display', background: 'transparent'}}>
        <div sx={{variant: 'styles.decoratedOverlay', maxHeight: '300px'}}></div>
        <Box
          sx={{variant: 'styles.decoratedcontent'}} 
          maxWidth={1240}
          px={35}
          pt={50}
          alignSelf="center"
          width={[1, 5/6]}
          mx="auto">
            <Box sx={{mb: '50px'}}>
              <Select
                onItemSelect={(item) => {
                  console.log('selected', item)
                }}
                items={[
                  {link: '/u', name: 'Přehled tříd'},
                  {link: '/trida/ldksahfhjskldafsldfks', name: 'Jiná třída'},
                  {link: '/trida/ldksahfhjskldafsldfks', name: 'Jiná třída'},
                  {link: '/trida/ldksahfhjskldafsldfks', name: 'Jiná třída'},
                  {link: '/trida/ldksahfhjskldafsldfks', name: 'Jiná třída'}
                ]}
                filterable={false}
                activeItem={{id: 'idecko', name: 'Jméno třídy'}}
                itemRenderer={itemRenderer}
                >
                <Button variant="groupSelect">Změnit třídu <Icon icon="caret-down" iconSize={14} sx={{mb: '3px'}} /></Button>
              </Select>
              <Heading as="h3" sx={{fontSize: 5, color: 'background', mb: 4}}>Jméno třídy</Heading>
              <Text sx={{color: 'background', fontSize: 2, color: 'rgba(255,255,255,0.9)'}}>Kód pro pozvání: 88-KKK</Text>
            </Box>
            <Box sx={{ mb: '50px' }}>
              <Heading as="h3" sx={{fontSize: 3, color: 'rgba(255,255,255,0.9)'}}>Studenti ({students.length})</Heading>
              <Box
                sx={{ variant: 'styles.groupCard' }}
                >
                  <Grid gab={4} columns={5}>
                    {
                      students.map((student) => <Box>
                        {student.name}
                      </Box>)
                    }
                  </Grid>
              </Box>
            </Box>
            <Box sx={{ mb: '50px' }}>
              <Heading as="h3" sx={{fontSize: 3, color: '#333'}}>Výsledky</Heading>
              <Box
                sx={{ variant: 'styles.groupCard' }}
                >
                  <Grid gap={4} columns={2}>
                    <Box sx={{mb: 2}}>
                      <Heading sx={{fontSize: 2, pb: 2, mb: 2, borderBottom: '1px solid #ddd'}}>
                        Téma 1</Heading>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                    </Box>
                    <Box sx={{mb: 2}}>
                      <Heading sx={{fontSize: 2, pb: 2, mb: 2, borderBottom: '1px solid #ddd'}}>
                        Téma 2</Heading>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                    </Box>
                    <Box sx={{mb: 2}}>
                      <Heading sx={{fontSize: 2, pb: 2, mb: 2, borderBottom: '1px solid #ddd'}}>
                        Téma 3</Heading>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                    </Box>
                    <Box sx={{mb: 2}}>
                      <Heading sx={{fontSize: 2, pb: 2, mb: 2, borderBottom: '1px solid #ddd'}}>
                        Téma 4</Heading>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                    </Box>
                    <Box sx={{mb: 2}}>
                      <Heading sx={{fontSize: 2, pb: 2, mb: 2, borderBottom: '1px solid #ddd'}}>
                        Téma 5</Heading>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                    </Box>
                    <Box sx={{mb: 2}}>
                      <Heading sx={{fontSize: 2, pb: 2, mb: 2, borderBottom: '1px solid #ddd'}}>
                        Téma 6</Heading>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                      <Text>Kvíz A</Text>
                    </Box>
                  </Grid>
              </Box>
            </Box>
            <Box>
              <Box
                sx={{ variant: 'styles.groupHelpCard', height: '208px'}}
                >
                <Heading as="h3" sx={{fontSize: 3, color: '#333', mb: 3}}>Nápověda</Heading>
              </Box>
            </Box>
        </Box>
      </Flex>
    </StarterLayout>
  );
  
}

export default withApollo(Trida)