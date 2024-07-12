import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/authcontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../assets/background.jpg'; // Update this path

const SignUp = () => {
  const { signUp } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await signUp({ username, email, password, address });
      navigate('/login');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 py-8"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="w-full px-8 py-5 bg-opacity-75 rounded-lg bg-zinc-800 md:w-3/6 lg:w-2/6">
        <p className="mb-6 text-2xl text-center text-zinc-200">Sign Up</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-zinc-400">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-zinc-400">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
              placeholder="johndoe@gmail.com"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="block text-zinc-400">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span 
              className="absolute transform -translate-y-1/2 cursor-pointer right-2 top-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="relative mb-4">
            <label htmlFor="confirmPassword" className="block text-zinc-400">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span 
              className="absolute transform -translate-y-1/2 cursor-pointer right-2 top-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </span>
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-zinc-400">Address</label>
            <textarea
              id="address"
              className="w-full p-2 mt-2 rounded outline-none bg-zinc-900 text-zinc-100"
              rows="4"
              placeholder="Address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full py-2 mt-4 font-semibold transition duration-300 bg-yellow-500 rounded text-zinc-900 hover:bg-yellow-600">
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-zinc-200">
          Already have an account? <Link to="/login" className="text-yellow-500">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
