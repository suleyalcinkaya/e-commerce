import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const SignUpForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [role, setRole] = useState('Customer');
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

  const instance = axios.create({
    baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  });

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await instance.get('/roles');
        if (Array.isArray(response.data)) {
          setRoles(response.data);
          const customerRole = response.data.find(r => r.name === 'Customer');
          if (customerRole) {
            setRole(customerRole.id);
          }
        }
      } catch (error) {
        setError('Error fetching roles. Please try again later.');
        console.error('Error fetching roles:', error);
      }
    };
    fetchRoles();
  }, []);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const password = watch('password');

  const onSubmit = async (data) => {
    setLoading(true);
    setError('');
    
    try {
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: role
      };

      if (role === 'Store') {
        formData.store = {
          name: data.store.name,
          phone: data.store.phone,
          tax_no: data.store.tax_no,
          bank_account: data.store.bank_account
        };
      }

      await instance.post('/signup', formData);
      history.goBack();
      alert('Please check your email to activate your account!');
    } catch (error) {
      const message = error.response?.data?.message || 'An error occurred during sign up. Please try again.';
      setError(message);
      if (error.response?.status === 409) {
        setError('This email is already registered. Please use a different email.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center fixed inset-0 bg-gray-50">
      <div className="w-full max-w-3xl mx-4 sm:mx-6 form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-xl px-4 sm:px-8 py-6 sm:py-8 mb-6">
          <h2 className="form-heading text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">Sign Up</h2>
          
          {error && (
            <div className="mb-4 p-2 sm:p-3 text-red-700 bg-red-100 rounded-lg text-sm">
              {error}
            </div>
          )}

          <label className="block mb-4 sm:mb-6">
            <span className="form-label text-base sm:text-lg text-gray-700 block mb-1 sm:mb-2">Name:</span>
            <input
              type="text"
              className="form-input w-full p-2 sm:p-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
              {...register('name', { 
                required: 'Name is required',
                minLength: { value: 3, message: 'Name must be at least 3 characters' }
              })}
            />
            {errors.name && <p className="form-error text-red-500 text-xs sm:text-sm mt-1">{errors.name.message}</p>}
          </label>

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
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
                }
              })}
            />
            {errors.password && <p className="form-error text-red-500 text-xs sm:text-sm mt-1">{errors.password.message}</p>}
          </label>

          <label className="block mb-4 sm:mb-6">
            <span className="form-label text-base sm:text-lg text-gray-700 block mb-1 sm:mb-2">Confirm Password:</span>
            <input
              type="password"
              className="form-input w-full p-2 sm:p-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm your password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
            />
            {errors.confirmPassword && <p className="form-error text-red-500 text-xs sm:text-sm mt-1">{errors.confirmPassword.message}</p>}
          </label>

          <label className="block mb-4 sm:mb-6">
            <span className="form-label text-base sm:text-lg text-gray-700 block mb-1 sm:mb-2">Role:</span>
            <select
              className="form-input w-full p-2 sm:p-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={role}
              onChange={handleRoleChange}
              {...register('role_id')}
            >
              {roles.map(role => (
                <option key={role.id} value={role.id} className="text-sm p-1" >
                  {role.name}
                </option>
              ))}
            </select>
          </label>

          {role === 'Store' && (
            <div className="mt-4 sm:mt-6 p-2 sm:p-4 border-2 rounded-lg">
              <h3 className="text-lg sm:text-2xl font-semibold mb-4 sm:mb-6">Store Information</h3>
              
              <label className="block mb-4 sm:mb-6">
                <span className="form-label text-base sm:text-lg text-gray-700 block mb-1 sm:mb-2">Store Name:</span>
                <input
                  type="text"
                  className="form-input w-full p-2 sm:p-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter store name"
                  {...register('store.name', { 
                    required: 'Store name is required',
                    minLength: { value: 3, message: 'Store name must be at least 3 characters' }
                  })}
                />
                {errors.store?.name && <p className="form-error text-red-500 text-xs sm:text-sm mt-1">{errors.store.name.message}</p>}
              </label>

              <label className="block mb-4 sm:mb-6">
                <span className="form-label text-base sm:text-lg text-gray-700 block mb-1 sm:mb-2">Store Phone:</span>
                <input
                  type="tel"
                  className="form-input w-full p-2 sm:p-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter store phone"
                  {...register('store.phone', { 
                    required: 'Store phone is required',
                    pattern: { 
                      value: /^(\+90|0)?[1-9][0-9]{9}$/,
                      message: 'Please enter a valid Turkish phone number'
                    }
                  })}
                />
                {errors.store?.phone && <p className="form-error text-red-500 text-xs sm:text-sm mt-1">{errors.store.phone.message}</p>}
              </label>

              <label className="block mb-4 sm:mb-6">
                <span className="form-label text-base sm:text-lg text-gray-700 block mb-1 sm:mb-2">Store Tax ID:</span>
                <input
                  type="text"
                  className="form-input w-full p-2 sm:p-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Format: TXXXXVXXXXXXX"
                  {...register('store.tax_no', { 
                    required: 'Store tax ID is required',
                    pattern: { 
                      value: /^T\d{4}V\d{7}$/,
                      message: 'Tax ID must match pattern TXXXXVXXXXXXX'
                    }
                  })}
                />
                {errors.store?.tax_no && <p className="form-error text-red-500 text-xs sm:text-sm mt-1">{errors.store.tax_no.message}</p>}
              </label>

              <label className="block mb-4 sm:mb-6">
                <span className="form-label text-base sm:text-lg text-gray-700 block mb-1 sm:mb-2">Store Bank Account:</span>
                <input
                  type="text"
                  className="form-input w-full p-2 sm:p-3 text-sm sm:text-base border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter IBAN"
                  {...register('store.bank_account', { 
                    required: 'Store bank account is required',
                    pattern: {
                      value: /^TR\d{2}\d{5}[A-Z0-9]{17}$/,
                      message: 'Please enter a valid Turkish IBAN'
                    }
                  })}
                />
                {errors.store?.bank_account && <p className="form-error text-red-500 text-xs sm:text-sm mt-1">{errors.store.bank_account.message}</p>}
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="form-button w-full bg-indigo-600 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg text-lg sm:text-2xl font-medium hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 mt-4 sm:mt-6 flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-base sm:text-lg">Signing up...</span>
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="text-center">
          <p className="form-link text-gray-600 text-base sm:text-lg">
            Already have an account?{' '}
            <button
              onClick={() => history.push('/login')}
              className="form-link text-indigo-600 hover:text-indigo-800 font-medium transition-colors text-base sm:text-lg"
            >
              Log In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;