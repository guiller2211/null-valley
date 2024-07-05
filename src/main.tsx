import "reshaped/themes/reshaped/theme.css";
import './index.css';

import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import { LuchadorProvider } from './context/LuchadoresContext'
import { Reshaped } from 'reshaped'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Reshaped theme="reshaped">
      <LuchadorProvider>
        <App />
      </LuchadorProvider>
    </Reshaped>
  </React.StrictMode>,
)
