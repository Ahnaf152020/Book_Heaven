import React from 'react';
import ModalImage from 'react-modal-image';
import AhnafImage from '../assets/Ahnaf.JPG'; // Import the image for Ahnaf
import KhalidImage from '../assets/khalidratin.jpg'; // Import the image for Khalid

const AboutUs = () => {
  return (
    <div className="min-h-screen text-black bg-white">
      <div className="container px-4 py-8 mx-auto">
        <h1 className="mb-6 text-4xl font-bold text-center text-blue-600">About Us</h1>
        <p className="mb-4 text-lg">
          Welcome to BookHeaven, a library management web app created with the MERN stack.
          This is a project of CSE-2200 Sd Lab of  Ahsanullah University of Science and Technology.
        </p>
        <p className="mb-4 text-lg">
          Our mission is to create a library management system with a wide range of book categories,
          where readers can borrow, return, and search for books conveniently.
        </p>
        <p className="mb-4 text-lg">
          At BookHeaven, we are committed to offering excellent online library services and
          ensuring that our readers have a seamless and delightful reading experience.
        </p>
        <p className="mb-4 text-lg">
          Thank you for choosing BookHeaven. Happy reading!
        </p>

        <h2 className="mt-8 mb-4 text-3xl font-semibold text-center text-blue-800">Meet the Team: "The Dev Rangers "</h2>
        <div className="flex flex-col items-center">
          <div className="flex items-center w-full p-6 mb-6 text-white bg-[#800000] rounded-lg shadow-md md:w-1/2">
            <ModalImage
              small={AhnafImage}
              large={AhnafImage}
              alt="Ahnaf Amer"
              className="w-20 h-20 mr-4 rounded-full cursor-pointer"
            />
            <div>
              <h3 className="text-2xl font-bold">Ahnaf Amer</h3>
              <p className="text-gray-100">ID: 20220104040</p>
            </div>
          </div>
          <div className="flex items-center w-full p-6 text-white bg-[#800000] rounded-lg shadow-md md:w-1/2">
            <ModalImage
              small={KhalidImage}
              large={KhalidImage}
              alt="Khalid Ratin"
              className="w-20 h-20 mr-4 rounded-full cursor-pointer"
            />
            <div>
              <h3 className="text-2xl font-bold">Khalid Ratin</h3>
              <p className="text-gray-100">ID: 20220104027</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
