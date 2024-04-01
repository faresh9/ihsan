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
        name: 'imageUrl',
        title: 'svg',
        type: 'text', // Assuming the image is stored as a URL
      },
     
    ],
  };