import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import ScrollToTopButton from './ScrollToTopButton';

function MainLayout() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main content*/}
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 80px)',
        }}
      >
        <ScrollToTopButton />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ height: '80px' }}>
        <Footer />
      </Box>
    </>
  );
}

export default MainLayout;