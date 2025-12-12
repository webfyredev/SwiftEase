import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { scrollUp, scrollUpDelay, cardHover, buttonHover, scrollLeft } from "../effects/motions";
export default function Pricing(){
    const pricing_system = [
        {
            type : 'Starter',
            sb_text : 'Perfect for small businesses and startups',
            price : '$29',
            month : '/month',
            benefits : ['Up to 100 shipments/months', 'Basic Tracking', 'Email support', 'Standard delivery', 'Basic insurance coverrage', 'Online dashboard'],
            btn_text : 'Get Started'    
        },
        {
            type : 'Business',
            sb_text : 'Ideal for growing businesses',
            price : '$99',
            month : '/month',
            benefits : ['Up to 500 shipments/months', 'Advanced tracking & analytics', 'Priority phone support', 'Express delivery options', 'Enhance insurance coverage', 'API integration', 'Dedicated account manager', 'Custom reporting'],
            btn_text : 'Get Started'    
        },
        {
            type : 'Enterprise',
            sb_text : 'Tailored solutions for large orgaizations',
            price : 'Custom',
            month : '',
            benefits : ['Unlimited shipments', 'Real-time GPS Tracking', '24/7 dedicated support', 'White-glove delivery', 'Full insurance coverage', 'Custom API development'],    
            btn_text : 'Contact Sales'
        },
    ]
    return(
        <>
            <div className="w-full h-auto flex flex-col items-center bg-[#F9FAFB] overflow-hidden" id="quoteSection">
                <motion.h2 {...scrollUp} className="text-xl md:text-2xl lg:text-3xl mt-10 font-bold text-[#2563EB]">
                    Choose your plan
                </motion.h2>
                <motion.p {...scrollUpDelay} className="w-90 md:w-130 text-center mt-2 text-gray-600 text-xs md:text-sm">
                    Affordable, flexible plans tailored for individuals and businesses. Choose what fits your shipment size and speed.
                </motion.p>
                <div  className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                    {pricing_system.map((data) => (
                        <motion.div {...cardHover} {...scrollLeft} key={data.id} className="w-85 p-5 shadow-md flex flex-col items-center rounded-md">
                            <p className="font-semibold mt-2 text-md">
                                {data.type}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                                {data.sb_text}  
                            </p>
                            <h2 className="text-3xl my-2 font-bold text-[#2563EB]">
                                {data.price} <span className="text-xl font-semibold text-gray-500">{data.month}</span>
                            </h2>
                            <ul className="flex flex-col space-y-3">
                                {data.benefits.map((benefits, index) =>(
                                    <li key={index} className="text-sm text-gray-500 flex">
                                        <FaCheck  className="w-2 h-2 mt-2 mr-1.5 text-[#2563EB]"/>{benefits}
                                    </li>
                                ))}
                            </ul>
                            <motion.button {...buttonHover} className="mt-5 w-full h-11 text-sm font-semibold rounded-sm bg-[#2563EB] text-white cursor-pointer hover:border-1 hover:border-[#2563EB] hover:bg-transparent hover:text-[#2563EB] transition-all">
                                {data.btn_text}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </>
    )
}