import Footer from "../components/footer";
import NavBar from "../components/navbar";
import Tracking from "../components/tracking";
import trackingImg from '../images/page/pages (9).webp'
import { motion } from "framer-motion";
import { scrollUp, scrollUpDelay, buttonHover, scrollLeft, cardHover } from "../effects/motions";
import { FaLocationArrow, FaBell, FaClipboardCheck, FaCalendarCheck, FaShieldAlt, FaHeadset } from "react-icons/fa";
import PageHeader from "../components/pageHeader";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Trackings(){
    const {hash} = useLocation();
    useEffect(() =>{
        if(hash){
        const element = document.querySelector(hash)
        if(element){
            element.scrollIntoView({behavior : "smooth"});
        }
    }
    }, [hash])
    useEffect(() =>{
        document.title = 'Trackings | SwiftEase'
    }, []);
    const track_details = [
        {
            id : 1,
            title : 'Mobile Notification',
            icon : <FaBell   className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            text : 'Get instant SMS and email updatesabout your shipment status and delivery confirmations',
        },
        {
            id : 2,
            title : 'Live GPS Tracking',
            icon : <FaLocationArrow  className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer" />,
            text : 'Track your package in real-time with GPS location updatesand estimated arrival times'
        },
        {
            id : 3,
            title : 'Delivery Proof',
            icon : <FaClipboardCheck   className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            text : 'Recieve photo confirmation and digital signatures upon successful delivery',
        },
        {
            id : 4,
            title : 'Delivery Scheduling',
            icon : <FaCalendarCheck   className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            text : 'Choose convinient delivery windows and reschedule deliveries as needed.'
        },
        {
            id : 5,
            title : 'Secure Tracking',
            icon : <FaShieldAlt   className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            text : 'Your tracking information is protected with enterprise-grade security measures.'
        },
        {
            id : 6,
            title : 'Support Integration',
            icon : <FaHeadset className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            text : 'Direct access to customer support through the tracking interface for immediate assistance'
        },

    ]
    return(
        <>
            <NavBar />
            <PageHeader 
            image = {trackingImg}
            page = 'Tracking'/>
            <Tracking />
            <div className="w-full flex flex-col items-center py-10">
                <motion.h2 {...scrollUp} className="font-bold text-2xl md:text-3xl text-black mt-2">
                    Advanced Tracking Features
                </motion.h2>
              <motion.p {...scrollUpDelay} className="md:text-sm text-gray-400 mt-2 text-center">
                Stay informed every step of the way with our comprehensive tracking system
                </motion.p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-5 mt-5">
                    {track_details.map((track_data) => (
                        <motion.div {...scrollLeft} {...cardHover} className="w-full bg-white flex flex-col p-5 shadow-sm rounded-md">
                            {track_data.icon}
                            <h3 className="my-2 font-semibold text-sm">
                                {track_data.title}
                            </h3>
                            <p className="text-xs text-gray-600 mb-2">
                                {track_data.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <motion.div {...scrollUp} className="w-full h-70 bg-[#2563EB] flex flex-col items-center justify-center overflow-hidden">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">
                    Need Help with Tracking?
                </h2>
                <p className="text-gray-200 md:w-120 w-85 text-center mt-2 text-xs md:text-sm">
                    Our customer support is available 24/7 to assist you with any tracking questions or delivery concerns
                </p>
                <div className="flex mt-5">
                    <motion.button {...buttonHover} className="px-6 py-2.5 text-sm text-white font-semibold rounded-md bg-[#FACC15] cursor-pointer mr-5">
                        <Link to="/contacts#contactSection">
                            Contact Support
                        </Link>
                    </motion.button>
                    <motion.button {...buttonHover} className="px-6 py-2.5 text-sm text-white font-semibold rounded-md border-1 border-white cursor-pointer hover:bg-[#FACC15] hover:border-none transition-all">
                        <Link to="/contacts#tracking">
                            Tracking FAQ
                        </Link>
                    </motion.button>
                </div>
            </motion.div>
            <Footer />
        </>
    );
}