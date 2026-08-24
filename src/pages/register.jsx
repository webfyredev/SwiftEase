import NavBar from "../components/navbar";
import { motion } from 'framer-motion'
import { buttonHover } from "../effects/motions";
import { Link } from "react-router-dom";

export default function Register(){
    return(
        <>
            <NavBar />
            <div className="w-full bg-[#fafaf9] h-screen p-5 flex items-center justify-center">
                <div className="w-[65%] bg-white rounded-xl shadow-md flex items-center mt-30">
                    <div className="w-1/2 h-full p-5 border-1 border-red-500 rounded-l-md">

                    </div>
                    <form className="w-1/2 px-5 py-7 rounded-r-md flex flex-col">
                        <h3 className="font-semibold text-2xl">Create your account</h3>
                        <p className="text-gray-400 text-xs mt-2">Join SwiftEase to ease your logistics needs.</p>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Email</label>
                            <input type="email" className="w-full h-10 border-1 border-slate-200 rounded-sm px-2.5 text-sm" placeholder="you@example.com" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Full name</label>
                            <input type="text" className="w-full h-10 border-1 border-slate-200 rounded-sm px-2.5 text-sm" placeholder="John Dims" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Phone</label>
                            <input type="text" className="w-full h-10 border-1 border-slate-200 rounded-sm px-2.5 text-sm" placeholder="+234" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Role</label>
                            <select name="" id="" className="w-full h-10 border-1 border-slate-200 rounded-sm px-2.5 text-sm">
                                <option value="">Customer</option>
                                <option value="">Driver</option>
                                <option value="">Staff</option>

                            </select>
                            {/* <input type="text" className="w-full h-10 border-1 border-slate-200 rounded-sm px-2.5 text-sm" placeholder="+234" /> */}
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Password</label>
                            <input type="email" className="w-full h-10 border-1 border-slate-200 rounded-sm px-2.5 text-sm" placeholder="At least 8 characters" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Confirm Password</label>
                            <input type="email" className="w-full h-10 border-1 border-slate-200 rounded-sm px-2.5 text-sm" placeholder="Re-enter your password" />
                        </div>
                        <motion.button 
                            {...buttonHover}
                            className="w-full h-11 border-1 mt-5 text-sm font-semibold rounded-md cursor-pointer bg-blue-500 text-white">
                            Log in
                        </motion.button>
                        <p className="w-full mt-7 flex items-center justify-center text-sm text-gray-500">Already have an account? <Link to="/login" className="ml-1.5 font-semibold text-blue-500">Sign in </Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}