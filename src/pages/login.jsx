import NavBar from "../components/navbar";
import { motion } from 'framer-motion'
import { buttonHover } from "../effects/motions";
import { Link } from "react-router-dom";
export default function Login(){
    return (
        <>
            <NavBar />
            <div className="w-full bg-[#fafaf9] h-[90vh] overflow-y-hidden p-5 flex items-center justify-center">
                <div className="w-[60%] bg-white rounded-xl shadow-md p-2 flex items-center">
                    <div className="w-1/2 h-full p-5 border-1 border-red-500 rounded-l-md">

                    </div>
                    <form className="w-1/2 px-5 py-7 rounded-r-md flex flex-col">
                        <h3 className="font-semibold text-xl">Welcome Back</h3>
                        <p className="text-gray-400 text-xs mt-2">Log in to continue shipping and tracking of your packages</p>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Email</label>
                            <input type="email" className="w-full h-10 border-1 border-slate-200 rounded-sm px-2.5 text-sm" placeholder="Enter your email" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Password</label>
                            <input type="email" className="w-full h-10 border-1 border-slate-200 rounded-sm px-2.5 text-sm" placeholder="Enter your password" />
                        </div>
                        <motion.button 
                            {...buttonHover}
                            className="w-full h-11 border-1 mt-5 text-sm font-semibold rounded-md cursor-pointer bg-blue-500 text-white">
                            Log in
                        </motion.button>
                        <p className="w-full mt-7 flex items-center justify-center text-sm text-gray-500">Don't have an account? <Link to="/register" className="ml-1.5 font-semibold text-blue-500">Sign up</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}