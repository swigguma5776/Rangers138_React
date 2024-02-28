import { createTheme } from '@mui/material'; 

export const theme = createTheme({
    typography: {
        fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif'
    },
    palette: {
        primary: {
            main: '#00794E'
        },
        secondary: {
            main: '#151A29',
            light: '#2B4E5D'
        },
        info: {
            main: '#44469D'
        }
    }
})