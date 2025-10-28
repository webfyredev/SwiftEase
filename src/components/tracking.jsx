import { buttonHover, cardHover, scrollUp, scrollUpDelay } from "../effects/motions";
import { motion } from "framer-motion";
export default function Tracking(){
    const track_codes = [
        {
            id : 1,
            code : 'LG123456789'
        },
        {
            id : 2,
            code : 'LG987654321'
        },
        {
            id: 3,
            code : 'LG456789123'
        }
    ]
    return(
        <>
            <motion.div {...scrollUp} className="w-full h-auto lg:h-100 flex items-center justify-center py-10 bg-white overflow-hidden">
                <motion.div {...scrollUpDelay} className="w-200 h-full bg-[#F9FAFB] rounded-md shadow-xs flex flex-col items-center">
                    <h3 className="mt-10 text-lg md:text-xl font-semibold">
                        Enter Tracking Information
                    </h3>
                    <p className="text-xs md:text-sm mt-1 text-gray-600">
                        Enter your tracking ID to get the latest status of your shipment
                    </p>
                    <form className="md:w-170 w-85 mt-8 md:flex md:flex-row flex flex-col justify-center">
                            <input type="text" placeholder="Enter tracking ID (e.g., LG123456789)" className="md:w-100 w-full md:h-10 h-12 rounded-sm px-3 text-sm mr-5 text-blue-500 outline-none border-1 border-gray-300 bg-white"/>
                            <motion.button {...buttonHover} className="text-sm md:w-40 mt-4 md:mt-0 lg:h-full md:h-10 h-12 rounded-sm bg-blue-500 font-semibold text-white cursor-pointer hover:bg-transparent hover:border-1 hover:border-blue-500 hover:text-blue-500 transition-all">
                                Track Package
                            </motion.button>
                    </form>
                    <p className="text-gray-500 text-sm mt-5">
                        Quick access to recent shipments
                    </p>
                    <div className="w-auto h-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 my-5">
                        {track_codes.map((codes) =>(
                            <motion.div {...cardHover} key={codes.id} className="font-semibold w-35 h-9 text-center flex items-center justify-center rounded-md text-xs bg-[#DBEAFE] text-[#2563EB]">
                                {codes.code}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}