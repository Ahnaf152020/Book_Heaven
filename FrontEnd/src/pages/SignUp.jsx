import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background.jpg'; // Update this path

const SignUp = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-zinc-800 bg-opacity-75 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-2xl mb-6 text-center">Sign Up</p>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-zinc-400">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
              placeholder="username"
              name="username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-zinc-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
              placeholder="johndoe@gmail.com"
              name="email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-zinc-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
              placeholder="password"
              name="password"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-zinc-400">
              Address
            </label>
            <textarea
              id="address"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 rounded outline-none"
              rows="4"
              placeholder="address"
              name="address"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-zinc-400 text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
