import React from 'react';
import { HashRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { FavoriteUserProvider } from './context/FavoriteUserContext.tsx';
import { FavoriteRepoProvider } from './context/FavoriteRepoContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <FavoriteUserProvider>
      <FavoriteRepoProvider>
        <Router>
          <App />
        </Router>
      </FavoriteRepoProvider>
    </FavoriteUserProvider>
  </React.StrictMode>,
)