import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { App } from './components/App';
import { reducers } from './store/reducers';
import thunk from 'redux-thunk';
import { ThemeProvider } from '@material-ui/core';
import { theme } from './mui-theme';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider> 
    </ThemeProvider>,
  document.getElementById('root')
);