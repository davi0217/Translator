import { StrictMode, useRef } from 'react'

import { BrowserRouter } from 'react-router'
import {Routes, Route} from 'react-router'
import { createRoot } from 'react-dom/client'
import {useSearchParams} from 'react-router-dom'

import Home from './Home.jsx'
import Component from './Component.jsx'
import App from './App.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>

      <BrowserRouter>
    <App>
      <Routes>  

        <Route path="/" element={<Home/>} />
        <Route path="/component/:filter" element={<Component/>} />
        {/* <Route path="/Adjectifs" element={<Component/>} />
        <Route path="/Adverbs" element={<Component/>} />
        <Route path="/Vocabulaire" element={<Component/>} />
        <Route path="/Façons" element={<Component/>} /> */}

      </Routes>
    </App>
      </BrowserRouter>
  </StrictMode>,
)
