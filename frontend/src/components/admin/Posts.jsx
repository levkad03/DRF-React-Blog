import React from 'react';
import { Container } from '@mui/material';
import { Link } from '@mui/material';
import { Paper } from '@mui/material';
import { Table } from '@mui/material';
import { TableBody } from '@mui/material';
import { TableCell } from '@mui/material';
import { TableContainer } from '@mui/material';
import { TableHead } from '@mui/material';
import { TableRow } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const Posts = props => {
  const theme = useTheme();
  const { posts } = props;
  if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
  return (
    <React.Fragment>
      <Container maxWidth="md" component="main">
        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {posts.map(post => (
                  <TableRow key={post.id}>
                    <TableCell component="th" scope="row">
                      {post.id}
                    </TableCell>
                    <TableCell align="left">{post.category}</TableCell>
                    <TableCell align="left">
                      <Link color="textPrimary" href={'/post/' + post.slug}>
                        {post.title}
                      </Link>
                    </TableCell>
                    <TableCell align="left">
                      <Link color="textPrimary" href={'/admin/edit/' + post.id}>
                        <ModeEditIcon />
                      </Link>
                      <Link color="textPrimary" href={'/admin/delete/' + post.id}>
                        <DeleteForeverIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={4}>
                    <Box display="flex" justifyContent="flex-end">
                      <Button href={'/admin/create'} variant="contained" color="primary">
                        New Post
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
};

export default Posts;
