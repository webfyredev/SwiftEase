import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import api from "../../api/axios";
import { LuArrowRight, LuBox, LuCircleAlert, LuCircleCheck, LuClock, LuLoader, LuMapPin, LuPackage, LuPackageCheck, LuPackageMinus, LuPackageOpen, LuPackagePlus, LuShieldAlert, LuToggleLeft, LuToggleRight } from "react-icons/lu";
import { Link } from "react-router-dom";


function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const STATUS_Config = {
  draft:           { label: "Draft",            cls: "bg-gray-100 text-gray-600"    },
  pending:         { label: "Pending",          cls: "bg-yellow-100 text-yellow-700"},
  confirmed:       { label: "Confirmed",        cls: "bg-blue-100 text-blue-700"    },
  processing:      { label: "Processing",       cls: "bg-indigo-100 text-indigo-700"},
  dispatched:      { label: "Dispatched",       cls: "bg-orange-100 text-orange-700"},
  delivered:       { label: "Delivered",        cls: "bg-green-100 text-green-700"  },
  cancelled:       { label: "Cancelled",        cls: "bg-red-100 text-red-500"      },
  returned:        { label: "Returned",         cls: "bg-gray-200 text-gray-600"    },
};

function StatusBadge({ status}){
    const sts = STATUS_Config[status] ?? STATUS_Config.pending;
    return(
        <span className={`px-2.5 py-1 rounded-xl text-xs font-semibold ${sts.cls}`}>
            {sts.label}
        </span>
    );
}

