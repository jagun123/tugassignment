'use client'
import { useEffect, useState } from 'react';
import { fetchPhotos, fetchPosts } from '../api';
import PhotoList from './components/PhotoList/page';
import PostList from './components/PostList/page';
import SavedList from './components/SavedLIst/page'

const Home = () => {
  const [photos, setPhotos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('posts');

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPhotos = await fetchPhotos();
      const fetchedPosts = await fetchPosts();
      // Assuming there's a function fetchSavedItems for fetching saved items
      
      setPhotos(fetchedPhotos); // Limiting to 20 photos for pagination
      setPosts(fetchedPosts); // Limiting to 20 posts for pagination
      // Assuming fetchedSavedItems returns saved items
    };

    fetchData();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="sm:hidden  ">
        <label htmlFor="Tab" className="sr-only">Tab</label>
        <select id="Tab" className="w-full rounded-md border-gray-200" onChange={(e) => handleTabClick(e.target.value)}>
          <option value="posts">Posts</option>
          <option value="photos">Photos</option>
          <option value="saved">Saved</option>
        </select>
      </div>
  
      <div className="hidden sm:block mx-auto " >
        <nav className="flex gap-6" aria-label="Tabs">
          <a
            href="#"
            className={`shrink-0 rounded-lg p-2 text-sm font-medium ${activeTab === 'posts' ? 'bg-sky-100 text-sky-600' : 'text-gray-500'} hover:bg-gray-50 hover:text-gray-700`}
            onClick={() => handleTabClick('posts')}
          >
            Posts
          </a>
  
          <a
            href="#"
            className={`shrink-0 rounded-lg p-2 text-sm font-medium ${activeTab === 'photos' ? 'bg-sky-100 text-sky-600' : 'text-gray-500'} hover:bg-gray-50 hover:text-gray-700`}
            onClick={() => handleTabClick('photos')}
          >
            Photos
          </a>
  
          <a
            href="#"
            className={`shrink-0 rounded-lg p-2 text-sm font-medium ${activeTab === 'saved' ? 'bg-sky-100 text-sky-600' : 'text-gray-500'} hover:bg-gray-50 hover:text-gray-700`}
            onClick={() => handleTabClick('saved')}
          >
            Saved
          </a>
        </nav>
      </div>

      {activeTab === 'posts' && <PostList posts={posts} />}
      {activeTab === 'photos' && <PhotoList photos={photos} />}
      {activeTab === 'saved' && <SavedList  />}
    </div>
  );
}

export default Home;
