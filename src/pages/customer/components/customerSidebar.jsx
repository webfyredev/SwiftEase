import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import logoImg from '../../../images/dash.png'
import { LuBell, LuCalendarClock, LuLayoutDashboard, LuLogOut, LuMapPin, LuPackage, LuPackagePlus, LuTicket, LuUserCog, LuWallet } from 'react-icons/lu'
// import { FaXMark } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { NavLink, Link } from "react-router-dom";
import { FaXmark } from 'react-icons/fa6';

import { FaGripLines, FaWallet } from "react-icons/fa";
import api from "../../../api/axios";
import { buttonHover, scrollRight } from "../../../effects/motions";


export default function Customer_Sidebar_Dashboard(){
    const { user, logout} = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [unread, setUnread] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/notifications/notifications/")
        .then((res) => {
            const count = res.data.results?.filter((n) => !n.is_read).length ?? 0;
            setUnread(count);
        })
        .catch(() => {})
    }, []);

    const handleLogout = async () => {
        await logout()
        navigate("/login", { replace: true })
    }

    return(
        <>
            <div className='w-full h-screen flex overflow-hidden'>
                <div className="w-[20%] h-screen bg-white border-r-1 border-slate-100 hidden lg:flex flex-col fixed left-0 top-0">
                    <div className="w-full h-15 border-b-1 border-slate-100 flex items-center px-2.5">
                        <motion.img {...scrollRight} src={logoImg} alt="Logo_image" className='w-15 h-10'/>
                        <div className='w-auto flex flex-col mt-1 '>
                            <span className="flex items-center justify-center font-bold text-[#0F172A] text-lg mt-1.5"><h3 className='text-[#14B8A6]'>Swift</h3>Ease</span>
                            {/* <p className='text-[11px] text-slate-400 font-semibold'>Logistics Dashboard</p> */}
                        </div>
                    </div>
                    <div className='w-full h-full flex flex-col items-center justify-between py-3 mt-2'>
                        <div className='w-full px-2.5 flex flex-col space-y-2'>
                            <NavLink to="/customer/dashboard" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuLayoutDashboard  className='mt-0.5'/>
                                <span>Dashboard</span>
                            </NavLink>
                            <NavLink to="/customer/shipments" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuPackage  className='mt-0.5'/>
                                <span>My Shipments</span>
                            </NavLink>
                            <NavLink to="/customer/book_shipments" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuPackagePlus  className='mt-0.5'/>
                                <span>Book Shipment</span>
                            </NavLink>
                            <NavLink to="/customer/track_package" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuMapPin  className='mt-0.5'/>
                                <span>Track Package</span>
                            </NavLink>
                            <NavLink to="/customer/pickup" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuCalendarClock className='mt-0.5'/>
                                <span>Pickup Scheduling</span>
                            </NavLink>
                            <NavLink to="/customer/wallet" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuWallet  className='mt-0.5'/>
                                <span>Wallet</span>
                            </NavLink>
                            <NavLink to="/customer/support_tickets" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuTicket  className='mt-0.5'/>
                                <span>Support Tickets</span>
                            </NavLink>
                            <NavLink to="/customer/notifications" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuBell  className='mt-0.5'/>
                                <span>Notifications</span>
                            </NavLink>
                            <NavLink to="/customer/settings" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                <LuUserCog  className='mt-0.5'/>
                                <span>Profile & Settings</span>
                            </NavLink>

                            <motion.button 
                                {...buttonHover}
                                onClick={handleLogout}
                                className="cursor-pointer absolute px-3 py-2.5 flex items-center space-x-3 bottom-5 w-[90%] font-medium text-[13px] rounded-lg text-[#ef4444] hover:bg-[#fef2f2]">
                                <LuLogOut  className='mt-0.5'/>
                                <span>Logout</span> 
                            </motion.button>
                        </div>
                    </div>
                </div>
                {mobileMenuOpen && (
                    <div className='fixed inset-0 z-50 lg:hidden'>
                        <div onClick={() => setMobileMenuOpen(false)} className='absolute inset-0 bg-black/40'>
                            <motion.div 
                                // {...scrollLeft}
                                className='absolute left-0 top-0 h-full w-[55%] max-w-xs bg-white flex flex-col shadow-sm'>
                                <div className='w-full h-15 border-b border-slate-100 flex items-center justify-between px-3'>
                                    <div className='flex items-center'>
                                        <motion.img {...scrollRight} src={logoImg} alt='Logo' className='w-12 h-8 ml-[-10px]' />
                                        <div className='flex flex-col'>
                                            <h3 className='font-bold text-[#14B8A6] text-lg mt-2'>SwiftEase</h3>
                                            {/* <p className='text-[11px] text-slate-400 font-semibold'>Patient Portal</p> */}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer'
                                    >
                                        <FaXmark className='w-6 h-6 text-[#0F172A] hover:text-[#0F172A]/80 transition-all duration-300 mt-1' />
                                    </button>
                                </div>
                                <div className='w-full h-full flex flex-col items-center justify-between py-3 mt-2'>
                                    <div className='w-full px-2.5 flex flex-col space-y-2.5'>
                                        <NavLink to="/customer/dashboard" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuLayoutDashboard  className='mt-0.5'/>
                                            <span>Dashboard</span>
                                        </NavLink>
                                        <NavLink to="/customer/shipments" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuPackage  className='mt-0.5'/>
                                            <span>My Shipments</span>
                                        </NavLink>
                                        <NavLink to="/customer/book_shipments" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuPackagePlus  className='mt-0.5'/>
                                            <span>Book Shipment</span>
                                        </NavLink>
                                        <NavLink to="/customer/track_package" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuMapPin  className='mt-0.5'/>
                                            <span>Track Package</span>
                                        </NavLink>
                                        <NavLink to="/customer/pickup" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuCalendarClock className='mt-0.5'/>
                                            <span>Pickup Scheduling</span>
                                        </NavLink>
                                        <NavLink to="/customer/wallet" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuWallet  className='mt-0.5'/>
                                            <span>Wallet</span>
                                        </NavLink>
                                        <NavLink to="/customer/support_tickets" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuTicket  className='mt-0.5'/>
                                            <span>Support Tickets</span>
                                        </NavLink>
                                        <NavLink to="/customer/notifications" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuBell  className='mt-0.5'/>
                                            <span>Notifications</span>
                                        </NavLink>
                                        <NavLink to="/customer/settings" className={({ isActive}) => `font-medium text-[13px] rounded-lg px-3 py-2.5 flex items-center space-x-3 ${isActive ? 'bg-[#14B8A6]/12 text-[#14B8A6]' : 'text-[#0F172A] hover:text-[#334155] hover:bg-[#f8fafc]'}`}>
                                            <LuUserCog  className='mt-0.5'/>
                                            <span>Profile & Settings</span>
                                        </NavLink>
                                        <motion.button 
                                            {...buttonHover}
                                            onClick={handleLogout}
                                            className="cursor-pointer absolute px-3 py-2.5 flex items-center space-x-3 bottom-5 w-[90%] font-medium text-[13px] rounded-lg text-[#ef4444] hover:bg-[#fef2f2]">
                                            <LuLogOut  className='mt-0.5'/>
                                            <span>Logout</span> 
                                        </motion.button>
                                    </div>
                                </div>
                                
                            </motion.div>
                        </div>
                    </div>
                )}
                <div className='w-full lg:w-[80%] lg:ml-[20%] flex flex-col h-screen'>
                    <div className='px-5 w-full lg:w-[80%] h-13 bg-white border-b-1 border-slate-100 flex justify-between items-center fixed top-0 right-0 w-[80%] z-10'>
                        <div className='flex items-center space-x-5'>
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className='lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-slate-100 cursor-pointer group'
                            >
                                <FaGripLines className='w-6 h-6 text-[#0F172A] transition-all duration-300' />
                            </button>
                        </div>
                        <div className='w-auto flex items-center space-x-4 lg:mr-5 p-3'>
                            <div className="flex items-center space-x-3 py-1.5 px-5 bg-gray-50 rounded-lg border-1 border-gray-200/50">
                                <FaWallet  className="text-[#14B8A6]"/>
                                <p className="font-medium">
                                    {user?.wallet_balance ? Number(user.wallet_balance).toLocaleString("en-NG", {minimumFractionDigits: 2}) : "0.00"}
                                </p>
                            </div> 
                            <button
                                onClick={() => navigate("/customer/notifications")} 
                                className='w-10 h-10 rounded-lg hover:bg-[#f8fafc] cursor-pointer flex items-center justify-center hidden md:flex relative'>
                                <LuBell  className='text-[#475569] '/>
                                {unread > 0 && (
                                    <span className='absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center text-[9px] text-white font-bold'>
                                        <p className='text-center'>{unread > 9 ? '9+' : unread}</p>
                                    </span>
                                )}
                            </button>
                            <Link to="/customer/settings" className='flex space-x-3 px-4 py-1 rounded-lg items-center hover:bg-[#f8fafc] cursor-pointer'>
                                {user?.avatar ? (
                                    <span className="w-8 h-8 rounded-full p-0.5 bg-[#14B8A6]/50">
                                        <img src={user.avatar} className="w-full h-full rounded-full" />
                                    </span>
                                ) : (
                                    <span className="w-8 h-8 rounded-full p-0.5 bg-[#14B8A6]/50">
                                        <div className="w-full h-full rounded-full flex items-center justify-center bg-white">
                                            {user?.full_name?.charAt(0).toUpperCase() ?? "U"}
                                        </div>
                                    </span>
                                )}
                                <div className="flex flex-col space-y-0">
                                    <h3 className="font-semibold text-[13px]">{user?.full_name}</h3>
                                    <a href={`mailto:${user?.email}`} className="text-[11px] text-gray-500 font-medium">
                                        {user?.email}
                                    </a>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="w-full p-5 mt-13 bg-[#f8fafc] overflow-y-auto flex-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}