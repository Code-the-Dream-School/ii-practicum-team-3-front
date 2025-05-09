import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import ScrollToTopButton from './ScrollToTopButton';

function MainLayout() {
  return (
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: "100vh",
        height: "100%"
      }}
    >
        <Header />
      <Box
        component="main"
        sx={{
          overflow: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ScrollToTopButton />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
        <Footer />
    </Box>
  );
}

export default MainLayout;