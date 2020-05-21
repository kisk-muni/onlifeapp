/** @jsx jsx */
import { useState, Fragment } from 'react'
import DashboardLayout from '../../components/dashboard/DashboardLayout'
import GroupHeader from '../../components/dashboard/GroupHeader'
import { withApollo } from '../../apollo/client'
import { useGroupQuery } from '../../apollo/group.graphql'
import { useGroupQuizStatsQuery, GroupQuizStatsQuestion } from '../../apollo/groupQuizStats.graphql'
import { useRouter } from 'next/router'
import { jsx, Container, Button, Grid, Heading, Select, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import FadeSpinner from '../../components/FadeSpinner'
import Avatar from '../../components/Avatar'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from '../../utils/api'
import withAuthRedirect from '../../utils/withAuthRedirect' 
import { Props } from '../kviz/[slug]'
import { BarChart, PieChart, Pie, Bar, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const StatsItem = ({question, index}: {question: GroupQuizStatsQuestion, index: number}) => {
  const [showStudents, setShowStudents] = useState(false)
  let data = []
  question.choices.forEach((choice, index) => {
    data.push({
      name: choice.choiceText, foo: choice.chosenCount, fill: COLORS[index % COLORS.length]
    })
  })

  return (
    <Box
      key={index}
      sx={{
        pt: 3,
        px: 2,
        mb: 2,
      }}
    >
      <Flex sx={{alignItems: 'baseline'}}>
        <Box sx={{flexBasis: '32px', flexGrow: 1}}>
          <Text sx={{fontSize: 1}}>{ index+1 }.</Text>
        </Box>
        <Box sx={{flexGrow: 99999, flexBasis: 0}}>
          <Text sx={{fontWeight: 'regular', fontSize: 2, mb: 2}}>
            {question.question}
            {!question.required && <span sx={{m: 2, fontStyle: 'italic', fontSize: 2, fontWeight: 'body', color: 'gray'}}>
              nepovinná otázka
            </span>}
          </Text>
          <Text sx={{fontWeight: 'regular', fontSize: 1, mb: 3}}>
            {question._modelApiKey === 'checkbox' && <span sx={{mb: 2, fontSize: 2, fontWeight: 'body', color: 'gray'}}>
              Vyberte vše, co platí.
            </span>}
          </Text>
          <Grid gap="4" columns={3}>
            <Box>
              {data.map(item => {
                return (
                  <Flex sx={{alignItems: 'baseline', mb: 2}}>
                    <Box sx={{flexBasis: '16px', flexGrow: 1, bg: item.fill, height: '12px', width: '16px', borderRadius: '6px', mr: 2,}}></Box>
                    <Text sx={{flexGrow: 99999, lineHeight: '1.2', flexBasis: 0}}>{item.name}</Text>
                  </Flex>
                )
              })}
            </Box>
            <Box sx={{height: '250px'}}>
              {question._modelApiKey === 'singleselect' &&
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={data} dataKey="foo" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              }
            </Box>
            <Box sx={{mt: 0}}>
              {
                (question?.students?.correct.length > 0 || question?.students?.incorrect.length > 0) &&
                <Flex sx={{justifyContent: 'flex-end'}}>
                  <Button variant="detailAction" sx={{bg: 'background', color: 'text'}} onClick={() => setShowStudents(!showStudents)}>
                    { !showStudents ? 'Zobrazit studenty' : 'Skrýt studenty' }
                  </Button>
                </Flex>
              }
              { showStudents &&
                <Box sx={{mt: 3}}>
                  {question?.students?.correct.length > 0 && 
                    <Box sx={{mb: 3, backgroundColor: 'background', border: '1px solid #ddd', borderLeft: '3px solid green', borderRadius: '4px', px: 3,  py: 2}}>
                      <Heading sx={{mt: 2, mb: 3, textTransform: 'uppercase', fontSize: 1}}>Odpověděli správně</Heading>
                      {question?.students?.correct.map(student => 
                        <Flex sx={{mb: 2, alignItems: 'center'}}>
                          <Avatar name={student.name} photoURL={student.picture} sx={{height: '32px', width: '32px', lineHeight: '32px', mr: 2}} />
                          <Text sx={{fontSize: 2}}>{student.name}</Text>
                        </Flex>
                      )}
                    </Box>
                  }
                  
                  {question?.students?.incorrect.length > 0 && 
                    <Box sx={{mb: 3, backgroundColor: 'background', border: '1px solid #ddd', borderLeft: '3px solid red', borderRadius: '4px', px: 3,  py: 2}}>
                      <Heading sx={{mt: 2, mb: 3, textTransform: 'uppercase', fontSize: 1}}>Odpověděli špatně</Heading>
                      {question?.students?.incorrect.map(student =>
                        <Flex sx={{mb: 2, alignItems: 'center'}}>
                          <Avatar name={student.name} photoURL={student.picture} sx={{height: '32px', width: '32px', lineHeight: '32px', mr: 2}} />
                          <Text sx={{fontSize: 2}}>{student.name}</Text>
                        </Flex>
                      )}
                    </Box>
                  }
                </Box>
              }
            </Box>
          </Grid>
        </Box>
      </Flex>
    </Box>
  )
}

const StatsPage: NextPage<Props> = ({quiz}) => {
  const router = useRouter()
  const [ filterValue, setFilterValue ] = useState('best')
  const { data, loading, error } = useGroupQuery({variables: {id: router.query.trida as string}})
  const stats = useGroupQuizStatsQuery({variables: {
    quizId: quiz?.id as string,
    groupId: router.query.trida as string,
    filter: filterValue
  }})

  return (
    <DashboardLayout
      header={<GroupHeader />}
      stickHeaderByDefault>
      <Container sx={{mt: 3}}>
        <Text sx={{mb: 3, pb: 2, borderBottom: '2px solid #000', display: 'inline-block', fontSize: 2, fontWeight: 'bold'}}>Odpovědi a statistiky</Text>
        <Flex sx={{justifyContent: 'space-between', alignItems: 'center', pb: 2, borderBottom: '1px solid #ddd'}}>
          <Heading sx={{mb: 3, mt: 3, textAlign: 'center', fontSize: 6}}>Kvíz: { quiz?.title }</Heading>
          <Select sx={{maxWidth: '220px', backgroundColor: 'background', borderColor: '#ddd'}} defaultValue={filterValue}>
            <option value="best">Nejlepší výsledky</option>
            <option value="first">Výsledky prvních pokusů</option>
            <option value="last">Výsledky posledních pokusů</option>
          </Select>
        </Flex>
      </Container>
      <Container sx={{pt: 3}}>
      {stats.loading
      ? <div>Načítání…</div>
      : <Box>
          {stats?.data?.groupQuizStats?.questions.map((question, index) => <StatsItem question={question} key={index} index={index} />)}
        </Box>
      }
      </Container>
    </DashboardLayout>
  )

}

export async function getStaticProps({ params, preview = false }) {
  const data = await getGFQuizWithSlug(params.slug, preview)
  return {
    props: {
      preview,
      quiz: {
        ...data?.gfquiz,
      },
    },
  }
}

export async function getStaticPaths() {
  const allGfquizzes = await getAllGFQuizzesWithSlug()
  return {
    paths: allGfquizzes?.map(quiz => `/stats/${quiz.slug}`) || [],
    fallback: true,
  }
}

export default withApollo(withAuthRedirect(StatsPage))