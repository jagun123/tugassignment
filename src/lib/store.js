// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import photoReducer from './features/photoSlice';

export const store = configureStore({
    reducer: {
        photos: photoReducer,
    },
});
