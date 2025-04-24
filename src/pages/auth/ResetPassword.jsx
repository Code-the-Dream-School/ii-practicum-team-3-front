import { useState } from 'react';

import { Container, Box, Typography } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { useParams, useNavigate } from 'react-router-dom';

import { resetPasswordRequest } from '../../api/authApi';
import AuthButton from '../../components/Form/AuthButton';
import ErrorAlert from '../../components/Form/ErrorAlert';
import InputField from '../../components/Form/InputField';
import { useClearAuthError } from '../../hooks/useClearAuthError';

function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();

  useClearAuthError();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setSubmitting(false);
      return;
    }

    try {
      await resetPasswordRequest(token, newPassword);
      navigate('/login');
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 130px)',
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
            Reset Password
          </Typography>

          <ErrorAlert message={error} />

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <InputField
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              label="Confirm New Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <AuthButton submitting={submitting} text="Reset Password" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ResetPassword;
