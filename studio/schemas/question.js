import {MdChatBubble, MdComment} from 'react-icons/md'

export default {
  name: 'question',
  title: 'Question',
  type: 'document',
  icon: MdChatBubble,
  fields: [
    {
      name: 'question',
      title: 'Question Title',
      type: 'string',
    },
    {
      name: 'questionDetail', 
      Title: 'Queston Detail',
      type: 'array', 
      of: [{type: 'block'}]
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'question',
        maxLength: 100,
      }
    },
    {
      title: 'Choosing one correct answer',
      name: 'singleSelectAnswers',
      type: 'array',
      of: [
        {
          type: 'singleSelectAnswer',
        }
      ]
    },
    {
      title: 'Choosing more correct answers',
      name: 'multipleChoiceAnswers',
      type: 'array',
      of: [
        {
          type: 'multipleChoiceAnswer',
        }
      ]
    },
    {
      title: 'Topics',
      name: 'topics',
      type: 'array',
      of: [{
        type: 'reference',
        to: [
          {type: 'topic'}
        ]
      }]
    },
    {
      title: 'Author',
      name: 'author',
      type: 'reference',
      validation: Rule => Rule.required(),
      to: [{type: 'author'}]
    }
  ],
  preview: {
    select: {
      title: 'question',
      media: 'Icon',
    },
    prepare(selection) {
      return {
        title: selection.title,
        media: selection.media,
      }
    },
  },
}

