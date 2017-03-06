import React from 'react'; //eslint-disable-line
import ReactDOM from 'react-dom';
import App from './components/App'; //eslint-disable-line
import './app.css';
import routes from './router';

ReactDOM.render(
  routes,
  document.getElementById('root')
);
