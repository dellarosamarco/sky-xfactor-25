import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import './index.scss';
import { HashRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <HashRouter>
      <AppRouter />
    </HashRouter>
  </AuthProvider>
);
