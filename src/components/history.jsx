import { cardHover, scrollLeft, scrollUp, scrollUpDelay } from "../effects/motions";
import { motion } from "framer-motion";
export default function History(){
    const history_details = [
        {
            id: 1,
            year : '2009',
            title : 'Company Founded',
            text : 'Started as a local delivery service with a vision to revolutionize logistics'
        },
        {
            id: 2,
            year : '2012',
            title : 'Regional Expansion',
            text : 'Expanded operations to cover the entire regionwith advanced tracking systems'
        },
        {
            id : 3,
            year : '2016',
            title : 'International Growth',
            text : 'Lauched international shipping services to 15 countries worldwide.'
        },
        {
            id :4,
            year : '2020',
            title : 'Digital Transformation',
            text : 'Implemented AI-powered logistics and real-time tracking technology'
        },
        {
            id : 5,
            year : '2025',
            title : 'Global Leader',
            text : 'Now serving 25+ countries with 50,000+ successful deliveries anually'
        }
    ]
    return(
        <>
            <div className="w-full h-auto bg-[#F9FAFB] mt-10 flex flex-col items-center py-5 px-10">
                <motion.h2 {...scrollUp} className="font-bold text-2xl">
                    Our Journey
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-sm text-gray-400 mt-2">
                    From a small local business to a global logistics leader
                </motion.p>
                <motion.div {...scrollLeft} className="w-full h-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                    {history_details.map((details) =>(
                        <motion.div {...cardHover} className="p-5 shadow-md rounded-md mb-5 bg-white">
                            <p className="font-bold text-[#2563EB]">
                                {details.year}
                            </p>
                            <p className="font-semibold mt-2">
                                {details.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                {details.text}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
            
        </>
    );
}