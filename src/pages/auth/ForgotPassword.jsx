import { useState } from 'react';

import { Container, Box, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

import AuthButton from '../../components/Form/AuthButton';
import ErrorAlert from '../../components/Form/ErrorAlert';
import InputField from '../../components/Form/InputField';
import { useAuth } from '../../context/AuthProvider';
import { useClearAuthError } from '../../hooks/useClearAuthError';

function ForgotPassword() {
  const { forgotPassword, error, setError } = useAuth();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const theme = useTheme();

  useClearAuthError();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccessMessage('');

    try {
      await forgotPassword(email);
      setSuccessMessage('Password reset link has been sent to your email.');
      setEmail('');
    } catch (err) {
      setError(err.message);
      console.error('Forgot password error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
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
          Forgot Password
        </Typography>

        {error && <ErrorAlert message={error} />}
        {successMessage && <ErrorAlert message={successMessage} severity="success" />}

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

          <AuthButton submitting={submitting} text="Send Reset Link" />

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
              Back to login
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgotPassword;
