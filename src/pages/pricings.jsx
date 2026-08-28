import Footer from "../components/footer";
import NavBar from "../components/navbar";
import PageHeader from "../components/pageHeader";
import Pricing from "../components/pricing";
// import pricingImg from '../images/page/pages (8).webp'
import pricingImg from '../images/imgs (2).webp'
import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import { cardHover, scrollLeft, scrollUp, scrollUpDelay, buttonHover } from "../effects/motions";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Pricings(){
    const {hash} = useLocation();
    useEffect(()=>{
        if(hash){
            const elements = document.querySelector(hash)
            if(elements){
                elements.scrollIntoView({behavior : "smooth"})
            };
        }
    }, [hash])
    useEffect(() =>{
        document.title = 'Pricing | SwiftEase'
    }, []);
    const pricing_services = [
        {
            id : 1,
            title : 'Express Delivery (Same Day)',
            price : 25,
            rate : 'per package'
        },
        {
            id : 2,
            title : 'International Shipping',
            price : 45,
            rate : 'per package'
        },
        {
            id : 3,
            title : 'Temperature Controlled',
            price : 15,
            rate : 'per package'
        },
        {
            id : 4,
            title : 'White Glove Service',
            price : 35,
            rate : 'per delivery'
        },
        {
            id : 5,
            title : 'Packaging Service',
            price : 8,
            rate : 'per package'
        },
        {
            id : 6,
            title : 'Storage (per month)',
            price : 2,
            rate : 'per cube root'
        },

    ];
    const faqs = [
        {
            id :1,
            question : 'What is included in the monthly plans?',
            answer : 'All monthly plans include access to our tracking system, customer support, and basic insurance coverage. Higher tiers include additional features like priority support and ad advanced analytics'
        },
        {
            id : 2,
            question : 'Can i change my plan anytime?',
            answer : 'Yes, you can upgrade or downgrade your plan anytime.Changes will be reflected in your next billing cycle.'
        },
        {
            question : 'Are there any setup fees?',
            answer : 'No, there are not setup fees for any of our plans. You only pay the monthly subscription fee.'
        },
        {
            question : 'What is included in the monthly plans?',
            answer : 'All monthly plans include access to our tracking system, customer support, and basic insurance coverage. Higher tiers include additional features like priority support and ad advanced analytics'
        },

    ]
    return(
        <>
            <NavBar />
            <PageHeader 
            image = {pricingImg}
            page = 'Pricing'/>
            <Pricing />
            <div className="w-full flex flex-col py-10 bg-white items-center mt-5">
                <motion.h2 {...scrollUp} className="font-bold text-2xl md:text-3xl text-black mt-2">
                    Additional Services
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-xs md:text-sm text-gray-400 mt-2 w-85 md:w-150 text-center">
                Enhance your shipping experience with our premium add-on services
                </motion.p>
                <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                    {pricing_services.map((pricing) => (
                        <motion.div {...scrollLeft} {...cardHover} className="flex justify-between shadow-sm rounded-md bg-[#F9FAFB] p-5">
                            <h3 className="text-sm font-semibold">
                                {pricing.title}
                            </h3>
                            <div className="w-20 h-15 flex flex-col">
                                <h3 className="text-lg text-right font-bold text-[#14B8A6]">
                                    ${pricing.price}
                                </h3>
                                <p className="text-[10px] text-right text-gray-400 font-semibold">
                                    {pricing.rate}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="w-full bg-[#F9FAFB] flex flex-col items-center py-5">
                <motion.h2 {...scrollUp} className="font-bold text-2xl md:text-3xl text-black mt-2">
                    Frequently Asked Questions
                </motion.h2>
                <motion.p {...scrollUpDelay} className="text-xs md:text-sm w-85 md:w-150 text-gray-400 mt-2 text-center">
                    Common questions about our pricing and services
                </motion.p>
                <div className="lg:w-[70%] md:w-[85%] w-[95%] h-auto flex flex-col items-center mt-5">
                    {faqs.map((data) => (
                        <motion.div {...scrollUp} {...cardHover} className="w-full p-5 bg-white rounded-md shadow-sm mb-3 flex flex-col">
                            <h3 className="font-semibold text-sm">
                                {data.question}
                            </h3>
                            <p className="text-[9px] md:text-xs mt-2 text-gray-500">
                                {data.answer}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
            <motion.div {...scrollUp} className="w-full h-70 bg-white flex flex-col items-center justify-center overflow-hidden">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    Ready to Start Shipping?
                </h2>
                <p className="text-gray-500 md:w-120 w-85 text-center mt-2 text-xs md:text-sm">
                    Join thousands of businesses who trust us with their logistics needs. Start with a free trial and see the difference our service makes
                </p>
                <div className="flex mt-5">
                    <motion.button {...buttonHover} className="px-6 py-2.5 text-sm text-white font-semibold rounded-lg bg-[#14B8A6] cursor-pointer mr-5">
                        <Link to="/contacts#contactSection">
                            Start Free Trial
                        </Link>
                    </motion.button>
                    <motion.button {...buttonHover} className="px-6 py-2.5 text-sm text-[#0F172A] font-semibold rounded-lg border-1 border-[#0F172A] cursor-pointer">
                        <Link to="/contacts#scheduleDemo">
                            Schedule Demo
                        </Link>
                    </motion.button>
                </div>
            </motion.div>
            <Footer />
        </>
    )
}