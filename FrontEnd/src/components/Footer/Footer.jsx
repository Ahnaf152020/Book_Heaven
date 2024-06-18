import React from 'react';

const Footer = () => {
  return (
    <div className='bg-zinc-800 text-white px-4 py-8 md:px-8 md:py-12'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'>
        {/* ABOUT Section */}
        <div>
          <h2 className='text-xl font-semibold text-teal-400 mb-4'>ABOUT</h2>
          <ul>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-blue-500'>Contact us</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-blue-500'>About us</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-blue-500'>Careers</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-blue-500'>Gift Cards</a></li>
          </ul>
        </div>
        {/* HELP Section */}
        <div>
          <h2 className='text-xl font-semibold text-teal-400 mb-4'>HELP</h2>
          <ul>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-blue-500'>Payments</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-blue-500'>Shipping</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-blue-500'>Cancellation & Returns</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-blue-500'>FAQs</a></li>
          </ul>
        </div>
        {/* SOCIALS Section */}
        <div>
          <h2 className='text-xl font-semibold text-teal-400 mb-4'>SOCIALS</h2>
          <ul>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-blue-500'>Linkedin</a></li>
            <li className='mb-2'><a href='https://github.com/Ahnaf152020/Book_Heaven' className='transition-colors duration-300 hover:text-blue-500'>Github</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-blue-500'>Twitter</a></li>
            <li className='mb-2'><a href='#' className='transition-colors duration-300 hover:text-blue-500'>Instagram</a></li>
          </ul>
        </div>
      </div>
      <h1 className='text-lg md:text-2xl font-semibold text-center mt-8'>
        &copy; 2024 BookHeaven. All rights reserved.
      </h1>
    </div>
  );
};

export default Footer;
