import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Axios';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardMedia } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { Link } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Search = () => {
  const theme = useTheme();
  const search = 'search';
  const [appState, setAppState] = useState({
    search: '',
    posts: [],
  });

  useEffect(() => {
    axiosInstance.get(search + '/' + window.location.search).then(res => {
      const allPosts = res.data;
      setAppState({ posts: allPosts });
      console.log(res.data);
    });
  }, [setAppState]);
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {appState.posts.map(post => {
            return (
              <Grid item key={post.id} xs={12} md={4}>
                <Card>
                  <Link
                    color="textPrimary"
                    href={'/post/' + post.slug}
                    sx={{ margin: theme.spacing(1, 1.5) }}
                  >
                    <CardMedia
                      sx={{ paddingTop: '56.25%' }}
                      image="https://picsum.photos/600"
                      title="Image Title"
                    />
                  </Link>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      sx={{ fontSize: '16px', textAlign: 'left' }}
                    >
                      {post.title.substr(0, 50)}...
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'baseline',
                        fontSize: '12px',
                        textAlign: 'left',
                        marginBottom: theme.spacing(2),
                      }}
                    >
                      <Typography color="textSecondary">
                        {post.excerpt.substr(0, 40)}...
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Search;
