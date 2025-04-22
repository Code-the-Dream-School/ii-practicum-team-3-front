import React from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';

import Router from './routes/Router';
import { baseTheme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
