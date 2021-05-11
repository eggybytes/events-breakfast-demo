import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Order } from '../../../../../protos/order/order_pb';
import BreakfastIllustration from '../../../commons/components/BreakfastIllustration';
import colors from '../../../commons/utils/colors';
import history from '../../../commons/utils/history';
import sizes from '../../../commons/utils/sizes';
import { durations } from '../../../commons/utils/styles';
import typography from '../../../commons/utils/typography';
import { foodItems } from '../index';

const useStyles = makeStyles((_) => ({
  illustrationDiv: {
    maxWidth: sizes[11],
  },
  breakfastHeader: {
    color: colors.neutral[900],
    fontSize: typography.fontSizes[7],
    fontWeight: 600,
    paddingBottom: sizes[3],
  },
  orderHeader: {
    color: colors.neutral[800],
    fontSize: typography.fontSizes[10],
    fontWeight: 600,
    paddingBottom: sizes[3],
  },
  orderItems: {
    color: colors.neutral[700],
    fontSize: typography.fontSizes[4],
    fontWeight: 400,
    paddingTop: sizes[2],
    paddingBottom: sizes[6],
  },
  orderItem: {
    paddingLeft: sizes[1],
    paddingRight: sizes[1],
  },
  reloadButton: {
    color: colors.neutral[900],
    fontSize: typography.fontSizes[4],
    fontWeight: 500,
    backgroundColor: colors.primary[500],
    height: sizes[7],
    borderRadius: sizes[7] / 2,
    paddingLeft: sizes[2],
    paddingRight: sizes[2],
    paddingTop: '10px',
    maxWidth: sizes[12],
    cursor: 'pointer',
    transition: durations.short,
    '&:hover': {
      backgroundColor: colors.primary[400],
      transition: durations.short,
    },
  },
}));

type SuccessGridProps = {
  order: Order.AsObject,
};

function SuccessGrid({ order }: SuccessGridProps) {
  const classes = useStyles();

  return (
    <Grid container
      direction="column">
      <div className={classes.illustrationDiv}>
        <BreakfastIllustration />
      </div>
      <div className={classes.breakfastHeader}>
        Breakfast is on the way!
      </div>
      <div className={classes.orderHeader}>
        ORDER # {order.id}
      </div>
      <Grid item
        container direction="row"
        className={classes.orderItems}>
        {order.itemIdsList.map((itemId, i) =>
          <Grid key={i}
            item
            className={classes.orderItem}>
            1 {foodItems[itemId].name}
          </Grid>
        )}
      </Grid>
      <Grid item
        container
        direction="row"
        justify="flex-end"
        onClick={() => {
          history.go(0);
        }}>
        <Grid item
          container
          justify="center"
          alignItems="baseline"
          className={classes.reloadButton}>
          order more breakfast?
        </Grid>
      </Grid>
    </Grid>
  );
}

export default SuccessGrid;
