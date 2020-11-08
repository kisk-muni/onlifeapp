/** @jsx jsx */
import { Fragment } from 'react'
import StarterLayout from 'components/StarterLayout'
import { useRouter } from 'next/router'
import { Image as DatoImage } from 'react-datocms'
import { jsx, Container, Heading, Spinner, Label, Radio, Checkbox, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from 'utils/api'
import withAuthRedirect from 'utils/withAuthRedirect' 
import { Props } from 'pages/kviz/[slug]'
import queryString from 'query-string'
import fetcher from 'lib/fetcher'
import useSWR from 'swr'
import moment from 'moment'
import 'moment/locale/cs'
import { NextSeo } from 'next-seo'
import { Response } from 'pages/api/quiz/[id]'

const Feedback = ({text, sentiment}: {text: string, sentiment: string}) => (
  <Text
    sx={{
      display: 'inline-block',
      fontSize: 2,
      borderRadius: '4px',
      maxWidth: 600,
      mt: 1,
      ml: 4,
      mb: 2,
      px: 2,
      pt: 1,
      pb: 2,
      backgroundColor: (sentiment === 'positive' ? 'rgba(0, 128, 0, 0.2)' : 'error-lighter'), 
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
  const { data, error } = useSWR<Response>('/api/quiz/'+attemptId, fetcher)
  moment.locale('cs')
  return (
    <StarterLayout>
    <NextSeo title={'Zpětná vazba:' + quiz?.title } />
    <Container sx={{mt: 4}}>
      <Flex sx={{justifyContent: 'space-between', alignItems: 'center'}}>
        <Heading sx={{mb: 3, mt: 2, fontSize: 5}}>{ quiz?.title }</Heading>
          <Box>
          { data && <Fragment>
            <Text sx={{fontSize: 3, fontWeight: 'bold', color: 'text'}}>
              { moment(data.created_at).fromNow() as string }, { moment(data.created_at).format('Do MMMM YYYY, h:mm') as string }
            </Text>
          </Fragment> }
        </Box>
      </Flex>
      <Box sx={{mb: 4, pb: 3, borderBottom: '1px solid #ddd'}}>
        <Text sx={{fontSize: 3, fontWeight: 'bold'}}>
          { data &&
            'Celkem '+data?.points+' / '+data?.max_points+' bodů'
          }
        </Text>
      </Box>
      { !data &&
        <Box sx={{py: 5}}>
          <Spinner size={24} />
        </Box>
      }
      {data?.feedback.map((item, index) => {
        let inputContent
        let original = quiz?.items.find((original_item) => {
          return original_item.id === item.id
        })
        console.log(item)
        switch (item.type) {
          case 'singleselect':
            inputContent = item.feedbackResponses.map((respond, i) => {
              let color = (respond.sentiment === 'positive' ? 'success-default' : (respond.sentiment === 'negative' ? 'error-default' : '#666')) 
              return (
                <Box sx={{mb: 3}}>
                  <Label
                    key={index}
                    sx={{
                      fontWeight: 'body',
                      display: 'flex',
                      flexDirection: 'row',
                      fontSize: 2,
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
              let color = (respond.sentiment === 'positive' ? 'success-default' : (respond.sentiment === 'negative' ? 'error-default' : '#666'))
              return (
                <Box sx={{mb: 3}}>
                  <Label
                    key={index}
                    sx={{
                      fontWeight: 'body',
                      display: 'flex',
                      flexDirection: 'row',
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
              <Text sx={{fontSize: 2}}>{ index + 1 }.</Text>
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
              <Text sx={{fontWeight: 'regular', fontSize: 2, mb: 2}}>
                {item.question}
                {!item.required && <span sx={{m: 2, fontStyle: 'italic', fontSize: 2, fontWeight: 'body', color: 'gray'}}>
                  nepovinná otázka
                </span>}
              </Text>
              <Text sx={{fontWeight: 'regular', fontSize: 2, mb: 3}}>
                {item.id === 'checkbox' && <span sx={{mb: 2, fontSize: 2, fontWeight: 'body', color: 'gray'}}>
                  Vyberte vše, co platí.
                </span>}
              </Text>
              { inputContent }
            </Box>
            <Box sx={{flexBasis: '80px', flexGrow: 1}}>
              <Text sx={{fontSize: 2, height: '32px', lineHeight: '32px', textAlign: 'center', px: 3, borderRadius: '16px', border: '1px solid #ddd'}}>1 bod</Text>
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

export default withAuthRedirect(StatsPage)