import About_Us from "../components/about_us";
import Footer from "../components/footer";
import NavBar from "../components/navbar";
import { motion } from "framer-motion"
import aboutImg from '../images/services/about_logistics.jpg'
import { scrollUp, scrollLeft, buttonHover, scrollRight, scrollUpDelay } from "../effects/motions"
import CountUp from "react-countup";
import { useInView } from 'react-intersection-observer'
import missionImg from '../images/page/pages (1).webp'
import History from "../components/history";
import { FaHandshake, FaLeaf } from "react-icons/fa";
import { MdEmojiPeople } from "react-icons/md";
import { GiLightBulb } from "react-icons/gi";
import Team from "../components/team";
import PageHeader from "../components/pageHeader";
import aboutHeaderImg from '../images/imgs (2).webp'

export default function About(){
    const values = [
        {
            id : 1,
            title : 'Reliability',
            text : 'We ensure your packages reach their destination safely and on time, every time.',
            icon : <FaHandshake  className="w-14 h-14 p-4 rounded-full bg-[#DBEAFE] text-[#2563EB]"/>
        },
        {
            id : 2,
            title : 'Customer First',
            text : 'Our customers are at the heart of everything we do, driving our commitment to excellence',
            icon : <MdEmojiPeople className="w-14 h-14 p-4 rounded-full bg-[#DBEAFE] text-[#2563EB]"/>
        },
        {
            id : 3,
            title : 'Sustainability',
            text : 'We are committed to eco-friendly practices and reducing our environmental footprint',
            icon : <FaLeaf className="w-14 h-14 p-4 rounded-full bg-[#DBEAFE] text-[#2563EB]"/>
        },
        {
            id : 4,
            title : 'Innovation',
            text : 'Continously investing in technology to provide cutting-edge logistics solutions',
            icon : <GiLightBulb className="w-14 h-14 p-4 rounded-full bg-[#DBEAFE] text-[#2563EB]"/>
        }
    ]
    const {ref, inView} = useInView({
        triggerOnce : true,
        threshold : 0.4
    })
    return(
        <>
            <NavBar />
            <PageHeader 
            image = {aboutHeaderImg}
            page = 'About'/>
            <About_Us />
            <div className="w-full lg:h-120 h-auto lg:mt-20 lg:flex lg:flex-row flex flex-col px-5 py-10 justify-around overflow-hidden bg-[#F9FAFB]">
                <motion.img {...scrollRight} src={missionImg} className="lg:w-[45%] w-full h-full object-cover mt-5 md:mt-0"/>
                <motion.div {...scrollUp} className="w-full lg:w-[45%] h-full md:p-5">
                    
                    <h2 className="text-xl md:text-3xl mt-2 font-bold text-[#2563EB]">
                        Our Mission
                    </h2>
                    <p className="text-xs md:text-sm mt-3 lg:w-115 w-90 md:w-full">
                        To provide fast, reliable,  and cost-effective logistics solutions that enable businesses to thrivein the global marketplace.We are committed to delivering excellence through innovation, sustainability, and customer-centricservice.
                    </p>
                    <p className="text-xs md:text-sm  mt-3 lg:w-115 md:w-full w-90">
                        Our vision is to become the world's most trusted logistics partner, connecting businesses and communities through seamless, technology-driven transportation and warehousing solutions
                    </p>
                    <div ref={ref} className="w-full h-auto flex space-x-10 mt-10">
                        <div>
                            <h2 className="lg:text-xl md:text-lg text-md font-bold text-[#2563EB]">
                                {inView ? <CountUp end={50000} duration={5} /> :0}+
                            </h2>
                            <p className="text-gray-600 mt-2 text-xs md:text-xs font-semibold">
                                Packages Delivered
                            </p>
                        </div>
                        <div>
                            <h2 className="lg:text-xl md:text-lg text-md font-bold text-[#2563EB]">
                                {inView ? <CountUp end={25} duration={5} /> :0}+
                            </h2>
                            <p className="text-gray-600 mt-2 text-xs md:text-xs font-semibold">
                                Countries Served
                            </p>
                        </div>
                    </div>
                </motion.div>  
            </div>
            <History />
            <div className="w-full h-auto flex flex-col items-center bg-white py-5">
                <motion.h2 {...scrollUp} className="font-bold text-2xl">
                    Our Core Values
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-sm text-gray-400 mt-2">
                    The principles that guides everything we do
                </motion.p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
                    {values.map((values) =>(
                        <motion.div {...scrollLeft} className="w-full p-8 flex flex-col items-center">
                            {values.icon}
                            <h3 className="mt-3 text-sm font-semibold">
                                {values.title}
                            </h3>
                            <p className="text-xs text-center text-gray-400 mt-2">
                                {values.text}
                            </p>
                        </motion.div>

                    ))}
                </div>
            </div>
            <Team />
            <div className="w-full h-90 bg-[#2563EB] flex flex-col items-center p-5">
                <h3 className="font-bold text-2xl text-white mt-5">
                    Global Coverage
                </h3>
                <p className="md:w-120 lg:w-140 w-90 mt-5 text-center text-gray-300 text-sm">
                    Our extensive networks spans across continents, ensuring your packages reach their detination anywhere in the world
                </p>
                <div ref={ref} className="lg:w-[70%] w-full  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 mt-5">
                    <div>
                        <h2 className="lg:text-3xl md:text-lg text-md font-bold text-white">
                                {inView ? <CountUp end={25} duration={5} /> :0}+
                        </h2>
                        <p className="text-gray-100 mt-2 text-xs md:text-xs font-semibold">
                            Countries
                        </p>
                    </div>
                    <div>
                        <h2 className="lg:text-3xl md:text-lg text-md font-bold text-white">
                                {inView ? <CountUp end={150} duration={5} /> :0}+
                        </h2>
                        <p className="text-gray-100 mt-2 text-xs md:text-xs font-semibold">
                            Cities
                        </p>
                    </div>
                    <div>
                        <h2 className="lg:text-3xl md:text-lg text-md font-bold text-white">
                                {inView ? <CountUp end={500} duration={5} /> :0}+
                        </h2>
                        <p className="text-gray-100 mt-2 text-xs md:text-xs font-semibold">
                            Partners
                        </p>
                    </div>
                    <div>
                        <h2 className="lg:text-3xl md:text-lg text-md font-bold text-white">
                                {inView ? <CountUp end={99} duration={5} /> :0}%
                        </h2>
                        <p className="text-gray-100 mt-2 text-xs md:text-xs font-semibold">
                            On-Time Delivery
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}