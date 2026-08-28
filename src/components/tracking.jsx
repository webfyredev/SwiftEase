import { buttonHover, cardHover, scrollUp, scrollUpDelay } from "../effects/motions";
import { motion } from "framer-motion";
import axios from 'axios'
import { useState } from "react";
export default function Tracking(){
    const [trackingCode, setTrackingCode] = useState("");
    const [packageData, setPackageData] = useState(null);
    const [error, setError] = useState("");

    const handleTrack = async () => {
        try {
            const response = await axios.get(`https://swiftease-backend.onrender.com/package/${trackingCode}/`);
            setPackageData(response.data);
            // setError("");
        } catch (error){    
            setError("Tracking code not found")
            setPackageData(null);
        };
    };
    const track_codes = [
        {
            id : 1,
            code : 'P393120587'
        },
        {
            id : 2,
            code : 'H361556649'
        },
        {
            id: 3,
            code : ' Z529893891'
        }
    ]
    return(
        <>
            <motion.div {...scrollUp} className="w-full h-auto lg:h-100 flex items-center justify-center py-10 bg-white overflow-hidden" id="trackShipments">
                <motion.div {...scrollUpDelay} className="w-200 h-full bg-[#F9FAFB] rounded-md shadow-xs flex flex-col items-center">
                    <h3 className="mt-10 text-lg md:text-xl font-semibold text-[#0F172A]">
                        Enter Tracking Information
                    </h3>
                    <p className="text-xs md:text-sm mt-1 text-gray-600">
                        Enter your tracking ID to get the latest status of your shipment
                    </p>
                    <div className="md:w-170 w-85 mt-8 md:flex md:flex-row flex flex-col justify-center">
                            <input type="text" placeholder="Enter tracking ID (e.g., LG123456789)" value={trackingCode} onChange={(e) =>setTrackingCode(e.target.value.toUpperCase())} className="md:w-100 w-full md:h-10 h-12 rounded-sm px-3 text-sm mr-5 border-1 border-slate-200 rounded-md text-sm outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/20 transition-all duration-200"/>
                            <motion.button {...buttonHover} onClick={handleTrack} className="text-sm md:w-40 mt-4 md:mt-0 lg:h-full md:h-10 h-12 rounded-lg bg-[#14B8A6] font-semibold text-white cursor-pointer transition-all">
                                Track Package
                            </motion.button>
                    </div>
                    <p className="text-gray-500 text-sm mt-5">
                        Quick access to recent shipments
                    </p>
                    <div className="w-auto h-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 my-5">
                        {track_codes.map((codes) =>(
                            <motion.div {...cardHover} key={codes.id} className="font-semibold w-35 h-9 text-center flex items-center justify-center rounded-md text-xs bg-[#14B8A6]/12 text-[#14B8A6]">
                                {codes.code}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
            {error && <p className="text-red-600 text-center">{error}</p>}
            {packageData && (
            <motion.div {...scrollUp} className="w-full py-10 flex justify-center">
                <div className="w-[90%] md:w-[80%] lg:w-[70%] bg-white shadow-lg rounded-xl p-6">

                {/* Header */}
                <div className="flex items-center justify-between border-b pb-4">
                    <div>
                    <h2 className="text-xl font-bold text-gray-700">Package Tracking</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Tracking Code: <span className="font-mono font-semibold">{packageData.tracking_code}</span>
                    </p>
                    </div>

                    <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium">
                    {packageData.status}
                    </span>
                </div>

                {/* Horizontal Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

                    <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-xs text-gray-500">Sender</p>
                    <p className="font-semibold">{packageData.sender_name}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-xs text-gray-500">Receiver</p>
                    <p className="font-semibold">{packageData.reciever_name}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-xs text-gray-500">Origin</p>
                    <p className="font-semibold">{packageData.origin}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-xs text-gray-500">Destination</p>
                    <p className="font-semibold">{packageData.destination}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-xs text-gray-500">Current Location</p>
                    <p className="font-semibold">{packageData.current_location}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md">
                    <p className="text-xs text-gray-500">Estimated Delivery</p>
                    <p className="font-semibold">{packageData.estimated_delivery}</p>
                    </div>

                </div>

                {/* Timeline */}
                <div className="mt-10">
                    <div className="flex items-center justify-between">

                    <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                        <p className="text-xs mt-2">Origin</p>
                    </div>

                    <div className="flex-1 h-[2px] bg-gray-300 mx-2"></div>

                    <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                        <p className="text-xs mt-2">Current</p>
                    </div>

                    <div className="flex-1 h-[2px] bg-gray-300 mx-2"></div>

                    <div className="flex flex-col items-center">
                        <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                        <p className="text-xs mt-2">Destination</p>
                    </div>

                    </div>
                </div>

            </div>
        </motion.div>
)}

            {/* {packageData && (
                <div className="w-full border-1 border-red-500 p-5 items-center flex justify-center bg-[#F9FAFB]">
                    <div className="w-[65%] h-auto flex flex-col p-5 rounded-md bg-white shadow-sm items-center">
                        <h2 className="font-semibold">
                        Package Tracking
                        </h2>
                        <h3 className="text-sm mt-2">
                            Tracking Code : {packageData.tracking_code}
                        </h3>
                        <div className="w-full h-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-5 border-1 border-red-500 mt-2 p-5">
                            <div className="flex flex-col px-2 rounded-sm bg-[#F9FAFB]">
                                <label htmlFor="" className="text-xs font-semibold mt-1">Sender</label>
                                <h3 className="text-sm my-1">
                                    {packageData.sender_name}
                                </h3>
                            </div>
                            <div className="flex flex-col border-1 px-2">
                                <label htmlFor="" className="text-xs font-semibold mt-1">Reciever</label>
                                <h3 className="text-sm my-1">
                                    {packageData.reciever_name}
                                </h3>
                            </div>
                            <div className="flex flex-col border-1 px-2">
                                <label htmlFor="" className="text-xs font-semibold mt-1">Status</label>
                                <h3 className="text-sm my-1">
                                    {packageData.status}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            )} */}
            
        </>
    );
}