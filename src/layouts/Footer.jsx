import { Box, Typography, Link as MuiLink } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link  } from 'react-router-dom';

function Footer() {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        height: '80px',
        backgroundColor: theme.palette.footer.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant="body2" color="textPrimary">
        © 2025 –{' '}
        <MuiLink
          href="https://classes.codethedream.org/"
          target="_blank"
          rel="noopener noreferrer"
          underline="hover"
          sx={{ color: 'blue', fontWeight: 'bold' }}
        >
          Code The Dream
        </MuiLink>{' '}
        <Link
          to='/about'
          underline="hover"
        >
        Practicum Group #3 (ibis + impala)
        </Link>
      </Typography>
    </Box>
  );
}

export default Footer;