import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';
import { Link } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import SearchBar from '@mkyy/mui-search-bar';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  let navigate = useNavigate();
  const [data, setData] = useState({ search: '' });

  const goSearch = e => {
    navigate({ pathname: '/search/', search: `?search=${data.search}` });
    window.location.reload();
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          width: '100%',
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link component={NavLink} to="/" underline="none" color="textPrimary">
              BlogMeUp
            </Link>
          </Typography>
          <SearchBar
            value={data.search}
            onChange={newValue => setData({ search: newValue })}
            onSearch={() => goSearch(data.search)}
          />
          <nav>
            <Link
              color="textPrimary"
              href="#"
              sx={{
                margin: theme.spacing(1, 1.5),
              }}
              component={NavLink}
              to="/register"
            >
              Register
            </Link>
          </nav>
          <Button
            href="#"
            color="primary"
            variant="outlined"
            sx={{
              margin: theme.spacing(1, 1.5),
            }}
            component={NavLink}
            to="/login"
          >
            Log in
          </Button>
          <Button
            href="#"
            color="primary"
            variant="outlined"
            sx={{
              margin: theme.spacing(1, 1.5),
            }}
            component={NavLink}
            to="/logout"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
