import React, { useState } from 'react';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../Images/sltmobitellogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [phone, setPhone] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/users', {name, email, phone, password})
    .then(result => {console.log(result)
      navigate('/login')
    })
    .catch(err => console.log(err))
  }


  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700 relative">
        {/* Back Button */}
        <Link 
          to="/" 
          className="absolute top-4 left-4 w-10 h-10 bg-green-600/90 hover:bg-green-600 rounded-full flex items-center justify-center transition-all hover:scale-105"
        >
          <FiArrowLeft className='text-white text-xl'/>
        </Link>

        {/* Logo Section */}
        <div className='flex flex-col items-center pt-12 pb-6 px-8'>
          <img src={logo} alt="logo" className='w-48 mb-4' />
          <h1 className="text-white text-2xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">Get started with Environmental Monitoring</p>
        </div>

        {/* Signup Form */}
        <form className='px-8 pb-8 space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className='block text-gray-300 text-sm font-medium mb-2'>
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400'
              placeholder='John Doe'
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div>
            <label htmlFor="email" className='block text-gray-300 text-sm font-medium mb-2'>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400'
              placeholder='your@email.com'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="phone" className='block text-gray-300 text-sm font-medium mb-2'>
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className='w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400'
              placeholder='+94 77 123 4567'
              required
              onChange={(e) => setPhone(e.target.value)}
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
              placeholder='Create a password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='pt-4'>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 text-lg px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] group"
            >
              Create Account <FiArrowRight className="transition-transform group-hover:translate-x-1"/>
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className='px-8 pb-8 text-center'>
          <p className='text-gray-400'>
            Already have an account?{' '}
            <Link 
              to="/login" 
              className='text-blue-400 font-medium hover:text-blue-300 hover:underline transition-colors'
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup