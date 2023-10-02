import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthProvider from './Context/AuthContext.tsx'
import TodoProvider from './Context/TodoContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <TodoProvider>
    <App />
    </TodoProvider>
    </AuthProvider>
    </BrowserRouter>
    <Analytics />
  </React.StrictMode>,
)
