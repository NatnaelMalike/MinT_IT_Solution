import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes.jsx'
import { AuthContextProvider } from './contexts/AuthContext'
import RoutesComponent from './routes.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RoutesComponent/>
    </AuthContextProvider>
  </React.StrictMode>,
)
