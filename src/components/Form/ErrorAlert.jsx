import { Alert } from '@mui/material';

const ErrorAlert = ({ message, severity = 'error' }) =>
  message ? (
    <Alert severity={severity} sx={{ width: '100%', mb: 2 }}>
      {message}
    </Alert>
  ) : null;

export default ErrorAlert;
