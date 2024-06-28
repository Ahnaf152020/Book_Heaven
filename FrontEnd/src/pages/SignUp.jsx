import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8 bg-gray-100">
      <div className="w-full px-8 py-5 bg-blue-800 rounded-lg md:w-3/6 lg:w-2/6">
        <p className="mb-6 text-2xl text-center text-zinc-200">Sign Up</p>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-zinc-400">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
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
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
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
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
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
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
              rows="4"
              placeholder="address"
              name="address"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-6 text-white transition-all duration-300 bg-blue-500 rounded hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-zinc-400">
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
