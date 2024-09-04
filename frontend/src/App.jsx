import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts/Posts';
import PostLoadingComponent from './components/posts/PostLoading';

import axiosInstance from './Axios';

function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: false,
    posts: null,
  });

  useEffect(() => {
    setAppState({ loading: true });

    axiosInstance
      .get('/')
      .then(response => {
        setAppState({ loading: false, posts: response.data });
      })
      .catch(error => {
        setAppState({ loading: false });
        console.error('There was an error fetching the posts!', error);
      });
  }, []);
  return (
    <div className="App">
      <h1>Latest Posts</h1>
      <PostLoading isLoading={appState.loading} posts={appState.posts} />
    </div>
  );
}
export default App;
