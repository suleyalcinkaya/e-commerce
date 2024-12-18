import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setErrorState] = useState('');
  const history = useHistory();

  const instance = axios.create({
    baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  });

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorState('');
    try {
      const response = await instance.post('/login', data);
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('token', response.data.token);
        history.push('/');
      }
    } catch (err) {
      console.error('Error during login:', err);
      if (err.response?.data?.message) {
        setErrorState(err.response.data.message);
      } else {
        setErrorState('An error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center fixed inset-0 bg-gray-50">
      <div className="w-full max-w-xl mx-4 sm:mx-6 form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl px-4 sm:px-8 py-6 sm:py-8 mb-6">
          <h2 className="form-heading text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">Login</h2>
          
          {error && (
            <div className="mb-4 p-2 sm:p-3 text-red-700 bg-red-100 rounded-lg text-sm">
              {error}
            </div>
          )}

          <label className="block mb-4 sm:mb-6">
            <span className="form-label text-base sm:text-lg text-gray-700 block mb-1 sm:mb-2">Email:</span>
            <input
              type="email"
              className="form-input w-full p-2 sm:p-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              {...register('email', { 
                required: 'Email is required',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.email && <p className="form-error text-red-500 text-xs sm:text-sm mt-1">{errors.email.message}</p>}
          </label>

          <label className="block mb-4 sm:mb-6">
            <span className="form-label text-base sm:text-lg text-gray-700 block mb-1 sm:mb-2">Password:</span>
            <input
              type="password"
              className="form-input w-full p-2 sm:p-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              {...register('password', { 
                required: 'Password is required'
              })}
            />
            {errors.password && <p className="form-error text-red-500 text-xs sm:text-sm mt-1">{errors.password.message}</p>}
          </label>

          <button
            type="submit"
            disabled={loading}
            className="form-button w-full bg-indigo-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-lg sm:text-xl font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 mt-4 sm:mt-6 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-base sm:text-lg">Logging in...</span>
              </>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="form-link text-gray-600 text-base sm:text-lg">
            Don't have an account?{' '}
            <button
              onClick={() => history.push('/signup')}
              className="form-link text-indigo-600 hover:text-indigo-800 font-medium transition-colors text-base sm:text-lg"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
