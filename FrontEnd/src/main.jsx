import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from "./config/router";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import './assets/sass/main.scss'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#4a4848' // Black
    },
    secondary: {
      main: '#0098D4' // Light Blue
    },
    warning: {
      main: '#F4C504'// Yellow
    },
    success: {
      main: '#d0ab4b' // Gold
    },
    white: {
      main: '#fff' // White
    },
    green: {
      main: '#135413' // Green
    },
    redN: {
      main: '#de0d0d' // Red
    },
    transparent: {
      main: 'transparent'
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
