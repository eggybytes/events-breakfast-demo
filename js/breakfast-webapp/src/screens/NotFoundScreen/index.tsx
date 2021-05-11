import React from 'react';
import { Container, CssBaseline, makeStyles } from '@material-ui/core';

import Helmet from '../../commons/components/Helmet';
import { ROOT_HELMET_DESCRIPTION } from '../../commons/consts';
import typography from '../../commons/utils/typography';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(4, 8, 4, 8),
  },
  title: {
    fontSize: typography.fontSizes[7],
    fontWeight: 600,
    margin: 0,
    padding: 0,
  },
}));


function NotFoundScreen() {
  const classes = useStyles();

  return (
    <>
      <Helmet
        title="404 no srv"
        description={ROOT_HELMET_DESCRIPTION} />
      <CssBaseline />
      <Container
        maxWidth="md"
        className={classes.mainContainer}>
        <h1 className={classes.title}>
          404
        </h1>
      </Container>
    </>
  );
}

export default NotFoundScreen;
