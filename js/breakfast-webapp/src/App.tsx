import React, { ReactElement } from 'react';
import { createMuiTheme, CssBaseline, makeStyles, MuiThemeProvider } from '@material-ui/core';

import './commons/assets/fonts-common.css';

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0, // xs is 0-350 wide
      sm: 350, // sm is 350-680
      md: 680, // md is 680-1200
      lg: 1200, // lg is 1200-1920
      xl: 1920, // xl is enormous
    },
  },
});

const useStyles = makeStyles((_) => ({
  wrapper: {
    fontFamily: 'Inter, sans-serif',
    margin: 0,
    padding: 0,
    minHeight: '100%',
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
  },
}));

type AppProps = {
  children: ReactElement,
}

const App = ({ children }: AppProps) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <MuiThemeProvider theme={theme}>
        <main className={classes.main}>
          <CssBaseline />
            {children}
        </main>
      </MuiThemeProvider>
    </div>
  );
};

export default App;
