import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Results from './Results.jsx';

// SEARCH COMPONENT - displays search bar and handles searching
const Search = ({ setMatch }) => {

  // search criteria states
  const [searchResults, setSearchResults] = useState({});
  const [breeds, setBreeds] = useState([]);
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [zipCodes, setZipCodes] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [from, setFrom] = useState(0);
  const [sort, setSort] = useState('breed:asc');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // axios request to get dog breeds for drop down menu
  const getDogBreeds = async () => {
    try {
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds', {
        withCredentials: true,
      });
      setBreeds(response.data);
    } catch (error) {
      console.error('Error getting dog breeds:', error);
      throw error;
    }
  };

  // consolidates search criteria and performs axios get request for dog IDs matching parameters
  const handleSearch = async () => {
    try {
      const queryParameters = {
        breeds: selectedBreeds.length ? selectedBreeds : undefined,
        zipCodes: zipCodes ? zipCodes.split(',').map((zip) => zip.trim()) : undefined,
        ageMin: minAge || undefined,
        ageMax: maxAge || undefined,
        size: 25,
        from: from,
        sort: sort,
      };
      const response = await axios.get('https://frontend-take-home-service.fetch.com/dogs/search', {
        params: queryParameters,
        withCredentials: true,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching for dogs:', error);
    }
  };

  // handlers for input fields and dropdown menu
  const handleBreedChange = (breed) => {
    setSelectedBreeds((prevSelectedBreeds) => {
      if (prevSelectedBreeds.includes(breed)) {
        return prevSelectedBreeds.filter((selectedBreed) => selectedBreed !== breed);
      } else {
        return [...prevSelectedBreeds, breed];
      }
    });
  };
  const handleZipCodesChange = (event) => {
    setZipCodes(event.target.value);
  };
  const handleMinAgeChange = (event) => {
    setMinAge(event.target.value);
  };
  const handleMaxAgeChange = (event) => {
    setMaxAge(event.target.value);
  };
  const handleSortChange = (event) => {
    setSort(event.target.value);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // gets dog breeds upon load for dropdown menu
  useEffect(() => {
    getDogBreeds();
  }, []);

  // calls handlesearch upon change of url which will update search results
  useEffect(() => {
    handleSearch();
  }, [location.search]);

  // dropdown menu listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="join search-bar" style={{ marginBottom: '20px', marginLeft: '1.5rem' }}>
        {/*Dropdown Menu using react-select library*/}
        <div className="dropdown" ref={dropdownRef}>
          <button className="btn join-item dropdown-toggle" type="button" onClick={toggleDropdown}>
            {selectedBreeds.length > 0 ? `${selectedBreeds.length} Breeds Selected` : 'All Breeds'}
          </button>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {breeds.map((breed, index) => (
                <div key={index} className="dropdown-item">
                  <input
                    type="checkbox"
                    id={`breed-${index}`}
                    value={breed}
                    checked={selectedBreeds.includes(breed)}
                    onChange={() => handleBreedChange(breed)}
                  />
                  <label htmlFor={`breed-${index}`}>{breed}</label>
                </div>
              ))}
            </div>
          )}
        </div>
        {/*Zip Code Entry Field*/}
        <div>
          <input
            className="input input-bordered join-item"
            placeholder="Zip Codes"
            value={zipCodes}
            onChange={handleZipCodesChange}
          />
        </div>
        {/*Age Min Entry Field*/}
        <div>
          <input
            className="input input-bordered join-item"
            placeholder="Minimum Age"
            value={minAge}
            onChange={handleMinAgeChange}
          />
        </div>
        {/*Age Max Entry Field*/}
        <div>
          <input
            className="input input-bordered join-item"
            placeholder="Maximum Age"
            value={maxAge}
            onChange={handleMaxAgeChange}
          />
        </div>
        {/*Sort Dropdown*/}
        <div>
          <select className="select select-bordered join-item" value={sort} onChange={handleSortChange}>
            <option value="breed:asc">Breed (Asc)</option>
            <option value="breed:desc">Breed (Desc)</option>
            <option value="name:asc">Name (Asc)</option>
            <option value="name:desc">Name (Desc)</option>
            <option value="age:asc">Age (Asc)</option>
            <option value="age:desc">Age (Desc)</option>
          </select>
        </div>
        {/*Search Button*/}
        <div>
          <button className="btn join-item" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      <div>
        <Results handleSearch={handleSearch} searchResults={searchResults} setFrom={setFrom} setSearchResults={setSearchResults} setMatch={setMatch} />
      </div>
    </>
  );
};

export default Search;