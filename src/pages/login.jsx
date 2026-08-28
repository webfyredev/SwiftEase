import NavBar from "../components/navbar";
import { motion } from 'framer-motion'
import { buttonHover } from "../effects/motions";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import authImg from '../images/auth_log.png';
import { FiMapPin, FiShield, FiTruck } from "react-icons/fi";
export default function Login(){
    const date = new Date().getFullYear();
    const { login, setUser } = useAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const message = location.state?.message

    useEffect(() => {
        if (error){
            const timer = setTimeout(() => setError(null), 5000)
            return () => clearTimeout(timer)
        }
    }, [error])

    useEffect(() => {
        if(message){
            const timer = setTimeout(() => {
                navigate(location.pathname, {replace : true, state : {}})

            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [message])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try{
            const user = await login(email, password);
            if(user.role === "customer"){
                navigate("/customer/dashboard", {replace : true })
            }else if(user.role === "driver"){
                navigate("/driver/dashboard", {replace : true})
            } else if(user.role === "stafff"){
                navigate("/staff/dashboard", { replace : true})
            }else{
                navigate("/login", { replace : true})
            }
        }catch(err){
            console.error('Login failed:', err);
            const data = err.response?.data;
            if(data?.email) setError(data.email)
            else if( data?.password) setError(data.password)
            else if(data?.detail) setError(data.detail)
            else if(err.request && !err.response) setError("Cannot reach the server. Check that Django is running.")
            else setError("Invalid email or password. Please try again.")
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
    return (
        <>
            <NavBar />
            <div className="w-full h-auto">
                
            </div>
            <div className="w-full bg-[#fafaf9] h-[90vh] overflow-y-hidden p-5 flex items-center justify-center">

                <div className="w-[95%] md:w-[80%] lg:w-[65%] bg-white rounded-xl shadow-md flex items-center">
                    <div className="hidden w-1/2  h-100 rounded-l-md lg:flex flex-col p-5" style={{background: `radial-gradient(circle at 100% 0%, #14B8A6 0%, transparent 35%  ), linear-gradient(135deg, #0F172A , #134E4A )`}}>
                        <div className="flex mt-4 items-center">
                            <img src={authImg} className="w-13 h-8" alt="" />
                            <h3 className="text-white font-bold text-xl mt-1.5">SwiftEase</h3>
                        </div>
                        <h3 className="text-white text-3xl font-bold ml-4 mt-3">Move. Track. <br />Deliver</h3>
                        <p className="ml-4 text-[11px] text-white/80 mt-3">Reliable logistics solutions that keep your packages moving and your deliveries on track.</p>
                        <div className="w-full flex flex-col space-y-3 ml-4 mt-5">
                            {auth_data.map((data, index) => (
                                <div key={index} className="flex items-center space-x-3">
                                    <span className="w-8 bg-blue-100/20 h-8 text-white rounded-lg flex items-center justify-center">
                                        <data.icon />
                                    </span>
                                    <h3 className="text-sm font-semibold text-white/90">{data.title}</h3>
                                </div>
                            ))}
                        </div>
                        <p className="ml-4 text-[11px] text-white/70 mt-3">&copy; {date} Swiftease. All right reserved.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="w-full lg:w-1/2 px-5 py-7 rounded-r-md flex flex-col">
                        {message && (
                            <div className="bg-[#dcfce7] rounded-sm padding-[12px] text-[#15803d] p-3 mb-5 text-center text-sm font-semibold">
                                {message}
                            </div>
                            )}

                            {error && (
                                <div className="bg-[#fee2e2] rounded-sm padding-[12px] text-[#b91c1c] p-3 mb-5 text-center text-sm font-semibold">
                                    {error}
                                </div>
                        )}
                        <h3 className="font-semibold text-xl text-[#0F172A]">Welcome Back</h3>
                        <p className="text-gray-400 text-xs mt-2">Log in to continue shipping and tracking of your packages</p>
                        <div className="flex flex-col mt-5">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full h-10 border-1 border-slate-200 rounded-md px-2.5 text-sm outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/20 transition-all duration-200" placeholder="Enter your email" />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label htmlFor="" className="text-[13px] text-gray-600 mb-1.5">Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full h-10 border-1 border-slate-200 rounded-md px-2.5 text-sm outline-none focus:border-[#0F172A] focus:ring-2 focus:ring-[#0F172A]/20 transition-all duration-200" placeholder="Enter your password" />
                        </div>
                        <motion.button 
                            {...buttonHover}
                            type="submit"
                            disabled = {loading}
                            className="w-full h-11 border-1 mt-5 text-sm font-semibold rounded-md cursor-pointer bg-[#14B8A6] text-white">
                            {loading ? 'Logging in ...' : 'Log in'}
                        </motion.button>
                        <p className="w-full mt-7 flex items-center justify-center text-sm text-gray-500">Don't have an account? <Link to="/register" className="ml-1.5 font-semibold text-[#0F172A] hover:underline">Sign up</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}