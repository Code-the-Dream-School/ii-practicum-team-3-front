import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Header from './Header';
import ScrollToTopButton from './ScrollToTopButton';

function MainLayout() {
  return (
    <>
      {/* Header without fixed height */}
      <Header />

      {/* Main content with adjusted height */}
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 80px)', // only footer is subtracted
          overflow: 'auto',
        }}
      >
        <ScrollToTopButton />
        <Box sx={{ flex: 1 }}>
          <Outlet />
        </Box>
      </Box>

      {/* Fixed height for Footer */}
      <Box sx={{ height: '80px' }}>
        <Footer />
      </Box>
    </>
  );
}

export default MainLayout;
