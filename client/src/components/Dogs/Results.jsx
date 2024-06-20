import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Card from './Card.jsx';

// RESULTS COMPONENT - child of SEARCH component and displays search results
const Results = ({ searchResults, setFrom, handleSearch, setSearchResults, setMatch }) => {

  // states for dog results, favoriting, and url
  const [dogDetails, setDogDetails] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // axios request to get dog data from array of IDs
  const fetchDogDetails = async (resultIds) => {
    try {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/dogs',
        resultIds,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching dog details:', error);
    }
  };

  // handles dog search by calling fetchDogDetails function and setting dogDetails state
  const handleDogSearch = async (resultIds) => {
    const dogData = await fetchDogDetails(resultIds);
    setDogDetails(dogData);
  };

  // axios request for updating the page data when next and previous buttons are used
  const fetchPageData = async (url) => {
    try {
      const response = await axios.get(`https://frontend-take-home-service.fetch.com/dogs/search${url}`, {
        withCredentials: true,
      });
      handleDogSearch(response.data.resultIds);
      setSearchResults(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching page data:', error);
    }
  };

  // axios request to generate match based on favorited dogs
  const handleGenerateMatch = async () => {
    try {
      const response = await axios.post(
        'https://frontend-take-home-service.fetch.com/dogs/match',
        favorites,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const match = await fetchDogDetails([response.data.match]);
      setMatch(match);
    } catch (error) {
      console.error('Error generating match:', error);
    }
  };

  // handles pagination with next and prev buttons
  const handleNextPage = async () => {
    if (searchResults.next) {
      const nextData = await fetchPageData(searchResults.next.substring(12));
      setCurrentPageUrl(searchResults.next);
      navigate(`${searchResults.next}`, { replace: true });
      setFrom((prevNumber) => prevNumber + 25);
      window.scrollTo(0, 0); // Scroll to top
    }
  };
  const handlePreviousPage = async () => {
    if (searchResults.prev) {
      const prevData = await fetchPageData(searchResults.prev.substring(12));
      setCurrentPageUrl(searchResults.prev);
      navigate(`${searchResults.prev}`, { replace: true });
      setFrom((prevNumber) => prevNumber - 25);
      window.scrollTo(0, 0); // Scroll to top
    }
  };

  // get new dog details when search results change
  useEffect(() => {
    if (searchResults && searchResults.resultIds) {
      handleDogSearch(searchResults.resultIds);
      setCurrentPageUrl(location.search);
    }
  }, [searchResults]);

  // get new page data when the URL changes
  useEffect(() => {
    if (location.search && location.search !== currentPageUrl) {
      fetchPageData(location.search);
      setCurrentPageUrl(location.search);
    }
  }, [location.search]);

  // updates favorites state when dog is favorited or unfavorited
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id) ? prevFavorites.filter(favId => favId !== id) : [...prevFavorites, id]
    );
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'left', marginLeft: '1.5rem' }}>
        <h2 className="text-xl font-bold mb-0">Results</h2>
      </div>
      {/*Maps all dogs using Card component*/}
      <div>
        {dogDetails.map((item, index) => (
          <Card
            key={index}
            dog={item}
            toggleFavorite={() => toggleFavorite(item.id)}
            isFavorite={favorites.includes(item.id)}
          />
        ))}
      </div>
      {/*Prev, Next, & Generate Match buttons*/}
      <div style={{ marginLeft: '1.5rem', marginTop: '20px', display: 'flex', alignItems: 'center' }}>
        <div className="pagination">
          <button
            onClick={handlePreviousPage}
            disabled={!searchResults.prev}
            className="btn btn-primary"
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={!searchResults.next}
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
        <div className="match" style={{ marginLeft: '490px' }}>
          <button
            onClick={handleGenerateMatch}
            disabled={favorites.length === 0}
            className="btn btn-primary"
          >
            Generate Match
          </button>
        </div>
      </div>
    </>
  );
};

export default Results;