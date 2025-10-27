import { FaCar} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.webp'
import { FaTimes, FaBars } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { scrollLeft } from '../effects/motions';
import { useState } from 'react';
export default function NavBar(){
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
            <nav className="flex h-auto w-full flex items-center justify-between shadow-md px-10 bg-[#FFFFFF] relative">
                <div className="flex items-center text-blue-500 cursor-pointer ml-[-10%] md:ml-[-5%] lg:ml-0">
                    {/* <FaCar  className='mr-1 ' size={20}/> */}
                    <img src={logoImg} className='w-15 h-10'/>
                    <h3 className='font-bold text-xl lg:ml-[-8%] ml-[-8%]'>
                        SwiftEase
                    </h3>
                </div>
                <ul className='hidden lg:flex flex-row items-center space-x-2 px-5 py-2 outline-none'>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                        <Link to="/">
                            Home
                        </Link>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                        <Link to='/about'>
                            About
                        </Link>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                        <Link to="/services">
                            Services
                        </Link>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                        <Link to="/trackings">
                            Tracking
                        </Link>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                        <Link to="/pricings">
                            Pricing
                        </Link>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                        <Link>
                            Contacts
                        </Link>
                    </li>

                    <button className='px-5 py-2.5 bg-blue-500 text-white text-xs font-semibold rounded-md cursor-pointer'>
                        Track Shipment
                    </button>
                </ul>
                <button onClick={() => setIsOpen(!isOpen)} className='lg:hidden flex cursor-pointer text-blue-500 hover:bg-[#DBEAFE] hover:text-[#2563EB] transition-all duration-300 p-2'>
                    {/* {isOpen ? <FaTimes  size={20}/> : <FaBars size={20}/>} */}
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
                {isOpen && (
                    <motion.div {...scrollLeft} className='lg:hidden absolute top-12 left-0 z-50 w-full h-auto space-y-4 bg-white'>
                        <ul className='flex flex-col items-left px-5 py-5 outline-none space-y-3'>
                        <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                            <Link to="/about">
                                About
                            </Link>
                        </li>
                        <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                            <Link to="/services">
                                Services
                            </Link>
                        </li>
                        <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                            <Link to="/trackings">
                                Tracking
                            </Link>
                        </li>
                        <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                            <Link to="/pricings">
                                Pricing
                            </Link>
                        </li>
                        <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                            <Link>
                                Contacts
                            </Link>
                        </li>

                        <button className='px-5 py-3 bg-blue-500 text-white text-xs font-semibold rounded-md cursor-pointer'>
                            Track Shipment
                        </button>
                    </ul> 
                    </motion.div>
                )}
            </nav>
        </>
    );
}