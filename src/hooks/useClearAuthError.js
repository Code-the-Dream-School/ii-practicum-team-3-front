import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import { useAuth } from '../context/AuthProvider';

export const useClearAuthError = () => {
  const { setError } = useAuth();
  const location = useLocation();

  useEffect(() => {
    return () => {
      setError('');
    };
  }, [location.pathname, setError]);
};
