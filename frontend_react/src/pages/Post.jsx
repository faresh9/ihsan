import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../services/sanityService';
import {PortableText} from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'
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

  const SampleImageComponent = ({value, isInline}) => {
    const {width, height} = getImageDimensions(value)
    return (
      <img
        src={urlBuilder(client)
          .image(value)
          // .width(isInline ? 100 : 800)
           .fit('max')
           .auto('format')
          .url()}
        alt={value.alt || ' '}
        loading="lazy"
        style={{
          // Display alongside text if image appears inside a block text span
          display: isInline ? 'inline-block' : 'block',
  
          // Avoid jumping around with aspect-ratio CSS property
          //aspectRatio: width / height,
        }}
      />
    )
  }
  const ptComponents= {
    types:{
      image: SampleImageComponent,
      },
    
    marks: {
      // Ex. 1: custom renderer for the em / italics decorator
      em: ({children}) => <em className='text-red-900'>{children}</em>,
      
    },

    block:{
      h1: ({children}) => <h1 className="text-2xl text-green-700">{children}</h1>,
      h2: ({children}) => <h2></h2>
      h3: ({children}) => <h3></h3>
      h4: ({children}) => <h4></h4>
      h5: ({children}) => <h5></h5>
      h6: ({children}) => <h6></h6>
    },

    list: {
      // Ex. 1: customizing common list types
      bullet: ({children}) => <ul className="mt-xl">{children}</ul>,
      number: ({children}) => <ol className="mt-lg">{children}</ol>,
    },

    listItem: {
      // Ex. 1: customizing common list types
      bullet: ({children}) => <li style={{listStyleType: 'disclosure-closed'}}>{children}</li>,
      number: ({children}) => <li style={{listStyleType: 'number'}}>{children}</li>,
    },
  }


  
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{post.title}</h1>
      <p className="text-white mb-2">{new Date(post.date).toDateString()}</p>
      <div className="prose text-gray-50">

      <PortableText
  value={post.content}
  components={ptComponents}
/>

    
        
      </div>
    </div>
  );
}

export default Post;
