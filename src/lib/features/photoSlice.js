// src/store/photoSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    savedPhotos: [],
    likedPhotos: [],
};

const photoSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        savePhoto(state, action) {
            state.savedPhotos.push(action.payload);
        },
        unsavePhoto(state, action) {
            state.savedPhotos = state.savedPhotos.filter(photo => photo.id !== action.payload.id);
        },
        likePhoto(state, action) {
            state.likedPhotos.push(action.payload);
        },
        unlikePhoto(state, action) {
            state.likedPhotos = state.likedPhotos.filter(photo => photo.id !== action.payload.id);
        },
    },
});

export const { savePhoto, unsavePhoto, likePhoto, unlikePhoto } = photoSlice.actions;
export default photoSlice.reducer;
