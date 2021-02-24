import { createMuiTheme, darken, lighten } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    customGreen: PaletteColor;
  }

  interface PaletteOptions {
    customGreen: PaletteColor;
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#007bff',
    },
    secondary: {
      main: '#1c2337',
    },
    customGreen: {
      main: '#6cb830',
      light: lighten('#6cb830', 0.1),
      dark: darken('#6cb830', 0.1),
      contrastText: '#fff',
    }
  },
});