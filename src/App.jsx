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
import Driver_Sidebar from './pages/drivers/components/sidebar'
import Driver_Dashboard from './pages/drivers/dashboard'
import Driver_Deliveries from './pages/drivers/deliveries'
import Drivers_Locations from './pages/drivers/location'
import Driver_Profiles from './pages/drivers/profile'
import Ad_S_Dashboard from './pages/admin_staff/dashboard'
import Ad_S_Sidebar from './pages/admin_staff/components/ad_s_sidebar'
import Ad_S_Shipments from './pages/admin_staff/shipments'
import Ad_S_Tickets from './pages/admin_staff/tickets'
import Ad_S_Drivers from './pages/admin_staff/drivers'
import Ad_S_Payments from './pages/admin_staff/payments'
import Ad_Fleets_Pricing from './pages/admin_staff/fleets_P'
import Ad_Staff_Management from './pages/admin_staff/staff'

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
            <Route path='/driver' element={
                <SecuredRoute allowedRole="driver">
                  <Driver_Sidebar />
                </SecuredRoute>
              }
            >
              <Route path='dashboard' element={<Driver_Dashboard />}></Route>
              <Route path='deliveries' element={<Driver_Deliveries />}></Route>
              <Route path='location' element={<Drivers_Locations />}></Route>
              <Route path='profile' element={<Driver_Profiles />}></Route>
            </Route>
            <Route path='/ad_s' element={
              <SecuredRoute allowedRole='staff'>
                <Ad_S_Sidebar />
              </SecuredRoute>
              } 
            >
              <Route path='dashboard' element={<Ad_S_Dashboard />}></Route>
              <Route path='shipments' element={<Ad_S_Shipments />}></Route>
              <Route path='tickets' element={<Ad_S_Tickets />}></Route>
              <Route path='drivers' element={<Ad_S_Drivers />}></Route>
              <Route path='payments' element={<Ad_S_Payments />}></Route>
            </Route>
            <Route path='/ad_s' element={
              <SecuredRoute allowedRole='admin'>
                <Ad_S_Sidebar />
              </SecuredRoute>
              } 
            >
              <Route path='dashboard' element={<Ad_S_Dashboard />}></Route>
              <Route path='shipments' element={<Ad_S_Shipments />}></Route>
              <Route path='tickets' element={<Ad_S_Tickets />}></Route>
              <Route path='drivers' element={<Ad_S_Drivers />}></Route>
              <Route path='payments' element={<Ad_S_Payments />}></Route>
              <Route path='fleets' element={<Ad_Fleets_Pricing />}></Route>
              <Route path='staffs_mngs' element={<Ad_Staff_Management />}></Route>

            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
