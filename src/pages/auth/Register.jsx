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

function Register() {
  const { register, error, setError } = useAuth();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useClearAuthError();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { firstName, lastName, email, password, confirmPassword } = form;

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      setSubmitting(false);
      return;
    }
    setPasswordError('');

    try {
      await register({ firstName, lastName, email, password });
      navigate('/login');
    } catch (err) {
      console.error('Register error:', err);
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
            Sign Up
          </Typography>

          <ErrorAlert message={error} />
          <ErrorAlert message={passwordError} />

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <InputField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <AuthButton submitting={submitting} text="Sign Up" />

            <Box mt={2} textAlign="center">
              <Link
                component={RouterLink}
                to="/login"
                variant="body2"
                sx={{
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Already have an account? Log In
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Register;
