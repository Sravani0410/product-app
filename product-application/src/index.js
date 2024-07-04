import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Ensure you import BrowserRouter
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store
import App from './App';
import './index.css';
import './styles.css'

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
