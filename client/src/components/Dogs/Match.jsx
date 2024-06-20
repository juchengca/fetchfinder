import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog, faBone, faPaw } from '@fortawesome/free-solid-svg-icons';
import Card from './Card.jsx';

// MATCH COMPONENT - displays dog match upon generation of match
const Match = ({ dog }) => {

  dog = dog[0];
  const navigate = useNavigate();

  // reloads the page and resets all the search criteria and match
  const handleResetMatch = () => {
    navigate('/dogs/search', { replace: true });
    window.location.reload();
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: '1.5rem' }}>
        <FontAwesomeIcon icon={faBone} style={{ marginRight: '8px' }} />
        <h2 className="text-xl font-bold mb-0">You've Matched!</h2>
        <FontAwesomeIcon icon={faBone} style={{ marginLeft: '8px' }} />
      </div>
      {/*Dog Card showing match dog info*/}
      <div>
        <div className="dog-listing relative">
          <img className="dog-image" src={dog.img} alt={dog.name} />
          <div className="p-4" style={{ paddingBottom: 0 }}>
            <li className="flex items-center">
              <h2 className="text-xl font-bold mb-0">{dog.name}</h2>
              <p className="text-sm font-bold ml-2 mb-0">({dog.breed})</p>
            </li>
            <p className="text-sm mb-0">Age: {dog.age}</p>
            <p className="text-sm mb-0">Zip Code: {dog.zip_code}</p>
          </div>
        </div>
      </div>
      <div style={{ marginLeft: '1.5rem', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
        {/*Reset Match button*/}
        <div className="reset">
          <button
            className="btn btn-primary"
            onClick={handleResetMatch}>
            Reset Match
          </button>
        </div>
      </div>
    </>
  );
};

export default Match;