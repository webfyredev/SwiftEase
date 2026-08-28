import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { LuCircleCheck, LuClock, LuMapPin, LuPackage, LuPlus, LuTruck } from "react-icons/lu";
import { motion } from 'framer-motion'
import { buttonHover } from "../../effects/motions";


function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
export default function C_Dashboard(){
    const { user } = useAuth();
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [chartTab, setChartTab] = useState("revenue")

    useEffect(() => {
        api.get("/shipments/dashboard/customer/")
        .then((res) => {setData(res.data)})
        .catch((err) => setError(err.response?.data?.detail ?? 'Failed to load dashboard'))
        .finally(() => setLoading(false));
    },[]);


    useEffect(() => {
        document.title = 'Swiftease - Dashboard'
    })
    const firstName = user?.full_name?.split(" ")[0] ?? "";
    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const sh_data = [
        {
          label: "Total Shipments",
          value: data?.stats.total_shipments,
          icon:  LuPackage,
          bg:    "bg-blue-50",
          text:  "text-blue-600",
        },
        {
          label: "Active / In Transit",
          value: data?.stats.in_transit,
          icon:  LuTruck,
          bg:    "bg-amber-50",
          text:  "text-amber-600",
        },
        {
          label: "Delivered",
          value: data?.stats.delivered,
          icon:  LuCircleCheck,
          bg:    "bg-green-50",
          text:  "text-green-600",
        },
        {
          label: "Pending Payment",
          value: data?.stats.pending_payment,
          icon:  LuClock,
          bg:    "bg-red-50",
          text:  "text-red-600",
        },
    ]
    return (
        <>
            <div className="flex flex-col space-y-6">
                <div className="p-5 rounded-xl flex flex-col " style={{background: `radial-gradient(circle at 100% 0%, #14B8A6 0%, transparent 35%  ), linear-gradient(135deg, #0F172A , #134E4A )`}}>
                    <h4 className="text-white/70 text-sm">{currentDate}</h4>
                    <h1 className="text-2xl font-bold text-white my-1.5">{getGreeting()}, {firstName}</h1>
                    <p className="text-white/70 text-sm mt-1">
                        {data ? `You have ${data.stats.in_transit} shipment${data.stats.in_transit !== 1 ? "s" : ""} in transit and ${data.stats.pending_payment} pending payment${data.stats.pending_payment !== 1 ? 's' : ''}.` : "Loading your shipments.."}
                    </p>
                    <div className="flex items-center space-x-4 mt-5">
                        <motion.button
                        onClick={() => navigate("/customer/book_shipments")}
                            {...buttonHover}
                            className="flex items-center space-x-2 bg-white text-teal-500 px-4 py-2.5 cursor-pointer rounded-lg text-sm"
                        >
                            <LuPlus  className="w-5 h-5 mr-1"/>
                            Book New Shipment
                        </motion.button>
                        <motion.button
                        onClick={() => navigate("/customer/track_package")}
                            {...buttonHover}
                            className="flex items-center space-x-2  text-white px-4 py-2.5 cursor-pointer rounded-lg text-sm border-1 border-teal-500"
                        >
                            <LuMapPin  className="w-5 h-5 mr-1 text-white"/>
                            Track a Package
                        </motion.button>
                    </div>
                </div>
                <div className="w-full grid grid-cols-2 gap-4">
                    {sh_data.map((dt, i) => (
                        <div key={i} className="p-5 border-1 rounded-lg bg-white border-slate-100 flex space-x-4">
                            <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${dt.bg}`}>
                                <dt.icon  className={`${dt.text} w-5 h-5`}/>
                            </span>
                            <div>
                                <h2 className="text-2xl font-bold">{dt.value} </h2>
                                <p className="text-sm text-[#0F172A] font-medium">{dt.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}