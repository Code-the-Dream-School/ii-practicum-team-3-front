import { Box, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { useAuth } from '../context/AuthProvider';

function Navbar({ vertical = false }) {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    { text: 'Workouts', link: '/workouts' },
    { text: 'Exercises', link: '/exercises' },
    ...(user ? [{ text: 'Profile', link: '/profile' }] : []),
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: vertical ? 'column' : 'row',
        gap: '1rem',
        alignItems: vertical ? 'start' : 'center',
      }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname.startsWith(item.link);
        return (
          <Button
            key={item.text}
            component={Link}
            to={item.link}
            sx={{
              textTransform: 'uppercase',
              boxShadow: isActive ? '0px 4px 10px rgba(0, 0, 0, 0.25)' : 'none',
              transform: isActive ? 'translateY(2px)' : 'none',
              '&:hover': {
                backgroundColor: isActive ? 'secondary.main' : '#BBF246',
              },
            }}
          >
            {item.text}
          </Button>
        );
      })}
    </Box>
  );
}

export default Navbar;
