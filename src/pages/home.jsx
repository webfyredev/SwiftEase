import NavBar from "../components/navbar";
// import heroBg from '../images/hero.webp'
import bgImg from '../images/hero.jpg'
import CountUp from "react-countup";
import { useInView } from 'react-intersection-observer'
import { FaHandshake, FaLeaf, FaShippingFast } from "react-icons/fa";
import { FiGlobe } from "react-icons/fi";
import { MdEmojiPeople, MdSupportAgent } from "react-icons/md";
import { RiShieldCheckLine } from "react-icons/ri";
import Services from "../components/services";
import Pricing from "../components/pricing";
import Tracking from "../components/tracking";
import CTA from "../components/cta";
import Footer from "../components/footer";
import { motion } from "framer-motion";
import { buttonHover, cardHover, scrollLeft, scrollRight, scrollUp, scrollUpDelay, scrollUpDelayNext } from "../effects/motions";
import About_Us from "../components/about_us";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GiLightBulb } from "react-icons/gi";
import Team from "../components/team";

export default function Home(){
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
            setTimeout(() =>  setError(""), 4000)
            setPackageData(null);
        };
    };
    useEffect(() =>{
        document.title = 'SwiftEase-Logistics'
    }, []);
    const {ref, inView} = useInView({
        triggerOnce : true,
        threshold : 0.4
    })
    const values = [
        {
            id : 1,
            title : 'Reliability',
            text : 'We ensure your packages reach their destination safely and on time, every time.',
            icon : <FaHandshake  className="w-14 h-14 p-4 rounded-full bg-[#14B8A6]/12 text-[#14B8A6]"/>
        },
        {
            id : 2,
            title : 'Customer First',
            text : 'Our customers are at the heart of everything we do, driving our commitment to excellence',
            icon : <MdEmojiPeople className="w-14 h-14 p-4 rounded-full bg-[#14B8A6]/12 text-[#14B8A6]"/>
        },
        {
            id : 3,
            title : 'Sustainability',
            text : 'We are committed to eco-friendly practices and reducing our environmental footprint',
            icon : <FaLeaf className="w-14 h-14 p-4 rounded-full bg-[#14B8A6]/12 text-[#14B8A6]"/>
        },
        {
            id : 4,
            title : 'Innovation',
            text : 'Continously investing in technology to provide cutting-edge logistics solutions',
            icon : <GiLightBulb className="w-14 h-14 p-4 rounded-full bg-[#14B8A6]/12 text-[#14B8A6]"/>
        }
    ]
    const choose = [
        {
            id : 1, 
            icon : <FaShippingFast  className="w-12 h-11 p-2.5 rounded-md bg-[#14B8A6]/12 text-[#14B8A6] cursor-pointer"/>,
            title : 'Fast Delivery',
            text : 'Express shipping options with real-time tracking for urgent deliveries worldwide.'
        },
        {
            id : 2, 
            icon : <RiShieldCheckLine className="w-12 h-11 p-2.5 rounded-md bg-[#14B8A6]/12 text-[#14B8A6] cursor-pointer"/>,
            title : 'Secure Transport',
            text : 'Advanced security measures and insurance coverage for all your valuable shipments.'
        },
        {
            id : 3, 
            icon : <FiGlobe className="w-12 h-11 p-2.5 rounded-md bg-[#14B8A6]/12 text-[#14B8A6] cursor-pointer"/>,
            title : 'Global Network',
            text : 'Extensive worldwide network covering over 25 countries with local expertise.'
        },
        {
            id : 4, 
            icon : <MdSupportAgent className="w-12 h-11 p-2.5 rounded-md bg-[#14B8A6]/12 text-[#14B8A6] cursor-pointer"/>,
            title : '24/7 Support',
            text : 'Round-the-clock customer support to assist you with all your logistics needs.'
        },
    ]
    return(
        <>
            <NavBar />
            <div className="w-full lg:h-[91vh] md:h-auto h-[85vh] relative overflow-hidden">
                <img src={bgImg} className="w-full h-full object-cover"/>
                <div className="absolute top-0 w-full h-full bg-[#0F172A]/70 inset-0 flex flex-col items-center justify-center">
                    <motion.div 
                        {...scrollRight}
                        className="w-auto flex items-center justify-center px-5 py-1 rounded-full space-x-1.5 bg-[#14B8A6] mt-15">
                        <h4 className="text-[12px] italic font-semibold text-white/80">Fast</h4><span className="w-1 h-1 bg-white rounded-full mt-0.2"></span><h4 className="text-[12px] italic font-semibold text-white/80">Reliable</h4><span className="w-1 h-1 bg-white rounded-full mt-0.2"></span><h4 className="text-[12px] font-semibold italic text-white/80">Nationwide</h4>
                    </motion.div>
                    <motion.h1 {...scrollUp} className=" mt-3 lg:mt-0 text-3xl md:text-4xl lg:text-6xl text-white font-bold">
                        Ship Smarter.
                    </motion.h1>
                    <motion.h1 {...scrollUpDelay} className="text-3xl md:text-4xl lg:text-7xl text-white font-bold">
                        Deliver Faster.
                    </motion.h1>
                    {/* <motion.h1 {...scrollUpDelay} className="text-3xl md:text-4xl lg:text-5xl text-[#FACC15] font-bold">
                        Global Logistics Solutions.
                    </motion.h1> */}
                    <motion.p {...scrollUpDelayNext} className="w-80 text-xs md:text-sm md:w-130 text-center mt-5 text-white">
                        Your trusted partner for freight transport, warehousing, and delivery services across the globe.
                        Experience seamless logistics with cutting-edge technology
                    </motion.p>
                    <motion.div {...scrollLeft} className="flex mt-5 space-x-5">
                        <motion.button {...buttonHover} className="px-4 md:px-8 py-2.5 rounded-md cursor-pointer bg-[#14B8A6] text-white transition-all font-semibold text-sm">
                            <Link to="/pricings#quoteSection">
                                Send a Package
                            </Link>
                        </motion.button>
                        <motion.button {...buttonHover} className="px-4 md:px-8 py-2 rounded-md cursor-pointer border-1 border-[#14B8A6] text-white transition-all text-sm font-semibold">
                            <Link to="/trackings#trackShipments">
                                Track Shipments
                            </Link>
                        </motion.button>
                    </motion.div>
                    <div className="flex flex-col items-center rounded-lg p-3 mt-10 w-[85%] md:w-auto lg:w-[60%] bg-white space-y-2">
                        <h3 className="text-[13px] font-semibold text-[#0F172A]">Track Your Shipment</h3>
                        <div className="w-full md:flex md:flex-row flex flex-col justify-around mb-2">
                            <input type="text" placeholder="Enter tracking ID (e.g., LG123456789)" value={trackingCode} onChange={(e) => setTrackingCode(e.target.value.toUpperCase())} className="md:w-120 w-full md:h-10 h-12 rounded-lg px-3 text-sm mr-5 text-[#0F172A] border-1  border-gray-200 bg-white outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/20 transition-all duration-200"/>
                            <motion.button {...buttonHover} onClick={handleTrack} className="outline-none text-sm md:w-50 mt-4 md:mt-0 lg:h-full md:h-10 h-12 rounded-lg bg-[#14B8A6] font-semibold text-white cursor-pointer transition-all">
                                Track Package
                            </motion.button>
                        </div>
                    </div> 

                    <div className="absolute p-5 right-10  top-5 md:top-15">
                        {error && <motion.p {...scrollLeft} className="text-red-600 text-center px-7 py-3 rounded-lg text-sm bg-white">{error}</motion.p>}
                        {packageData && (
                            <div className="w-[30%] h-auto flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-700">Package Tracking</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Tracking Code: <span className="font-mono font-semibold">{packageData.tracking_code}</span>
                                    </p>
                                </div>

                                <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 font-medium">
                                {packageData.status}
                                </span>
                                <p className="text-sm text-[#000000]">Kindly check the tracking page to see full details <Link to="/tracking" className="text-blue-500 font-semibold">Click Here.</Link></p>
                            </div>
                        )}
                    </div> 

                </div>
            </div>
            <motion.section {...scrollUp} ref={ref} className="bg-[#F9FAFB] py-10">
                <div className="w-full text-center h-auto grid grid-cols-2 lg:grid-cols-4 gap-5">
                    <div>
                        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#14B8A6]">
                            {inView ? <CountUp end={50000} duration={5} /> :0}+
                        </h2>
                        <p className="text-[#0F172A] mt-2 text-xs md:text-xs font-semibold">
                            Packages Delivered
                        </p>
                    </div>
                    <div>
                        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#14B8A6]">
                            {inView ? <CountUp end={25} duration={5} /> :0}+
                        </h2>
                        <p className="text-[#0F172A] mt-2 text-xs md:text-xs font-semibold">
                            Country Served
                        </p>
                    </div>
                    <div>
                        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#14B8A6]">
                            {inView ? <CountUp end={500} duration={5} /> :0}+
                        </h2>
                        <p className="text-[#0F172A] mt-2 text-xs md:text-xs font-semibold">
                            Happy Clients
                        </p>
                    </div>
                    <div>
                        <h2 className="lg:text-4xl md:text-3xl text-2xl font-bold text-[#14B8A6]">
                            {inView ? <CountUp end={15} duration={5} /> :0} Years
                        </h2>
                        <p className="text-[#0F172A] mt-2 text-xs md:text-xs font-semibold">
                            Experience
                        </p>
                    </div>
                </div>
            </motion.section>
            <About_Us />
            <div className="w-full h-auto flex flex-col items-center bg-white py-5 overflow-hidden my-10">
                <motion.h2 {...scrollUp} className="font-bold text-2xl  text-[#0F172A]">
                    Our Core Values
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-sm text-gray-400 mt-2">
                    The principles that guides everything we do
                </motion.p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
                    {values.map((values) =>(
                        <motion.div {...scrollLeft} className="w-full p-8 flex flex-col items-center">
                            {values.icon}
                            <h3 className="mt-3 text-sm font-semibold text-[#0F172A]">
                                {values.title}
                            </h3>
                            <p className="text-xs text-center text-gray-400 mt-2">
                                {values.text}
                            </p>
                        </motion.div>

                    ))}
                </div>
            </div>
            <Services />
            <div className="bg-white w-full lg:h-120 h-auto flex flex-col items-center py-10 mt-10 overflow-hidden px-5">
                <motion.h2 {...scrollUp} className="text-xl md:text-3xl lg:text-3xl font-bold mb-3 text-[#14B8A6]">
                    The ShiftEase Advantage
                </motion.h2>
                <motion.p {...scrollUpDelay} className="md:w-130 w-90 text-center text-gray-600 text-xs md:text-sm">
                    We provide comprehensive logistics solutions with advanced technology, global reach, and unmatched reliabilityfor all your shipping needs
                </motion.p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 mt-5">
                    {choose.map((data) =>(
                        <motion.div {...scrollLeft} {...cardHover} className="w-full shadow-md rounded-md p-5 flex flex-col">
                            {data.icon}
                            <h2 className="my-3 font-semibold text-sm text-[#0F172A]">
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
            <Team />
            <CTA />
            <Footer />
        </>
    );
}