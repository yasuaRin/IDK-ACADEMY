import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import scoreReducer from './slices/scoreSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    scores: scoreReducer,
  },
});

