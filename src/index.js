import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import './styles/index.css';
import { ToastProvider } from 'react-toast-notifications';

import { AuthProvider } from './providers/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    {/* wrap the App component with AuthProvider */}

    <ToastProvider
      autoDismiss
      autoDismissTimeout={3000}
      placement={'top-right'}
    >
      <App />
    </ToastProvider>
  </AuthProvider>
);
