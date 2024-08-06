import React from 'react'; 
import logo from '../../assets/file.jpg';  
 
const Footer = () => { 
  return ( 
    <footer className="py-6 text-white bg-carrothead" style={{ backgroundColor: '#800000' }}> 
      <div className="container px-4 mx-auto"> 
        <div className="flex flex-wrap justify-between"> 
          <div className="w-full mb-4 md:w-1/3 md:mb-0"> 
            <div className="flex items-center mb-4"> 
              <img src={logo} alt="logo" className="h-8 mr-2" /> 
            </div> 
            <h2 className="mb-2 text-lg font-semibold">Book Heaven</h2> 
            <p className="text-sm"> 
              Welcome to BookHeaven, your go-to library management system. Explore a vast collection of books and manage your reading seamlessly. 
            </p> 
          </div> 
          <div className="w-full mb-4 md:w-1/3 md:mb-0"> 
            <h2 className="mb-2 text-lg font-semibold">Quick Links</h2> 
            <ul> 
              <li className="mb-2"> 
                <a href="/" className="hover:text-yellow-500">Home</a> 
              </li> 
               
              <li className="mb-2"> 
                <a href="/about-us" className="hover:text-yellow-500">About Us</a> 
              </li> 
              <li className="mb-2"> 
                <a href="/chart" className="hover:text-yellow-500">Chart</a> 
              </li> 
              <li className="mb-2"> 
                <a href="https://github.com/Ahnaf152020/Book_Heaven" className="hover:text-yellow-500">GitHub Repository</a> 
              </li> 
            </ul> 
          </div> 
          <div className="w-full md:w-1/3"> 
            <h2 className="mb-2 text-lg font-semibold">Contact Us</h2> 
            <form> 
              <input  
                type="text"  
                placeholder="Your Email"  
                className="w-full p-2 mb-2 text-black" 
              /> 
              <textarea  
                placeholder="Your Message"  
                className="w-full p-2 mb-2 text-black" 
              ></textarea> 
              <button  
                type="submit"  
                className="px-4 py-2 text-black bg-yellow-500 hover:bg-yellow-600" 
              > 
                Submit 
              </button> 
            </form> 
          </div> 
        </div> 
      </div> 
    </footer> 
  ); 
} 
 
export default Footer;