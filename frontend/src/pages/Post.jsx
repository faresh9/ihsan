import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../services/sanityService';
import {PortableText} from '@portabletext/react'
import urlBuilder from '@sanity/image-url'
import {getImageDimensions} from '@sanity/asset-utils'
import Header from '../components/common/Header'
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
      className="block mx-auto mb-6 rounded-lg shadow-lg"
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
      // code: ({ children }) => (
      //   <pre className="bg-gray-900 p-4 rounded-lg overflow-auto text-gray-100">{children}</pre>
      // ),
      },
    
    marks: {
      // Ex. 1: custom renderer for the em / italics decorator
     em: ({ children }) => <em className="italic">{children}</em>,
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    // link: ({ children, mark }) => (
    //   <a
    //     href={mark.href}
    //     className="text-blue-500 hover:underline"
    //     target="_blank"
    //     rel="noopener noreferrer"
    //   >
    //     {children}
    //   </a>
    // ),
  //   code: ({children}) => <div className="mockup-code">
  //   <pre data-prefix="~"><code> {children} </code></pre>
  // </div>
    },

    block:{
      // Headings
    h1: ({ children }) => <h1 className="mb-4 text-3xl font-extrabold leading-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mb-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mb-2">{children}</h3>,
    h4: ({ children }) => <h4 className="text-xl font-bold mb-2">{children}</h4>,
    h5: ({ children }) => <h5 className="text-lg font-bold mb-2">{children}</h5>,
    h6: ({ children }) => <h6 className="text-base font-bold mb-1">{children}</h6>,
    // Paragraphs
    p: ({ children }) => <p className="mb-4">{children}</p>,
    // Blockquote
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 italic pl-4 py-2 mb-4">
        {children}
      </blockquote>
    ),
    },

    list: {
     // Unordered list
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
    // Ordered list
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
    // Add more list styles here if needed
    },

    listItem: {
      // List item for unordered list
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    // List item for ordered list
    number: ({ children }) => <li className="mb-2">{children}</li>,
    // Add more list item styles here if needed
    },
  }


  
  return (
    <>
    <div>
    <Header/>
    </div>
    
    <div className="container pt-8 pb-16 lg:pt-16 lg:pb-24  antialiased mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-inver">
      <div className='mb-8'>
      <h1 className="text-3xl font-bold mt-8 mb-4 text-white">{post.title}</h1>
      <p className="text-white mb-2">{new Date(post.date).toDateString()}</p>
      <div className="prose text-gray-50">
      </div>
      
      <PortableText
  value={post.content}
  components={ptComponents}
/>


    
        
      </div>
    </div>
    </>
  );
}

export default Post;
