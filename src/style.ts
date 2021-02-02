/* eslint-disable import/prefer-default-export */
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { deepOrange, red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: red
  }
});
