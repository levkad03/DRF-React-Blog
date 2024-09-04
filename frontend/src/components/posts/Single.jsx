import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Axios';
import { useParams } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Single = () => {
  const theme = useTheme();
  const { slug } = useParams();
  const [data, setData] = useState({ posts: [] });

  useEffect(() => {
    axiosInstance.get(`posts/${slug}`).then(res => {
      setData({ posts: res.data });
      console.log(res.data);
    });
  }, [setData]);

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div
        style={{
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      ></div>
      <div
        style={{
          heroContent: {
            Container: {
              maxWidth: 'sm',
            },
          },
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {data.posts.title}
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            {data.posts.content}
          </Typography>
        </Container>
      </div>
    </Container>
  );
};

export default Single;
