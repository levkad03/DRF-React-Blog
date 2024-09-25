import React from 'react';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { CardMedia } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Posts = ({ posts }) => {
  const theme = useTheme();
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {posts.map(post => (
            // Enterprise card is full width at sm breakpoint
            <Grid key={post.id} size={{ xs: 12, md: 4 }}>
              <Card>
                <Link
                  color="textPrimary"
                  href={'post/' + post.slug}
                  sx={{ margin: theme.spacing(1, 1.5) }}
                >
                  <CardMedia
                    sx={{ paddingTop: '56.25%' }} // 16:9 aspect ratio
                    image={post.image}
                    title="Image title"
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
                    sx={{
                      display: 'flex',
                      justifyContent: 'left',
                      alignItems: 'baseline',
                      fontSize: '12px',
                      textAlign: 'left',
                      marginBottom: 2,
                    }}
                  >
                    <Typography component="p" color="textPrimary"></Typography>
                    <Typography variant="body2" color="textSecondary">
                      {post.excerpt.substr(0, 60)}...
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Posts;
