import React from 'react';
import ModalImage from 'react-modal-image';
import AhnafImage from '../assets/Ahnaf.JPG'; // Import the image for Ahnaf
import KhalidImage from '../assets/khalidratin.jpg'; // Import the image for Khalid
import image3 from '../assets/image3.jpg'; // Import the background image

const AboutUs = () => {
  const containerStyle = {
    backgroundImage: `url(${image3})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    color: 'white',
  };

  return (
    <div style={containerStyle}>
      <div className="min-h-screen text-white bg-black bg-opacity-60">
        <div className="container px-4 py-8 mx-auto">
          <h1 className="mb-6 text-4xl font-bold text-center text-blue-300">About Us</h1>
          <p className="mb-4 text-lg">
            Welcome to BookHeaven, your one-stop destination for all your reading needs.
            We are passionate about books and aim to provide the best selection of books
            from various genres and authors.
          </p>
          <p className="mb-4 text-lg">
            Our mission is to create a community of book lovers and provide them with a
            platform to discover, explore, and purchase their favorite books. We believe
            in the power of reading and strive to make it accessible and enjoyable for
            everyone.
          </p>
          <p className="mb-4 text-lg">
            At BookHeaven, we are committed to offering excellent customer service and
            ensuring that our customers have a seamless and delightful shopping experience.
            Whether you are looking for the latest bestsellers, classic literature, or
            niche genres, we have something for everyone.
          </p>
          <p className="mb-4 text-lg">
            Thank you for choosing BookHeaven. Happy reading!
          </p>

          <h2 className="mt-8 mb-4 text-3xl font-semibold text-center text-blue-300">Meet the Team</h2>
          <div className="flex flex-col items-center">
            <div className="flex items-center w-full p-6 mb-6 text-white bg-gray-800 rounded-lg shadow-md bg-opacity-80 md:w-1/2">
              <ModalImage
                small={AhnafImage}
                large={AhnafImage}
                alt="Ahnaf Amer"
                className="w-20 h-20 mr-4 rounded-full cursor-pointer"
              />
              <div>
                <h3 className="text-2xl font-bold">Ahnaf Amer</h3>
                <p className="text-gray-400">ID: 20220104040</p>
              </div>
            </div>
            <div className="flex items-center w-full p-6 text-white bg-gray-800 rounded-lg shadow-md bg-opacity-80 md:w-1/2">
              <ModalImage
                small={KhalidImage}
                large={KhalidImage}
                alt="Khalid Ratin"
                className="w-20 h-20 mr-4 rounded-full cursor-pointer"
              />
              <div>
                <h3 className="text-2xl font-bold">Khalid Ratin</h3>
                <p className="text-gray-400">ID: 20220104027</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
