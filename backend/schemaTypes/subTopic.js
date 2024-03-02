// schemas/subTopic.js
export default {
    name: 'subtopic',
    title: 'Subtopic',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'posts',
        title: 'Posts',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'post' }] }],
      },
      {
        name: 'parentTopic',
        title: 'Parent Topic',
        type: 'reference',
        to: [{ type: 'topic' }],
      },
    ],
  };