import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/index.scss';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
			<footer>
				<span>Muhammad Edo Wardaya</span>
				<span>|</span>
				<span>&copy;Copyright 2024</span>
			</footer>
		</Provider>
	</React.StrictMode>
);
