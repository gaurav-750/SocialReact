import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import './styles/index.css';
import { ToastProvider } from 'react-toast-notifications';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ToastProvider autoDismiss autoDismissTimeout={3000} placement={'top-right'}>
    <App />
  </ToastProvider>
  // </React.StrictMode>
);
