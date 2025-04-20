import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthProvider';

function Navbar({ vertical = false }) {
  const { user } = useAuth();

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
      {navItems.map((item) => (
        <Button key={item.text} component={Link} to={item.link} sx={{ textTransform: 'uppercase' }}>
          {item.text}
        </Button>
      ))}
    </Box>
  );
}

export default Navbar;
