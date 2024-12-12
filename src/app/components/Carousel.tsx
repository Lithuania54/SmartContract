import React from 'react';

interface CarouselProps {
  comicTitle: string;
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ comicTitle, images }) => {
  return (
    <div>
      <h1>{comicTitle}</h1>
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`${comicTitle} Page ${index + 1}`} />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
