import React from 'react';
import { Review } from '../types';
import StarRating from './StarRating';

interface CustomerReviewsProps {
  reviews: Review[];
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews }) => {
  return (
    <div className="border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h2>
      {reviews.length === 0 ? (
        <p className="mt-4 text-gray-500">No reviews yet for this product.</p>
      ) : (
        <div className="mt-6 space-y-10">
          {reviews.map(review => (
            <div key={review.id} className="flex flex-col sm:flex-row gap-4">
              <div className="mt-0.5 flex items-center">
                 <StarRating rating={review.rating} />
              </div>
              <div className="sm:ml-4">
                <p className="text-sm font-medium text-gray-900">{review.author} - <span className="text-gray-500 font-normal">{new Date(review.date).toLocaleDateString()}</span></p>
                <div className="mt-2 space-y-2 text-base text-gray-600">
                  <p>{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