function Toast({ toast }){
    if(!toast) return null;

    return(
        <div
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-sm font-medium max-w-xs w-full ${
                toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
            }`}
        >
            {toast.type === "success" ? <LuCircleCheck size={15} /> : <LuCircleAlert size={15} />}
            {toast.message}
        </div>
    )
}

export default function Driver_Dashboard(){
    const {user, logout} = useAuth();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [dutyToggling, setDutyToggling] = useState(false);
    const [toast, setToast] = useState(null)
    const [deliveryTab, setDeliveryTab] = useState(false)
    const [deliveries, setDeliveries] = useState([])
    const [deliveryLoading, setDeliveryLoading] = useState(false)
    // const [detailId, setDetailId] = useState(null)


    const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const firstName = user?.full_name?.split(" ")[0] ?? "";
    const showToast = (type, message) => {
        setToast({type, message});
        setTimeout(() => setToast(null), 3500)
    }
    const fetchDashboard = useCallback(async () => {
        try{
            const res = await api.get('/drivers/dashboard/');
            setData(res.data)
        }catch{
            showToast("error", "Failed to load dashboard.")
        }finally{
            setLoading(false)
        }
    },[]);

    const fetchDeliveries = useCallback(async () => {
        setDeliveryLoading(true)
        try{
            const res = await api.get('/drivers/shipments/');
            setDeliveries(res.data)
        }catch{}
        setDeliveryLoading(false)
    }, []);

    // if(detailId){
    //     return(
    //         <>
    //             <Toast toast={toast} />
    //         </>
    //     )
    // }

    useEffect(() => {
        fetchDashboard();
    },[fetchDashboard])

    useEffect(() => {
        document.title = 'Driver-Dashboard'
    })

    const toggleDuty = async () => {
        if(!data) return;
        setDutyToggling(true);
        try{
            const newStatus = !data.driver.is_on_duty;
            const res = await api.post('/drivers/duty/', {is_on_duty: newStatus });
            setData((d) => ({...d, driver: {...d.driver, is_on_duty: res.data.is_on_duty},
            }));
            showToast("success", res.data.is_on_duty ? "You are now On Duty" : "You are now Off Duty.")
        }catch{
            showToast("error", "Failed to update duty status.");
        } finally{
            setDutyToggling(false)
        }
    };

    const isOnDuty = data?.driver?.is_on_duty ?? false;

    const stats = [
        {
            label : "Assigned",
            value : data?.stats?.total_assigned,
            icon : LuPackageCheck,
            icon_style : 'bg-blue-50 text-blue-600'
        },
        {
            label : "Completed",
            value : data?.stats?.completed,
            icon : LuCircleCheck,
            icon_style : 'bg-green-50 text-green-600'
        },
        {
            label : "Pending",
            value : data?.stats?.pending,
            icon : LuClock,
            icon_style : 'bg-amber-50 text-amber-600'
        }
    ]
    return(
        <>
            <div className="flex flex-col space-y-3">
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-[#0F172A] my-1.5">{getGreeting()}, {firstName}</h1>
                        <h4 className="hidden md:flex text-gray/70 text-[13px] font-medium">{currentDate}</h4>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="text-slate-400 text-[12px]">
                            Here's your delivery summary for today.
                        </p>
                        <button
                            onClick={toggleDuty}
                            disabled={dutyToggling}
                            className={`flex cursor-pointer items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition 
                                ${isOnDuty ? 'bg-[#14B8A6]/50 text-emerald-800' : 'bg-gray-100 text-gray-500'}`
                            }
                        >
                            {dutyToggling ? 
                                <LuLoader size={12} className="animate-spin" />
                                : isOnDuty ? <LuToggleRight size={16} className="text-emerald-800" /> : <LuToggleLeft size={16} className="text-gray-400" />
                            }
                            {isOnDuty ? "On Duty" : "Off Duty"}
                        </button>
                    </div>

                </div>
                <div className="py-5 space-y-4">
                    <div className={`rounded-2xl flex flex-col md:flex-row justify-between md:items-center p-4 ${isOnDuty ? 'bg-[#14B8A6]/60 border border-[#14B8A6]/30' : 'bg-gray-100 border border-gray-200'}`}>
                        <div className=" flex flex-col">
                            <div className="flex items-center gap-2 mb-1">
                                <div className={`w-9 h-9 rounded-full hidden md:flex items-center justify-center ${isOnDuty ? 'bg-[#14B8A6] text-white' : 'bg-gray-400'}`}>
                                    {isOnDuty ? <LuPackagePlus /> : <LuPackageMinus />}
                                </div>
                                <div className="space-y-2">
                                    <p className={`text-sm font-bold ${isOnDuty ? "text-emerald-800" : "text-gray-600"}`}>
                                        {isOnDuty ? "You are currently ON DUTY" : "You are currently OFF DUTY"}
                                    </p>
                                    {data?.vehicle && (
                                        <div className="flex md:flex-row flex-col md:items-center text-xs text-[#0F172A] font-medium">
                                            <span>Vehicle: {data.vehicle.plate_number}</span>
                                            <span className="hidden md:flex w-1 h-1 rounded-full mx-2.5 bg-[#0F172A]"></span>
                                            <span className="capitalize">{data.vehicle.vehicle_type}</span>
                                            <span className="hidden md:flex w-1 h-1 rounded-full mx-2.5 bg-[#0F172A]"></span>
                                            <span>Branch: {data.branch && `${data.branch.name}`}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                        <button
                            onClick={toggleDuty}
                            disabled={dutyToggling}
                            className={`cursor-pointer flex items-center justify-center px-3 py-1.5 mt-1 md:mt-0 rounded-lg text-[12px] font-bold  text-[#14B8A6] ${isOnDuty ? 'bg-[#0F172A]' : 'bg-[#14B8A6] text-white'}`}
                        >
                            {isOnDuty ? 'Go Off Duty' : 'Go On Duty'}
                        </button>
                        
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((data, i) => (
                        <div key={i} className="p-5 border-1 rounded-lg bg-white border-slate-100 flex md:flex-row flex-col md:space-x-4 space-y-1 md:space-y-0">
                            <span className={`w-10 h-10 rounded-lg flex items-center justify-center ${data.icon_style}`}>
                                <data.icon  className={`w-5 h-5`}/>
                            </span>
                            <div className="ml-1 md:ml-0">
                                <p className="text-sm text-[#0F172A] font-semibold">{data.label}</p>
                                <h2 className="text-2xl font-bold mt-1.5">{data.value ?? 0}</h2>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-bold text-[#0F172A] my-1.5">Today's Deliveries</h1>
                        <Link to="/driver/deliveries" className="flex space-x-1 items-center text-sm text-gray-500 hover:text-gray-700 transition-all duration-300">
                            <span>View all </span><LuArrowRight />
                        </Link>
                    </div>
                    {loading ? (
                        <div className="space-y-3">
                            {Array(3).fill(0).map((_, i) => (
                                <div key={i} className="bg-white rounded-2xl p-4 animate-pulse h-28" />
                            ))}
                        </div>
                    ): !data?.today_shipments?.length ? (
                        <div className="bg-white rounded-2xl p-8 text-center border border-gray-100">
                            <LuPackage size={32} className="text-gray-200 mx-auto mb-2" />
                            <p className="text-sm text-gray-400">No deliveries today</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {data.today_shipments.map((sh) => {
                                const isDelivered = sh.status === "delivered";
                                return(
                                    <div
                                        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-between"
                                    >
                                        <div className="flex space-x-2.5">
                                            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#14B8A6] text-white">
                                                <LuPackage />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className="flex space-x-1">
                                                    <p className="font-bold text-gray-800 text-sm">{sh.shipment_code}</p>
                                                    <p className="text-xs text-blue-500 font-medium">{sh.service}</p>
                                                </div>
                                                <p className="font-semibold text-gray-900">{sh.receiver_name}</p>
                                                <p className="text-sm text-gray-500 mt-0.5 truncate">{sh.receiver_address}</p>
                                                <p className="text-xs text-gray-400 mt-0.5 flex space-x-1"><LuMapPin className="w-4 h-4" /> <span>{sh.receiver_city}, {sh.receiver_state}</span></p>
                                                {sh.is_fragile && (
                                                    <span className="text-[10px] bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-bold">
                                                        <LuShieldAlert  className="mr-1"/> FRAGILE
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col space-y-2.5">
                                            <StatusBadge status={sh.status} />
                                            <button
                                                className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl ${isDelivered ? '' : 'bg-blue-600 text-white'}`}
                                            >
                                                {isDelivered ? <><LuCircleCheck size={12} /> View</> : <>Start <LuArrowRight /></>}
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </div>  
        </>
    )
}