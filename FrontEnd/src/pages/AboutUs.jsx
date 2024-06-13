import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">About Us</h1>
      <p className="text-lg mb-4 text-gray-700">
        Welcome to BookHeaven, your one-stop destination for all your reading needs.
        We are passionate about books and aim to provide the best selection of books
        from various genres and authors.
      </p>
      <p className="text-lg mb-4 text-gray-700">
        Our mission is to create a community of book lovers and provide them with a
        platform to discover, explore, and purchase their favorite books. We believe
        in the power of reading and strive to make it accessible and enjoyable for
        everyone.
      </p>
      <p className="text-lg mb-4 text-gray-700">
        At BookHeaven, we are committed to offering excellent customer service and
        ensuring that our customers have a seamless and delightful shopping experience.
        Whether you are looking for the latest bestsellers, classic literature, or
        niche genres, we have something for everyone.
      </p>
      <p className="text-lg mb-4 text-gray-700">
        Thank you for choosing BookHeaven. Happy reading!
      </p>

      <h2 className="text-3xl font-semibold mt-8 mb-4 text-center text-gray-800">Meet the Team</h2>
      <div className="flex flex-col items-center">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 w-full md:w-1/2">
          <h3 className="text-2xl font-bold text-gray-800">Ahnaf Amer</h3>
          <p className="text-gray-600">ID: 20220104040</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-1/2">
          <h3 className="text-2xl font-bold text-gray-800">Khalid Ratin</h3>
          <p className="text-gray-600">ID: 20220104027</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
