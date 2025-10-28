import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeader from "../components/pageHeader";
import { FaPaperPlane, FaMapMarkedAlt, FaPhoneAlt, FaEnvelope, FaClock, FaUser,} from "react-icons/fa";
import { buttonHover, cardHover, scrollLeft, scrollUp, scrollUpDelay } from "../effects/motions";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import contactImg from '../images/page/pages (10).webp'

export default function Contacts(){
    const offices = [
        {
            id :1,
            city : 'Abuja',
            address : '124 Old Abuja Road',
            phone : '+234 913 1580 378',
            role : 'Micheal Chen'
        },
        {
            id :2,
            city : 'Lagos',
            address : '124 Old Lagos Road',
            phone : '+234 913 1580 378',
            role : 'Sarah Johnson'
        },
        {
            id :3,
            city : 'Port Harcourt',
            address : '124 Old Port Road',
            phone : '+234 913 1580 378',
            role : 'David Thompson'
        },
    ]
    const faq = [
        {
            id : 1,
            question : 'What are your shipping rates',
            answer : 'Our rates are based on package size, weight, destination, and service level. Contact us for a personalized quote.'
        },
        {
            id : 2,
            question : 'How can i track my shipment?',
            answer : 'Use our online tracking system with your tracking number, or download our mobile app for real-time projects.'
        },
        {
            id : 3,
            question : 'Do you offer international shipping?',
            answer : 'We offer 99% on time delivery with money-back guarantee for express services if we miss the committed time.'
        },
        {
            id : 4,
            question : 'What are your shipping rates',
            answer : 'Our rates are based on package size, weight, destination, and service level. Contact us for a personalized quote.'
        },
    ]
    return(
        <>
            <NavBar />
            <PageHeader 
            image = {contactImg}
            page = "Contacts"/>
            <div className="w-full bg-white lg:h-150 h-auto md:px-10 py-5 lg:flex lg:flex-row flex-col lg:justify-between">
                <div className="lg:w-[45%] w-full h-full flex flex-col p-5">
                    <h3 className="text-2xl font-bold text-md">
                        Send Us a Message
                    </h3>
                    <form action="" className="w-full h-full mt-2 flex flex-col py-5">
                        <div className="w-full h-auto md:flex md:flex-row md:justify-between md:items-center mb-5">
                            <div className="flex flex-col md:w-[48%] w-full md:h-15 h-17 mb-3 md:mb-0">
                                <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Full Name *</label>
                                <input type="text" placeholder="Enter your full name" className="w-full h-full rounded-sm px-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white"/>
                            </div>
                            <div className="flex flex-col md:w-[48%] w-full md:h-15 h-17 mb-3 md:mb-0">
                                <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Email Address *</label>
                                <input type="text" placeholder="Enter your email" className="w-full h-full rounded-sm px-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white"/>
                            </div>
                            
                        </div>
                        <div className="w-full h-auto md:flex md:flex-row md:justify-between md:items-center mb-5">
                            <div className="flex flex-col md:w-[48%] w-full md:h-15 h-17 mb-3 md:mb-0">
                                <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Phone Number</label>
                                <input type="text" placeholder="Enter your phone number" className="w-full h-full rounded-sm px-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white"/>
                            </div>
                            <div className="flex flex-col md:w-[48%] w-full md:h-15 h-17">
                                <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Company Name</label>
                                <input type="text" placeholder="Enter your company name" className="w-full h-full rounded-sm px-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white"/>
                            </div>
                            
                        </div>
                        <div className="flex flex-col w-full md:h-15 h-17 md:mb-2 mb-3">
                            <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Service Interest</label>
                            <input type="text" placeholder="Select a service" className="w-full h-full rounded-sm px-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white"/>
                        </div>
                        <div className="flex flex-col w-full h-35 mb-5">
                            <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Message *</label>
                            <textarea name="" placeholder="Tell us about your logistics needs.." className="w-full h-full rounded-sm p-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white"></textarea>
                        </div>
                        <motion.button {...buttonHover} className="w-full h-12 rounded bg-blue-500 text-white text-sm font-semibold cursor-pointer flex items-center justify-center">
                            <FaPaperPlane  className="mr-1"/>Send Message
                        </motion.button>
                    </form>
                </div>
                <div className="lg:w-[45%] h-full flex flex-col p-5">
                    <h3 className="text-2xl font-bold text-md mb-5">
                        Get in Touch
                    </h3>
                    <div className="flex py-3 mb-4">
                        <FaMapMarkedAlt className="w-10 h-10 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer" />
                        <div className="flex flex-col ml-2">
                            <h3 className="text-sm font-semibold">
                                Our Location
                            </h3>
                            <p className="text-[11px] text-gray-500 mt-1">
                                123 Logistics Avenue Business District New York, NY 1001
                            </p>
                        </div>
                        
                    </div>
                    <div className="flex py-3 mb-4">
                        <FaPhoneAlt className="w-10 h-10 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer" />
                        <div className="flex flex-col ml-2">
                            <h3 className="text-sm font-semibold">
                                Phone Numbers
                            </h3>
                            <p className="text-[11px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                                <Link to="phoneto:+2349131580378">
                                    +234 913 1580 378
                                </Link>
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                                <Link to="phoneto:+2349131580378">
                                    +234 913 1580 378
                                </Link>
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                                Toll Free: 1-800-LOGISTICS
                            </p>
                        </div>
                        
                    </div>
                    <div className="flex py-3 mb-4">
                        <FaEnvelope className="w-10 h-10 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer" />
                        <div className="flex flex-col ml-2">
                            <h3 className="text-sm font-semibold">
                                Email Addresses
                            </h3>
                            <p className="text-[12px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                                <Link to="mailto:shiftease@gmail.com">
                                    shiftease@gmail.com
                                </Link>
                            </p>
                            <p className="text-[12px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                                <Link to="mailto:shiftease@gmail.com">
                                    shiftease2@gmail.com
                                </Link>
                            </p>
                            <p className="text-[12px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                                <Link to="mailto:webfyre@gmail.com">
                                    webfyre@gmail.com
                                </Link>
                            </p>
                        </div>
                        
                    </div>
                    <div className="flex py-3">
                        <FaClock className="w-10 h-10 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer" />
                        <div className="flex flex-col ml-2">
                            <h3 className="text-sm font-semibold">
                                Business Hours
                            </h3>
                            <p className="text-[11px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                                Monday - Friday: 8:00 AM - 6:00 PM
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                                Saturday 9:00 AM - 4:00 PM
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                            Sunday: Emergency Only
                            </p>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center py-8 bg-[#F9FAFB]">
                <motion.h3 {...scrollUp} className="font-bold text-2xl">
                    Our Offices
                </motion.h3>
                <motion.p {...scrollUpDelay} className="text-gray-400 text-sm mt-1">
                    Multiple locations to serve you better
                </motion.p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 lg:px-10 px-5">
                    {offices.map((office) => (
                        <motion.div {...scrollLeft} {...cardHover} className="lg:w-[85%] bg-white rounded-md p-5 flex flex-col">
                            <h2 className="font-semibold text-sm">
                                {office.city}
                            </h2>
                            <p className="mt-3 flex items-center text-[12px]">
                                < FaMapMarkedAlt className="w-3 h-3 text-blue-500 mr-1"/> {office.address}
                            </p>
                            <p className="mt-3 flex items-center text-[12px] font-semibold">
                                < FaPhoneAlt className="w-3 h-3 text-blue-500 mr-1"/> {office.phone}
                            </p>
                            <p className="mt-3 flex items-center text-[12px] mb-4">
                                < FaUser className="w-3 h-3 text-blue-500 mr-1"/>Manager : {office.role}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col items-center bg-[#2563EB] py-10">
                <motion.h2 {...scrollUp} className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                    Frequently Asked Questions
                </motion.h2>
                <motion.p {...scrollUpDelay} className="w-90 md:w-130 text-center mt-2 text-gray-300 text-sm">
                    Quick answers to common questions
                </motion.p>
                <div className="lg:w-[85%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 p-5">
                    {faq.map((faqs) =>(
                        <motion.div {...scrollLeft} {...cardHover} className="bg-[#1D4ED8] rounded-md p-5">
                            <h3 className="text-white text-sm font-semibold">
                                {faqs.question}
                            </h3>
                            <p className="text-gray-200 text-[11px] mt-2">
                                {faqs.answer}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}