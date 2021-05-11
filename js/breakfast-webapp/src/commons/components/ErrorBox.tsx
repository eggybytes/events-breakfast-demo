import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

import colors from '../utils/colors';
import typography from '../utils/typography';
import sizes, { borderRadii } from '../utils/sizes';

const useStyles = makeStyles<Theme>((theme) => ({
  errorGrid: {
    backgroundColor: colors.error[100],
    borderRadius: borderRadii[3],
    border: `1px solid ${colors.error[600]}`,
    color: colors.error[700],
    fontSize: typography.fontSizes[2],
    fontWeight: 500,
    marginTop: sizes[7],
    marginBottom: sizes[3],
    paddingTop: sizes[3],
    paddingBottom: sizes[3],
    paddingLeft: sizes[3],
    paddingRight: sizes[3],
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  errorIcon: {
    fontSize: '45px',
  },
  errorRight: {
    paddingLeft: sizes[3],
    width: 'calc(100% - 55px)',
  },
  oopsHeaderText: {
    fontSize: typography.fontSizes[3],
    fontWeight: 700,
    marginBottom: sizes[1],
  }
}));

export type ErrorBoxProps = {
  header?: string;
  text: React.ReactNode;
};

function ErrorBox({ header, text }: ErrorBoxProps) {
  const classes = useStyles();

  return (
    <Grid container
      direction="row"
      justify="flex-start"
      alignItems="center"
      className={classes.errorGrid}
      wrap="nowrap">
      <Grid item>
        <ErrorOutlineIcon className={classes.errorIcon}/>
      </Grid>
      <Grid container item
        direction="column" classes={{root: classes.errorRight}}>
        <span className={classes.oopsHeaderText}>{header ? header : 'Oops!'}</span>
        {text}
      </Grid>
    </Grid>
  );
}

export default ErrorBox;
