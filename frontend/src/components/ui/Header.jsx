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
import { useUser } from '@/core/context/UserContext';
import { Avatar, Menu, MenuItem } from '@mui/material';

const Header = () => {
  const theme = useTheme();
  let navigate = useNavigate();
  const { user } = useUser();
  const [data, setData] = useState({ search: '' });
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAvatarClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const goSearch = () => {
    navigate({ pathname: '/search/', search: `?search=${data.search}` });
    window.location.reload();
  };

  const handleLogout = () => {
    navigate('/logout');
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
          {!user ? (
            <React.Fragment>
              <nav>
                <Link
                  color="textPrimary"
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
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Avatar
                sx={{ cursor: 'pointer', marginLeft: theme.spacing(1) }}
                onClick={handleAvatarClick}
              >
                {user.user_name[0]} {/* Отображаем первую букву имени пользователя */}
              </Avatar>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleAvatarClose}
              >
                <MenuItem onClick={() => navigate('/admin')}>Admin Panel</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
