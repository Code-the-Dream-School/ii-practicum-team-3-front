import { useState } from 'react';

import { Container, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import AuthButton from '../../components/Form/AuthButton';
import ErrorAlert from '../../components/Form/ErrorAlert';
import InputField from '../../components/Form/InputField';
import { useAuth } from '../../context/AuthProvider';

function Login() {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      disableGutters
      sx={{
        bgcolor: 'rgba(201, 208, 202, 0.33)',
        py: 5,
        px: 3.75,
        borderRadius: 2,
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
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <AuthButton submitting={submitting} text="Log In" />

          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/password/reset"
              variant="body2"
              sx={{
                color: '#000',
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
  );
}

export default Login;
