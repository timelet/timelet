import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { deepOrange, red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary: red
  },
  typography: {
    h2: {
      fontSize: '1.6rem',
      marginBottom: '0.5rem'
    },
    h3: {
      fontSize: '1.2rem',
      marginBottom: '1rem'
    }
  }
});

export default theme;
