import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const SignUpForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [role, setRole] = useState('');
  const [storeData, setStoreData] = useState({});
  const [loading, setLoading] = useState(false);

  const instance = axios.create({
    baseURL: 'https://workintech-fe-ecommerce.onrender.com',
  });

  const fetchRoles = async () => {
    try {
      const response = await instance.get('/roles');
      const roles = response.data;
      setRole(roles.find((role) => role.name === 'Customer').id);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await instance.post('/signup', data);
      if (response.status === 201) {
        alert('You need to click link in email to activate your account!');
        window.history.back();
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred during sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (e.target.value === 'Store') {
      setStoreData({
        name: '',
        phone: '',
        tax_no: '',
        bank_account: '',
      });
    } else {
      setStoreData({});
    }
  };

  const handleStoreDataChange = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  fetchRoles();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input type="text" {...register('name', { required: true, minLength: 3 })} />
        {errors.name && <p>Name is required with at least 3 characters.</p>}
      </label>
      <label>
        Email:
        <input type="email" {...register('email', { required: true })} />
        {errors.email && <p>Email is required.</p>}
      </label>
      <label>
        Password:
        <input type="password" {...register('password', { required: true, minLength: 8 })} />
        {errors.password && <p>Password is required with at least 8 characters.</p>}
      </label>
      <label>
        Confirm Password:
        <input type="password" {...register('confirmPassword', { required: true })} />
        {errors.confirmPassword && <p>Confirm password is required.</p>}
      </label>
      <label>
        Role:
        <select value={role} onChange={handleRoleChange}>
          <option value="Customer">Customer</option>
          <option value="Store">Store</option>
        </select>
      </label>
      {role === 'Store' && (
        <div>
          <label>
            Store Name:
            <input type="text" {...register('store.name', { required: true, minLength: 3 })} />
            {errors.store?.name && <p>Store name is required with at least 3 characters.</p>}
          </label>
          <label>
            Store Phone:
            <input type="tel" {...register('store.phone', { required: true })} />
            {errors.store?.phone && <p>Store phone is required.</p>}
          </label>
          <label>
            Store Tax ID:
            <input type="text" {...register('store.tax_no', { required: true, pattern: /^T\d{4}V\d{7}$/ })} />
            {errors.store?.tax_no && <p>Store tax ID is required and should match the pattern TXXXXVXXXXXX.</p>}
          </label>
          <label>
            Store Bank Account:
            <input type="text" {...register('store.bank_account', { required: true })} />
            {errors.store?.bank_account && <p>Store bank account is required.</p>}
          </label>
        </div>
      )}
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUpForm;