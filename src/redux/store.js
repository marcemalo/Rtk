// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../services/Apislice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
