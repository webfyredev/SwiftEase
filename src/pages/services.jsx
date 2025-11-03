import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeader from "../components/pageHeader";
import serviceHeaderImg from '../images/page/pages (5).webp'
import { motion } from "framer-motion";
import { scrollUp, scrollUpDelay, buttonHover, scrollLeft, cardHover } from "../effects/motions";
import serviceImg1 from '../images/page/page (1).webp'
import serviceImg2 from '../images/page/page (2).webp'
import serviceImg3 from '../images/page/pages (6).webp'
import serviceImg4 from '../images/page/page (3).webp'
import {FaWarehouse, FaBoxOpen, FaGlobeAmericas, FaCheck, FaShippingFast, FaBolt, FaHeadset, FaMobileAlt, FaShoppingCart, FaBriefcaseMedical, FaCarSide, FaMicrochip, } from "react-icons/fa";
import { GiFactory, GiForkKnifeSpoon, GiClothes } from "react-icons/gi";
import { RiShieldCheckLine, RiBarChartBoxLine } from "react-icons/ri";
import { TbTruckDelivery } from "react-icons/tb";
import { useEffect } from "react";

export default function Service(){
    useEffect(() =>{
        document.title = 'Services | SwiftEase'
    }, []);
    const process = [
        {
            id : 1, 
            value : '01',
            title : 'Request a Quote',
            text : 'Get instant pricing for your shipment requirements'
        },
        {
            id : 2, 
            value : '02',
            title : 'Book a Service',
            text : 'Schedule pickup and confirm your shipping details'
        },
        {
            id : 3, 
            value : '03',
            title : 'Track Progress',
            text : 'Monitor your shipments in real-time with our tracking system'
        },
        {
            id : 4, 
            value : '04',
            title : 'Delivery Confirmation',
            text : 'Recive confirmation once your package is delivered'
        },

    ]
    const industries = [
        {
            id : 1, 
            title : 'E-commerce & Retail',
            icon : <FaShoppingCart className="w-12 h-12 p-3.5 bg-white rounded-md text-[#2563EB] cursor-pointer shadow-md mt-4"/>,
        },
        {
            id : 2, 
            title : 'Manufacturing',
            icon : <GiFactory className="w-12 h-12 p-3.5 bg-white rounded-md text-[#2563EB] cursor-pointer shadow-md mt-4"/>,
        },
        {
            id : 3, 
            title : 'Healthcare',
            icon : <FaBriefcaseMedical className="w-12 h-12 p-3.5 bg-white rounded-md text-[#2563EB] cursor-pointer shadow-md mt-4"/>,
        },
        {
            id : 4, 
            title : 'Automative',
            icon : <FaCarSide className="w-12 h-12 p-3.5 bg-white rounded-md text-[#2563EB] cursor-pointer shadow-md mt-4"/>,
        },
        {
            id : 5, 
            title : 'Technology',
            icon : <FaMicrochip className="w-12 h-12 p-3.5 bg-white rounded-md text-[#2563EB] cursor-pointer shadow-md mt-4"/>,
        },
        {
            id : 6, 
            title : 'Food & Beverage',
            icon : <GiForkKnifeSpoon className="w-12 h-12 p-3.5 bg-white rounded-md text-[#2563EB] cursor-pointer shadow-md mt-4"/>,
        },
        {
            id : 7, 
            title : 'Fashion & Apparel',
            icon : <GiClothes className="w-12 h-12 p-3.5 bg-white rounded-md text-[#2563EB] cursor-pointer shadow-md mt-4"/>,
        },
        {
            id : 8, 
            title : 'Electronics',
            icon : <FaMobileAlt className="w-12 h-12 p-3.5 bg-white rounded-md text-[#2563EB] cursor-pointer shadow-md mt-4"/>,
        },

    ]
    const add_services = [
        {
            id : 1,
            icon : <RiShieldCheckLine  className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            title : 'Insurance & Protection',
            text : 'Comprehensive cargo insurance and protection plans for valuable shipments',
        },
        {
            id : 2,
            icon : <FaBolt className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            title : 'Express Services',
            text : 'Urgent delivery options with guaranteed time-definite delivery windows.',
        },
        {
            id : 3,
            icon : <FaHeadset className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            title : 'Dedicated Support',
            text : '24/7 customer support with dedicated account managers for enterprise clients',
        },
        {
            id : 4,
            icon : <RiBarChartBoxLine className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            title : 'Analytics & Reporting',
            text : 'Detailed shipping analytics and performance reports for business optimization.',
        },
        {
            id : 5,
            icon : <TbTruckDelivery className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            title : 'Sustainable Logistics',
            text : 'Eco-friendly shipping options with carbon-neutral delivery alternatives',
        },
        {
            id : 6,
            icon : <FaMobileAlt className="w-12 h-12 p-3 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            title : 'Mobile Tracking',
            text : 'Advanced mobile app for real-time tracking and shipment management',
        },

    ]
    const freight = ['Ground Transportation', 'Air Freight', 'Ocean Freight', 'Express Delivery', 'Temperature Controlled', 'Hazardous Materials'];
    const wareHouse = ['Climate Controlled Storage', 'Inventory Management', 'Pick & Pack Services', 'Cross-Docking', 'Distribution Centers', 'Security Systems'];
    const ecommerce = ['Same-Day Delivery', 'Next-Day Shipping', 'Package Tracking', 'Flexible Delivery Options', 'Returns Management', 'White Glove Service'];
    const int_shipping = ['Custom Clearance', 'Documentation Support', 'International Express', 'Duty & Tax Management', 'Trade COmpliance', 'Global Network']
    return(
        <>
            <NavBar />
            <PageHeader
            image = {serviceHeaderImg} 
            page = 'Services'/>
            <div className="w-full h-auto flex flex-col items-center py-10 bg-white">
                <motion.h2 {...scrollUp} className="font-bold text-2xl">
                    Core Services
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-sm text-gray-400 mt-2">
                    End-to-end logistics solutions for businesses of all sizes
                </motion.p>
                <div className="w-full lg:h-95 h-auto my-5 p-5 lg:flex lg:flex-row justify-around">
                    <motion.img {...scrollLeft} src={serviceImg1} className="lg:w-[45%] w-full h-65 md:h-90 lg:h-full rounded-md object-cover"/>
                    <motion.div {...scrollLeft} className="lg:w-[45%] w-full h-full p-5">
                        <div className="w-auto flex items-center">
                            <FaShippingFast  className="w-12 h-12 p-2.5 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>
                            <h2 className="ml-5 text-xl font-bold">
                                Freight Transport
                            </h2>
                        </div>
                        <p className="text-sm mt-3 text-gray-400">
                            Comprehensive freight solutions including ground, air and sea transport with real-time tracking and competitive rates
                        </p>
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 mt-5 py-5 gap-5">
                            {freight.map((data, index) => (
                                <div key={index} className="flex">
                                    <FaCheck  className="w-2 h-2 text-lime-500 mt-1.5 mr-1"/> 
                                    <p className="text-[11px] text-gray-400 font-semibold">
                                        {data}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button className="mt-7 px-6 py-2.5 text-sm font-semibold rounded-sm cursor-pointer bg-blue-500 hover:bg-[#DBEAFE] text-white hover:text-[#2563EB] transition-all">
                            Learn more
                        </button>
                    </motion.div>
                </div>
                <div className="w-full lg:h-95 h-auto my-5 p-5 lg:flex lg:flex-row flex flex-col justify-around">
                    <motion.div {...scrollLeft} className="lg:w-[45%] w-full h-full p-5">
                        <div className="w-auto flex items-center">
                            <FaWarehouse  className="w-12 h-12 p-2.5 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>
                            <h2 className="ml-5 text-xl font-bold">
                                WareHousing
                            </h2>
                        </div>
                        <p className="text-sm mt-3 text-gray-400">
                            State-of-the-art warehousing facilities with advanced inventory management systems and flexible storage solutions
                        </p>
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 mt-5 py-5 gap-5">
                            {wareHouse.map((data, index) => (
                                <div key={index} className="flex">
                                    <FaCheck  className="w-2 h-2 text-lime-500 mt-1.5 mr-1"/> 
                                    <p className="text-[11px] text-gray-400 font-semibold">
                                        {data}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button className="mt-7 px-6 py-2.5 text-sm font-semibold rounded-sm cursor-pointer bg-blue-500 hover:bg-[#DBEAFE] text-white hover:text-[#2563EB] transition-all">
                            Learn more
                        </button>
                    </motion.div>
                    <motion.img {...scrollLeft} src={serviceImg2} className="lg:w-[45%] w-full h-65 md:h-90 lg:h-full rounded-md object-cover"/>
                </div>
                <div className="w-full lg:h-95 h-auto my-5 p-5 lg:flex lg:flex-row flex flex-col justify-around">
                    <motion.img {...scrollLeft} src={serviceImg3} className="lg:w-[45%] w-full h-65 md:h-90 lg:h-full rounded-md object-cover"/>
                    <motion.div {...scrollLeft} className="lg:w-[45%] w-full h-full p-5">
                        <div className="w-auto flex items-center">
                            <FaBoxOpen  className="w-12 h-12 p-2.5 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>
                            <h2 className="ml-5 text-xl font-bold">
                                E-commerce Delivery
                            </h2>
                        </div>
                        <p className="text-sm mt-3 text-gray-400">
                            Specialized last-mile delivery services designed for e-commerce businesses with same-day and next-day options
                        </p>
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 mt-5 py-5 gap-5">
                            {ecommerce.map((data, index) => (
                                <div key={index} className="flex">
                                    <FaCheck  className="w-2 h-2 text-lime-500 mt-1.5 mr-1"/> 
                                    <p className="text-[11px] text-gray-400 font-semibold">
                                        {data}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button className="mt-7 px-6 py-2.5 text-sm font-semibold rounded-sm cursor-pointer bg-blue-500 hover:bg-[#DBEAFE] text-white hover:text-[#2563EB] transition-all">
                            Learn more
                        </button>
                    </motion.div>
                </div>
                <div className="w-full lg:h-95 h-auto my-5 p-5 lg:flex lg:flex-row justify-around">
                    <motion.div {...scrollLeft} className="lg:w-[45%] w-full h-full p-5">
                        <div className="w-auto flex items-center">
                            <FaGlobeAmericas  className="w-12 h-12 p-2.5 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>
                            <h2 className="ml-5 text-xl font-bold">
                                International Shipping
                            </h2>
                        </div>
                        <p className="text-sm mt-3 text-gray-400">
                            Global shipping solutions with customs clearance, documentation support, and delivery to over 25 countries worldwide
                        </p>
                        <div className="w-full grid grid-cols-2 md:grid-cols-3 mt-5 py-5 gap-5">
                            {int_shipping.map((data, index) => (
                                <div key={index} className="flex">
                                    <FaCheck  className="w-2 h-2 text-lime-500 mt-1.5 mr-1"/> 
                                    <p className="text-[11px] text-gray-400 font-semibold">
                                        {data}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <button className="mt-7 px-6 py-2.5 text-sm font-semibold rounded-sm cursor-pointer bg-blue-500 hover:bg-[#DBEAFE] text-white hover:text-[#2563EB] transition-all">
                            Learn more
                        </button>
                    </motion.div>
                    <motion.img {...scrollLeft} src={serviceImg4} className="lg:w-[45%] w-full md:h-90 h-65 lg:h-full rounded-md object-cover "/>

                </div>
            </div>
            <div className="w-full bg-[#F9FAFB] flex flex-col py-10 items-center">
                <motion.h2 {...scrollUp} className="font-bold text-2xl">
                    Additional Services
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-sm text-gray-400 mt-2">
                    Value-added services to enhance your logistics experience
                </motion.p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 mt-5">
                    {add_services.map((services) => (
                        <motion.div {...scrollLeft} {...cardHover} className="w-full bg-white flex flex-col p-5 shadow-sm rounded-md">
                            {services.icon}
                            <h3 className="my-2 font-semibold text-sm">
                                {services.title}
                            </h3>
                            <p className="text-xs text-gray-600 mb-2">
                                {services.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col items-center py-10 bg-white">
                <motion.h2 {...scrollUp} className="font-bold text-2xl">
                    Industries We Serve
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-sm text-gray-400 mt-2">
                    Specialize logistics solutionsfor diverse industry sectors
                </motion.p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 mt-5">
                    {industries.map((industry) =>(
                        <motion.div {...scrollUp} className="w-auto bg-[#F9FAFB] rounded-sm flex flex-col items-center">
                            {industry.icon}
                            <p className="font-semibold mt-3 mb-5 text-sm">
                                {industry.title}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full h-auto bg-[#2563EB] flex flex-col items-center py-5">
                <motion.h2 {...scrollUp} className="font-bold text-2xl text-white mt-2">
                    How It Works
                </motion.h2>
              <motion.p {...scrollUpDelay} className="text-sm text-gray-200 mt-2">
                    Simple steps to get your shipment moving
                </motion.p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
                    {process.map((process) => (
                        <motion.div {...scrollLeft} key={process.id} className="flex flex-col items-center p-8">
                            <div className="w-13 h-13 mt-5 bg-[#FACC15] rounded-full font-bold flex items-center justify-center text-md text-white">
                                {process.value}
                            </div>
                            <h2 className="font-semibold text-white my-3 text-sm">
                                {process.title}
                            </h2>
                            <p className="text-xs text-gray-200 text-center ">
                                {process.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <motion.div {...scrollUp} className="w-full h-70 bg-white flex flex-col items-center justify-center overflow-hidden">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    Ready to Get Started?
                </h2>
                <p className="text-gray-500 md:w-120 w-85 text-center mt-2 text-xs md:text-sm">
                    Contact our logistics experts today to discuss your shipping needs and get a customized solution for your business.
                </p>
                <div className="flex mt-5">
                    <motion.button {...buttonHover} className="px-6 py-2.5 text-sm text-white font-semibold rounded-md bg-blue-600 cursor-pointer mr-5">
                        Get Free Quote
                    </motion.button>
                    <motion.button {...buttonHover} className="px-6 py-2.5 text-sm text-blue-500 font-semibold rounded-md border-1 border-blue-500 cursor-pointer hover:bg-blue-600 hover:text-white hover:border-none">
                        Contact Sales
                    </motion.button>
                </div>
            </motion.div>
            <Footer />
        </>
    );
}