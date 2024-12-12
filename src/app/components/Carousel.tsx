'use client';

import React from 'react';
import Script from 'next/script';
import { useRouter } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

interface CarouselProps {
  comicTitle: string;
  images: string[];
  onNavigateToComic: (comicId: number) => void;
}

const Carousel: React.FC<CarouselProps> = ({ comicTitle, images, onNavigateToComic }) => {
  const router = useRouter(); // Use Next.js router for navigation

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <header className="p-5 flex items-center">
  <h1 className="text-3xl font-bold flex-grow text-center">{comicTitle}</h1>

</header>

        <main className="flex items-center justify-center p-10">
          <div id="comicCarousel" className="carousel slide w-3/4" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {images.map((_, index) => (
                <button
                  type="button"
                  data-bs-target="#comicCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? 'active' : ''}
                  aria-current={index === 0 ? 'true' : undefined}
                  aria-label={`Slide ${index + 1}`}
                  key={index}
                />
              ))}
            </div>
            <div className="carousel-inner">
              {images.map((image, index) => (
                <div
                  className={`carousel-item ${index === 0 ? 'active' : ''}`}
                  key={index}
                >
                  <img
                    src={image}
                    className="d-block mx-auto rounded-lg shadow-lg"
                    alt={`Page ${index + 1}`}
                    style={{ width: '500px', height: '700px', objectFit: 'cover' }} // Updated size
                  />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#comicCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#comicCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </main>
        <div className="flex justify-center">
  <button
    onClick={() => router.push('/')}
    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition text-center"
  >
    Return to Comics Page
  </button>
</div>

        <footer className="text-center text-gray-400 py-5">
          <p>&copy; 2024 ComicCom</p>
        </footer>
      </div>
    </>
  );
};

export default Carousel;
