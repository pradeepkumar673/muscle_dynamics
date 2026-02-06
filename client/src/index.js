// ===================================
// 💪 React Entry Point
// ===================================
// index.html la load pannanum

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// React root create pannatum
const root = ReactDOM.createRoot(document.getElementById('root'));

// Strict mode la app render pannatum (development warnings show pannatum)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);