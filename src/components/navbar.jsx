import { FaCar} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logoImg from '../images/logo.webp'
import { useState } from 'react';
export default function NavBar(){
    const {isOpen, setIsOpen} = useState(false);
    return(
        <>
            <nav className="flex h-auto w-full flex items-center justify-between shadow-md px-10 bg-[#FFFFFF]">
                <div className="flex items-center text-blue-500 cursor-pointer">
                    {/* <FaCar  className='mr-1 ' size={20}/> */}
                    <img src={logoImg} className='w-15 h-10'/>
                    <h3 className='font-bold text-xl ml-[-8%]'>
                        SwiftEase
                    </h3>
                </div>
                <ul className='hidden lg:flex flex-row items-center space-x-2 px-5 py-2 outline-none'>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                        <Link>
                            Home
                        </Link>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                        <Link>
                            About
                        </Link>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                        <Link>
                            Services
                        </Link>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                        <Link>
                            Tracking
                        </Link>
                    </li>
                    <li className='px-5 py-2 text-[13px] text-gray-700 hover:cursor-pointer hover:text-[#2563EB] hover:font-semibold transition-all duration-500 hover:rounded-md hover:bg-[#DBEAFE]'>
                        <Link>
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
            </nav>
        </>
    );
}