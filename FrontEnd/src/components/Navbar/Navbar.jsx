import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Corrected path

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];

  return (
    <div className="bg-zinc-800 text-white px-8 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-10 mr-4" />
        <h1 className="text-2xl font-semibold">BookHeaven</h1>
      </div>
      <div className="nav-links-bookheaven flex items-center gap-4 ">
        <div className='flex gap-4'>
            {links.map((item, index) => (
          <Link key={index} to={item.link} className="hover:text-blue-500 transition-all duration-300">
            {item.title}
          </Link>
        ))}</div>
        <div className='flex gap-4'>
            <button className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>LogIn</button>
            <button className='px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>SignUp</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
