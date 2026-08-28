import { FaCar} from 'react-icons/fa';
import { Link,NavLink } from 'react-router-dom';
import logoImg from '../images/dash.png'
import { FaTimes, FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { scrollLeft, scrollRight } from '../effects/motions';
import { useState } from 'react';
export default function NavBar(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
            <nav className="flex h-auto w-full flex items-center justify-between shadow-md px-10 bg-[#FFFFFF] relative py-1.5">
                <Link to="/" className="flex items-center text-blue-500 cursor-pointer ml-[-6%] md:ml-[-5%] lg:ml-0">
                    {/* <FaCar  className='mr-1 ' size={20}/> */}
                    <motion.img {...scrollRight} src={logoImg} className='w-13 h-8 mb-1'/>
                    <span className="flex items-center justify-center font-bold text-[#0F172A] text-lg mt-1.5"><h3 className='text-[#14B8A6]'>Swift</h3>Ease</span>
                </Link>
                <ul className='hidden lg:flex flex-row items-center space-x-2 px-2 py-2 outline-none ml-10'>
                    <li className='px-4 py-2 text-[13px] hover:cursor-pointer  transition-all duration-500 hover:rounded-md'>
                        <NavLink to="/" end className={({isActive}) => `${isActive ? 'text-[#14B8A6] font-semibold' : 'text-[#0F172A] hover:text-[#14B8A6]'}`}>
                            Home
                        </NavLink>
                    </li>
                    <li className='px-5 py-2 text-[13px] hover:cursor-pointer transition-all duration-500 hover:rounded-md'>
                        <NavLink to="/services" className={({isActive}) => `${isActive ? 'text-[#14B8A6] font-semibold' : 'text-[#0F172A] hover:text-[#14B8A6]'}`}>
                            Services
                        </NavLink>
                    </li>
                    <li className='px-5 py-2 text-[13px] hover:cursor-pointer transition-all duration-500 hover:rounded-md'>
                        <NavLink to="/trackings" className={({isActive}) => `${isActive ? 'text-[#14B8A6] font-semibold' : 'text-[#0F172A] hover:text-[#14B8A6]'}`}>
                            Tracking
                        </NavLink>
                    </li>
                    <li className='px-5 py-2 text-[13px] hover:cursor-pointer transition-all duration-500 hover:rounded-md'>
                        <NavLink to="/pricings" className={({isActive}) => `${isActive ? 'text-[#14B8A6] font-semibold' : 'text-[#0F172A] hover:text-[#14B8A6]'}`}>
                            Pricing
                        </NavLink>
                    </li>
                    <li className='px-5 py-2 text-[13px] hover:cursor-pointer transition-all duration-500 hover:rounded-md'>
                        <NavLink to="/contacts" className={({isActive}) => `${isActive ? 'text-[#14B8A6] font-semibold' : 'text-[#0F172A] hover:text-[#14B8A6]'}`}>
                            Contacts
                        </NavLink>
                    </li>
                </ul>
                <div className='hidden lg:flex space-x-4'>
                    <Link to="/login" className='px-4 py-2 hover:text-[#14B8A6]/80 text-[#14B8A6] text-sm font-medium rounded-md cursor-pointer'>
                        Log in
                    </Link>
                    <Link to="/register" className='px-4 py-2 bg-[#14B8A6] text-white text-sm font-medium rounded-md cursor-pointer'>
                        Sign up
                    </Link>
                </div>
                
                <button onClick={() => setIsOpen(!isOpen)} className='lg:hidden flex cursor-pointer hover:text-[#0F172A] text-[#0F172A]/80 transition-all duration-300 py-2.5 px-3 rounded-lg'>
                    {/* {isOpen ? <FaTimes  size={20}/> : <FaBars size={20}/>} */}
                    {isOpen ? <FaTimes  size={20}/> : <FaBars size={20} />}
                </button>
                {isOpen && (
                    <motion.div {...scrollLeft} className='lg:hidden absolute top-12 left-0 z-50 w-full h-auto space-y-4 bg-white border-t-1 border-gray-100'>
                        <ul className='flex flex-col items-left px-5 py-5 outline-none space-y-3'>
                            <li className='px-5 py-2 text-[13px] hover:cursor-pointer transition-all duration-500 hover:rounded-md hover:bg-[#14B8A6]/12'>
                                <NavLink to="/" className={({isActive}) => `${isActive ? 'text-[#14B8A6] font-semibold' : 'text-[#0F172A] hover:text-[#14B8A6]'}`}>
                                    Home
                                </NavLink>
                            </li>
                            <li className='px-5 py-2 text-[13px] hover:cursor-pointer transition-all duration-500 hover:rounded-md hover:bg-[#14B8A6]/12'>
                                <NavLink to="/services" className={({isActive}) => `${isActive ? 'text-[#14B8A6] font-semibold' : 'text-[#0F172A] hover:text-[#14B8A6]'}`}>
                                    Services
                                </NavLink>
                            </li>
                            <li className='px-5 py-2 text-[13px] hover:cursor-pointer transition-all duration-500 hover:rounded-md hover:bg-[#14B8A6]/12'>
                                <NavLink to="/trackings" className={({isActive}) => `${isActive ? 'text-[#14B8A6] font-semibold' : 'text-[#0F172A] hover:text-[#14B8A6]'}`}>
                                    Tracking
                                </NavLink>
                            </li>
                            <li className='px-5 py-2 text-[13px] hover:cursor-pointer transition-all duration-500 hover:rounded-md hover:bg-[#14B8A6]/12'>
                                <NavLink to="/pricings" className={({isActive}) => `${isActive ? 'text-[#14B8A6] font-semibold' : 'text-[#0F172A] hover:text-[#14B8A6]'}`}>
                                    Pricing
                                </NavLink>
                            </li>
                            <li className='px-5 py-2 text-[13px] hover:cursor-pointer transition-all duration-500 hover:rounded-md hover:bg-[#14B8A6]/12'>
                                <NavLink to="/contacts" className={({isActive}) => `${isActive ? 'text-[#14B8A6] font-semibold' : 'text-[#0F172A] hover:text-[#14B8A6]'}`}>
                                    Contacts
                                </NavLink>
                            </li>
                            <Link to="/login" className='px-5 py-3 bg-[#14B8A6]/12 text-[#14B8A6] text-xs font-semibold rounded-md cursor-pointer flex items-center justify-center'>
                                Log in
                            </Link>
                            <Link to="/register" className='px-5 py-3 bg-[#14B8A6] text-white text-xs font-semibold rounded-md cursor-pointer flex items-center justify-center'>
                                Sign up
                            </Link>
                        </ul> 
                    </motion.div>
                )}
            </nav>
        </>
    );
}