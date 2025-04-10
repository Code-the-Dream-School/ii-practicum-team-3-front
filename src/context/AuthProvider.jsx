import { createContext, useContext, useState, useEffect, useCallback } from 'react';

import { loginRequest, logoutRequest, refreshTokenRequest } from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const data = await loginRequest(email, password);
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.message);
    }
  };

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
      setUser(null);
      setAccessToken(null);
    } catch (error) {
      console.error('Logout failed:', error.message);
      setError('Failed to log out. Please try again.');
    }
  }, []);

  const refreshToken = useCallback(async () => {
    try {
      const newAccessToken = await refreshTokenRequest();
      setAccessToken(newAccessToken);
    } catch (error) {
      console.error('Token refresh failed:', error.message);
      setError(error.message);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    if (!accessToken) {
      console.error(
        'No access token found, skipping refreshToken call',
        error?.message || 'No error'
      );
      return;
    }

    refreshToken();
    const interval = setInterval(refreshToken, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, accessToken, error]);

  return (
    <AuthContext.Provider value={{ user, accessToken, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
