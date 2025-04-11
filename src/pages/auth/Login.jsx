import { useState } from 'react';

import { Link } from 'react-router-dom';

import { useAuth } from '../../context/AuthProvider';

function Login() {
  const { login, error, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Log In</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {user && <p style={{ color: 'green' }}>Welcome, {user.firstName}</p>}

        <div>
          <Link to="/password/reset">Forgot password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
