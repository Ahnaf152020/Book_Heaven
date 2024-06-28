import React, { useState } from 'react';

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    event.preventDefault();
   
  };

  return (
    <div className='flex flex-col'>
      {}
    </div>
  );
};

export default Hero;
