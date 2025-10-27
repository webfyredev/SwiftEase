import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './pages/home'
import About from './pages/about'
import Service from './pages/services'
import PageToTop from './components/pageToTop'
import Trackings from './pages/trackings'
import Pricings from './pages/pricings'
import Contacts from './pages/contacts'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <PageToTop />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/services' element={<Service />}></Route>
        <Route path='/trackings' element={<Trackings />}></Route>
        <Route path='/pricings' element={<Pricings />}></Route>
        <Route path='/contacts' element={<Contacts />}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App
