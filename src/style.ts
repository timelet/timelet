/* eslint-disable import/prefer-default-export */
import { createMuiTheme } from "@material-ui/core";
import { deepOrange, red } from "@material-ui/core/colors";

export const theme = createMuiTheme({
  palette: {
    primary: deepOrange,
    secondary:red
  }
});
