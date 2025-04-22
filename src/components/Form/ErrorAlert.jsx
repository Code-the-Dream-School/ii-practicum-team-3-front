import { Alert } from '@mui/material';

const ErrorAlert = ({ message }) =>
  message ? (
    <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
      {message}
    </Alert>
  ) : null;

export default ErrorAlert;
