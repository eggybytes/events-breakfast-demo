import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreRoundedIcon from '@material-ui/icons/ExpandMoreRounded';

import { CreateOrderResponse, Item } from '../../../../protos/order/order_pb';
import { createOrder, createOrderResponseErrorMap, createOrderRpcName } from '../../api/orderApi';
import { ROOT_HELMET_DESCRIPTION } from '../../commons/consts';
import Helmet from '../../commons/components/Helmet';
import ErrorBox from '../../commons/components/ErrorBox';
import { RootState } from '../../commons/types';
import { grpcUnretriableError, maxRetryError } from '../../commons/utils/apiErrors';
import colors from '../../commons/utils/colors';
import sizes, { borderRadii } from '../../commons/utils/sizes';
import { boxShadows, durations } from '../../commons/utils/styles';
import typography from '../../commons/utils/typography';
import SuccessGrid from './components/SuccessGrid';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '90%',
    maxWidth: sizes[15],
    margin: 'auto',
    paddingTop: sizes[5],
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '85%',
    },
  },
  labelGrid: {
    fontSize: typography.fontSizes[8],
    fontWeight: 600,
    color: colors.neutral[700],
  },
  formGrid: {
    fontSize: typography.fontSizes[10],
    fontWeight: 600,
    color: colors.neutral[900],
    paddingTop: sizes[5],
    paddingBottom: sizes[5],
  },
  moreIcon: {
    fontSize: typography.fontSizes[10],
    color: colors.primary[500],
    marginBottom: -sizes[3],
    cursor: 'pointer',
  },
  addButton: {
    color: colors.neutral[950],
    backgroundColor: colors.primary[400],
    height: sizes[9],
    maxWidth: sizes[9],
    borderRadius: sizes[9] / 2,
    cursor: 'pointer',
    transition: durations.short,
    '&:hover': {
      backgroundColor: colors.primary[300],
      transition: durations.short,
    },
  },
  addButtonText: {
    margin: 'auto',
  },
  currentOrder: {
    color: colors.neutral[700],
    fontSize: typography.fontSizes[4],
    fontWeight: 400,
    paddingTop: sizes[2],
    paddingBottom: sizes[4],
  },
  currentOrderLabel: {
    fontWeight: 500,
    paddingRight: sizes[1],
  },
  currentOrderItem: {
    paddingLeft: sizes[1],
    paddingRight: sizes[1],
  },
  submitButton: {
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
  successMessage: {
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
  },
  menuPaper: {
    borderRadius: borderRadii[4],
    boxShadow: boxShadows.lg,
    paddingLeft: sizes[2],
    paddingRight: sizes[2],
  },
  menuItem: {
    color: colors.neutral[700],
    fontSize: typography.fontSizes[6],
    fontWeight: 600,
    justifyContent: 'flex-start',
    '&.Mui-selected': {
      color: colors.neutral[800],
      backgroundColor: 'unset',
    },
    '&.Mui-selected:hover': {
      color: colors.neutral[600],
      backgroundColor: 'unset',
    },
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'unset',
      color: colors.neutral[600],
      cursor: 'pointer',
      transition: durations.short,
    },
  },
}));

const customerId = 123;

export const foodItems: Item.AsObject[] = [
  {
    id: 0,
    name: 'egg 🍳',
  },
  {
    id: 1,
    name: 'pancake 🥞',
  },
  {
    id: 2,
    name: 'potato 🥔',
  },
  {
    id: 3,
    name: 'bone 🍖',
  },
  {
    id: 4,
    name: 'bag\'tte 🥖',
  },
  {
    id: 5,
    name: 'choco 🍫',
  },
];

