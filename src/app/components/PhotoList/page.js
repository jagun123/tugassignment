import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';

const PhotoList = ({ photos }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [savedPosts, setSavedPosts] = useState( []); // Initialize savedPosts from local storage
  
  const postsPerPage = 20; // Number of posts per page
 
  // Filter posts based on search input
  const filteredPosts = photos.filter(post =>
    post.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Logic for displaying current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to save a post
  const savePost = (postId) => {
    const postToSave = photos.find(post => post.id === postId);
    if (postToSave) {
      const updatedSavedPosts = [...savedPosts, postToSave];
      setSavedPosts(updatedSavedPosts);
      localStorage.setItem('savedPhotos', JSON.stringify(updatedSavedPosts));
    }
  };



  return (
    <div className="overflow-x-auto">
      {/* Search input */}
      <div className="py-3 px-4">
        <div className="relative max-w-xs">
          <label className="sr-only">Search</label>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="py-2 px-3 ps-9 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Search for items"
          />
          {/* Search icon */}
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3">
            <svg
              className="size-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Photo list */}
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Image</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((photo) => (
            <tr key={photo.id}>
              <td>{photo.id}</td>
              <td>
                <div className="avatar">
                  <div className="mask mask-squircle w-24 h-24">
                    <img src={photo.url} alt="Avatar Tailwind CSS Component" />
                  </div>
                </div>
              </td>
              <td>{photo.title}</td>
              <td>
               
                
                  <button
                    onClick={() => savePost(photo.id)}
                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Save
                  </button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="py-1 px-4">
        <nav className="flex items-center space-x-1">
          <button
            type="button"
            onClick={() => paginate(currentPage - 1)}
            className={`p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${currentPage === 1 ? 'hidden' : ''}`}
          >
            <span aria-hidden="true">«</span>
            <span className="sr-only">Previous</span>
          </button>
          {filteredPosts.length > 0 && Array.from({ length: Math.ceil(filteredPosts.length / postsPerPage) }, (_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => paginate(index + 1)}
              className={`min-w-[40px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2.5 text-sm rounded-full disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 ${currentPage === index + 1 ? 'bg-gray-200 dark:bg-gray-600' : ''}`}
              aria-current={currentPage === index + 1 ? 'page' : null}
            >
              {index + 1}
            </button>
          ))}
          <button
            type="button"
            onClick={() => paginate(currentPage + 1)}
            className={`p-2.5 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${currentPage === Math.ceil(filteredPosts.length / postsPerPage) ? 'hidden' : ''}`}
          >
            <span className="sr-only">Next</span>
            <span aria-hidden="true">»</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default PhotoList;
