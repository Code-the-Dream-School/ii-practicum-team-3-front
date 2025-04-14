import { useState } from 'react';

import { Container, Box, Typography, Link } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import AuthButton from '../../components/Form/AuthButton';
import ErrorAlert from '../../components/Form/ErrorAlert';
import InputField from '../../components/Form/InputField';
import { useAuth } from '../../context/AuthProvider';

function Register() {
  const { register, error } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    setPasswordError('');
    setSubmitting(true);
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
          Sign Up
        </Typography>

        <ErrorAlert message={error} />
        <ErrorAlert message={passwordError} />

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <InputField
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputField
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
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
          <InputField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <AuthButton submitting={submitting} text="Sign Up" />

          <Box mt={2} textAlign="center">
            <Link
              component={RouterLink}
              to="/login"
              variant="body2"
              sx={{
                color: '#000',
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
  );
}

export default Register;
