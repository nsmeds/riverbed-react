import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './app.css';
import routes from './router';

ReactDOM.render(
  routes,
  document.getElementById('root')
);
