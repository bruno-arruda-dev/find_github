import React from 'react';
import { HashRouter as Router } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router basename='/find_github'>
      <App />
    </Router>
  </React.StrictMode>,
)
