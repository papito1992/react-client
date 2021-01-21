import React from 'react';
import ReactDOM from 'react-dom';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import App from './App';
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: grey[800]
        }
    }
});
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <App/>

    </MuiThemeProvider>
    , document.getElementById('root'));
