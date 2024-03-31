import React, { useEffect, useState } from 'react';
import { client } from '../services/sanityService';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/common/Header';
function Topic() {
  const [posts, setPosts] = useState([]);
  const { topicId } = useParams(); 

  useEffect(() => {
    const query = `*[_type == "post" && references($topicId)]`; 

    client.fetch(query, { topicId }).then((data) => {
      console.log('Fetched data:', data);
      setPosts(data);
    });
  }, [topicId]);

  return (
    <div className="container mx-auto">
      <Header/>
      <h1 className="text-3xl font-bold mt-8 mb-4 text-green-50">topic Page</h1>
      <div className="grid grid-cols-1 gap-6 text-gray-50">
        {posts.map((post) => (
          <div key={post._id} className="border p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-white mb-2">{new Date(post.date).toDateString()}</p>
            <div className="prose">{/* Render post content here */}</div>
            <div className="flex justify-end mt-4">
              {/* Link to the specific post using postId and topicId */}
              <Link to={`/Topic/${topicId}/post/${post._id}`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Topic;
