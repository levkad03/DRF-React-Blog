import React, { useState } from 'react';
import axiosInstance from '../Axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';
import { CssBaseline } from '@mui/material';
import { TextField } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { Link } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { Container } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function Login() {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: '',
    password: '',
  });
  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = e => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`token/`, {
        email: formData.email,
        password: formData.password,
      })
      .then(res => {
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        axiosInstance.defaults.headers['Authorization'] =
          'JWT ' + localStorage.getItem('access_token');
        navigate('/');
      });
  };
  const theme = useTheme();
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
          Sign In
        </Typography>
        <form
          style={{
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
          }}
          noValidate
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ margin: theme.spacing(3, 0, 2) }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
