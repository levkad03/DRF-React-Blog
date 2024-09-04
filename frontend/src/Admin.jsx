import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/admin/Posts';
import axiosInstance from './Axios';
import PostLoadingComponent from './components/posts/PostLoading';

const Admin = () => {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    posts: [],
    loading: false,
  });
  useEffect(() => {
    axiosInstance.get().then(res => {
      const allPosts = res.data;
      setAppState({ posts: allPosts, loading: false });
      console.log(res.data);
    });
  }, [setAppState]);
  return (
    <div className="App">
      <h1>Latest Posts</h1>
      <PostLoading isLoading={appState.loading} posts={appState.posts} />
    </div>
  );
};

export default Admin;
