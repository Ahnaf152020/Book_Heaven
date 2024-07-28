
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/context/authcontext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Snackbar } from '@mui/material';
import backgroundImage from '../assets/signin.jpg'; 

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn({ email, password });
      setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
      navigate('/');
    } catch (error) {
      console.error('Error signing in:', error);
      setSnackbar({ open: true, message: error.message, severity: 'error' });
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
        <p className="mb-6 text-2xl text-center text-zinc-200">Log In</p>
        <form onSubmit={handleSubmit}>
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
              className="absolute transform -translate-y-1/2 cursor-pointer right-2 top-1/2 text-zinc-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </span>
          </div>
          <button type="submit" className="w-full py-2 mt-4 font-semibold transition duration-300 bg-yellow-500 rounded text-zinc-900 hover:bg-yellow-600">
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-zinc-200">
          Don't have an account? <Link to="/signup" className="text-yellow-500">Sign Up</Link>
        </p>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          severity={snackbar.severity}
        />
      </div>
    </div>
  );
};

export default Login;
