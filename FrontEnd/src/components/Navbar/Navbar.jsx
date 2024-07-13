import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../assets/file.jpg';
import { AuthContext } from '../context/authcontext';

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "Member", link: "/member" },
    { title: "Borrow", link: "/borrow" },
    { title: "Profile", link: "/profile" },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex items-center justify-between px-4 py-2 text-white bg-[#800000] lg:px-8 lg:py-4">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="logo" className="h-8 mr-2 lg:h-10 lg:mr-4" />
          <h1 className="text-lg font-semibold lg:text-2xl">BookHeaven</h1>
        </Link>
      </div>
      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-2xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      <div className={`fixed inset-0 bg-[#800000] bg-opacity-95 flex flex-col items-center justify-center space-y-6 lg:static lg:bg-transparent lg:flex lg:flex-row lg:space-y-0 lg:space-x-6 lg:items-center ${menuOpen ? 'block' : 'hidden'}`}>
        <div className="absolute top-4 right-4 lg:hidden">
          <button onClick={toggleMenu} className="text-2xl text-white">
            <FaTimes />
          </button>
        </div>
        {links.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="text-lg transition-all duration-300 hover:text-yellow-500"
            onClick={toggleMenu}
          >
            {item.title}
          </Link>
        ))}
        <div className="flex gap-4 mt-4 lg:mt-0">
          {user ? (
            <button
              onClick={signOut}
              className="px-4 py-2 text-lg transition-all duration-300 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-[#800000]"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="px-4 py-2 text-lg transition-all duration-300 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-[#800000]">
                  LogIn
                </button>
              </Link>
              <Link to="/sign-up">
                <button className="px-4 py-2 text-lg transition-all duration-300 bg-yellow-500 rounded hover:bg-white hover:text-[#800000]">
                  SignUp
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
