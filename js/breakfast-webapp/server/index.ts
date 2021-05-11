import express, { Request, Response } from 'express';

import { getHeader, getFooter } from '../../commons/utils/html-template';

const ENV = 'local';
const HOST = '127.0.0.1';
const PORT = 1029;

const app = express();

const setHeaders = (res: Response) => {
  if (ENV === 'local') {
    res.setHeader('Cache-Control', 'max-age=0, no-cache');
  }
};

// Serve assets
app.use('/public/', express.static('dist/public', { setHeaders, index: false }));

// Serve static build directory
app.use('/', express.static('dist/static', { setHeaders, index: false }));

// Serve wrapper page
app.get('*', (_: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  return res.send(getHeader({}) + getFooter({ bundle: 'breakfast-webapp.bundle.js' }))
});

app.listen(PORT, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
