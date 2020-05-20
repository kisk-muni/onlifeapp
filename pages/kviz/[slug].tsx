/** @jsx jsx */
import { Fragment, useState, useEffect } from 'react'
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import { useSubmitQuizMutation } from '../../apollo/submitQuiz.graphql'
import { useRouter } from 'next/router'
import { Image as DatoImage } from 'react-datocms'
import { useForm } from "react-hook-form"
import { jsx, Radio, Checkbox, Label, Button, Grid, Message, Link as Slink, Spinner, Container, Heading, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import Link from 'next/link'
import FadeSpinner from '../../components/FadeSpinner'
import { useUserQuizFeedbackListQuery } from '../../apollo/userQuizFeedbackList.graphql'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from '../../utils/api'
import withAuthRedirect from '../../utils/withAuthRedirect'
import moment from 'moment'
import 'moment/locale/cs'

export type PossibleResponds = {
  choiceText: string
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
        <Label key={index} sx={{mb: 3, fontWeight: 'body', fontSize: 1}}>
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
        <Label key={index} sx={{mb: 3, fontWeight: 'body', fontSize: 1}}>
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
  const [canSubmit, setCanSubmit] = useState(false)
  const [showQuiz, setShowQuiz] = useState(false)
  const [submitQuizMutation, { data, loading, error }] = useSubmitQuizMutation({
    onCompleted: (data) => {
      if (data.submitQuiz.submitted) {
        // todo: where to push 
        router.push('/feedback/'+quiz.slug+'?attempt='+data.submitQuiz.responseAttempt)
      }
    }
  })
  const userFeedbackList = useUserQuizFeedbackListQuery({
    variables: {
      quizId: quiz?.id as string
    }
  })
  useEffect(() => {
    if (userFeedbackList.data?.userQuizFeedbackList.length == 0) {
      setShowQuiz(true)
    }
  })
  const { register, errors, handleSubmit, reset, getValues } = useForm<FormData>()
  let quizItemIndex = 0

  return (
  <StarterLayout>
    <Container variant="quiz">
      <Box sx={{mt: 2, px: 4}}>
        { quiz?.items?.length !== 0 ?
          <Fragment>
            {!showQuiz && 
              <Fragment>
              <Heading sx={{fontSize: 6, mt: 4, mb: 2}}>
                Kvíz: { quiz?.title }
              </Heading>
              <Flex sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 4,
                  mt: 6,
                  pr: 4,
                }}>
                  <Box>
                    <Text sx={{fontSize: 2}}>{ quiz?.items && 'Vyplnění zabere asi '+ (quiz?.items.length + 1) + ' min' }</Text>
                  </Box>
                  { !userFeedbackList.loading && (userFeedbackList.data?.userQuizFeedbackList?.length > 0)
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
        {userFeedbackList.data?.userQuizFeedbackList.map((attempt, index) => {
            const createdAt = new Date(parseInt(attempt.createdAt))
            if (showQuiz) {
              return (
                <Box sx={{mt: 2, mb: 3, borderRadius: '4px'}}>
                  <Message>
                    <Flex sx={{justifyContent: 'space-between'}}>
                      <Text>Váš nejlepší výsledek v tomto kvízu je <b>{ attempt.points + ' / ' + attempt.maxPoints } bodů</b></Text>
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
              <Box sx={{pt: 3, pb: 4, mt: 4, mb: 4, px: 4, border: '1px solid #ddd', borderRadius: '4px'}}>
                <Heading sx={{fontSize: 4, mt: 3, mb: 3}}>
                  Váš nejlepší výsledek
                </Heading>
                <Grid gap="4" columns={3}>
                  <Box>
                    <Text sx={{fontSize: 2, fontWeight: 'body', color: 'gray'}}>
                      { moment(createdAt).fromNow() as string }<br />{ moment(createdAt).format('MMMM Do YYYY, h:mm') as string }
                    </Text>
                  </Box>
                  <Box>
                    <Text sx={{fontSize: 2, color: 'gray'}}>
                      Skóre
                    </Text>
                    <Text sx={{fontSize: 4 }}>
                      { attempt.points + ' / ' + attempt.maxPoints } bodů
                    </Text>
                  </Box>
                  <Flex sx={{alignItems: 'center', justifyContent: 'flex-end'}}>
                    <Link passHref as={"/feedback/"+quiz.slug+"?attempt="+(attempt.id as string)} href={{ pathname: '/feedback', query: { slug: quiz.slug, attempt: attempt.id } }}>
                      <a sx={{alignSelf: 'flex-end'}}><Button sx={{fontSize: 2}}>Zobrazit zpětnou vazbu</Button></a>
                    </Link>
                  </Flex>
                </Grid>
              </Box>
            )
          })}
        
        { showQuiz && 
          <Fragment>
            <Heading sx={{fontSize: 6, mt: 5, mb: 2}}>
                Kvíz: { quiz?.title }
            </Heading>
            <Text sx={{pb: 3, fontWeight: 'bold', borderBottom: '1px solid #ddd'}}>
              Celkem { quiz?.items.length } otázek
            </Text>
          </Fragment>
        }
      </Box>
      { showQuiz && <form>
        {
          quiz?.items.map((item, index) => {
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
              <Box
                key={index}
                sx={{
                  pt: 3,
                  pb: 3,
                  px: 4,
                  mb: 2,
                  backgroundColor: (errors[item.id] || (errors[item.id]?.length && errors[item.id][itemMaxIndex]) ) ? '#fff8f9' : 'background',
                }}
              >
                <Flex sx={{alignItems: 'baseline'}}>
                  <Box sx={{flexBasis: '32px', flexGrow: 1}}>
                    <Text sx={{fontSize: 1}}>{ quizItemIndex }.</Text>
                  </Box>
                  <Box sx={{flexGrow: 99999, flexBasis: 0}}>
                    <Text sx={{fontWeight: 'regular', fontSize: 1, mb: 3}}>
                      {item.question}
                      {!item.required && <span sx={{m: 2, fontStyle: 'italic', fontSize: 1, fontWeight: 'body', color: 'gray'}}>
                        nepovinná otázka
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
                </Flex>
              </Box>
            )

          })
        }
        <Box sx={{
            mx: 4,
            mt: 3,
            pt: 4,
            pb: 3,
            mb: 5,
            borderTop: '1px solid #ddd',
            alignItems: 'center'
          }}>
          <Box>
            <Label sx={{mb: 3, fontWeight: 'body'}}>
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
                  Souhlasím s lorem impusm dolor sit amet s lorem impusm dolor sit amet s lorem impusm dolor sit amet s lorem impusm dolor sit amet
                </Text>
            </Label>
          </Box>
          <Flex sx={{justifyContent: 'flex-end'}}>
            <Button
              type="submit"
              disabled={
                (!canSubmit || error as unknown as boolean)
              }
              sx={{
                fontSize: 3,
                bg: !canSubmit ? 'gray!important' : 'primary',
                transition: 'background .2s',
              }}
              onClick={handleSubmit((data: any) => {
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
                console.log(items)
                submitQuizMutation({variables: {input: {
                  slug: quiz.slug,
                  consent: canSubmit,
                  items: items
                }}})
              })}
              title="Odevzdat">{(loading || data?.submitQuiz?.submitted ) ? <Flex><Spinner size="24" strokeWidth="3" sx={{color: 'background', mr: 3}} /> Načítání…</Flex> : 'Odeslat'}</Button>
          </Flex>  
          <div sx={{mt: 3, color: 'error', textAlign: 'right'}}>
            { error && "Něco se pokazilo, zkuste to prosím později." } 
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
    paths: allGfquizzes?.map(quiz => `/tema/${quiz.slug}`) || [],
    fallback: true,
  }
}

export default withApollo(withAuthRedirect(KvizPage))