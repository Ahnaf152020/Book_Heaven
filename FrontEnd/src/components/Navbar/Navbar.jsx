import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons from react-icons
import logo from '../../assets/logo.png'; // Adjust path as necessary

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="bg-zinc-800 text-white px-4 py-2 lg:px-8 lg:py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-8 lg:h-10 mr-2 lg:mr-4" />
          <h1 className="text-lg lg:text-2xl font-semibold">BookHeaven</h1>
        </Link>
      </div>
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`fixed inset-0 bg-zinc-800 bg-opacity-95 flex flex-col items-center justify-center space-y-6 lg:static lg:bg-transparent lg:flex lg:flex-row lg:space-y-0 lg:space-x-6 lg:items-center ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="absolute top-4 right-4 lg:hidden">
          <button onClick={toggleMenu} className="text-2xl text-white">
            <FaTimes />
          </button>
        </div>
        {links.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="hover:text-blue-500 transition-all duration-300 text-lg"
            onClick={toggleMenu} // Close menu when a link is clicked
          >
            {item.title}
          </Link>
        ))}
        <div className="flex gap-4 mt-4 lg:mt-0">
          <Link to="/login">
            <button className="px-4 py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 text-lg">
              LogIn
            </button>
          </Link>
          <Link to="/sign-up">
            <button className="px-4 py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300 text-lg">
              SignUp
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
