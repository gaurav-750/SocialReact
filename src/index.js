import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import './styles/index.css';
import { ToastProvider } from 'react-toast-notifications';

import { AuthProvider } from './providers/AuthProvider';
import { PostProvider } from './providers/PostProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ToastProvider autoDismiss autoDismissTimeout={3000} placement={'top-right'}>
    <AuthProvider>
      <PostProvider>
        {/* wrap the App component with AuthProvider */}
        <App />
      </PostProvider>
    </AuthProvider>
  </ToastProvider>
);
