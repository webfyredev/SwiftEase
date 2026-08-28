import NavBar from "../components/navbar";
import { motion } from 'framer-motion'
import { buttonHover } from "../effects/motions";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import authImg from '../images/auth_log.png'
import { FiMapPin, FiShield, FiTruck } from "react-icons/fi";

export default function Register(){
    const date = new Date().getFullYear();
    const { register, setUser} = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({email : "", full_name : "", phone : "", role : "customer", password : "", password2 : ""})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({message : "", type : ""})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    };

    useEffect(() => {
        if (error){
            const timer = setTimeout(() => setError(null), 5000)
            return () => clearTimeout(timer)
        }
    }, [error])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try{
            await register(formData);
            navigate("/accounts/auth/login", {state : {message : "Registration successful, Please login to proceed account setup", type : "success"}})
        } catch(err) {
            console.error('Registration error:', err)
            if(err.response){
                const data = err.response.data
                console.error('Response data', data);
                console.error('Status code:', err.response.status)
                if(typeof data === 'object'){
                    const messages = Object.entries(data)
                    .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(' ') : msgs}`)
                    .join('\n');
                    setError(messages);
                }else{
                    setError("Something went wrong. Please try again later.")
                }
            } else if(err.request){
                setError("Cannot reach the server. Check that Django is running on port 234.");
                console.error("No response recieved, likely a CORS or nertwork issue")
            } else{
                setError("Something went wrong. Please try again.")
            }
        } finally{
            setLoading(false);
        }

    }
    const auth_data = [
            {
                icon : FiTruck,
                title : 'Fast, Reliable Delivery'
            },
            {
                icon : FiMapPin,
                title: 'Real-Time Tracking'
            },
            {
                icon : FiShield,
                title : 'Secure Shipments'
            }
        ]
    return(
        <>
            <NavBar />
            <div className="w-full bg-[#fafaf9] h-screen p-5 flex items-center justify-center">
                <div className="w-[65%] bg-white rounded-xl shadow-md flex items-center mt-30">
                    <div className="hidden w-1/2  h-180 rounded-l-md lg:flex flex-col p-5" style={{background: `radial-gradient(circle at 100% 0%, #14B8A6 0%, transparent 35%  ), linear-gradient(135deg, #0F172A , #134E4A )`}}>
                        <div className="flex mt-5 items-center">
                            <img src={authImg} className="w-13 h-8" alt="" />
                            <h3 className="text-white font-bold text-xl mt-1.5">SwiftEase</h3>
                        </div>
                        <h3 className="text-white text-3xl font-bold ml-4 mt-20">Move. Track. <br />Deliver</h3>
                        <p className="ml-4 text-[11px] text-white/80 mt-10">Reliable logistics solutions that keep your packages moving and your deliveries on track.</p>
                        <div className="w-full flex flex-col space-y-3 ml-4 mt-10">
                            {auth_data.map((data, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <span className="w-8 bg-blue-100/20 h-8 text-white rounded-lg flex items-center justify-center">
                                        <data.icon />
                                    </span>
                                    <h3 className="text-sm font-semibold text-white/90">{data.title}</h3>
                                </div>
                            ))}
                        </div>
                        <p className="ml-4 text-[11px] text-white/70 mt-55">&copy; {date} Swiftease. All right reserved.</p>
                    </div>
                    {/* <div className="w-1/2 h-full p-5 border-1 border-red-500 rounded-l-md">

                    </div> */}
                    <form onSubmit={handleSubmit} className="w-1/2 px-5 py-7 rounded-r-md flex flex-col">
                        {error && (
                            <div className="w-full py-2.5 flex items-center justify-center bg-[#fee2e2] rounded-sm rounded-lg padding-[12px] mb-[16px] text-[#b91c1c] text-sm">
                                {error}
                            </div>
                        )}
                        <h3 className="font-semibold text-2xl text-[#0F172A]">Create your account</h3>
                        <p className="text-gray-400 text-xs mt-2">Join SwiftEase to ease your logistics needs.</p>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Email</label>
                            <input type="email" name="email" required onChange={handleChange} className="w-full h-10 border-1 border-slate-200 rounded-md px-2.5 text-sm outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/20 transition-all duration-200" placeholder="you@example.com" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Full name</label>
                            <input type="text" name="full_name" required onChange={handleChange} className="w-full h-10 border-1 border-slate-200 rounded-md px-2.5 text-sm outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/20 transition-all duration-200" placeholder="John Dims" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Phone</label>
                            <input type="text" name="phone_number" required onChange={handleChange} className="w-full h-10 border-1 border-slate-200 rounded-md px-2.5 text-sm outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/20 transition-all duration-200" placeholder="+234" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Role</label>
                            <select name="role" onChange={handleChange} value={formData.role} className="w-full h-10 border-1 border-slate-200 rounded-md px-2.5 text-sm outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/20 transition-all duration-200">
                                <option value="customer">Customer</option>
                                <option value="driver">Driver</option>
                                <option value="staff">Staff</option>

                            </select>
                            {/* <input type="text" className="w-full h-10 border-1 border-slate-200 rounded-sm px-2.5 text-sm" placeholder="+234" /> */}
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Password</label>
                            <input type="password" name="password" required onChange={handleChange} className="w-full h-10 border-1 border-slate-200 rounded-md px-2.5 text-sm outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/20 transition-all duration-200" placeholder="At least 8 characters" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Confirm Password</label>
                            <input type="password" name="password2" required onChange={handleChange} className="w-full h-10 border-1 border-slate-200 rounded-md px-2.5 text-sm outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/20 transition-all duration-200" placeholder="Re-enter your password" />
                        </div>
                        <motion.button 
                            {...buttonHover}
                            disabled = {loading}
                            className="w-full h-11 border-1 mt-5 text-sm font-semibold rounded-md cursor-pointer bg-[#14B8A6] text-white">
                            {loading ? 'Creating account...' : 'Create account'}
                        </motion.button>
                        <p className="w-full mt-7 flex items-center justify-center text-sm text-gray-500">Already have an account? <Link to="/login" className="ml-1.5 font-semibold text-[#0F172A]">Sign in </Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}