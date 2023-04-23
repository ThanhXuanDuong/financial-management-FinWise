import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        background:{
            default: '#484E54',
        },
        primary: {
            main: '#20C6BE',
            light:'#1AF7F5',
            contrastText:'#ffffff'
        },
        secondary: {
            main: '#DEE0E6',
            contrastText:'#ffffff'
        },

    },
});
export default theme;