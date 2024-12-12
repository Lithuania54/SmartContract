'use client';

import React from 'react';

interface CarouselProps {
  comicTitle: string;
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ comicTitle, images }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <header className="p-5">
        <h1 className="text-3xl font-bold text-center">{comicTitle}</h1>
      </header>
      <main className="flex items-center justify-center p-10">
        <div className="relative w-2/3">
          <div className="carousel">
            {images.map((image, index) => (
              <div key={index} className="carousel-item">
                <img
                  src={image}
                  alt={`Page ${index + 1}`}
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="text-center text-gray-400 py-5">
        <p>&copy; 2024 ComicCom</p>
      </footer>
    </div>
  );
};

export default Carousel;
