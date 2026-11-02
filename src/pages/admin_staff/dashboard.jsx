import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import api from "../../api/axios";
import { LuArrowRight, LuCircleCheck, LuClock, LuCreditCard, LuHeadphones, LuPackage, LuTrendingUp } from "react-icons/lu";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";

function Skeleton({ rows = 5, cols = 6 }) {
  return Array(rows).fill(0).map((_, i) => (
    <tr key={i} className="animate-pulse">
      {Array(cols).fill(0).map((_, j) => (
        <td key={j} className="px-5 py-4">
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </td>
      ))}
    </tr>
  ));
}
const STATUS_CONFIG = {
  draft:       "bg-gray-100 text-gray-600",
  pending:     "bg-yellow-100 text-yellow-700",
  confirmed:   "bg-blue-100 text-blue-700",
  processing:  "bg-indigo-100 text-indigo-700",
  dispatched:  "bg-orange-100 text-orange-700",
  delivered:   "bg-green-100 text-green-700",
  cancelled:   "bg-red-100 text-red-500",
  returned:    "bg-gray-200 text-gray-600",
  open:        "bg-red-100 text-red-500",
  in_progress: "bg-amber-100 text-amber-600",
  resolved:    "bg-green-100 text-green-600",
  closed:      "bg-gray-200 text-gray-500",
  success:     "bg-green-100 text-green-600",
  failed:      "bg-red-100 text-red-500",
};
function Badge({ status, label }){
    return(
        <span className={`px-2.5 py-1.5 rounded-full text-xs font-semibold capitalize ${STATUS_CONFIG[status] ?? 'bg-gray-100 text-gray-600'}`}>
            {label ?? status}
        </span>
    )
}

export default function Ad_S_Dashboard(){
    const { user} = useAuth();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const naira   = (v) => `₦${Number(v).toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;


    useEffect(() => {
        api.get('/ad_stffs/overview/')
        .then((res) => setData(res.data))
        .catch(() => console.error('Failed to load overview data'))
        .finally(() => setLoading(false))
    }, []);

    const DONUT_COLORS = ["#2563eb","#f59e0b","#10b981","#ef4444","#6366f1","#94a3b8"];

    const overview_stats = [
        {
            label : "Total Shipments",
            value : data?.res?.total_shipments ?? 0,
            icon : LuPackage,
            icon_style : 'bg-blue-50 text-blue-600'
        },
        {
            label : "Shipments Today",
            value : data?.res?.shipments_today ?? 0,
            icon : LuTrendingUp,
            icon_style : 'bg-indigo-50 text-indigo-600'

        },
        {
            label : "Needs Action",
            value : data?.res?.pending_action ?? 0,
            icon : LuClock,
            icon_style : 'bg-amber-50 text-amber-600'

        },
        {
            label : "Delivered Today",
            value : data?.res?.delivered_today ?? 0,
            icon : LuCircleCheck,
            icon_style : 'bg-green-50 text-green-600'


        },
        {
            label : "Total Revenue",
            value : naira(data?.res?.total_revenue ?? 0),
            icon : LuCreditCard,
            icon_style : 'bg-purple-50 text-purple-600'

        },
        {
            label : "Open Tickets",
            value : data?.res?.open_tickets ?? 0,
            icon : LuHeadphones,
            icon_style : 'bg-red-50 text-red-600'
        }

    ]
    return(
        <>
            <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm text-gray-400">Welcome back, {user?.full_name?.split(" ")[0]}</p>
                    <h1 className="text-2xl font-bold text-gray-800 my-1">Operations Overview</h1>
                    <p className="text-gray-500 text-[12px] md:text-sm">
                        Monitor shipments, deliveries, revenue and ongoing operations across SwiftEase.
                    </p>
                </div>
                <div className="w-full py-5 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {overview_stats.map((data) => (
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                            <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${data.icon_style} mb-3`}>
                                <data.icon size={18} />
                            </div>
                            <p className="text-2xl font-bold text-gray-900">
                                {data.value}
                            </p>
                            <p className="text-sm text-gray-500 mt-0.5">
                                {data.label}
                            </p>

                        </div>
                    ))}
                </div>
                <div className="w-full flex gap-5">
                    <div className="w-[60%] bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-800 text-sm mb-4">Revenue (Last 30 days)</h3>
                        {loading ? <div className="h-52 bg-gray-100 animate-pulse rounded-lg" /> : (
                            <ResponsiveContainer width="100%" height={220}>
                                <LineChart data={data?.revenue_chart ?? []}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis dataKey="date" tick={{fontSize: 10, fill: "#9ca3af"}} tickFormatter={(d) => new Date(d).toLocaleDateString("en-GB", {day: "numeric", month: "short"})} axisLine={false} tickLine={false} interval={4} />
                                    <YAxis tick={{fontSize: 10, fill: "#9ca3af"}} tickFormatter={(v) => `₦${(v/1000).toFixed(0)}k`} axisLine={false} tickLine={false} />
                                    <Tooltip formatter={(v) => naira(v)} contentStyle={{fontSize:12, borderRadius:8, border:"none", boxShadow: "0 2px 8px rgba(0,0,0,.1)"}} />
                                    <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                    <div className="w-[40%] bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                        <h3 className="font-semibold text-gray-800 text-sm mb-4">Shipments by Status</h3>
                        {loading ? <div className="h-52 animte-pulse bg-gray-100 rounded-lg" /> : (
                            <ResponsiveContainer width="100%" height={220}>
                                <PieChart>
                                    <Pie data={data?.status_breakdown ?? []} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={80} innerRadius={45}>
                                        {(data?.status_breakdown ?? []).map((_,i) => (
                                            <Cell key={i} fill={DONUT_COLORS[i % DONUT_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{fontSize:12, borderRadius:8, border:"none"}} />
                                    <Legend iconType="circle" iconSize={8} wrapperStyle={{fontSize: 11}} />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>
                <div className="w-full flex space-x-5">
                    <div className="w-[65%] border p-5 border rounded-xl bg-white shadow-sm border-gray-100">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-gray-800 text-sm">Recent Shipments</h3>
                            <Link to="/ad_s/shipments" className="flex items-center text-gray-700 text-[13px] hover:text-gray-900 transition-colors space-x-0.5">
                                <span>View All</span> <LuArrowRight />
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm min-w-max">
                                <thead>
                                    <tr>
                                        {["Code", "Sender", "Receiver", "Service", "Status", "Amount"].map((dt) => (
                                            <th key={dt} className="px-4 py-3  text-xs font-medium text-gray-400 uppercase">
                                                {dt}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                            </table>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? <Skeleton rows={5} cols={6} /> : (data?.recent_shipments ?? []).map((shp) => (
                                    <tr key={shp.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-bold text-gray-800 text-xs">
                                            {shp.shipment_code}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 text-xs">
                                            {shp.sender_name}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 text-xs">
                                            {shp.receiver_name} <br /><span className="text-gray-400">{shp.receiver_city}</span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 text-xs">
                                            {shp.service}
                                        </td>
                                        <td className="px-4 py-3">
                                           <Badge status={shp.status} />
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-700 text-xs">
                                            {naira(shp.total_price)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}