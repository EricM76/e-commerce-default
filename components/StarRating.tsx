import React from 'react';
import StarIcon from './icons/StarIcon';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`h-5 w-5 flex-shrink-0 ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
};

export default StarRating;
