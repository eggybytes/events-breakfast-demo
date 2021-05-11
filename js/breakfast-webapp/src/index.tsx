import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';
import history from './commons/utils/history';
import routes from './routes';
import { configureStore } from './store';

const root = document.getElementById('root');

const store = configureStore();

root &&
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App>
          {routes}
        </App>
      </Router>
    </Provider>,
    root
  );
