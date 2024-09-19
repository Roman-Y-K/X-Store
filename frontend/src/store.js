import { configureStore } from '@reduxjs/toolkit';

import cartSliceReducer from './slices/cartSlice';
import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
