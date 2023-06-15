import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from "./config/router";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import './assets/sass/main.scss'
import MainPage from './layout/MainPage';

const theme = createTheme({
  pallete: {
    mode: 'light',
    primary: {
      main: '#4a4848'
    },
    secondary: {},
    warning: {},
    danger: {},
    success: {
      main: '#d0ab4b'
    },
  },
  typography: {
    fontFamily: "Montserrat Alternates",
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* <SnackbarProvider> */}
        <CssBaseline>
          {/* <MainPage /> */}
          <RouterProvider router={router} />
        </CssBaseline>
      {/* </SnackbarProvider> */}
    </ThemeProvider>
  </React.StrictMode>,
)
