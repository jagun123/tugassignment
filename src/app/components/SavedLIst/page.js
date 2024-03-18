import React, { useState, useEffect } from "react";

const SavedPhotosPage = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedPhotos, setSavedPhotos] = useState([])

  useEffect(() => {
    const savedPostsFromLocalStorage = JSON.parse(localStorage.getItem('savedPosts'));
    if (savedPostsFromLocalStorage) {
      setSavedPosts(savedPostsFromLocalStorage);
    }
  }, []);

  const unsavePost = (postId) => {
    const updatedSavedPosts = savedPosts.filter(post => post.id !== postId);
    setSavedPosts(updatedSavedPosts);
    if (updatedSavedPosts.length === 0) {
      localStorage.removeItem('savedPosts');
    } else {
      localStorage.setItem('savedPosts', JSON.stringify(updatedSavedPosts));
    }
  };

  useEffect(() => {
    const savedPostsFromLocalStorage = JSON.parse(localStorage.getItem('savedPhotos'));
    if (savedPostsFromLocalStorage) {
      setSavedPhotos(savedPostsFromLocalStorage);
    }
  }, []);

  const unsavePhotos = (postId) => {
    const updatedSavedPhotos = savedPhotos.filter(post => post.id !== postId);
    setSavedPosts(updatedSavedPhotos);
    if (updatedSavedPhotos.length === 0) {
      localStorage.removeItem('savedPhotos');
    } else {
      localStorage.setItem('savedPhotos', JSON.stringify(updatedSavedPhotos));
    }
  };

  return (
    <div>
      <h1>Saved Photos</h1>
      <div className="saved-photos">
        {savedPosts.map((photo) => (
          <div key={photo.id}className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2>Post</h2>
            <h2 className="card-title">{photo.title}</h2>
            <p>{photo.body}</p>
            <div className="card-actions justify-end">
              <button onClick={() => unsavePost(photo.id)}className="btn btn-primary">Unsave</button>
            </div>
          </div>
        </div>
        ))}

{savedPhotos.map((photo) => (
          <div key={photo.id} className="card card-compact w-96 bg-base-100 shadow-xl">
          <figure><img src={photo.url} alt="Shoes" /></figure>
          <div className="card-body">
            <h2 className="card-title">Photo</h2>
            <p>{photo.title}</p>
            <div className="card-actions justify-end">
              <button onClick={() => unsavePhotos(photo.id)} className="btn btn-primary">UnSave</button>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPhotosPage;
