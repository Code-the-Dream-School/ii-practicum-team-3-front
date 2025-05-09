import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import ScrollToTopButton from './ScrollToTopButton';

function MainLayout() {
  return (
    <>
      <Header />
      {/* main content takes the rest of the screen minus 200px */}
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 80px)', // 120 header + 80 footer
          overflow: 'auto',
        }}
      >
        <ScrollToTopButton />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>
      <Box sx={{ height: '80px' }}>
        <Footer />
      </Box>
    </>
  );
}

export default MainLayout;