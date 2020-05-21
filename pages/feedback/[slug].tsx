/** @jsx jsx */
import { Fragment } from 'react'
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import { useUserQuizFeedbackQuery } from '../../apollo/userQuizFeedback.graphql'
import { useRouter } from 'next/router'
import { Image as DatoImage } from 'react-datocms'
import { jsx, Container, Heading, Label, Radio, Checkbox, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import FadeSpinner from '../../components/FadeSpinner'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from '../../utils/api'
import withAuthRedirect from '../../utils/withAuthRedirect' 
import { Props } from '../kviz/[slug]'
import queryString from 'query-string'
import moment from 'moment'
import 'moment/locale/cs'

const Feedback = ({text, sentiment}: {text: string, sentiment: string}) => (
  <Text
    sx={{
      display: 'inline-block',
      fontSize: 1,
      borderRadius: '4px',
      maxWidth: 600,
      mt: 1,
      ml: 4,
      mb: 2,
      px: 2,
      pt: 1,
      pb: 2,
      backgroundColor: (sentiment === 'positive' ? 'rgba(0, 128, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'), 
      color: 'text'
    }}>
    { text }
  </Text>
)

const StatsPage: NextPage<Props> = ({quiz}) => {
  const router = useRouter()
  const query = queryString.parse(router.asPath.split('?')[1])
  let attemptId = ''
  if (query.attempt) {
    attemptId = query.attempt as string
  }
  const { data, loading, error } = useUserQuizFeedbackQuery({
      variables: {
        quizId: quiz?.id as string,
        attemptId: attemptId
      }
    })
  moment.locale('cs')
  const createdAt = new Date(parseInt(data?.userQuizFeedback.createdAt))
  return (
    <StarterLayout>
    <Container sx={{mt: 4}} variant="quiz">
      <Flex sx={{justifyContent: 'space-between', alignItems: 'center'}}>
        <Heading sx={{mb: 3, mt: 2, fontSize: 5}}>{ quiz?.title }</Heading>
          <Box>
          { data?.userQuizFeedback && <Fragment>
            <Text sx={{fontSize: 2, fontWeight: 'bold', color: 'text'}}>
              { moment(createdAt).fromNow() as string }, { moment(createdAt).format('MMMM Do YYYY, h:mm') as string }
            </Text>
          </Fragment> }
        </Box>
      </Flex>
      
      <Box sx={{mb: 4, pb: 3, borderBottom: '1px solid #ddd'}}>
        <Text sx={{fontSize: 2, fontWeight: 'bold'}}>
          { data?.userQuizFeedback &&
            'Celkem '+data?.userQuizFeedback.points+' / '+data?.userQuizFeedback.maxPoints+' bodů'
          }
        </Text>
      </Box>
      { loading &&
        <Box sx={{py: 5}}>
          <FadeSpinner />
        </Box>
      }
      {data?.userQuizFeedback.feedback.map((item, index) => {
        let inputContent
        let original = quiz.items.find((original) => {
          return original.id === item.id
        })
        switch (item._modelApiKey) {
          case 'singleselect':
            inputContent = item.feedbackResponses.map((respond, i) => {
              let color = (respond.sentiment === 'positive' ? 'green' : (respond.sentiment === 'negative' ? 'red' : '#666')) 
              return (
                <Box sx={{mb: 3}}>
                  <Label
                    key={index}
                    sx={{
                      fontWeight: 'body',
                      fontSize: 1,
                      color: color
                    }}>
                    <Radio
                      disabled
                      name={item.id}
                      sx={{color: color, fill: color}}
                      value={respond.choiceText}
                      defaultChecked={(respond.chosen)}
                      />
                      { respond.choiceText }
                  </Label>
                  { respond.feedback &&
                    <Feedback text={respond.feedback} sentiment={respond.sentiment} />
                  }
                </Box>
            )})
            break
          case 'checkbox':
            inputContent = item.feedbackResponses.map((respond, i) => {
              let color = (respond.sentiment === 'positive' ? 'green' : (respond.sentiment === 'negative' ? 'red' : '#666'))
              return (
                <Box sx={{mb: 3}}>
                  <Label
                    key={index}
                    sx={{
                      fontWeight: 'body',
                      color: color
                    }}>
                    <Checkbox
                      disabled
                      sx={{color: color, fill: color}}
                      name={item.id}
                      value={respond.choiceText}
                      defaultChecked={(respond.chosen)}
                      />
                      { respond.choiceText }
                  </Label>
                  { respond.feedback &&
                    <Feedback text={respond.feedback} sentiment={respond.sentiment} />
                  }
                </Box>
            )})
            break
          default:
            break
        }

        return (
          <Flex sx={{alignItems: 'baseline', mb: 4}}>
            <Box sx={{flexBasis: '32px', flexGrow: 1}}>
              <Text sx={{fontSize: 1}}>{ index + 1 }.</Text>
            </Box>
            { original && original.picture &&
              <Box sx={{mb: 3, maxWidth: 600}}>
                <DatoImage
                  data={{
                    ...original.picture.responsiveImage,
                  }}
                />
              </Box>
            }
            <Box sx={{flexGrow: 99999, flexBasis: 0}}>
              <Text sx={{fontWeight: 'regular', fontSize: 1, mb: 2}}>
                {item.question}
                {!item.required && <span sx={{m: 2, fontStyle: 'italic', fontSize: 1, fontWeight: 'body', color: 'gray'}}>
                  nepovinná otázka
                </span>}
              </Text>
              <Text sx={{fontWeight: 'regular', fontSize: 1, mb: 3}}>
                {item._modelApiKey === 'checkbox' && <span sx={{mb: 2, fontSize: 1, fontWeight: 'body', color: 'gray'}}>
                  Vyberte vše, co platí.
                </span>}
              </Text>
              { inputContent }
            </Box>
            <Box sx={{flexBasis: '70px', flexGrow: 1}}>
              <Text sx={{fontSize: 1, height: '32px', lineHeight: '32px', textAlign: 'center', px: 3, borderRadius: '16px', border: '1px solid #ddd'}}>1 bod</Text>
            </Box>
          </Flex>
        )
      })}
    </Container>
  </StarterLayout>
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
    paths: allGfquizzes?.map(quiz => `/feedback/${quiz.slug}`) || [],
    fallback: true,
  }
}

export default withApollo(withAuthRedirect(StatsPage))