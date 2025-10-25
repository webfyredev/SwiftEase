import { motion } from "framer-motion";
import { scrollUp, buttonHover } from "../effects/motions";
export default function CTA(){
    return(
        <>
            <motion.div {...scrollUp} className="w-full h-70 bg-[#2563EB] flex flex-col items-center justify-center overflow-hidden">
                <h2 className="text-4xl font-bold text-white">
                    Ready to Ship with Confidence?
                </h2>
                <p className="text-gray-200 w-120 text-center mt-2 text-sm">
                    Join thousands of businesses who trust us with their logistics needs. Get started today with a free quote.
                </p>
                <div className="flex mt-5">
                    <motion.button {...buttonHover} className="px-6 py-2.5 text-sm text-white font-semibold rounded-md bg-[#FACC15] cursor-pointer mr-5">
                        Get Free Quote
                    </motion.button>
                    <motion.button {...buttonHover} className="px-6 py-2.5 text-sm text-white font-semibold rounded-md border-1 border-white cursor-pointer hover:bg-[#FACC15] hover:border-none transition-all">
                        Contact Sales
                    </motion.button>
                </div>
            </motion.div>
        </>
    );
}