import React from 'react';

const BuyNowButton = ({ onClick }) => {
  return (
    <button
      className="bg-orange-500 text-white font-bold px-6 py-3 rounded hover:bg-orange-600 w-full"
      onClick={onClick}
    >
      Buy Now
    </button>
  );
};

export default BuyNowButton;
