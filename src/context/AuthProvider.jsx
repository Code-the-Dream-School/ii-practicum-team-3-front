import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        setAccessToken(data.accessToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('accessToken', data.accessToken);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.message);
    }
  };

  const logout = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Error response from server:', errorText);
        throw new Error('Failed to log out');
      }

      const contentType = res.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data.message) {
          console.log(data.message);
        }
      } else {
        console.error('Logout response is not in JSON format');
      }

      setUser(null);
      setAccessToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Logout failed:', error.message);
      setError('Failed to log out. Please try again.');
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      });
      if (!res.ok) {
        throw new Error('Failed to refresh token');
      }

      const text = await res.text();
      let data = {};
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse JSON', e);
        throw new Error('Invalid response format');
      }
      if (data.accessToken) {
        setAccessToken(data.accessToken);
        localStorage.setItem('accessToken', data.accessToken);
      } else {
        throw new Error('Access token missing');
      }
    } catch (error) {
      console.error('Token refresh failed:', error.message);
      setError(error.message);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    console.log('AuthProvider mounted');

    if (!accessToken) {
      console.log('No access token found, skipping refreshToken call');
      return;
    }

    refreshToken();
    const interval = setInterval(refreshToken, 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, accessToken]);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
