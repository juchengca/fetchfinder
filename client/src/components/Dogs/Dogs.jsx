import React, { useState } from 'react';
import Search from './Search.jsx';
import Match from './Match.jsx';

// MAIN SITE COMPONENT - shows search bar, results, and match pages
const Dogs = () => {

  // if match found, Match component will replace search component
  const [match, setMatch] = useState(false);

  return (
    <div>
      {/*If there is a match, show Match page. Otherwise, show Search page*/}
      {!match && <Search setMatch={setMatch} />}
      {match && <Match dog={match} />}
    </div>
  );
};

export default Dogs;