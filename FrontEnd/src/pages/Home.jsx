import React, { useEffect } from 'react'
import Hero from '../components/Home/Hero';

const Home = () => {
  useEffect(()=> {
    window.scrollTo(0,0);
  },[]);
  
  return (
     <div className='px-10 py-8 text-white bg-zinc-900'>
    <Hero />
  </div>
  );
};

export default Home