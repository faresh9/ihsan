import React, { useEffect, useState } from 'react';
import { client } from '../services/sanityService';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import '../../styles/card.scss'
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
    <>
    <div>
      <Header/>
    </div>
    <h1 className="text-3xl font-bold mt-8 mb-4 text-green-50">topic Page</h1>

    <div className="card-with-link">
    <div className='grid'>
        {posts.map((post) => (
          <Link to={`/Topic/${topicId}/post/${post._id}`}>
            
            <div key={post._id} className="card">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="text-white mb-2">{new Date(post.date).toDateString()}</p>
            <span className="icon" dangerouslySetInnerHTML={{ __html: post.icon }} />
            <div className="shine"></div>
              <div className="background">
                <div className="tiles">
                  <div className="tile tile-1"></div>
                  <div className="tile tile-2"></div>
                  <div className="tile tile-3"></div>
                  <div className="tile tile-4"></div>

                  <div className="tile tile-5"></div>
                  <div className="tile tile-6"></div>
                  <div className="tile tile-7"></div>
                  <div className="tile tile-8"></div>

                  <div className="tile tile-9"></div>
                  <div className="tile tile-10"></div>
                </div>

                <div className="line line-1"></div>
                <div className="line line-2"></div>
                <div className="line line-3"></div>
            </div>
          </div>
          
          </Link>
         
        ))}
      </div>
    </div>
    </>
  );
}

export default Topic;
