/** @jsx jsx */
import { Fragment, useState, useEffect, useMemo } from 'react'
import StarterLayout from 'components/StarterLayout'
import { useRouter } from 'next/router'
import { Image as DatoImage } from 'react-datocms'
import { useForm } from "react-hook-form"
import { jsx, Radio, Checkbox, Label, Grid, Button, Card, Message, Link as Slink, Spinner, Container, Heading, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from 'utils/api'
import withAuthRedirect from 'utils/withAuthRedirect'
import moment from 'moment'
import 'moment/locale/cs'
import { Response } from 'pages/api/quiz/submit'
import { Response as SubmissionsListResponse } from 'pages/api/quiz/submissions-list/[id]'
import { NextSeo } from 'next-seo'
import useSWR from 'swr'
import fetcher from 'lib/fetcher'
import shuffleArray from 'utils/shuffleArray'

export type PossibleResponds = {
  choiceText: string
  isCorrect: boolean
  correctFeedback: string
  incorrectFeedback: string
}[]

export type Item = {
  id: string
  question: string
  picture: {
    responsiveImage: any
  }
  possibleResponds: PossibleResponds
  _modelApiKey: string
  required: boolean
  discarded: boolean
}

export type Items = Item | any

export interface Props {
  quiz: {
    id: string
    slug: string
    title: string
    items: Items[]
  }
}

export type FormData = any

export interface PossibelItemRespondsProps {
  possibleResponds: PossibleResponds
  name: string
  required: boolean
  register: any
  getValues?: any
  onChange?: any
}

const QuizRadio = ({possibleResponds, name, required, register}: PossibelItemRespondsProps) => {
  return (
  <Fragment>
    {possibleResponds.map((choice, index) => {
      let conditionalRef
      if (possibleResponds.length == index+1 && required) {
        conditionalRef = register({ required: {value: true, message: "Tato otázka je povinná."} })
      } else {
        conditionalRef = register
      }
      return (
        <Label key={index} sx={{mb: 3, display: 'flex', flexDirection: 'row', fontWeight: 'body', fontSize: 2}}>
          <Radio
            ref={conditionalRef}
            name={name}
            value={choice.choiceText}
            />
          { choice.choiceText }
        </Label>
      )  
    })}
  </Fragment>
)}

const QuizCheckbox = ({possibleResponds, name, required, getValues, register}: PossibelItemRespondsProps) => {
  const respondsLength = possibleResponds.length
  
  return (<Fragment>
    {possibleResponds.map((choice, index) => {
      let conditionalRef
      if (respondsLength == index+1 && required) {
        conditionalRef = register({
          validate: (value: any) => {
            const values = getValues({ nest: true })
            return (values[name].filter(v => Boolean(v)).length >= 1 || "Vyberte alespoň jednu odpověď.")
          }
        })
      } else {
        conditionalRef = register
      }
      return (
        <Label key={index} sx={{mb: 3, display: 'flex', flexDirection: 'row', fontWeight: 'body', fontSize: 2}}>
          <Checkbox
            ref={conditionalRef}
            name={name + '.' +index}
            value={choice.choiceText}
            />
          { choice.choiceText }
        </Label>
      )
    })}
  </Fragment>
)
}

const KvizPage: NextPage<Props> = ({quiz}) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [canSubmit, setCanSubmit] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const feedbackList = useSWR<SubmissionsListResponse>('/api/quiz/submissions-list/' + quiz?.id as string, fetcher)
  useEffect(() => {
    if (feedbackList?.data?.submissions.length == 0) {
      setShowQuiz(true)
    }
  })
  // side effect
  const shuffled_items = useMemo(() => {
    if (quiz?.items?.length !== 0) {
      quiz?.items.forEach(item => {
        if (item?.possibleResponds.length !== 0) {
          // mutates array  
          shuffleArray(item.possibleResponds)
        }
      })
    }
    return quiz?.items
  }, [quiz?.items])
  // console.log(feedbackList?.data?.submissions)
  const { register, errors, handleSubmit, reset, getValues } = useForm<FormData>()
  let quizItemIndex = 0

  return (
  <StarterLayout sx={{bg: 'sheet'}}>
    <NextSeo title={'Kvíz: ' + (quiz?.title ? quiz?.title : '') } />
    <Container variant="quiz">
      <Box sx={{mb: 3, px: 4}}>
        { shuffled_items?.length !== 0 ?
          <Fragment>
            {!showQuiz && 
              <Fragment>
              <Heading variant="title" sx={{mt: 5, mb: 2}}>
                Kvíz: { quiz?.title }
              </Heading>
              <Flex sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 4,
                  mt: 4,
                  pr: 4,
                }}>
                  <Box>
                    <Text sx={{fontSize: 2}}>{ shuffled_items && 'Vyplnění zabere asi '+ (shuffled_items?.length + 1) + ' min' }</Text>
                  </Box>
                  { feedbackList.data && (feedbackList.data.submissions.length > 0)
                    &&
                    <Slink onClick={() => setShowQuiz(true)} sx={{fontSize: 2, fontWeight: 'bold', alignSelf: 'flex-end', '&:hover': {textDecoration: 'none'}}}>Zkusit znovu</Slink>
                  }
              </Flex>
              </Fragment>
            }
          </Fragment> : <Fragment>
            <Box>
              <Text sx={{fontSize: 2}}>
                Tento kvíz zatím připravujeme.
              </Text>
            </Box>
          </Fragment>
        }
        <Card sx={{px: 0, py: "0!important"}}>
          {feedbackList.data?.submissions.map((attempt, index) => {
            if (showQuiz) {
              return (
                <Box sx={{mt: 2, mb: 3, borderRadius: '4px'}}>
                  <Message>
                    <Flex sx={{justifyContent: 'space-between'}}>
                      <Text>Váš nejlepší výsledek v tomto kvízu je <b>{ attempt.points + ' / ' + attempt.max_points } bodů</b></Text>
                      <Slink onClick={() => {
                        reset()
                        setShowQuiz(false)
                      }}>Ukončit vyplňování</Slink>
                    </Flex>
                  </Message>
                </Box>
              )
            }
            return (
              <Box sx={{pt: 1, pb: 4, mt: 4, borderBottom: (index+1 != feedbackList.data?.submissions.length ? '1px solid #ddd' : 'none')}}>
                <Grid gap="4" columns={3}>
                  <Box>
                    <Text sx={{fontSize: 2, fontWeight: 'body', color: 'gray'}}>
                      { moment(attempt.created_at["@ts"]).fromNow() as string }<br />{ moment(attempt.created_at["@ts"]).format('MMMM Do YYYY, h:mm') as string }
                    </Text>
                  </Box>
                  <Box>
                    <Text sx={{fontSize: 2, color: 'gray'}}>
                      Skóre
                    </Text>
                    <Text sx={{fontSize: 4 }}>
                      { attempt.points + ' / ' + attempt.max_points } bodů
                    </Text>
                  </Box>
                  <Flex sx={{alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Link passHref as={"/feedback/"+quiz.slug+"?attempt="+(attempt.id as string)} href={{ pathname: '/feedback', query: { slug: quiz.slug, attempt: attempt.id } }}>
                      <a sx={{alignSelf: 'flex-end'}}><Button variant="detailAction" sx={{fontSize: 2}}>Zobrazit zpětnou vazbu</Button></a>
                    </Link>
                  </Flex>
                </Grid>
              </Box>
            )
          })}
        </Card>
        
        { showQuiz && 
          <Box sx={{py: 3}}>
            <Heading sx={{fontSize: 6, mt: 4, mb: 2}}>
                Kvíz: { quiz?.title }
            </Heading>
            <Text sx={{mb: 3, fontWeight: 'bold'}}>
              Celkem { shuffled_items?.length } otázek
            </Text>
          </Box>
        }
      </Box>
      { showQuiz && <form>
        {
          shuffled_items?.map((item, index) => {
            if (item.discarded) {
              return
            }

            quizItemIndex += 1
            const itemMaxIndex = item.possibleResponds.length - 1
            let inputContent
            switch (item._modelApiKey) {
              case 'singleselect':
                inputContent = <QuizRadio
                  required={item.required}
                  register={register}
                  name={item.id}
                  possibleResponds={item.possibleResponds}
                />
                break;
              case 'checkbox':
                inputContent = <QuizCheckbox
                  required={item.required}
                  register={register}
                  name={item.id}
                  getValues={getValues}
                  possibleResponds={item.possibleResponds} />
                break;
              default:
                break;
            }
            
            return (
              <Card
                key={index}
                sx={{
                  boxShadow: 'small',
                  pt: 3,
                  pb: 3,
                  px: 4,
                  mb: 3,
                  backgroundColor: (errors[item.id] || (errors[item.id]?.length && errors[item.id][itemMaxIndex]) ) ? '#fff8f9' : 'background',
                }}
              >
                <Flex sx={{alignItems: 'baseline'}}>
                  <Box sx={{flexBasis: '32px', flexGrow: 1}}>
                    <Text sx={{fontSize: 2}}>{ quizItemIndex }.</Text>
                  </Box>
                  <Box sx={{flexGrow: 99999, flexBasis: 0}}>
                    <Text sx={{fontWeight: 'regular', fontSize: 2, mb: 2}}>
                      {item.question}
                      {!item.required && <span sx={{m: 2, fontStyle: 'italic', fontSize: 2, fontWeight: 'body', color: 'gray'}}>
                        nepovinná otázka
                      </span>}
                    </Text>
                    <Text sx={{fontWeight: 'regular', fontSize: 2, mb: 3}}>
                      {item._modelApiKey === 'checkbox' && <span sx={{mb: 2, fontSize: 2, fontWeight: 'body', color: 'gray'}}>
                        Vyberte vše, co platí.
                      </span>}
                    </Text>
                    { item.picture &&
                      <Box sx={{mb: 3}}>
                        <DatoImage
                          data={{
                            ...item.picture.responsiveImage,
                          }}
                        />
                      </Box>
                    }
                    { inputContent }
                    { errors[item.id] &&
                      <Text sx={{variant: 'styles.simpleErrorMessageText'}}>
                        {((item._modelApiKey === 'checkbox' && errors[item.id]?.length) ? 'Musíte vybrat alespoň jednu odpověď.' : errors[item.id].message)}
                      </Text>
                    }
                  </Box>
                  <Box sx={{flexBasis: '80px', flexGrow: 1}}>
                    <Text sx={{fontSize: 2, height: '32px', lineHeight: '32px', textAlign: 'center', px: 3, borderRadius: '16px', border: '1px solid #ddd'}}>1 bod</Text>
                  </Box>
                </Flex>
              </Card>
            )

          })
        }
        <Box sx={{
            mx: 4,
            mt: 2,
            pt: 4,
            pb: 3,
            mb: 5,
            alignItems: 'center'
          }}>
          <Box>
            <Label sx={{mb: 3, fontWeight: 'body', display: 'flex', flexDirection: 'row'}}>
              <Checkbox
                sx={{mr: 4}}
                ref={register({ required: true})}
                name="consent"
                onChange={(event) => {
                  const target = event.target
                  setCanSubmit(target.checked)
                }}
                value="true"
                />
                <Text sx={{maxWidth: 600}}>
                  Vyplněný kvíz je výsledkem mé vlastní práce a učení.
                </Text>
            </Label>
          </Box>
          <Flex sx={{justifyContent: 'flex-end'}}>
            <Button
              variant="lg"
              type="submit"
              disabled={!canSubmit || errorMessage != '' || loading}
              sx={{
                fontSize: 3,
                bg: !canSubmit ? 'gray!important' : 'primary',
                transition: 'background .2s',
              }}
              onClick={handleSubmit(async (data: any) => {
                console.log('data:', data)
                let items = []
                // for each input response
                for (const [key, value] of Object.entries(data)) {
                  if (key !== 'consent') {
                    let responseIsArray = Array.isArray(value)
                    let responses = []
                    if (responseIsArray) {
                      responses = (value as (string|boolean)[]).filter((v => typeof v === 'string' && v)) 
                    }
                    items.push({
                      fieldName: key,
                      response: (responseIsArray ? '' : value),
                      responses: (responseIsArray ? responses : [])
                    })
                  }
                }
                setLoading(true)
                setSuccess(false)
                setErrorMessage('')
                await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/quiz/submit`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    slug: quiz.slug,
                    consent: canSubmit,
                    items: items
                  })
                })
                .then(async (response) => {
                  const result: Response = await response.json()
                  setLoading(false)
                  if (response.ok) {
                    router.push('/feedback/'+quiz.slug+'?attempt='+result?.id)
                    setSuccess(true)
                  } else {
                    setErrorMessage(result?.message)
                  }
                })
                .catch(() => {
                  setLoading(false)
                  setErrorMessage('Vypadá to, že jste ztratili spojení. Zkontrolujte to a zkuste to znovu.')
                })
              })}
              title="Odevzdat">{loading ? <Flex><Spinner size="24" strokeWidth="3" sx={{color: 'background', mr: 3}} /> Načítání…</Flex> : 'Odeslat'}</Button>
          </Flex>  
          <div sx={{mt: 3, color: 'error-lighter', textAlign: 'right'}}>
            { errorMessage && "Něco se pokazilo, zkuste to prosím později." } 
          </div>
        </Box>
      </form> }
    </Container>
  </StarterLayout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getGFQuizWithSlug(params.slug, preview)
  //const content = await markdownToHtml(data?.post?.content || '')
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
    paths: allGfquizzes?.map(quiz => `/kviz/${quiz.slug}`) || [],
    fallback: true,
  }
}

export default withAuthRedirect(KvizPage)
