import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { useAuth } from '../context/AuthProvider';

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav>
      <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: '1rem' }}>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/workouts">Workouts{!user && ' (view only)'}</Link>
        </li>

        <li>
          <Link to="/exercises">Exercises{!user && ' (view only)'}</Link>
        </li>

        {user ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Button
                onClick={handleLogout}
                variant="text"
                sx={{
                  color: '#000',
                  textTransform: 'none',
                  padding: 0,
                  minWidth: 0,
                }}
              >
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
