
  // Subtopic.jsx

import React, { useEffect, useState } from 'react';
import { client } from '../services/sanityService';
import { Link, useParams } from 'react-router-dom';


function SubTopic() {
  const [posts, setPosts] = useState([]);
  const { subTopicId } = useParams();
  useEffect(() => {
    const query = '*[_type == "post"]'; // Define your Sanity query

    client.fetch(query).then((data) => {
      console.log('Fetched data:', data); // Print the fetched data in the console
      setPosts(data); // Set state with the fetched data
    });
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">Subtopic Page</h1>
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="border p-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-2">{new Date(post.date).toDateString()}</p>
            <div className="prose">{/* Render post content here */}</div>
            <div className="flex justify-end mt-4">
            <Link to={`/post/${post._id}`} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Read More
            </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}





export default SubTopic