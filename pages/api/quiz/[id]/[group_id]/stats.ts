import { query as q } from 'faunadb'
import { NextApiRequest, NextApiResponse } from 'next'
import auth0 from 'lib/auth0'
import { serverClient } from 'utils/fauna-auth'

export type QuestionChoice = {
  question: string
  feedbackResponses: {
      choiceText: string
      sentiment: 'positive' | 'negative' | 'neutral'
      feedback: string
      chosen: boolean
  }[]
  correct: boolean
  submission: {
      id: string
  }
  quiz_id: string
  user: {
      id: string
  }
  responses: string[]
  response: string
  id: string
  type: 'checkbox' | 'singleselect'
  required: boolean
}

export type Question = {
  id: string
  question: string
  type: 'checkbox' | 'singleselect'
  required: boolean
  choices: {[key: string]: number}
}

export type Response = {
  submissions?: {
    submission_id: string
    student_id: string
  }[]
  questions?: Question[]
  students?: {[key: string]: {
    name: string
    picture: string
    auth0_id: string
    is_teacher: boolean
  }}
  message?: string
}

interface FaunaData {
    feedback: {
      question_id: string
      feedback_list: {
        ref: {
            id: string
        }
        ts: number
        data: {
          question: string
          feedbackResponses: {
              choiceText: string
              sentiment: 'positive' | 'negative' | 'neutral'
              feedback: string
              chosen: boolean
          }[]
          correct: boolean
          submission: {
              id: string
          }
          quiz_id: string
          user: {
              id: string
          }
          responses: string[]
          response: string
          id: string
          type: 'checkbox' | 'singleselect'
          required: boolean
        }
      }[]
    }[]
    submissions: null | {
        submission_ref: {
            id: string
        },
        student: {
          id: string
        }
    }[]
    students: {
      ref: {
        id: string
      },
      ts: number
      data: {
        name: string
        picture: string
        auth0_id: string
        is_teacher: boolean
        group: {
          id: string
        }
      }
    }[]
}

interface FaunaError {
  description: string
}

export default auth0.requireAuthentication(async function joinGroupAttempt(req: NextApiRequest, res: NextApiResponse<Response>) {
  const {query: {id, group_id}, method} = req
  const { user } = await auth0.getSession(req)
  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${method} Not Allowed`})
  }
  if (id == null || id == '' || isNaN(Number(id))) {
    res.status(400).json({message: 'Id není číslo.'})
  }
  if (group_id == null || group_id == '' || isNaN(Number(group_id))) {
    res.status(400).json({message: 'group_id není číslo.'})
  }
  try {
    const response: FaunaData = await serverClient.query(
      q.Call(q.Function("group_quiz_stats_best"), [
        user.sub,
        group_id,
        id
      ])
    )
    const submissions = response.submissions.reduce(
      (filtered, current) => {
        if (current != null) {
          filtered.push(
            {
              submission_id: current.submission_ref.id,
              student_id: current.student.id
            }
          )
        }
        return filtered
      }, [])
    
    const questions = response.feedback.reduce((current, next) => {
      const item = {
        id: next.question_id,
        required: next.feedback_list[0].data.required,
        question: next.feedback_list[0].data.question,
        type: next.feedback_list[0].data.type,
        choices: {}
        // students: {
        //   correct: [],
        //   incorrect: []
        // }
      }
      next.feedback_list.forEach(feedbackItem => {
        if (feedbackItem !== null) {
          feedbackItem.data.feedbackResponses.forEach(feedbackResponse => {
            const chosen = feedbackResponse.chosen ? 1 : 0
            if (feedbackResponse.choiceText in item.choices && chosen == 1) {
              item.choices[feedbackResponse.choiceText] += chosen
            } else {
              item.choices[feedbackResponse.choiceText] = chosen
            }
          })
        }
      })
      current.push(item)
      return current 
    }, [])

    const students = response.students.reduce((current, next) => {
      const student = {}
      student[next.ref.id] = {
        name: next.data.name,
        picture: next.data.picture,
        is_teacher: next.data.is_teacher
      }
      return { ...current, ...student};
    }, {})

    res.json({
      submissions: submissions,
      questions: questions,
      students: students
    })
    return
  } catch (error) {
    if (!error?.description) {
      res.status(400).json({message: error?.message})
    } else {
      res.status(400).json({message: error?.description})
    }
  }
})