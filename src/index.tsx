import React from 'react';
import ReactDOM from 'react-dom/client';
import './style.scss';
import './index.scss';
import { HashRouter } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { AuthProvider } from './context/AuthContext';
import { LoaderProvider } from './context/LoaderContext';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import { BackgroundMusicProvider } from './context/BackgroundMusicContext';
import './lib/amplify';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <LoaderProvider>
      <BackgroundMusicProvider>
        <HashRouter>
          <Navbar></Navbar>
          <AppRouter />
          <Loader></Loader>
        </HashRouter>
      </BackgroundMusicProvider>
    </LoaderProvider>
  </AuthProvider>
);
