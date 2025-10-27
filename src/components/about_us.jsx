import { motion } from "framer-motion"
import aboutImg from '../images/page/pages (11).webp'
import { scrollUp, scrollLeft, buttonHover } from "../effects/motions"
export default function About_Us(){
    return(
        <>
            <div className="w-full lg:h-110 h-auto mt-10 lg:flex lg:flex-row flex flex-col p-5 justify-around overflow-hidden">
                <motion.div {...scrollUp} className="w-full lg:w-[45%] h-full md:p-5">
                    <p className="text-[#2563EB] font-semibold text-sm">
                        About ShiftEase Logistics
                    </p>
                    <h2 className="text-xl md:text-3xl mt-2 font-bold">
                        Delivering Beyond Expectations.
                    </h2>
                    <p className="text-xs md:text-sm mt-3 lg:w-115 w-90 md:w-full">
                        At ShiftEase Logistics, we specialize in providing fast, secure, and seamless delivery services tailored to your needs. Our mission is to simplify logistics through innovation and precision — ensuring every package reaches its destination safely and on time.
                    </p>
                    <p className="text-xs md:text-sm  mt-3 lg:w-115 md:w-full w-90">
                        With a dedicated team, modern tracking technology, and a customer-first mindset, we make logistics stress-free so you can focus on what matters most — growing your business.
                    </p>
                    <p className="mt-5 text-xs md:text-sm italic font-semibold">
                        “Swift. Secure. Reliable — that’s the ShiftEase promise.”
                    </p>
                    <div className="flex">
                        <motion.button {...buttonHover} className="mt-5 px-9 py-2.5 text-xs md:text-sm bg-blue-500 text-white rounded-sm font-semibold cursor-pointer hover:bg-[#DBEAFE] hover:text-[#2563EB] transition-all">
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>  
                <motion.img {...scrollLeft} src={aboutImg} className="lg:w-[45%] w-full h-full object-cover mt-5 md:mt-0"/>
            </div>
        </>
    )
}