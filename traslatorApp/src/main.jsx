import { StrictMode } from 'react'

import { BrowserRouter } from 'react-router'
import {Routes, Route} from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import Verbes from './Verbes.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <App>
      <BrowserRouter>
      <Routes>  

        <Route path="/" element={<Home/>} />
        <Route path="/verbes" element={<Verbes/>} />

      </Routes>
      </BrowserRouter>
    </App>
  </StrictMode>,
)
