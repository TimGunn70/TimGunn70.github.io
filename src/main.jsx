import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import './styles/navbar.css'
import './styles/home.css'
import './styles/projects.css'
import './styles/about.css'
import './styles/games.css'
import './styles/tictactoe.css'
import './styles/responsive.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
