
type SubmittedItem = {
  fieldName: string
  response: string
  responses: string[]
}

type Item = {
  id: string
  question: string
  required: boolean
  discarded: boolean
  possibleResponds: {
    choiceText: string
  	isCorrect: boolean
    correctFeedback: string
    incorrectFeedback: string
  }[]
  _modelApiKey: 'checkbox' | 'singleselect'
}

interface FeedbackItem {
  _modelApiKey: string
  id: string
  question: string
  required: boolean
  response: string
  responses: string[]
  correct: boolean
  feedbackResponses: {
    choiceText: string
  	sentiment: 'positive' | 'negative' | 'neutral'
    feedback: string
  }[]
}

export default function getFeedbackItem(item: Item, submittedItem: SubmittedItem): FeedbackItem {
  const feedbackItem: FeedbackItem  = {
    _modelApiKey: item._modelApiKey,
    id: item.id,
    question: item.question,
    required: item.required,
    response: '',
    responses: [],
    correct: false,
    feedbackResponses: []
  }
  switch (item._modelApiKey) {
    case 'singleselect':
      setSingleselectFeedbackItem(item, submittedItem, feedbackItem)
      break
    case 'checkbox':
      setCheckboxFeedbackItem(item, submittedItem, feedbackItem)
      break
    default:
      break
  }
  return feedbackItem
}

function setSingleselectFeedbackItem(item: Item, submittedItem: SubmittedItem, feedbackItem: FeedbackItem) {
  if (item.required && !submittedItem.response) {
    throw new Error('Singleselect item is required but doesnt have response.')
  }
  let correspondingOriginal = item.possibleResponds.find(respond => {
      return respond.choiceText === submittedItem.response
    })
  feedbackItem.response = submittedItem.response
  if (!correspondingOriginal && submittedItem.response !== '' && item.required) {
    throw new Error('Item response doesnt have corresponding original answer.')
  }
  if (correspondingOriginal) {
    feedbackItem.correct = correspondingOriginal.isCorrect         
  }
  feedbackItem.feedbackResponses = item.possibleResponds.map(respond => {
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral'
    let feedback = ''
    let chosen = false
    // set feedback and its sentiment only for chosen response
    if (respond.choiceText === submittedItem.response) {
      chosen = true
      if (respond.isCorrect) {
        sentiment = 'positive'
        feedback = respond.correctFeedback
      } else {
        sentiment = 'negative'
        feedback = respond.incorrectFeedback
      }
    }
    // else: here we can ensure showing feedback if the answer is correct
    return {
      choiceText: respond.choiceText,
      sentiment: sentiment,
      feedback: feedback,
      chosen: chosen,
    }
  })
}

function setCheckboxFeedbackItem(item: Item, submittedItem: SubmittedItem, feedbackItem: FeedbackItem) {
  feedbackItem.feedbackResponses = item.possibleResponds.map(respond => {
    let sentiment: 'positive' | 'negative' | 'neutral' = 'neutral'
    let feedback = ''
    let chosen = false
    if (submittedItem.responses.includes(respond.choiceText)) {
      // user clicked respond
      chosen = true
      if (respond.isCorrect) {
        sentiment = 'positive'
        feedback = respond.correctFeedback
      } else {
        sentiment = 'negative'
        feedback = respond.incorrectFeedback
        feedbackItem.correct = false
      }
    } else {
      if (!respond.isCorrect) {
        sentiment = 'positive'
        feedback = respond.correctFeedback
      } else {
        sentiment = 'negative'
        feedback = respond.incorrectFeedback
      }
    }
    return {
      choiceText: respond.choiceText,
      sentiment: sentiment,
      feedback: feedback,
      chosen: chosen
    }
  })
}