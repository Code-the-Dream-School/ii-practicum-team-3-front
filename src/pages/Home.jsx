import { Box, Typography, useTheme, Button } from '@mui/material';

function Home() {
  const theme = useTheme();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h1" sx={{ color: theme.palette.primary.main }}>
        Primary Color
      </Typography>

      <Typography variant="h1" sx={{ color: theme.palette.secondary.main }}>
        Secondary Color
      </Typography>

      <Typography variant="h1" sx={{ color: theme.palette.accent?.main || '#FFD700' }}>
        Accent Color
      </Typography>

      <Typography variant="h1" sx={{ color: theme.palette.error.main }}>
        Error Color
      </Typography>

      <Typography variant="h1" sx={{ color: theme.palette.footer?.main || '#D4FF00' }}>
        Footer Color
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" sx={{ mr: 2 }}>
          Primary Button
        </Button>
        <Button variant="contained" color="secondary" sx={{ mr: 2 }}>
          Secondary Button
        </Button>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.accent?.main }}>
          Accent Button
        </Button>
      </Box>
    </Box>
  );
}

export default Home;
