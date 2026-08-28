import { useState } from 'react'
import Home from './pages/home'
import Service from './pages/services'
import PageToTop from './components/pageToTop'
import Trackings from './pages/trackings'
import Pricings from './pages/pricings'
import Contacts from './pages/contacts'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/login'
import Register from './pages/register'
import { AuthProvider } from './context/AuthContext'
import SecuredRoute from './components/securedRoutes'
import C_Dashboard from './pages/customer/dashboard'
import Customer_Sidebar_Dashboard from './pages/customer/components/customerSidebar'
import Shipments from './pages/customer/shipments'
import Book_Shipments from './pages/customer/bookShipments'
import Track_Package from './pages/customer/trackPackage'
import Pickup_Scheduling from './pages/customer/pickup'
import Wallet from './pages/customer/wallet'
import Support_Ticket from './pages/customer/supportTicket'
import Notifications from './pages/customer/notifications'
import Settings from './pages/customer/settings'

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <PageToTop />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/services' element={<Service />}></Route>
            <Route path='/trackings' element={<Trackings />}></Route>
            <Route path='/pricings' element={<Pricings />}></Route>
            <Route path='/contacts' element={<Contacts />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            <Route path='*' element={<Navigate to="/login" replace />}></Route>

            # Customer Routes 
            <Route path='/customer' element={<SecuredRoute allowedRole="customer">
              <Customer_Sidebar_Dashboard />
              </SecuredRoute>}
            >
              <Route index element={<Navigate to ="/dashboard"  replace/>}></Route>
              <Route path='dashboard' element={<C_Dashboard />}></Route>
              <Route path='shipments' element={<Shipments />}></Route>
              <Route path='book_shipments' element={<Book_Shipments />}></Route>
              <Route path='track_package' element={<Track_Package />}></Route>
              <Route path='pickup' element={<Pickup_Scheduling />}></Route>
              <Route path='wallet' element={<Wallet />}></Route>
              <Route path='support_tickets' element={<Support_Ticket />}></Route>
              <Route path='notifications' element={<Notifications />}></Route>
              <Route path='settings' element={<Settings />}></Route>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
