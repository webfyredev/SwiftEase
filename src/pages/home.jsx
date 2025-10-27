import NavBar from "../components/navbar";
// import heroBg from '../images/hero.webp'
import bgImg from '../images/imgs (3).webp'
import CountUp from "react-countup";
import { useInView } from 'react-intersection-observer'
import { FaShippingFast } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { MdSupportAgent } from "react-icons/md";
import { RiShieldCheckLine } from "react-icons/ri";
import Services from "../components/services";
import Pricing from "../components/pricing";
import Tracking from "../components/tracking";
import CTA from "../components/cta";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { buttonHover, cardHover, scrollLeft, scrollUp, scrollUpDelay, scrollUpDelayNext } from "../effects/motions";
import About_Us from "../components/about_us";

export default function Home(){
    const {ref, inView} = useInView({
        triggerOnce : true,
        threshold : 0.4
    })
    const choose = [
        {
            id : 1, 
            icon : <FaShippingFast  className="w-12 h-11 p-2.5 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            title : 'Fast Delivery',
            text : 'Express shipping options with real-time tracking for urgent deliveries worldwide.'
        },
        {
            id : 2, 
            icon : <RiShieldCheckLine className="w-12 h-11 p-2.5 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            title : 'Secure Transport',
            text : 'Advanced security measures and insurance coverage for all your valuable shipments.'
        },
        {
            id : 3, 
            icon : <FiGlobe className="w-12 h-11 p-2.5 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            title : 'Global Network',
            text : 'Extensive worldwide network covering over 25 countries with local expertise.'
        },
        {
            id : 4, 
            icon : <MdSupportAgent className="w-12 h-11 p-2.5 bg-[#DBEAFE] rounded-md text-[#2563EB] cursor-pointer"/>,
            title : '24/7 Support',
            text : 'Round-the-clock customer support to assist you with all your logistics needs.'
        },
    ]
    return(
        <>
            <NavBar />
            <div className="w-full lg:h-[91vh] md:h-auto h-[85vh] relative overflow-hidden">
                <img src={bgImg} className="w-full h-full object-cover"/>
                <div className="absolute top-0 w-full h-full bg-[#1D4ED8]/50 inset-0 flex flex-col items-center justify-center">
                    <motion.h1 {...scrollUp} className="text-3xl md:text-4xl lg:text-5xl text-white font-bold">
                        Fast. Reliable
                    </motion.h1>
                    <motion.h1 {...scrollUpDelay} className="text-3xl md:text-4xl lg:text-5xl text-[#FACC15] font-bold">
                        Global Logistics Solutions.
                    </motion.h1>
                    <motion.p {...scrollUpDelayNext} className="w-80 text-xs md:text-sm md:w-130 text-center mt-5 text-white">
                        Your trusted partner for freight transport, warehousing, and delivery services across the globe.
                        Experience seamless logistics with cutting-edge technology
                    </motion.p>
                    <motion.div {...scrollLeft} className="flex mt-5 space-x-5">
                        <motion.button {...buttonHover} className="px-8 py-2 rounded-md cursor-pointer bg-[#FACC15] text-white hover:bg-transparent hover:border-1 hover:border-[#FACC15] hover:text-[#FACC15] transition-all font-semibold text-sm">
                            Get Quote
                        </motion.button>
                        <motion.button {...buttonHover} className="px-8 py-2 rounded-md cursor-pointer border-1 border-[#FACC15] text-[#FACC15] hover:bg-[#FACC15] hover:text-white transition-all text-sm font-semibold">
                            Track Shipments
                        </motion.button>
                    </motion.div>

                </div>
            </div>
            <motion.section {...scrollUp} ref={ref} className="bg-[#F9FAFB] py-10">
                <div className="w-full text-center h-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    <div>
                        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#2563EB]">
                            {inView ? <CountUp end={50000} duration={5} /> :0}+
                        </h2>
                        <p className="text-gray-600 mt-2 text-xs md:text-xs font-semibold">
                            Packages Delivered
                        </p>
                    </div>
                    <div>
                        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#2563EB]">
                            {inView ? <CountUp end={25} duration={5} /> :0}+
                        </h2>
                        <p className="text-gray-600 mt-2 text-xs md:text-xs font-semibold">
                            Country Served
                        </p>
                    </div>
                    <div>
                        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#2563EB]">
                            {inView ? <CountUp end={500} duration={5} /> :0}+
                        </h2>
                        <p className="text-gray-600 mt-2 text-xs md:text-xs font-semibold">
                            Happy Clients
                        </p>
                    </div>
                    <div>
                        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#2563EB]">
                            {inView ? <CountUp end={15} duration={5} /> :0} Years
                        </h2>
                        <p className="text-gray-600 mt-2 text-xs md:text-xs font-semibold">
                            Experience
                        </p>
                    </div>
                </div>
            </motion.section>
            <About_Us />
            <Services />
            <div className="bg-white w-full lg:h-120 h-auto flex flex-col items-center py-10 mt-10 overflow-hidden">
                <motion.h2 {...scrollUp} className="text-xl md:text-3xl lg:text-3xl font-bold mb-3 text-[#2563EB]">
                    The ShiftEase Advantage
                </motion.h2>
                <motion.p {...scrollUpDelay} className="md:w-130 w-90 text-center text-gray-600 text-xs md:text-sm">
                    We provide comprehensive logistics solutions with advanced technology, global reach, and unmatched reliabilityfor all your shipping needs
                </motion.p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 mt-5">
                    {choose.map((data) =>(
                        <motion.div {...scrollLeft} {...cardHover} className="w-full shadow-md rounded-md p-5 flex flex-col">
                            {data.icon}
                            <h2 className="my-3 font-semibold text-sm">
                                {data.title}
                            </h2>
                            <p className="text-sm mb-5">
                                {data.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <Pricing />
            <Tracking />
            <CTA />
            <Footer />
        </>
    );
}