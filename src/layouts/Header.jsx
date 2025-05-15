import { useState } from 'react';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Toolbar, Button, IconButton, Drawer, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import Navbar from './NavBar';
import logo from '../assets/images/logo.png';
import { useAuth } from '../context/AuthProvider';

function Header() {
  const { user, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={1}
        sx={{
          bgcolor: theme.palette.secondary.main,
          color: theme.palette.primary.main,
        }}
      >
        <Toolbar
          sx={{
            minHeight: { xs: 56, sm: 80 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box sx={{ flex: '1' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Box
                component="img"
                src={logo}
                alt="Fitness App Logo"
                sx={{ height: { xs: 45, sm: 50 } }}
              />
            </Link>
          </Box>
          <Box sx={{ flex: '2', display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Navbar />
          </Box>
          <Box
            sx={{
              flex: '1',
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              gap: '1rem',
            }}
          >
            {user ? (
              <Button onClick={handleLogout} sx={{ color: 'inherit' }}>
                Logout
              </Button>
            ) : (
              <>
                <Button component={Link} to="/login" sx={{ color: 'inherit' }}>
                  Log In
                </Button>
                <Button component={Link} to="/register" sx={{ color: 'inherit' }}>
                  Sign Up
                </Button>
              </>
            )}
          </Box>
          {/* Burger Icon */}
          <IconButton
            sx={{ display: { xs: 'block', md: 'none' } }}
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon sx={{ fontSize: 36 }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/*Mobile menu*/}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 250,
            paddingTop: '2rem',
            paddingLeft: '2rem',
            bgcolor: theme.palette.secondary.main,
            height: '100%',
          }}
          role="presentation"
          onClick={handleDrawerToggle}
        >
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'start', paddingLeft: '1rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <Box component="img" src={logo} alt="Logo" sx={{ height: { xs: 50 } }} />
            </Link>
          </Box>
          <Navbar vertical />
          {/* Login - Logout btns - mobile version */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              paddingTop: '1rem',
              gap: '1rem',
            }}
          >
            {user ? (
              <Button onClick={handleLogout} color="secondary">
                Logout
              </Button>
            ) : (
              <>
                <Button component={Link} to="/login" color="secondary">
                  Log In
                </Button>
                <Button component={Link} to="/register" color="secondary">
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
}

export default Header;
