import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../services/sanityService'; // Import the Sanity client
import '../../styles/card.scss';

export default function CardWithLink() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const query = '*[_type == "topic"]'; // Define your Sanity query

    client.fetch(query).then((data) => {
      console.log('Fetched data:', data); // Print the fetched data in the console
      setCards(data); // Set state with the fetched data
    });
  }, []);

  return (  
    <div className='card-with-link'>
      <div className="grid">
        {cards.map((card, index) => (
          <Link to={`/topic/${card._id}`} key={index}>
            <div className="card">
            <span className="icon" dangerouslySetInnerHTML={{ __html: card.imageUrl }} />
              <h4>{card.title}</h4>
              <p>{card.description}</p>
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
  );
}
