import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Edit = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const initialFormData = Object.freeze({
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
  });
  const [formData, updateFormData] = useState(initialFormData);
  useEffect(() => {
    axiosInstance.get(`admin/edit/postdetail/${id}`).then(res => {
      updateFormData({
        ...formData,
        ['title']: res.data.title,
        ['slug']: res.data.slug,
        ['excerpt']: res.data.excerpt,
        ['content']: res.data.content,
      });
      console.log(res.data);
    });
  }, [updateFormData]);

  const handleChange = e => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosInstance.put(`admin/edit/${id}/`, {
      title: formData.title,
      slug: formData.slug,
      author: 1,
      excerpt: formData.excerpt,
      content: formData.content,
    });
    navigate(`/admin/`);
    window.location.reload();
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <div
        style={{
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Edit Post
        </Typography>
        <form
          style={{
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
          }}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Post Title"
                name="title"
                autoComplete="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="excerpt"
                label="Post Excerpt"
                name="excerpt"
                autoComplete="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                multiline
                rows={8}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="slug"
                label="slug"
                name="slug"
                autoComplete="slug"
                value={formData.slug}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="content"
                label="content"
                name="content"
                autoComplete="content"
                value={formData.content}
                onChange={handleChange}
                multiline
                rows={8}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: theme.spacing(3, 0, 2) }}
            onClick={handleSubmit}
          >
            Update Post
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Edit;
