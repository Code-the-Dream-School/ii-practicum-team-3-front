import { Button } from '@mui/material';

const AuthButton = ({ submitting, text }) => (
  <Button
    type="submit"
    variant="contained"
    fullWidth
    sx={{
      mt: 2,
      mx: 'auto',
      display: 'block',
      bgcolor: '#BBF246',
      color: '#000',
      textTransform: 'none',
      width: '50%',
    }}
    disabled={submitting}
  >
    {submitting ? `${text}...` : text}
  </Button>
);

export default AuthButton;
