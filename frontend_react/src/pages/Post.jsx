import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../services/sanityService';

function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    client
      .fetch(`*[_type == "post" && _id == $postId][0]`, { postId })
      .then((data) => {
        setPost(data);
        console.log('Fetched data:', data); // Print the fetched data in the console
      })
      .catch((error) => console.error('Error fetching post:', error));
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-2">{new Date(post.date).toDateString()}</p>
      <div className="prose">
        {post.content.map((block, index) => (
          <React.Fragment key={index}>
            {block._type === 'block' && (
              <p>{block.children.map((span, idx) => <span key={idx}>{span.text}</span>)}</p>
            )}
            {/* You can add additional handling for other block types if needed */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Post;
