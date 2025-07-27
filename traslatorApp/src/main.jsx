import { StrictMode } from 'react'

import { BrowserRouter } from 'react-router'
import {Routes, Route} from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Verbes from './Verbes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
<Routes>

    <Route path="/" element={<App/>} />
    <Route path="/verbes" element={<Verbes/>} />

</Routes>
</BrowserRouter>
  </StrictMode>,
)
