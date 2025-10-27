import service1 from '../images/services/service1.jpg'
import service2 from '../images/services/service2.jpg'
import service3 from '../images/services/service3.jpg'
import service4 from '../images/services/service4.jpg'
import service5 from '../images/services/service5.jpg'
import { motion } from 'framer-motion'
import { scrollUp, scrollUpDelay, scrollLeft, buttonHover, cardHover } from '../effects/motions'



export default function Services(){
    const service = [
        {
            id : 1,
            image : service1, 
            title : 'Freight Transport',
            text : 'Reliable ground, air and sea freight services'
        },
        {
            id : 2,
            image : service2, 
            title : 'Ware Housing',
            text : 'Secure storage and inventory management'
        },
        {
            id : 3,
            image : service3, 
            title : 'E-Commerce Delivery',
            text : 'Fast last-mile delivery for online businesses'
        },
        {
            id : 4,
            image : service4, 
            title : 'International Shipping',
            text : 'Global shipping to over 25 countries'
        },
        {
            id : 4,
            image : service5, 
            title : 'Air Transporting System',
            text : 'Global shipping to over 25 countries'
        },
    ]
    return(
        <>
            <div className="w-full h-auto flex items-center flex-col mt-5 overflow-hidden">
                <motion.h2 {...scrollUp} className=" text-xl md:text-2xl lg:text-3xl mt-10 font-bold text-[#2563EB]">
                    Our Core Services
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-gray-600 mt-2 text-xs md:text-sm text-center">
                    Comprehensive logistics solutions tailored to your business needs
                </motion.p>
                <div className='w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-5'>
                    {service.map((service) =>(
                        <motion.div {...scrollLeft} {...cardHover} className='flex flex-col p-5 shadow-md w-full'>
                            <img src={service.image} className='w-full h-full object-cover'/>
                            <h3 className='my-2 text-blue-500 font-semibold'>
                                {service.title}
                            </h3>
                            <p className='text-gray-600 text-sm'>
                                {service.text}
                            </p>
                            <motion.button {...buttonHover} className='my-3 py-2.5 rounded-md w-35 text-sm bg-[#2563EB] font-semibold text-white cursor-pointer'>
                                Learn More
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    );
}