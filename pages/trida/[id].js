/** @jsx jsx */
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import GroupHeader from '../../components/dashboard/GroupHeader'
import { withApollo } from '../../apollo/client'
import { Flex, Box } from 'reflexbox'
// import Link from 'next/link'
import { useRouter } from 'next/router'
import { jsx, Text, Heading, Grid } from 'theme-ui'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import FullPageLoading from "../../components/FullPageLoading";

export const GROUP = gql`
  query Group($id: ID!) {
    group(id: $id) {
      id
      name
    }
  }
`

const SuccessIcon = () => (
  <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="green"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      shapeRendering="geometricPrecision"
      style={{color:'green', fill: 'green', stroke: '#fff'}}>
      <path
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
        fill="green"
        stroke="green">
      </path>
      <path
        d="M8 11.8571L10.5 14.3572L15.8572 9"
        fill="none" stroke="#fff">
      </path>
    </svg>
)

const topics = [
  {
    name: 'Fáze práce s informacemi',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
  {
    name: 'Fáze práce s informacemi',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
  {
    name: 'Práce s informacemi a učení',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
  {
    name: 'Média a občanství',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
  {
    name: 'Práce s dokumenty',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
  {
    name: 'Interakce, vzájemnost a zpětná vazba',
    subtopics: [
      'Vyhledávání na internetu I ',
      'Vyhledávání na internetu II: Kde vyhledávat?',
      'Vyhledávání na internetu III: Jak vyhledávat?',
      'Filtrování výsledků',
      'Hodnocení informací',
      'Hodnocení informací: Dezinformace a manipulace s informacemi',
      'Hodnocení informací: Wikipedie',
      'Využití informací',
      'S informacemi k řešení problému',
    ]
  },
]

const students = [
  {id: '', active: false, picture: 'https://lh3.googleusercontent.com/a-/AOh14GgS47uhXbbJUY6kq74FVM2RQhnz3LD01ZA00Pq2tPc', name: 'Dalibor Černocký'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skalf', name: 'John Doe'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skdfsfsa', name: 'Alois Jirásek'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skaldsfadsaf', name: 'Klotylda Ruprechtová'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=sdsfa', name: 'John Lennon'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=sksdfdasf', name: 'Dalibor Černocký'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skadsaflf', name: 'Adam Melničák'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skadasflf', name: 'Chief Keef'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skadsaff', name: 'Adam Melničák'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skalf', name: 'John Lennon'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skaslf', name: 'Dalibor Černocký'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skalssf', name: 'Adam Melničák'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skdalf', name: 'Někdo'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=sksddalf', name: 'Chief Keef'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skbvalf', name: 'Adam Melničák'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skanlf', name: 'John Lennon'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skavbnlf', name: 'Dalibor Černocký'},
  {id: '', active: true, picture: 'https://i.pravatar.cc/32?u=skalghjf', name: 'Adam Melničák'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skalf', name: 'Chief Keef'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skaldfhf', name: 'Adam Melničák'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skalhdgff', name: 'John Lennon'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skaljdff', name: 'John Lennon'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skajdghlf', name: 'Dalibor Černocký'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skadflf', name: 'Adam Melničák'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skaldfgsf', name: 'Chief Keef'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skalcycvf', name: 'Adam Melničák'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skalsgdff', name: 'John Lennon'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skalfdsgf', name: 'John Lennon'},
  {id: '', active: false, picture: 'https://i.pravatar.cc/32?u=skaldff', name: 'Dalibor Černocký'},
]

const Trida = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GROUP, {variables: {id: router.query.id}})

  return (
    <DashboardLayout
      header={<GroupHeader />}
      stickHeaderByDefault>
      { loading ? <FullPageLoading dashboard /> : 
        <Flex flexWrap="wrap">
          <Box
            maxWidth={1240}
            px={35}
            pt={50}
            alignSelf="center"
            width={[1, 5/6]}
            mx="auto">
              <Box sx={{ mb: '42px' }}>
                <Heading as="h3" sx={{fontSize: 7, color: 'text', mb: 3}}>Výsledky studenta: {students.find(x => x.active === true).name} ╳</Heading>
                <Text sx={{fontSize: 4, mb: '42px', color: 'text'}}>Vyberte studenta pro filtrování výsledků</Text>
                <Grid gab={4} columns={4} sx={{position: 'static', zIndex: 2}}>
                  {
                    students.map((student) => <Box sx={{mb: '12px'}}>
                      {student.picture && <img src={student.picture} sx={{boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)', position: 'static', zIndex: 2, opacity: (student.active ? '1' : '.5'), display: 'inline-block', height: '32px', borderRadius: '16px', mr: '14px', mb: -2,}} />}
                  <Text sx={{fontSize: 3, fontWeight: (student.active ? 700 : 400), color: (student.active ? 'text' : 'gray'), textDecoration: (student.active ? 'underline' : 'none'),  display: 'inline-block' }}>{student.name} {student.active && '╳'}</Text>
                    </Box>)
                  }
                </Grid>
              </Box>
              <Box sx={{ mb: '50px' }}>
                <Box>
                    <Grid gap={4} columns={2}>
                      {topics.map((topic) => 
                        <Box sx={{mb: 2, variant: 'styles.groupCard' }}>
                          <Heading sx={{fontSize: 5, pb: 2, mb: 2}}>
                            {topic.name}
                          </Heading>
                            {topic.subtopics.map((subtopic, index) => (
                              <Flex justifyContent="space-between" sx={{pb: '2px', pt: '6px', px: 2, background: (index % 2 == 1 ? '#fff' : '#f6f6f6'), borderRadius: '6px', }}>
                                <Box><Text sx={{fontSize: 2}}>{subtopic}</Text></Box>
                                <Box><SuccessIcon /></Box>
                              </Flex>
                            ))}
                        </Box>)}
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
      }
    </DashboardLayout>
  );
  
}

export default withApollo(Trida)