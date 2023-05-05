import { createTheme } from '@mui/material/styles';

const themeDark = createTheme({
    palette: {
        mode:'dark',
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
            contrastText:'#000000'
        },

    },
});

export default themeDark;