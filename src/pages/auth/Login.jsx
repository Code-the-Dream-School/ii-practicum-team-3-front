import { useState } from 'react';

import { Container, Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import AuthButton from '../../components/Form/AuthButton';
import ErrorAlert from '../../components/Form/ErrorAlert';
import InputField from '../../components/Form/InputField';
import { useAuth } from '../../context/AuthProvider';
import { useClearAuthError } from '../../hooks/useClearAuthError';

function Login() {
  const { login, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();

  useClearAuthError();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        height: 'calc(100vh - 160px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: alpha(theme.palette.primary.main, 0.02), 
      }}
    >
      <Container
        maxWidth="xs"
        disableGutters
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          py: 5,
          px: 3.75,
          borderRadius: 2,
          minWidth: '320px',
        }}
      >
        <Box mt={2} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" gutterBottom>
            Log In
          </Typography>

          <ErrorAlert message={error} />

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <InputField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
            />
            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
            />
            <AuthButton submitting={submitting} text="Log In" />

            <Box mt={2} textAlign="center">
              <Link
                component={RouterLink}
                to="/password/forgot"
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Forgot password?
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
