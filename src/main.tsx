import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { LuchadorProvider } from './context/LuchadoresContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LuchadorProvider>
      <App />
    </LuchadorProvider>
  </React.StrictMode>,
)
