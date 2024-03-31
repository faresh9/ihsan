// schemas/post.js
export default {
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
      {
        name: 'title',
        title: 'Title',
        type: 'string',
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          {
             type: 'block' ,
             of: [{ type: 'image' }]
            }
        ],
      },
      {
        name: 'date',
        title: 'Date',
        type: 'datetime',
      },
      
      {
        name: 'topics',
        title: 'Topics',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'topic' }] }],
      },
      {
        name: 'images',
        title: 'Images',
        type: 'array',
        of: [{ type: 'image' }],
      },
    ],
  };