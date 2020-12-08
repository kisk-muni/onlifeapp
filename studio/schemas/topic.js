import {MdClass as icon} from 'react-icons/md'

export default {
  name: 'topic',
  title: 'Topic',
  type: 'document',
  icon,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 100,
      },
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image'
    },
    {
      title: 'Children',
      name: 'children',
      type: 'array',
      of: [{
        type: 'reference',
        to: [
          {type: 'topic'}
        ]
      }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'Icon',
    },
    prepare(selection) {
      return {
        title: `${selection.title}`,
        media: selection.media,
      }
    },
  },
}

