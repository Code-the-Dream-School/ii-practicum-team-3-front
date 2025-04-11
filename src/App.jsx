import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { baseTheme } from './styles/theme';
import Router from './routes/Router';

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  );
}

export default App;
