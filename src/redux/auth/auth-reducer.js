import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './auth-actions';

const ininialUserState = { name: null, email: null };

const user = createReducer(ininialUserState, {
  [authActions.registerSuccess]: (_, { payload }) => payload.user,
  [authActions.loginSuccess]: (_, { payload }) => payload.user,
  [authActions.logoutSuccess]: () => ininialUserState,
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload,
});

// це те що, прийшлов в response.data
const token = createReducer(null, {
  [authActions.registerSuccess]: (_, { payload }) => payload.token,
  [authActions.loginSuccess]: (_, { payload }) => payload.token,
  [authActions.logoutSuccess]: () => null,
});

// функція абстракція
const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [authActions.registerError]: setError,
  [authActions.loginError]: setError,
  [authActions.logoutError]: setError,
  [authActions.getCurrentUserError]: setError,
});

export default combineReducers({
  user,
  token,
  error,
});
