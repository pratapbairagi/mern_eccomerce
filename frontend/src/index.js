import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux"
import store from './redux/store';
import {Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"

import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertProvider template={AlertTemplate} timeout={5000} >
    <App />
    </AlertProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
