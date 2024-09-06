import React, { useState } from 'react';
import axiosInstance from '../../Axios';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { Button } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Css } from '@mui/icons-material';

const Create = () => {
  const slugify = string => {
    const a =
      'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    const b =
      'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const p = new RegExp(a.split('').join('|'), 'g');

    return string
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };

  const navigate = useNavigate();
  const theme = useTheme();
  const initialFormData = Object.freeze({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
  });
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = e => {
    if ([e.target.name] == 'title') {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim(),
        ['slug']: slugify(e.target.value.trim()),
      });
    } else {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim(),
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosInstance
      .post(`admin/create/`, {
        title: formData.title,
        slug: formData.slug,
        author: 1,
        excerpt: formData.excerpt,
        content: formData.content,
      })
      .then(res => {
        navigate(`/admin/`);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          sx={{ margin: theme.spacing(1), backgroundColor: theme.palette.secondary.main }}
        ></Avatar>
        <Typography component="h1" variant="h5">
          Create New Post
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
                onChange={handleChange}
                multiline
                rows={4}
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
                onChange={handleChange}
                multiline
                rows={4}
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
            Create Post
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Create;
