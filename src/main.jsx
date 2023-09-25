import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthCotextProvider } from './context/authContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthCotextProvider>
      <App />
    </AuthCotextProvider>
  </React.StrictMode>,
)
