import { fade } from '@material-ui/core/styles';

import colors from './colors';

export const durations = {
  extrashort: '0.1s',
  short: '0.2s',
  medium: '0.3s',
  long: '0.5s',
  extralong: '0.75s',
};

export const boxShadows = {
  lg: `0 10px 24px ${fade(colors.neutral[800], 0.2)}`,
};
