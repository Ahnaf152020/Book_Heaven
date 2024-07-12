import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/signin.jpg';

const Login = () => {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div style={backgroundStyle}>
      <div className="w-full px-8 py-5 bg-zinc-800 bg-opacity-75 rounded-lg md:w-3/6 lg:w-2/6">
        <p className="mb-6 text-2xl text-center text-zinc-200">Log In</p>
        <form>
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
          <button
            type="submit"
            className="w-full p-2 mt-6 text-white transition-all duration-300 bg-zinc-500 rounded hover:bg-zinc-600"
          >
            Log In
          </button>
        </form>
        <div className="flex justify-between mt-4">
          <Link to="/forgot-password" className="text-zinc-500 hover:underline">
            Forgot Password?
          </Link>
          <Link to="/change-password" className="text-zinc-500 hover:underline">
            Change Password
          </Link>
        </div>
        <p className="mt-4 text-center text-zinc-400">
          Don't have an account?{' '}
          <Link to="/sign-up" className="text-zinc-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
