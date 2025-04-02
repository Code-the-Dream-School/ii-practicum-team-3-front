import { Link } from 'react-router-dom';

function Navbar() {
  const isAuthenticated = true;

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/workouts">Workouts</Link>
            </li>
            <li>
              <Link to="/exercises">Exercises</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/workouts">Workouts (view only)</Link>
            </li>{' '}
            {/* view only link*/}
            <li>
              <Link to="/exercises">Exercises (view only)</Link>
            </li>{' '}
            {/* view only link*/}
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
