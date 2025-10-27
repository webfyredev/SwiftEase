import logoImg from '../images/logo.webp'
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaLocationArrow, FaMobile, FaEnvelope} from 'react-icons/fa';
export default function Footer(){
    const dates = new Date().getFullYear();
    return(
        <>
            <footer className="lg:px-5 px-3 py-5 w-full bg-[#111827] overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="w-full flex flex-col">
                        <div className="w-full flex flex-col p-5">
                            <p className='flex text-white text-3xl font-semibold'><img src={logoImg} className='w-12 h-10 ml-[-5%]' />SwiftEase</p>
                            <p className='text-sm text-gray-300 text-justify'>
                                Fast, reliable, and global logistics solutions for business worldwide. Your trusted partnerin freight and delivery services.
                            </p>
                            <div className='w-full flex space-x-3 mt-5 h-auto'>
                                <FaFacebook  className='w-10 h-9 p-2.5 rounded-sm bg-[#1F2937] text-white cursor-pointer hover:bg-transparent transition-all'/>
                                <FaTwitter  className='w-10 h-9 p-2.5 rounded-sm bg-[#1F2937] text-white cursor-pointer hover:bg-transparent transition-all'/>
                                <FaLinkedin  className='w-10 h-9 p-2.5 rounded-sm bg-[#1F2937] text-white cursor-pointer hover:bg-transparent transition-all'/>
                                <FaInstagram  className='w-10 h-9 p-2.5 rounded-sm bg-[#1F2937] text-white cursor-pointer hover:bg-transparent transition-all'/>
                            </div>
                        </div>
                        
                    </div>
                    <div className='flex flex-col p-5 lg:ml-15'>
                            <h3 className='text-sm font-semibold text-white mb-3'>
                                Quick Links
                            </h3>
                            <ul className='flex flex-col space-y-4'>
                                <li className='text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    <Link to="/">
                                        Home
                                    </Link>
                                </li>
                                <li className='text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    <Link to="/about">
                                        About Us
                                    </Link>
                                </li>
                                <li className='text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    <Link to="/services">
                                        Services
                                    </Link>
                                </li>
                                <li className='text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    <Link to="/trackings">
                                        Tracking
                                    </Link>
                                </li>

                                <li className='text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    
                                    <Link to="/pricings">
                                        Pricing
                                    </Link>
                                </li>
                                <li className='text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    
                                    <Link to="/contacts">
                                        Contacts
                                    </Link>
                                </li>
                            </ul>
                    </div>
                    <div className='flex flex-col p-5'>
                            <h3 className='text-sm font-semibold text-white mb-3'>
                                Our Services
                            </h3>
                            <ul className='flex flex-col space-y-4'>
                                <li className='text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    Freight Transport
                                </li>
                                <li className='text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    WareHousing
                                </li>
                                <li className='text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    E-commerce delivery
                                </li>
                                <li className='text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    International Shipping
                                </li>
                            </ul>
                    </div>
                    <div className='flex flex-col p-5'>
                            <h3 className='text-sm font-semibold text-white mb-3'>
                                Contact Info
                            </h3>
                            <ul className='flex flex-col space-y-4'>
                                <li className='flex items-center text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    <FaLocationArrow  className='mt-1 mr-1'/>123 Logistics Ave, Business District, NY 10001
                                </li>
                                <li className='flex text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    <FaMobile className='mt-1 mr-1'/> +234 913 1580 378
                                </li>
                                <li className='flex text-gray-300 text-[13px] cursor-pointer hover:text-white transition-all duration-300'>
                                    <FaEnvelope className='mt-1 mr-1' /> shiftease@gmail.com
                                </li>
                            </ul>
                    </div>
                </div>
                <hr  className='text-gray-800'/>
                <div className='w-full h-auto flex justify-between items-center mt-5'>
                    <p className='text-gray-300 text-[9px] md:text-xs'>
                        &copy; {dates} <Link to="mailto:shiftease@gmail.com" className='hover:text-white'>ShiftEase Logistics Company.</Link> All right reserved.
                    </p>
                    <p className='text-[9px] md:text-xs text-gray-300 hover:text-white hover:underline'>
                        <Link to="webfyre@gmail.com">
                            webfyre@gmail.com
                        </Link>
                    </p>
                </div>
            </footer>
        </>
    );
}