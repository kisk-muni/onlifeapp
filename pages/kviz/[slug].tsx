/** @jsx jsx */
import { Fragment, useState } from 'react'
import StarterLayout from '../../components/StarterLayout'
import { withApollo } from '../../apollo/client'
import { useQuizQuery } from '../../apollo/quiz.graphql'
import { useRouter } from 'next/router'
import { Image as DatoImage } from 'react-datocms'
import { useForm } from "react-hook-form"
import { jsx, Radio, Checkbox, Label, Button, Container, Heading, Text, Flex, Box } from 'theme-ui'
import { NextPage } from 'next'
import FadeSpinner from '../../components/FadeSpinner'
import { getAllGFQuizzesWithSlug, getGFQuizWithSlug } from '../../utils/api'
import withAuthRedirect from '../../utils/withAuthRedirect' 

type possibleResponds = {
  choiceText: string
}[]

type item = {
  id: string
  question: string
  picture: {
    responsiveImage: any
  }
  possibleResponds: possibleResponds
  _modelApiKey: string
}

type items = item | any

interface Props {
  quiz: {
    id: string
    slug: string
    title: string
    items: items[]
  }
}

type FormData = any

interface PossibelItemRespondsProps {
  possibleResponds: possibleResponds
  name: string
  register: any
}

const QuizRadio = ({possibleResponds, name, register}: PossibelItemRespondsProps) => (
  <Fragment>
    {possibleResponds.map((choice, index) => (
      <Label key={index} sx={{mb: 2, fontWeight: 'body'}}>
        <Radio
          ref={register}
          name={name}
          value={choice.choiceText}
          />
        { choice.choiceText }
      </Label>
    ))}
  </Fragment>
)

const QuizCheckbox = ({possibleResponds, name, register}: PossibelItemRespondsProps) => (
  <Fragment>
    {possibleResponds.map((choice, index) => (
      <Label key={index} sx={{mb: 2, fontWeight: 'body'}}>
        <Checkbox
          ref={register}
          name={name}
          value="false"
          />
        { choice.choiceText }
      </Label>
    ))}
  </Fragment>
)

const KvizPage: NextPage<Props> = ({quiz}) => {
  const [canSubmit, setCanSubmit] = useState(false)
  const { register, control, handleSubmit } = useForm<FormData>()
  return (
  <StarterLayout>
    <Container>
      <Heading sx={{fontSize: 7, mt: 4, mb: 5, textAlign: 'center'}}>
        { quiz?.title }
      </Heading>
      <Container variant="quiz">
        <form>
          {
            quiz?.items.map((item, index) => {
              let inputContent
              switch (item._modelApiKey) {
                case 'singleselect':
                  inputContent = <QuizRadio register={register} name={item.id} possibleResponds={item.possibleResponds} />
                  break;
                case 'checkbox':
                  inputContent = <QuizCheckbox register={register} name={item.id} possibleResponds={item.possibleResponds} />
                  break;
                default:
                  break;
              }
              
              return (
                <Box key={index} sx={{mb: 5}}>
                  <Flex>
                    <Box sx={{flexBasis: '48px'}}>
                      <Text sx={{fontSize: 3}}>{ index + 1 }.</Text>
                    </Box>
                    <Box>
                      <Heading sx={{fontWeight: 'regular', mb: 3}}>{item.question}</Heading>
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
                      </Box>
                  </Flex>
                </Box>
              )

            })
          }
          <Box sx={{
              borderTop: '1px solid #ddd',
              px: 20,
              pt: 3,
              pb: 3,
              alignItems: 'center'
            }}>
            <Box>
              <Heading sx={{mb: 3}}>
                Odevzdání
              </Heading>
              <Label sx={{mb: 3, fontWeight: 'body'}}>
                <Checkbox
                  sx={{mr: 4}}
                  ref={register}
                  name="consent"
                  onChange={(event) => {
                    const target = event.target
                    setCanSubmit(target.checked)
                  }}
                  value="true"
                  />
                  <Text>
                    Souhlasím s lorem impusm dolor sit amet s lorem impusm dolor sit amet s lorem impusm dolor sit amet s lorem impusm dolor sit amet
                  </Text>
              </Label>
            </Box>
            <Box>
              <Button
                type="submit"
                disabled={
                  !canSubmit
                }
                sx={{
                  bg: !canSubmit ? 'gray!important' : 'primary',
                  transition: 'background .2s',
                }}
                onClick={handleSubmit((data: FormData) => {
                  console.log(data)
                })}
                title="Odevzdat">Odevzdat</Button>
            </Box>
          </Box>
        </form>
      </Container>
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