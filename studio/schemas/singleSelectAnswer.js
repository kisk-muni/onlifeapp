import {MdComment} from 'react-icons/md'

export default {
  type: 'object',
  name: 'singleSelectAnswer',
  title: 'Answer',
  icon: MdComment,
  fields: [
    {
      name: 'answer',
      title: 'Answer',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'AnswerDetail', 
      name: 'answerDetail',
      type: 'array', 
      of: [{type: 'block'}]
    },
    {
      name: 'correctFeedback',
      title: 'Correct feedback',
      type: 'text',
    },
    {
      name: 'incorrectFeedback',
      title: 'Incorrect feedback',
      type: 'text',
    },
    {
      title: 'Feedback detail', 
      name: 'feedbackDetail',
      type: 'array', 
      of: [{type: 'block'}]
    },
    {
      title: 'Is Correct',
      name: 'isCorrect',
      type: 'boolean',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'answer',
      isCorrect: 'isCorrect'
    },
    prepare(selection) {
      const {title, isCorrect} = selection
      const correctOrNot = isCorrect ? '✅' : '❌'
      return {
        title: correctOrNot+' '+title,
      }
    }
  }
}
