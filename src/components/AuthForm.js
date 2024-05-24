import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../index.css";

const AuthForm = ({ type }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: type === 'signup' ? Yup.string().required('Required') : Yup.string(),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async values => {
      try {
        const endpoint = type === 'signup' ? 'register' : 'login';
        const response = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, values);
        localStorage.setItem('token', response.data.token);
        navigate('/products'); // Redirect to the products page after successful login
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="auth-container">
      <form onSubmit={formik.handleSubmit}>
        {type === 'signup' && (
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            {formik.errors.username ? <div>{formik.errors.username}</div> : null}
          </div>
        )}
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>
        <button type="submit">{type === 'signup' ? 'Signup' : 'Login'}</button>
      </form>
      <button onClick={() => formik.resetForm({ values: { username: '', email: '', password: '' }})}>
        {type === 'signup' ? 'Switch to Login' : 'Switch to Signup'}
      </button>
    </div>
  );
};

export default AuthForm;
