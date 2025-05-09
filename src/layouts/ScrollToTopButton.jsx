import { useEffect, useState } from 'react';
import { Fab, useTheme } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function ScrollToTopButton() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <Fab
      onClick={handleScrollToTop}
      sx={{
        position: 'fixed',
        bottom: 100,
        right: 30,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
        border: '2px solid',
        borderColor: theme.palette.primary.main,
        width: 56,
        height: 96,
        borderRadius: '16px',
        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
        '&:hover': {
          backgroundColor: '#f1f1f1',
        },
      }}
    >
      <ArrowUpwardIcon sx={{ fontSize: 40 }} />
    </Fab>
  );
}

export default ScrollToTopButton;