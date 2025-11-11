import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AmiiboProvider } from './contexts/AmiiboContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AmiiboProvider>
      <App />
    </AmiiboProvider>
  </StrictMode>,
)
