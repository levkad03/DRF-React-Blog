import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import { Box } from '@mui/material';

const Delete = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = e => {
    e.preventDefault();
    axiosInstance
      .delete(`admin/delete/${id}/`)
      .catch(error => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      })
      .then(() => {
        navigate('/admin');
        window.location.reload();
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box display="flex" justifyContent="center" m={1} p={1} bgcolor="background.paper">
        <Button variant="contained" color="error" type="submit" onClick={handleSubmit}>
          Press here to confirm delete
        </Button>
      </Box>
    </Container>
  );
};

export default Delete;
