import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RootComponent from './components/root-component'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);
