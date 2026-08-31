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
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Service(){
    const {hash} = useLocation();
    useEffect(() =>{
        if(hash){
            const element = document.querySelector(hash)
            if(element){
                element.scrollIntoView({behavior : "smooth"})
            }
        }
    }, [hash])
    useEffect(() =>{
        document.title = 'Services | SwiftEase'
    }, []);

    const industries = [
        {
            id: 1,
            title: "E-Commerce & Retail",
            description:
                "Reliable fulfillment and last-mile delivery solutions that help online retailers move orders quickly from warehouse to customer.",
            services: [
                "Order fulfillment",
                "Last-mile delivery",
                "Scheduled pickups",
                "Real-time tracking",
            ],
            icon: (
                <FaShoppingCart className="w-12 h-12 p-3.5 bg-white rounded-md text-[#14B8A6] shadow-md" />
            ),
        },

        {
            id: 2,
            title: "Manufacturing",
            description:
                "Efficient transportation and distribution solutions for manufacturers moving raw materials, equipment, and finished products.",
            services: [
                "Freight transportation",
                "Raw material logistics",
                "Warehouse support",
                "Distribution",
            ],
            icon: (
                <GiFactory className="w-12 h-12 p-3.5 bg-white rounded-md text-[#14B8A6] shadow-md" />
            ),
        },

        {
            id: 3,
            title: "Healthcare",
            description:
                "Carefully managed logistics solutions designed to support the secure and timely movement of healthcare products and supplies.",
            services: [
                "Medical supply delivery",
                "Scheduled transportation",
                "Secure handling",
                "Time-sensitive delivery",
            ],
            icon: (
                <FaBriefcaseMedical className="w-12 h-12 p-3.5 bg-white rounded-md text-[#14B8A6] shadow-md" />
            ),
        },

        {
            id: 4,
            title: "Automotive",
            description:
                "Transportation and distribution solutions for automotive businesses, helping move parts, components, equipment, and finished products.",
            services: [
                "Parts transportation",
                "Component delivery",
                "Freight services",
                "Distribution support",
            ],
            icon: (
                <FaCarSide className="w-12 h-12 p-3.5 bg-white rounded-md text-[#14B8A6] shadow-md" />
            ),
        },

        {
            id: 5,
            title: "Technology",
            description:
                "Flexible logistics solutions for technology businesses that need reliable transportation for devices, equipment, components, and inventory.",
            services: [
                "Electronics transportation",
                "Inventory movement",
                "Business deliveries",
                "Secure handling",
            ],
            icon: (
                <FaMicrochip className="w-12 h-12 p-3.5 bg-white rounded-md text-[#14B8A6] shadow-md" />
            ),
        },

        {
            id: 6,
            title: "Food & Beverage",
            description:
                "Reliable transportation and distribution support for food and beverage businesses that depend on timely and carefully managed deliveries.",
            services: [
                "Product distribution",
                "Business deliveries",
                "Scheduled transportation",
                "Inventory movement",
            ],
            icon: (
                <GiForkKnifeSpoon className="w-12 h-12 p-3.5 bg-white rounded-md text-[#14B8A6] shadow-md" />
            ),
        },

        {
            id: 7,
            title: "Fashion & Apparel",
            description:
                "Flexible logistics services that help fashion brands and retailers move clothing, accessories, and merchandise efficiently.",
            services: [
                "Retail distribution",
                "E-commerce delivery",
                "Warehouse support",
                "Order fulfillment",
            ],
            icon: (
                <GiClothes className="w-12 h-12 p-3.5 bg-white rounded-md text-[#14B8A6] shadow-md" />
            ),
        },

        {
            id: 8,
            title: "Electronics",
            description:
                "Dependable logistics solutions for electronics businesses requiring careful transportation, secure handling, and reliable delivery.",
            services: [
                "Electronics delivery",
                "Secure transportation",
                "Inventory distribution",
                "Last-mile delivery",
            ],
            icon: (
                <FaMobileAlt className="w-12 h-12 p-3.5 bg-white rounded-md text-[#14B8A6] shadow-md" />
            ),
        },
    ];
    const add_services = [
        {
            id : 1,
            icon : <RiShieldCheckLine  className="w-12 h-12 p-3 bg-[#14B8A6]/12 text-[#14B8A6] rounded-md cursor-pointer"/>,
            title : 'Insurance & Protection',
            text : 'Comprehensive cargo insurance and protection plans for valuable shipments',
        },
        {
            id : 2,
            icon : <FaBolt className="w-12 h-12 p-3 bg-[#14B8A6]/12 text-[#14B8A6] rounded-md  cursor-pointer"/>,
            title : 'Express Services',
            text : 'Urgent delivery options with guaranteed time-definite delivery windows.',
        },
        {
            id : 3,
            icon : <FaHeadset className="w-12 h-12 p-3 bg-[#14B8A6]/12 text-[#14B8A6] rounded-md cursor-pointer"/>,
            title : 'Dedicated Support',
            text : '24/7 customer support with dedicated account managers for enterprise clients',
        },
        {
            id : 4,
            icon : <RiBarChartBoxLine className="w-12 h-12 p-3 bg-[#14B8A6]/12 text-[#14B8A6] rounded-md  cursor-pointer"/>,
            title : 'Analytics & Reporting',
            text : 'Detailed shipping analytics and performance reports for business optimization.',
        },
        {
            id : 5,
            icon : <TbTruckDelivery className="w-12 h-12 p-3 bg-[#14B8A6]/12 text-[#14B8A6] rounded-md cursor-pointer"/>,
            title : 'Sustainable Logistics',
            text : 'Eco-friendly shipping options with carbon-neutral delivery alternatives',
        },
        {
            id : 6,
            icon : <FaMobileAlt className="w-12 h-12 p-3 bg-[#14B8A6]/12 text-[#14B8A6] rounded-md cursor-pointer"/>,
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
            <div className="w-full h-auto flex flex-col items-center py-16 bg-white">

                {/* SECTION HEADER */}
                <motion.div
                    {...scrollUp}
                    className="w-full max-w-3xl text-center px-5"
                >
                    <p className="text-sm font-semibold text-[#14B8A6] uppercase tracking-wider">
                        What We Offer
                    </p>

                    <h2 className="font-bold text-3xl md:text-4xl text-[#0F172A] mt-2">
                        Our Core Services
                    </h2>

                    <p className="text-[13px] md:text-sm text-gray-500 mt-4 leading-7">
                        End-to-end logistics solutions designed to help businesses and
                        individuals move, store, and manage their goods with confidence.
                        From local transportation to international shipping, SwiftEase
                        provides reliable solutions tailored to your delivery needs.
                    </p>
                </motion.div>


                <div
                    className="w-full h-auto my-10 p-5 lg:flex lg:flex-row justify-between items-center"
                    id="freightTransport"
                >

                    <motion.img
                        {...scrollLeft}
                        src={serviceImg1}
                        alt="SwiftEase freight transportation"
                        className="lg:w-[45%] w-full h-72 md:h-96 lg:h-[430px] rounded-xl object-cover"
                    />

                    <motion.div
                        {...scrollUp}
                        className="lg:w-[45%] w-full h-auto py-8 lg:px-5"
                    >

                        <div className="w-auto flex items-center">
                            <FaShippingFast
                                className="w-12 h-12 p-3 bg-[#14B8A6]/12 text-[#14B8A6] rounded-lg"
                            />

                            <div className="ml-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#14B8A6]">
                                    Transportation
                                </p>

                                <h2 className="text-2xl md:text-3xl font-bold text-[#0F172A]">
                                    Freight Transport
                                </h2>
                            </div>
                        </div>

                        <p className="text-[13px] md:text-sm mt-5 text-gray-500 leading-7">
                            Our freight transport solutions provide reliable movement of
                            goods across local and international routes. Whether you need
                            road, air, or sea transportation, SwiftEase provides flexible
                            freight options designed around your shipment size, destination,
                            delivery requirements, and budget.
                        </p>

                        <p className="text-[13px] md:text-sm text-gray-500 leading-7 mt-3">
                            From pickup to final delivery, we focus on secure handling,
                            efficient transportation, and shipment visibility so you can
                            stay informed throughout the delivery journey.
                        </p>

                        <h3 className="font-semibold text-gray-800 mt-6 mb-4">
                            What We Offer
                        </h3>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                            {[
                                "Road freight transportation",
                                "Air freight solutions",
                                "Sea freight transportation",
                                "Full and partial loads",
                                "Secure cargo handling",
                                "Shipment tracking",
                                "Flexible delivery options",
                                "Business logistics support",
                            ].map((data, index) => (
                                <div key={index} className="flex items-start">
                                    <FaCheck className="w-3 h-3 text-[#14B8A6]  mt-1 mr-2 shrink-0" />

                                    <p className="text-xs md:text-[13px] text-gray-500">
                                        {data}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <motion.a
                                {...buttonHover}
                                href="#additionalServices"
                                className="px-6 py-2.5 text-sm flex items-center justify-center font-semibold rounded-md bg-[#14B8A6] text-white transition-all"
                            >
                                Learn More
                            </motion.a>

                            <motion.a
                                {...buttonHover}
                                href="/contacts"
                                className="px-6 py-2 text-sm font-semibold flex items-center justify-center rounded-md border border-[#0F172A] text-[#0F172A] transition-all"
                            >
                                Get a Quote
                            </motion.a>
                        </div>

                    </motion.div>
                </div>


                {/* ==================== WAREHOUSING ==================== */}
                <div
                    className="w-full h-auto my-10 p-5 lg:flex lg:flex-row-reverse justify-between items-center"
                    id="wareHousing"
                >

                    <motion.img
                        {...scrollLeft}
                        src={serviceImg2}
                        alt="SwiftEase warehousing and storage"
                        className="lg:w-[45%] w-full h-72 md:h-96 lg:h-[430px] rounded-xl object-cover"
                    />

                    <motion.div
                        {...scrollUp}
                        className="lg:w-[45%] w-full h-auto py-8 lg:px-5"
                    >

                        <div className="w-auto flex items-center">
                            <FaWarehouse
                                className="w-12 h-12 p-3 bg-[#14B8A6]/12 text-[#14B8A6] rounded-lg"
                            />

                            <div className="ml-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#14B8A6]">
                                    Storage Solutions
                                </p>

                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    Warehousing & Storage
                                </h2>
                            </div>
                        </div>

                        <p className="text-[13px] md:text-sm mt-5 text-gray-500 leading-7">
                            SwiftEase provides secure and flexible warehousing solutions
                            for businesses that need dependable storage and efficient
                            inventory handling. Our facilities and logistics processes are
                            designed to help businesses store goods safely while maintaining
                            organized inventory.
                        </p>

                        <p className="text-[13px] md:text-sm text-gray-500 leading-7 mt-3">
                            Whether you require short-term storage or ongoing inventory
                            support, our warehousing solutions can help simplify your
                            operations and support smooth distribution.
                        </p>

                        <h3 className="font-semibold text-gray-800 mt-6 mb-4">
                            Our Warehousing Solutions
                        </h3>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                            {[
                                "Secure short-term storage",
                                "Long-term storage solutions",
                                "Inventory organization",
                                "Order preparation",
                                "Distribution support",
                                "Secure goods handling",
                                "Flexible storage capacity",
                                "Business inventory support",
                            ].map((data, index) => (
                                <div key={index} className="flex items-start">
                                    <FaCheck className="w-3 h-3 text-[#14B8A6] mt-1 mr-2 shrink-0" />

                                    <p className="text-xs md:text-[13px] text-gray-500">
                                        {data}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <motion.a
                                {...buttonHover}
                                href="#additionalServices"
                                className="px-6 py-2.5 text-sm flex items-center justify-center font-semibold rounded-md bg-[#14B8A6] text-white transition-all"
                            >
                                Learn More
                            </motion.a>
                            <motion.a
                                {...buttonHover}
                                href="/contacts"
                                className="px-6 py-2 text-sm font-semibold flex items-center justify-center rounded-md border border-[#0F172A] text-[#0F172A] transition-all"
                            >
                                Talk to Us
                            </motion.a>
                        </div>

                    </motion.div>
                </div>


                <div
                    className="w-full h-auto my-10 p-5 lg:flex lg:flex-row justify-between items-center"
                    id="ecommerce"
                >

                    <motion.img
                        {...scrollLeft}
                        src={serviceImg3}
                        alt="SwiftEase e-commerce delivery"
                        className="lg:w-[45%] w-full h-72 md:h-96 lg:h-[430px] rounded-xl object-cover"
                    />

                    <motion.div
                        {...scrollUp}
                        className="lg:w-[45%] w-full h-auto py-8 lg:px-5"
                    >

                        <div className="w-auto flex items-center">
                            <FaBoxOpen
                                className="w-12 h-12 p-3 bg-[#14B8A6]/12 text-[#14B8A6] rounded-lg"
                            />

                            <div className="ml-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#14B8A6]">
                                    Last-Mile Delivery
                                </p>

                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    E-Commerce Delivery
                                </h2>
                            </div>
                        </div>

                        <p className="text-[13px] md:text-sm mt-5 text-gray-500 leading-7">
                            SwiftEase provides reliable last-mile delivery solutions
                            designed specifically for e-commerce businesses. From order
                            pickup to the customer's doorstep, we help online businesses
                            provide fast, convenient, and trackable delivery experiences.
                        </p>

                        <p className="text-[13px] md:text-sm text-gray-500 leading-7 mt-3">
                            Whether you operate a growing online store or manage a large
                            e-commerce operation, our delivery solutions are designed to
                            make order fulfillment simpler and more reliable.
                        </p>

                        <h3 className="font-semibold text-gray-800 mt-6 mb-4">
                            E-Commerce Delivery Features
                        </h3>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                            {[
                                "Same-day delivery options",
                                "Next-day delivery",
                                "Door-to-door delivery",
                                "Scheduled pickups",
                                "Real-time shipment tracking",
                                "Flexible delivery options",
                                "Business delivery solutions",
                                "Reliable last-mile fulfillment",
                            ].map((data, index) => (
                                <div key={index} className="flex items-start">
                                    <FaCheck className="w-3 h-3 text-[#14B8A6] mt-1 mr-2 shrink-0" />

                                    <p className="text-xs md:text-sm text-gray-500">
                                        {data}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <motion.a
                                {...buttonHover}
                                href="#additionalServices"
                                className="px-6 py-2 text-sm font-semibold flex items-center justify-center rounded-md bg-[#14B8A6] text-white transition-all"
                            >
                                Learn More
                            </motion.a>
                            <motion.a
                                {...buttonHover}
                                href="/contacts"
                                className="px-6 py-2 text-sm font-semibold flex items-center justify-center rounded-md border border-[#0F172A] text-[#0F172A] transition-all"
                            >
                                Get Started
                            </motion.a>
                        </div>

                    </motion.div>
                </div>


                <div
                    className="w-full h-auto my-10 p-5 lg:flex lg:flex-row-reverse justify-between items-center"
                    id="shipping"
                >

                    <motion.img
                        {...scrollLeft}
                        src={serviceImg4}
                        alt="SwiftEase international shipping"
                        className="lg:w-[45%] w-full h-72 md:h-96 lg:h-[430px] rounded-xl object-cover"
                    />

                    <motion.div
                        {...scrollUp}
                        className="lg:w-[45%] w-full h-auto py-8 lg:px-5"
                    >

                        <div className="w-auto flex items-center">
                            <FaGlobeAmericas
                                className="w-12 h-12 p-3 bg-[#14B8A6]/12 text-[#14B8A6] rounded-lg"
                            />

                            <div className="ml-5">
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#14B8A6]">
                                    Global Logistics
                                </p>

                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    International Shipping
                                </h2>
                            </div>
                        </div>

                        <p className="text-[13px] md:text-sm mt-5 text-gray-500 leading-7">
                            Expand your reach beyond borders with SwiftEase international
                            shipping solutions. We help businesses and individuals move
                            shipments across international destinations while providing
                            support throughout the shipping process.
                        </p>

                        <p className="text-[13px] md:text-sm text-gray-500 leading-7 mt-3">
                            From transportation coordination and documentation to shipment
                            visibility and final delivery, SwiftEase helps simplify the
                            complexities involved in international logistics.
                        </p>

                        <h3 className="font-semibold text-gray-800 mt-6 mb-4">
                            International Shipping Solutions
                        </h3>

                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-3">
                            {[
                                "International freight",
                                "Import and export shipping",
                                "Customs documentation support",
                                "Air transportation",
                                "Sea transportation",
                                "International shipment tracking",
                                "Door-to-door delivery",
                                "Global logistics coordination",
                            ].map((data, index) => (
                                <div key={index} className="flex items-start">
                                    <FaCheck className="w-3 h-3 text-[#14B8A6] mt-1 mr-2 shrink-0" />

                                    <p className="text-xs md:text-sm text-gray-500">
                                        {data}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-7 flex flex-wrap gap-3">
                            <motion.a
                                {...buttonHover}
                                href="#additionalServices"
                                className="px-6 py-2 flex items-center justify-center text-sm font-semibold rounded-md bg-[#14B8A6] text-white transition-all"
                            >
                                Learn More
                            </motion.a>
                            <motion.a
                                {...buttonHover}
                                href="/contacts"
                                className="px-6 py-2 text-sm font-semibold flex items-center justify-center rounded-md border border-[#0F172A] text-[#0F172A] transition-all"
                            >
                                Contact Us
                            </motion.a>
                        </div>

                    </motion.div>
                </div>
            </div>
            <div className="w-full bg-[#F9FAFB] flex flex-col py-10 items-center" id="additionServices">
                <motion.h2 {...scrollUp} className="font-bold text-2xl text-[#0F172A]">
                    Additional Services
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-sm text-gray-400 mt-2">
                    Value-added services to enhance your logistics experience
                </motion.p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5 mt-5">
                    {add_services.map((services) => (
                        <motion.div {...scrollLeft} {...cardHover} className="w-full bg-white flex flex-col p-5 shadow-sm rounded-md">
                            {services.icon}
                            <h3 className="my-2 font-semibold text-sm text-[#0F172A]">
                                {services.title}
                            </h3>
                            <p className="text-xs text-gray-600 mb-2">
                                {services.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full flex flex-col items-center py-16 bg-white">

    {/* Header */}
    <motion.div
        {...scrollUp}
        className="max-w-3xl text-center px-5"
    >
        <p className="text-sm font-semibold text-[#14B8A6] uppercase tracking-wider">
            Industries We Serve
        </p>

        <h2 className="font-bold text-3xl md:text-4xl text-[#0F172A] mt-2">
            Logistics Solutions Built for Your Industry
        </h2>

        <p className="text-[13px] md:text-sm text-gray-500 mt-4 leading-7">
            From growing online businesses to established enterprises,
            SwiftEase provides flexible transportation, delivery, storage,
            and distribution solutions designed around the unique needs
            of different industries.
        </p>
    </motion.div>


    {/* Industry Cards */}
    <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-5 mt-12">

        {industries.map((industry, index) => (

                    <motion.div
                        {...scrollUp}
                        key={industry.id}
                        transition={{
                            duration: 0.5,
                            delay: index * 0.08,
                        }}
                        className="group w-full bg-[#F9FAFB] border border-gray-100 rounded-xl p-6 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >

                        {/* Icon */}
                        <div className="w-fit">
                            {industry.icon}
                        </div>


                        {/* Title */}
                        <h3 className="font-bold text-lg text-gray-800 mt-5">
                            {industry.title}
                        </h3>


                        {/* Description */}
                        <p className="text-sm text-gray-500 leading-6 mt-3">
                            {industry.description}
                        </p>


                        {/* Services */}
                        <div className="mt-5 pt-5 border-t border-gray-200">

                            <p className="text-xs font-semibold uppercase tracking-wide text-gray-700 mb-3">
                                Our Solutions
                            </p>

                            <div className="space-y-2">

                                {industry.services.map((service, serviceIndex) => (

                                    <div
                                        key={serviceIndex}
                                        className="flex items-start"
                                    >

                                        <FaCheck
                                            className="w-3 h-3 text-lime-500 mt-1 mr-2 shrink-0"
                                        />

                                        <span className="text-xs text-gray-500">
                                            {service}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* CTA */}
                        <a
                            href="/contacts"
                            className="inline-flex items-center mt-6 text-sm font-semibold text-[#14B8A6] group-hover:text-[#0F172A] transition-colors"
                        >
                            Discuss your logistics needs
                            <span className="ml-2 group-hover:translate-x-1 transition-transform">
                                →
                            </span>
                        </a>

                    </motion.div>

                ))}

            </div>


            {/* Bottom CTA */}
            <motion.div
                {...scrollUp}
                className="w-[calc(100%-40px)] max-w-6xl mt-14 bg-[#14B8A6]/12 rounded-2xl px-6 py-10 md:px-12 text-center"
            >

                <h3 className="text-2xl font-bold text-gray-800">
                    Don't see your industry?
                </h3>

                <p className="max-w-2xl mx-auto text-sm text-gray-500 leading-6 mt-3">
                    Every business has different logistics requirements. Talk to
                    the SwiftEase team and discover a transportation or delivery
                    solution tailored to your specific needs.
                </p>

                <motion.a
                    {...buttonHover}
                    href="/contacts"
                    className="inline-block mt-6 px-7 py-3 bg-[#14B8A6] text-white text-sm font-semibold rounded-md transition-all"
                >
                    Talk to Our Team
                </motion.a>

            </motion.div>

        </div>
        <Footer />
        </>
    );
}
