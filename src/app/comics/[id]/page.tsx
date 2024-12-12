'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Carousel from '../../components/Carousel';

const ComicPages: React.FC = () => {
  const { id } = useParams();

  interface Comic {
    title: string;
    images: string[];
  }
  
  const comicData: Record<number, Comic> = {
    0: {
      title: 'The Invincible Iron Man',
      images: ['/ironman1.jpg', '/ironman2.jpg', '/ironman3.jpg'],
    },
    1: {
      title: 'Astonishing Spider-Man',
      images: ['/spiderman1.jpg', '/spiderman2.jpg', '/spiderman3.jpg'],
    },
    2: {
      title: 'The Tick Invincible',
      images: ['/tick1.jpg', '/tick2.jpg', '/tick3.jpg'],
    },
    3: {
      title: 'Batman Superman Worlds Finest',
      images: ['/batman1.jpg', '/batman2.jpg', '/batman3.jpg'],
    },
    4: {
      title: 'West Coast Avengers',
      images: ['/avengers1.jpg', '/avengers2.jpg', '/avengers3.jpg'],
    },
  };
  

  const comic = comicData[parseInt(id as string)];

  if (!comic) {
    return <p className="text-center text-red-500">Comic not found!</p>;
  }

  return <Carousel comicTitle={comic.title} images={comic.images} />;
};

export default ComicPages;
