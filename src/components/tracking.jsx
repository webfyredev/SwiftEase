import { scrollUp, scrollUpDelay } from "../effects/motions";
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
            <motion.div {...scrollUp} className="w-full h-100 flex items-center justify-center py-10 bg-white overflow-hidden">
                <motion.div {...scrollUpDelay} className="w-200 h-full bg-[#F9FAFB] rounded-md shadow-xs flex flex-col items-center">
                    <h3 className="mt-10 text-xl font-semibold">
                        Enter Tracking Information
                    </h3>
                    <p className="text-sm mt-1 text-gray-600">
                        Enter your tracking ID to get the latest status of your shipment
                    </p>
                    <form className="w-170 mt-8 flex justify-center">
                            <input type="text" placeholder="Enter tracking ID (e.g., LG123456789)" className="w-100 h-10 rounded-sm px-3 text-sm mr-5 text-blue-500 outline-none border-1 border-gray-300 bg-white"/>
                            <button className="text-sm w-40 h-full rounded-sm bg-blue-500 font-semibold text-white cursor-pointer hover:bg-transparent hover:border-1 hover:border-blue-500 hover:text-blue-500 transition-all">
                                Track Package
                            </button>
                    </form>
                    <p className="text-gray-500 text-sm mt-5">
                        Quick access to recent shipments
                    </p>
                    <div className="w-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {track_codes.map((codes) =>(
                            <div key={codes.id} className="font-semibold w-35 h-9 text-center flex items-center justify-center rounded-md text-xs bg-[#DBEAFE] text-[#2563EB]">
                                {codes.code}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
}