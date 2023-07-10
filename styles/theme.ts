import { Maven_Pro } from '@next/font/google'
import { createTheme } from '@mui/material/styles';

export const mavenPro = Maven_Pro({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['sans-serif'],
});
const theme = createTheme({
  typography: {
    fontFamily: mavenPro.style.fontFamily,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: `#05f4b7`
    },
    secondary: {
      main: `#2a1f2f`,
    },
    background: {
      default: `#000000`,
      paper: `#000000`,
    },

    text: {
      primary: `#ffffff`
    }
  }
})

export default theme;
