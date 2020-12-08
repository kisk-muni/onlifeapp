import {MdComment} from 'react-icons/md'

export default {
  type: 'object',
  name: 'multipleChoiceAnswer',
  title: 'Choice',
  icon: MdComment,
  fields: [
    {
      name: 'choice',
      title: 'Choice',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      title: 'Choice detail', 
      name: 'choiceDetail',
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
      title: 'choice',
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
