import React, { useState } from 'react'
import logo from '../Images/sltmobitellogo.png'
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    axios.post('http://localhost:3001/login', { email, password })
      .then(result => {
        if (result.data.status === "Success") {
          localStorage.setItem('user', JSON.stringify(result.data.user));
          navigate('/dashboard');
        } else {
          setError('Invalid email or password');
        }
      })
      .catch(err => {
        console.log(err);
        setError('Invalid email or password');
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 relative">
        <Link 
          to="/" 
          className="absolute top-4 left-4 w-10 h-10 bg-green-600/90 hover:bg-green-600 rounded-full flex items-center justify-center transition-all hover:scale-105"
        >
          <FiArrowLeft className='text-white text-xl'/>
        </Link>

        <div className='flex flex-col items-center pt-12 pb-8 px-8'>
          <img src={logo} alt="logo" className='w-48 mb-6' />
          <h1 className="text-white text-2xl font-bold mb-2">Welcome Back</h1>
        </div>

        <form className='px-8 pb-8 space-y-6' onSubmit={handleSubmit}>
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="username" className='block text-gray-300 text-sm font-medium mb-2'>
              Email
            </label>
            <input
              type="text"
              id="username"
              className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400'
              placeholder='Enter your Email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="password" className='block text-gray-300 text-sm font-medium mb-2'>
              Password
            </label>
            <input
              type="password"
              id="password"
              className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400'
              placeholder='Enter your password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='pt-2'>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 text-lg px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group"
            >
              Log In <FiArrowRight className="transition-transform group-hover:translate-x-1"/>
            </button>
          </div>
        </form>

        <div className='px-8 pb-8 text-center'>
          <p className='text-gray-400'>
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className='text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors'
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login;