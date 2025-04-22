import { Button } from '@mui/material';

const AuthButton = ({ submitting, text }) => (
  <Button
    type="submit"
    fullWidth
    sx={{
      mt: 2,
      mx: 'auto',
      display: 'block',
      width: '50%',
    }}
    disabled={submitting}
  >
    {submitting ? `${text}...` : text}
  </Button>
);

export default AuthButton;
