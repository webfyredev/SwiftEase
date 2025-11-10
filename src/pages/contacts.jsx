import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeader from "../components/pageHeader";
import { FaPaperPlane, FaMapMarkedAlt, FaPhoneAlt, FaEnvelope, FaClock, FaUser,} from "react-icons/fa";
import { buttonHover, cardHover, scrollLeft, scrollUp, scrollUpDelay } from "../effects/motions";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import contactImg from '../images/page/pages (10).webp'
import { useEffect, useState } from "react";
import axios from "axios";

export default function Contacts(){
    const {hash} = useLocation();
    useEffect(() =>{
        if(hash){
            const element = document.querySelector(hash);
            if(element){
                element.scrollIntoView({behavior : "smooth"});
            }
        }
    }, [hash]);
    const [contactsData, setContactsData] = useState({
        full_name :"", email :"", phone_number: "",
        company_name : "", service : "", message : "",
    });
    const [status, setStatus] = useState({message : "", type : ""});
    const handleChange = (e) => {
        setContactsData({...contactsData, [e.target.name] : e.target.value});
    };
    const validateForm = () => {
        const {full_name, email, phone_number, message} = contactsData;
        if(!/^[a-zA-Z ]{2,}$/.test(full_name.trim())){
            setStatus({message : "Enter a valid name", type : "error"});
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setStatus({ message: "Enter a valid email address", type: "error" });
            return false;
        }

        if (!/^\d{10,20}$/.test(phone_number.trim())) {
            setStatus({ message: "Enter a valid phone number (10-20 digits)", type: "error" });
            return false;
        }
        if (message.trim().length < 10) {
            setStatus({ message: "Message must be at least 10 characters", type: "error" });
            return false;
        }

        return true;
    }
    const handleContactsSubmission = async(e) =>{

        e.preventDefault();
        if (!validateForm()) return;
        try{
            await axios.post("https://swiftease-backend.onrender.com/contacts/", contactsData);
            setStatus({message : 'Message sent. Thank you for contacting us!', type : 'success'});
            setContactsData({
                full_name :"", email :"", phone_number: "",
                company_name : "", service : "", message : "",
            });
            setTimeout(() => setStatus({message : "", type: ""}), 5000);
        }catch(error){
            setStatus({message : 'Unable to send message. Try again later', type : 'error'});
            setTimeout(() => setStatus({message : "", type: ""}), 5000);

        }

    }
    

    useEffect(() =>{
            document.title = 'Contacts | SwiftEase'
        }, []);
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
            {status.message && (
                <motion.div initial ={{opacity:0, y:-50}}
                animate = {{opacity: 1, y:0}}
                exit={{opacity : 0, y:-50}}
                transition={{duration:0.4}}
                className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 px-3 md:px-5 py-3 rounded-lg shadow-lg text-xs text-center w-[90%] h-11 md:h-auto md:w-auto md:text-sm text-white font-semibold ${status.type === "success" ? 'bg-green-500' : 'bg-red-500'}`}
                >
                    {status.message}
                </motion.div>
            )}
            <NavBar />
            <PageHeader 
            image = {contactImg}
            page = "Contacts"/>
            <div className="w-full bg-white lg:h-150 h-auto md:px-10 py-5 lg:flex lg:flex-row flex-col lg:justify-between" id="contactSection">
                <div className="lg:w-[45%] w-full h-full flex flex-col p-5">
                    <h3 className="text-2xl font-bold text-md">
                        Send Us a Message
                    </h3>
                    <form onSubmit={handleContactsSubmission} className="w-full h-full mt-2 flex flex-col py-5">
                        <div className="w-full h-auto md:flex md:flex-row md:justify-between md:items-center mb-5">
                            <div className="flex flex-col md:w-[48%] w-full md:h-15 h-17 mb-3 md:mb-0">
                                <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Full Name *</label>
                                <input type="text" name="full_name" value={contactsData.full_name} onChange={handleChange} required placeholder="Enter your full name" className="w-full h-full rounded-sm px-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white"/>
                            </div>
                            <div className="flex flex-col md:w-[48%] w-full md:h-15 h-17 mb-3 md:mb-0">
                                <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Email Address *</label>
                                <input type="text" name="email" value={contactsData.email} onChange={handleChange} required placeholder="Enter your email" className="w-full h-full rounded-sm px-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white"/>
                            </div>
                            
                        </div>
                        <div className="w-full h-auto md:flex md:flex-row md:justify-between md:items-center mb-5">
                            <div className="flex flex-col md:w-[48%] w-full md:h-15 h-17 mb-3 md:mb-0">
                                <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Phone Number</label>
                                <input type="text" maxLength={15} name="phone_number" value={contactsData.phone_number} onChange={handleChange} required placeholder="Enter your phone number" className="w-full h-full rounded-sm px-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white"/>
                            </div>
                            <div className="flex flex-col md:w-[48%] w-full md:h-15 h-17">
                                <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Company Name</label>
                                <input type="text" name="company_name" value={contactsData.company_name} onChange={handleChange} required placeholder="Enter your company name" className="w-full h-full rounded-sm px-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white"/>
                            </div>
                            
                        </div>
                        <div className="flex flex-col w-full md:h-15 h-17 md:mb-2 mb-3">
                            <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Service Interest</label>
                            <select type="text" name="service" value={contactsData.service} onChange={handleChange} required className="w-full h-full rounded-sm px-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white">
                                <option value="" disabled>Select a service</option>
                                <option value="Freight Transport">Freight Transport</option>
                                <option value="WareHousing">WareHousing</option>
                                <option value="E-commerce Delivery">E-commerce Delivery</option>
                                <option value="International Shipping">International Shipping</option>

                            </select>
                        </div>
                        <div className="flex flex-col w-full h-35 mb-5">
                            <label htmlFor="" className="text-xs text-gray-700 font-semibold mb-1">Message *</label>
                            <textarea name="message" maxLength={255} value={contactsData.message} onChange={handleChange} required placeholder="Tell us about your logistics needs.." className="w-full h-full rounded-sm p-3 text-[13px] text-gray-500 outline-none border-1 border-gray-300 hover:border-2 hover:border-blue-200 transition-all bg-white"></textarea>
                        </div>
                        <motion.button {...buttonHover} type="submit" className="w-full h-12 rounded bg-blue-500 text-white text-sm font-semibold cursor-pointer flex items-center justify-center">
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
                                12 Akinwale Street, Oregun Industrial Layout, Ikeja, Lagos State
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
                                <a href="tel:+2349131580378">
                                    +234 913 1580 378
                                </a>
                            </p>
                            <p className="text-[11px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                                <a href="tel:+2349131580378">
                                    +234 913 1580 378
                                </a>
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
                                <a href="mailto:shiftease@gmail.com">
                                    shiftease@gmail.com
                                </a>
                            </p>
                            <p className="text-[12px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                                <a href="mailto:shiftease@gmail.com">
                                    shiftease2@gmail.com
                                </a>
                            </p>
                            <p className="text-[12px] text-gray-500 mt-1 font-semibold hover:text-[#2563EB]">
                                <a href="mailto:webfyre@gmail.com">
                                    webfyre@gmail.com
                                </a>
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
            <div className="flex flex-col items-center py-8 bg-[#F9FAFB]" id="scheduleDemo">
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
                                < FaPhoneAlt className="w-3 h-3 text-blue-500 mr-1"/> <a href={`tel:${office.phone}`}>{office.phone}</a>
                            </p>
                            <p className="mt-3 flex items-center text-[12px] mb-4">
                                < FaUser className="w-3 h-3 text-blue-500 mr-1"/>Manager : {office.role}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col items-center bg-[#2563EB] py-10" id="tracking">
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