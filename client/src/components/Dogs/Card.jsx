import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

// CARD COMPONENT - used to display dog picture and information
const Card = ({ dog, toggleFavorite, isFavorite }) => {
  return (
    <div className="dog-listing relative">
      <img className="dog-image" src={dog.img} alt={dog.name} />
      <div className="p-4" style={{ paddingBottom: 0 }}>
        <li className="flex items-center">
          <h2 className="text-xl font-bold mb-0">{dog.name}</h2>
          <p className="text-sm font-bold ml-2 mb-0">({dog.breed})</p>
        </li>
        <p className="text-sm mb-0">Age: {dog.age}</p>
        <p className="text-sm mb-0">Zip Code: {dog.zip_code}</p>
        <FontAwesomeIcon
          icon={isFavorite ? solidHeart : regularHeart}
          className="heart-icon absolute top-2 right-2 text-red-500 cursor-pointer"
          onClick={() => toggleFavorite(dog.id)}
        />
      </div>
    </div>
  );
};

export default Card;