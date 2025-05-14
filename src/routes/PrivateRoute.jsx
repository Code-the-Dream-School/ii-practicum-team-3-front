import { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user, accessToken, refreshToken } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      if (!accessToken && localStorage.getItem('accessToken')) {
        try {
          await refreshToken();
        } catch (err) {
          console.error('Auto-refresh failed');
        }
      }
      setLoading(false);
    };

    init();
  }, [accessToken, refreshToken]);

  if (loading) return <div>Loading...</div>;

  if (!accessToken || !user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;

