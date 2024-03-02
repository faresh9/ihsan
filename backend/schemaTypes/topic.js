// schemas/topic.js
export default {
    name: 'topic',
    title: 'Topic',
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
        name: 'subtopics',
        title: 'Subtopics',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'subtopic' }] }],
      },
    ],
  };