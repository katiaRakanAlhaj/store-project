import { createSlice } from '@reduxjs/toolkit';
import Joi from 'joi-browser';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    phone: '',
    password: '',
    error: '',
    isLoggedIn: false,
    role: '',
  },
  reducers: {
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setPhone, setPassword, setError, setLoggedIn, setRole } =
  authSlice.actions;

export const login = () => (dispatch, getState) => {
  const { phone, password } = getState().auth;

  // Perform validation using Joi
  const schema = Joi.object({
    phone: Joi.string().required().label('Phone Number'),
    password: Joi.string().required().label('Password'),
  });

  const { error } = schema.validate({ phone, password });

  if (error) {
    dispatch(setError(error.details[0].message));
    dispatch(setLoggedIn(false));
    dispatch(setRole(''));
  } else {
    // Simulate successful login with different roles
    if (phone === 'viewer' && password === 'viewer') {
      dispatch(setLoggedIn(true));
      dispatch(setRole('Viewer'));
      dispatch(setError(''));
    } else if (phone === 'editor' && password === 'editor') {
      dispatch(setLoggedIn(true));
      dispatch(setRole('Editor'));
      dispatch(setError(''));
    } else {
      dispatch(setError('Invalid phone number or password'));
      dispatch(setLoggedIn(false));
      dispatch(setRole(''));
    }
  }
};

export default authSlice.reducer;
