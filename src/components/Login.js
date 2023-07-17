import React, { useCallback } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, setError, setPassword, setPhone } from '../redux/authSlice';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { phone, password, error } = useSelector((state) => state.auth);

  const handleLogin = useCallback(() => {
    if (!phone || !password) {
      dispatch(setError('Phone number and password are required'));
    } else {
      // Simulating a successful login with different roles
      if (phone === 'viewer' && password === 'viewer') {
        dispatch(login({ role: 'Viewer' }));
        navigate('/createAdvertisement'); // Add the navigation logic here
      } else if (phone === 'editor' && password === 'editor') {
        dispatch(login({ role: 'Editor' }));
        navigate('/createAdvertisement'); // Add the navigation logic here
      } else {
        dispatch(setError('Invalid phone number or password'));
      }
    }
  }, [phone, password, dispatch, navigate]);

  return (
    <div className="store">
      {error && (
        <div className="alert alert-danger mt-1 w-50 d-flex justify-content-center text-center mx-auto">
          {error}
        </div>
      )}
      <div className="form-control container" style={{ width: '40%' }}>
        <label className=" mb-1 text-danger">Phone Number</label>
        <input
          type="text"
          placeholder="Please Enter Your Phone Number"
          value={phone}
          className="form-control w-100"
          onChange={(e) => dispatch(setPhone(e.target.value))}
        />
        <label className="mb-1 mt-3 text-danger">Password</label>
        <input
          type="password"
          className="form-control w-100"
          placeholder="Please Enter Your Password"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
        />

        <button className="btn btn-danger w-50 mt-3" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
