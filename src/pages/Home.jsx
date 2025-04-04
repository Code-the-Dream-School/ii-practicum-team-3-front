import { Box, Typography, useTheme } from '@mui/material';
import Button from '@mui/material/Button';

function Home() {

const theme = useTheme();

  return (
    <Box>
      <Typography component="h1" variant="h1" sx={{color:'green'}}>ii-3 Group</Typography>
      <Button variant="contained" color="primary">
        MUI Button
      </Button>
    </Box>
  );
}

export default Home;