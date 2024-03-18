import React, { useState, useEffect } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { client } from '../services/sanityService'; // Import the Sanity client

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
    <>
      {cards.map((card, index) => (
        <Card key={index} className="mt-6 w-96 bg-dark-mode">
          <CardBody>
            {/* Render the card title, image, and description dynamically */}
            <Typography variant="h5" color="white" className="mb-2">
              {card.title}
            </Typography>
            <img src={card.imageUrl} alt={card.title} className="mb-4 h-12 w-12 text-gray-200" />
            <Typography className='text-light-green-50'>
              {card.description}
            </Typography>
          </CardBody>
          <CardFooter className="pt-0">
            <Link to="/SubTopic" className="inline-block">
              <Button size="sm" variant="text" className="flex items-center gap-2 text-green-50">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