function OrderBreakfastScreen() {
  const dispatch = useDispatch();
  const createRpcState = useSelector((state: RootState) => state.api.rpcStates.has(createOrderRpcName) ? state.api.rpcStates.get(createOrderRpcName) : null);
  const returnedOrder = useSelector((state: RootState) => state.order.currentOrder);

  const classes = useStyles();

  const [ menuAnchorEl, setMenuAnchorEl ] = useState<Element | null>(null);
  const [ selectedMenuItem, setSelectedMenuItem ] = useState<Item.AsObject | null>(foodItems[0]);
  const [ currentOrderItems, setCurrentOrderItems ] = useState<Item.AsObject[]>([]);
  const [ overallError, setOverallError ] = useState('');

  // When RPC returns, change local errors based on success/error state
  useEffect(() => {
    if (!createRpcState) {
      // RPC state is unknown (probably hasn't been dispatched yet)
      return;
    }

    if (createRpcState.isLoading) {
      // RPC has been dispatched but hasn't returned
      return;
    }

    if (!createRpcState.error) {
      // RPC returned successfully; clear old errors
      setOverallError('');
    }

    // RPC returned with error
    switch (createRpcState.error) {
      case grpcUnretriableError:
      case maxRetryError:
      case createOrderResponseErrorMap[CreateOrderResponse.Error.UNKNOWN]: {
        setOverallError('We\'re sorry, something went wrong. Please try again.');
        break;
      }
      case createOrderResponseErrorMap[CreateOrderResponse.Error.OUT_OF_ITEMS]: {
        setOverallError('We\'re sorry, we\'re out of items.');
        break;
      }
      case createOrderResponseErrorMap[CreateOrderResponse.Error.SERVER_UNRECOVERABLE]: {
        setOverallError('We\'re sorry, something went wrong. Please try again.');
        break;
      }
    }
  }, [createRpcState]);

  const handleSubmit = () => {
    if (currentOrderItems.length > 0) {
      dispatch(createOrder(customerId, currentOrderItems.map((item) => item.id)));
    }
    return;
  };

  return (
    <>
      <Helmet
        title="Order breakfast"
        description={ROOT_HELMET_DESCRIPTION} />
      <Grid container
        direction="column"
        className={classes.container}>
        {returnedOrder ?
        <SuccessGrid order={returnedOrder} /> :
        <>
          <Grid item
            className={classes.labelGrid}>
            dear breakfast provider,<br />
            I would like
          </Grid>
          <Grid item
            container
            direction="row"
            justify="space-between"
            className={classes.formGrid}>
            <Grid item xs={8}
              container
              direction="row"
              justify="flex-start">
              <Grid item>
                {selectedMenuItem && selectedMenuItem.name}
              </Grid>
              <div onClick={(e) => setMenuAnchorEl(e.currentTarget)}>
                <ExpandMoreRoundedIcon className={classes.moreIcon} />
              </div>
            </Grid>
            <Grid item xs={4}
              container
              direction="row"
              justify="center"
              alignItems="baseline"
              className={classes.addButton}
              onClick={() => {
                if (selectedMenuItem) {
                  setCurrentOrderItems([...currentOrderItems, selectedMenuItem]);
                }
              }}>
              <Grid item>+</Grid>
            </Grid>
          </Grid>
          {currentOrderItems.length > 0 &&
          <>
            <Grid item
              container direction="row"
              className={classes.currentOrder}>
              <Grid item
                className={classes.currentOrderLabel}>
                current order
              </Grid>
              {currentOrderItems.map((item, i) =>
                <Grid key={i}
                  item
                  className={classes.currentOrderItem}>
                  1 {item.name}
                </Grid>
              )}
            </Grid>
            <Grid item
              container
              direction="row"
              justify="flex-end"
              onClick={handleSubmit}>
              <Grid item
                container
                justify="center"
                alignItems="baseline"
                className={classes.submitButton}>
                please send breakfast
              </Grid>
            </Grid>
          </>}
          {overallError !== '' &&
          <ErrorBox text={overallError} />}
          <Menu
            id="breakfast-menu"
            classes={{paper: classes.menuPaper}}
            anchorEl={menuAnchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            open={Boolean(menuAnchorEl)}
            onClose={() => setMenuAnchorEl(null)}>
            {foodItems.map((item: Item.AsObject) =>
              <MenuItem
                selected={selectedMenuItem ? selectedMenuItem.name === item.name : false}
                key={item.id}
                value={item.name}
                onClick={() => {
                  setMenuAnchorEl(null);
                  setSelectedMenuItem(item);
                }}
                className={classes.menuItem}>
                {item.name}
              </MenuItem>
            )}
          </Menu>
        </>}
      </Grid>
    </>
  );
}

export default OrderBreakfastScreen;
