import React from 'react';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

import Router from './routes/Router';
import { baseTheme } from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      <Router />
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // или 'light', 'dark' по желанию
      />
    </ThemeProvider>
  );
}

export default App;
