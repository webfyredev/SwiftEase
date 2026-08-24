import { FaCar} from 'react-icons/fa';
import { Link,NavLink } from 'react-router-dom';
import logoImg from '../images/logo.webp'
import { FaTimes, FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { scrollLeft } from '../effects/motions';
import { useState } from 'react';
export default function NavBar(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
            <nav className="flex h-auto w-full flex items-center justify-between shadow-md px-10 bg-[#FFFFFF] relative py-1.5">
                <div className="flex items-center text-blue-500 cursor-pointer ml-[-10%] md:ml-[-5%] lg:ml-0">
                    {/* <FaCar  className='mr-1 ' size={20}/> */}
                    <img src={logoImg} className='w-15 h-10'/>
                    <h3 className='font-bold text-xl lg:ml-[-10%] ml-[-8%]'>
                        Swift<span className='text-[#FACC15]'>Ease</span> 
                    </h3>
                </div>
                <ul className='hidden lg:flex flex-row items-center space-x-2 px-2 py-2 outline-none ml-10'>
                    <li className='px-4 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md'>
                        <NavLink to="/" end className={({isActive}) => `${isActive ? 'text-[#2563EB] font-semibold' : 'text-gray-700'}`}>
                            Home
                        </NavLink>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md'>
                        <NavLink to="/services" className={({isActive}) => `${isActive ? 'text-[#2563EB] font-semibold' : 'text-gray-700'}`}>
                            Services
                        </NavLink>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md'>
                        <NavLink to="/trackings" className={({isActive}) => `${isActive ? 'text-[#2563EB] font-semibold' : 'text-gray-700'}`}>
                            Tracking
                        </NavLink>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md'>
                        <NavLink to="/pricings" className={({isActive}) => `${isActive ? 'text-[#2563EB] font-semibold' : 'text-gray-700'}`}>
                            Pricing
                        </NavLink>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md'>
                        <NavLink to="/contacts" className={({isActive}) => `${isActive ? 'text-[#2563EB] font-semibold' : 'text-gray-700'}`}>
                            Contacts
                        </NavLink>
                    </li>
                </ul>
                <div className='hidden lg:flex space-x-4'>
                    <Link to="/login" className='px-4 py-2 text-gray-700 text-sm font-medium rounded-md cursor-pointer'>
                        Log in
                    </Link>
                    <button className='px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-md cursor-pointer'>
                        Sign up
                    </button>
                </div>
                
                <button onClick={() => setIsOpen(!isOpen)} className='lg:hidden flex cursor-pointer text-blue-500 hover:bg-[#DBEAFE] hover:text-[#2563EB] transition-all duration-300 py-2.5 px-3 rounded-lg'>
                    {/* {isOpen ? <FaTimes  size={20}/> : <FaBars size={20}/>} */}
                    {isOpen ? <FaTimes  size={20}/> : <FaBars size={20} />}
                </button>
                {isOpen && (
                    <motion.div {...scrollLeft} className='lg:hidden absolute top-12 left-0 z-50 w-full h-auto space-y-4 bg-white border-t-1 border-gray-100'>
                        <ul className='flex flex-col items-left px-5 py-5 outline-none space-y-3'>
                        <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                            <NavLink to="/" className={({isActive}) => `${isActive ? 'text-[#2563EB] font-semibold' : 'text-gray-700'}`}>
                                Home
                            </NavLink>
                        </li>
                        <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                            <NavLink to="/services" className={({isActive}) => `${isActive ? 'text-[#2563EB] font-semibold' : 'text-gray-700'}`}>
                                Services
                            </NavLink>
                        </li>
                        <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                            <NavLink to="/trackings" className={({isActive}) => `${isActive ? 'text-[#2563EB] font-semibold' : 'text-gray-700'}`}>
                                Tracking
                            </NavLink>
                        </li>
                        <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                            <NavLink to="/pricings" className={({isActive}) => `${isActive ? 'text-[#2563EB] font-semibold' : 'text-gray-700'}`}>
                                Pricing
                            </NavLink>
                        </li>
                        <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                            <NavLink to="/contacts" className={({isActive}) => `${isActive ? 'text-[#2563EB] font-semibold' : 'text-gray-700'}`}>
                                Contacts
                            </NavLink>
                        </li>
                        <button className='px-5 py-3 bg-[#DBEAFE] text-blue-500 text-xs font-semibold rounded-md cursor-pointer'>
                            Log in
                        </button>
                        <button className='px-5 py-3 bg-blue-500 text-white text-xs font-semibold rounded-md cursor-pointer'>
                            Sign up
                        </button>
                    </ul> 
                    </motion.div>
                )}
            </nav>
        </>
    );
}