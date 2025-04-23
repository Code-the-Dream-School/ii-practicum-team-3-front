import { createContext, useContext, useState, useEffect, useCallback } from 'react';

import {
  loginRequest,
  logoutRequest,
  refreshTokenRequest,
  registerRequest,
  forgotPasswordRequest,
} from '../api/authApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user')) || null;
  });

  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    try {
      const data = await loginRequest(email, password);
      setUser(data.user);
      setAccessToken(data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('accessToken', data.accessToken);
      setError(null);
    } catch (error) {
      console.error('Login failed:', error.message);
      setError(error.message);
      throw error;
    }
  };

  const register = async ({ firstName, lastName, email, password }) => {
    try {
      await registerRequest({ firstName, lastName, email, password });
      setError(null);
    } catch (error) {
      console.error('Registration failed:', error.message);
      setError(error.message);
      throw error;
    }
  };

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
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
      const newAccessToken = await refreshTokenRequest();
      setAccessToken(newAccessToken);
      localStorage.setItem('accessToken', newAccessToken);
    } catch (error) {
      console.error('Token refresh failed:', error.message);
      setError(error.message);
    }
  }, []);

  const forgotPassword = async (email) => {
    try {
      await forgotPasswordRequest(email);
      setError(null);
    } catch (error) {
      console.error('Forgot password request failed:', error.message);
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    refreshToken();
    const interval = setInterval(refreshToken, 15 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, accessToken, error]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        login,
        logout,
        register,
        forgotPassword,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
