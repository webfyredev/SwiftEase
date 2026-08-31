import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { LuArrowRight, LuCircleCheck, LuClock, LuMapPin, LuPackage, LuPlus, LuTruck } from "react-icons/lu";
import { motion } from 'framer-motion'
import { buttonHover } from "../../effects/motions";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";


const STATUS_STYLES = {
  draft:       "bg-gray-100 text-gray-600",
  pending:     "bg-yellow-100 text-yellow-700",
  confirmed:   "bg-blue-100 text-blue-700",
  processing:  "bg-indigo-100 text-indigo-700",
  dispatched:  "bg-orange-100 text-orange-700",
  delivered:   "bg-green-100 text-green-700",
  cancelled:   "bg-red-100 text-red-700",
  returned:    "bg-gray-200 text-gray-600",
};

function StatusBadge({ status }) {
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status?.replace("_", " ")}
    </span>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
function formatNaira(val){
    return `₦${Number(val).toLocaleString("en-NG", {minimumFractionDigits : 0})}`;
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
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    <div className="xl:col-span-2 bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <div className="flex items-start justify-between mb-1">
                            <div>
                                <h2 className="font-semibold text-[#0F172A] text-md">Performance Overview</h2>
                                {data  && (
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        Total revenue {formatNaira(data.chart.monthly.reduce((s, m) => s + m.revenue, 0)
                                    )} | last 6 months
                                    </p>
                                )}
                            </div>
                            <div className="flex gap-2 bg-gray-100 rounded-full py-1 px-2">
                                {["revenue", 'shipments'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setChartTab(tab)}
                                        className={`px-4 py-1.5 cursor-pointer rounded-full text-xs font-medium capitalize transition ${chartTab === tab ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-500'}`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loading ? (
                            <div className="h-52 bg-gray-100 animate-pulse rounded-lg mt-3"></div>
                        ) : (
                            <ResponsiveContainer width="100%" height={220}>
                                <LineChart data={data.chart.monthly} margin={{ top: 10, right: 10, left: 0, bottom: 0}}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af"}} axisLine={false} tickLine={false} />
                                    <YAxis tick={{fontSize:11, fill: "#9ca3af"}} axisLine={false} tickLine={false} tickFormatter={chartTab === "revenue" ? (v) => `₦${(v / 1000).toFixed(0)}k` : undefined} />
                                    <Tooltip 
                                        formatter={(val) => chartTab === "revenue" ? formatNaira(val) : val}
                                        contentStyle={{fontSize: 12, borderRadius: 8, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,.1)"}}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey={chartTab}
                                        stroke="#14B8A6"
                                        strokeWidth={2.5}
                                        dot={{r : 4, fill : "#14B8A6"}}
                                        activeDot={{r : 6}}
                                    />

                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h2 className="font-semibold text-[#0F172A] text-sm mb-0.5">This Week</h2>
                        <p className="text-xs text-gray-500 mb-3">Shipments vs delivered</p>

                        {loading ? (
                            <div className="h-52 bg-gray-100 animate-pulse rounded-lg" />
                        ) : (
                            <ResponsiveContainer width="100%" height={220}>
                                <BarChart data={data.chart.weekly} barSize={8} margin={{ top : 5, right : 5, left: -20, bottom : 0}}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="day" tick={{fontSize: 10, fill: "#9ca3af"}} axisLine={false} tickLine={false} />
                                    <YAxis tick={{fontSize:10, fill: "#9ca3af"}} axisLine={false} tickLine={false} />
                                    <Tooltip 
                                        contentStyle={{fontSize:12, borderRadius: 8, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,.1)"}}
                                    />
                                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize : 11,}} />
                                    <Bar dataKey="shipments" name="Shipments" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="delivered" name="Delivered" fill="#14B8A6" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-300">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                        <h2 className="font-semibold text-[#0F172A] text-md">Recent Shipments</h2>
                        <button
                            onClick={() => navigate("/customer/shipments")}
                            className="text-xs text-[#14B8A6] font-semibold hover:underline cursor-pointer"
                        >
                            View all
                        </button>
                    </div>
                    {loading ? (
                        <div className="divide-y divide-gray-50">
                            {Array(4).fill(0).map((_, i) => (
                                <div key={i} className="px-5 py-3.5 flex gap-4 animate-pulse">
                                    <div className="h-3 w-28 bg-gray-200 rounded" />
                                    <div className="h-3 w-24 bg-gray-200 rounded" />
                                    <div className="h-3 w-20 bg-gray-200 rounded" />
                                    <div className="h-3 w-16 bg-gray-200 rounded ml-auto" />
                                </div>
                            ))}
                        </div>
                    ) : !data?.recent_shipments?.length ? (
                        <div className="py-16 text-center">
                            <LuPackage size={36} className="text-gray-300 mx-auto mb-3" />
                            <p className="text-sm text-gray-400 font-medium"> No shipments yet</p>
                            <p className="text-xs text-gray-400 mt-1">Book your first shipment to get started</p>
                            <button
                                onClick={()=> navigate('/customer/book_shipment')}
                                className="mt-4 bg-[#14B8A6] hover:bg-[#14B8A6]/90 text-white px-4  cursor-pointer py-2 rounded-lg  text-sm font-medium transition"
                            >
                                Book Shipment
                            </button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="text-[12px] text-gray-400 uppercase tracking-wide">
                                        <th className="px-5 py-3 text-left font-medium">Shipment Code</th>
                                        <th className="px-5 py-3 text-left font-medium">Reciever</th>
                                        <th className="px-5 py-3 text-left font-medium">Destination</th>
                                        <th className="px-5 py-3 text-left font-medium">Service</th>
                                        <th className="px-5 py-3 text-left font-medium">Status</th>
                                        <th className="px-5 py-3 text-left font-medium">Date</th>
                                        <th className="px-5 py-3 text-left font-medium">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {data.recent_shipments.map((s) => (
                                        <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-5 py-3.5 font-semibold text-gray-800">{s.shipment_code}</td>
                                            <td className="px-5 py-3.5 text-gray-800">{s.receiver_name}</td>
                                            <td className="px-5 py-3.5 text-gray-800">{s.receiver_city}, {s.receiver_state}</td>
                                            <td className="px-5 py-3.5 text-gray-800">{s.service_name}</td>
                                            <td className="px-5 py-3.5">
                                                <StatusBadge status={s.status} />
                                            </td>
                                            <td className="px-5 py-3.5 text-gray-500">
                                                {new Date(s.created_at).toLocaleDateString("en-GB", { month : "short", day : "numeric",  year : "numeric"})}
                                            </td>
                                            <td className="px-5 py-3.5"> 
                                                <button
                                                    onClick={() => navigate(`/customer/shipments`)}
                                                    className="flex items-center text-[#14B8A6] font-medium hover:font-semibold hover:underline cursor-pointer transition"
                                                >
                                                    View <LuArrowRight />
                                                </button>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>

            </div>
        </>
    )
}