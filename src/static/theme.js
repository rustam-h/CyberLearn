import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";

let theme = createMuiTheme({
    palette: {
        primary: {
            light: '#2f2fa2',
            main: '#242582',
            contrastText: '#fff',
        },
        secondary: {
            light: 'linear-gradient(45deg, #F64C72 30%, #fc644d 90%)',
            main: "#fc644d",
            dark: '#f64c72',
            contrastText: '#fff',
        },
    },
    typography: {
        "fontFamily": `"Noto Sans", sans-serif`,
    },
});

theme = responsiveFontSizes(theme);

export default theme;