import 'babel-polyfill';
import 'fastclick';
import 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import './styles/main.scss';

import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();

const routes = 	(
	<Provider store={store}>
	  <App />
	</Provider>
);

export default routes;
