import service1 from '../images/page/service1.jpg'
import service2 from '../images/page/service2.jpg'
import service3 from '../images/page/page (5).webp'
import service4 from '../images/page/service4.jpg'
import service5 from '../images/page/service5.jpg'
import service6 from '../images/page/service6.jpg'
import service7 from '../images/page/service7.jpg'
import service8 from '../images/page/service8.jpg'

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { scrollUp, scrollUpDelay, scrollLeft, buttonHover, cardHover } from '../effects/motions'




export default function Services(){
    const services = [
        {
            id: 1,
            image: service1,
            title: "Freight Transport",
            text: "Reliable ground, air and sea freight solutions designed to move your goods safely and efficiently across local and regional destinations.",
            page: "freight-transport",
            features: [
                "Road freight",
                "Air freight",
                "Sea freight",
                "Full & partial loads",
            ],
        },

        {
            id: 2,
            image: service2,
            title: "Warehousing & Storage",
            text: "Secure and flexible storage solutions that help businesses manage inventory, organize goods and maintain efficient distribution operations.",
            page: "warehousing",
            features: [
                "Secure storage",
                "Inventory management",
                "Order fulfillment",
                "Distribution support",
            ],
        },

        {
            id: 3,
            image: service3,
            title: "E-Commerce Delivery",
            text: "Fast and dependable delivery solutions designed for online businesses, helping orders move efficiently from sellers to customers.",
            page: "ecommerce-delivery",
            features: [
                "Last-mile delivery",
                "Door-to-door delivery",
                "Order tracking",
                "Business delivery solutions",
            ],
        },

        {
            id: 4,
            image: service4,
            title: "International Shipping",
            text: "Seamless international shipping solutions that help businesses and individuals move goods across borders with reliable transportation and shipment visibility.",
            page: "international-shipping",
            features: [
                "International freight",
                "Import & export",
                "Global delivery",
                "Shipment tracking",
            ],
        },

        {
            id: 5,
            image: service5,
            title: "Air Freight & Express Delivery",
            text: "Fast air transportation and express delivery options for time-sensitive shipments that require speed, reliability and careful handling.",
            page: "air-freight",
            features: [
                "Express air freight",
                "Time-sensitive delivery",
                "Priority handling",
                "Airport-to-airport shipping",
            ],
        },

        {
            id: 6,
            image: service6,
            title: "Last-Mile & Door-to-Door Delivery",
            text: "Convenient delivery solutions that take shipments from distribution points directly to the recipient's doorstep with dependable delivery coordination.",
            page: "last-mile-delivery",
            features: [
                "Door-to-door delivery",
                "Residential delivery",
                "Business delivery",
                "Delivery tracking",
            ],
        },

        {
            id: 7,
            image: service7,
            title: "Pickup & Scheduled Delivery",
            text: "Flexible pickup and delivery services that allow customers and businesses to schedule convenient collection and delivery times around their operations.",
            page: "pickup-delivery",
            features: [
                "Scheduled pickups",
                "Flexible delivery times",
                "Pickup coordination",
                "Delivery notifications",
            ],
        },

        {
            id: 8,
            image: service8,
            title: "Logistics & Distribution",
            text: "End-to-end logistics support that helps businesses coordinate transportation, storage and distribution for smoother supply chain operations.",
            page: "logistics-distribution",
            features: [
                "Distribution management",
                "Shipment coordination",
                "Supply chain support",
                "Business logistics",
            ],
        },
];
    return(
        <>
            <div className="w-full h-auto flex items-center flex-col mt-5 overflow-hidden lg:p-5">
                <motion.h2 {...scrollUp} className=" text-xl md:text-2xl lg:text-3xl mt-10 font-bold text-[#0F172A]">
                    Our Core Services
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-gray-600 mt-2 mb-5 text-xs md:text-sm text-center">
                    Comprehensive logistics solutions tailored to your business needs
                </motion.p>
                <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-5'>
                    {services.map((service) =>(
                        <motion.div
                        {...scrollLeft} {...cardHover} key={service.id} className='flex flex-col w-full mb-5 rounded-md'>
                            <img src={service.image} className='w-full h-50 md:h-60 object-cover rounded-t-md'/>
                            <div className='w-full flex flex-col p-3 rounded-b-md shadow-sm'>
                                <h3 className='my-2 text-[#0F172A] font-semibold'>
                                    {service.title}
                                </h3>
                                <p className='text-gray-600 text-sm'>
                                    {service.text}
                                </p>
                                <ul className='w-full grid grid-cols-2 mt-3 gap-2'>
                                    {service.features.map((data) => (
                                        <li className='text-[13px] flex items-center justify-center py-1.5 rounded-md bg-[#14B8A6]/12 text-[#14B8A6]'>{data}</li>
                                    ))}
                                </ul>
                                <motion.button {...buttonHover} className='my-5 py-2.5 rounded-md w-35 text-sm bg-[#14B8A6] font-semibold text-white cursor-pointer'>
                                    <Link to={`/services#${service.page}`}>
                                        Learn More
                                    </Link>
                                </motion.button>
                            </div>
                            
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}