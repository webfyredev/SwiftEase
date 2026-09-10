import { LuArrowRight, LuCalendar, LuCalendarCheck, LuCircleAlert, LuCircleCheck, LuClock, LuMapPin, LuPackage, LuPhone, LuSearch, LuTruck, LuUser } from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { motion } from 'framer-motion'
import { buttonHover } from "../../effects/motions";

const STATUS_STYLES = {
  draft:           "bg-gray-100 text-gray-600",
  pending:         "bg-yellow-100 text-yellow-700",
  confirmed:       "bg-blue-100 text-blue-700",
  processing:      "bg-indigo-100 text-indigo-700",
  dispatched:      "bg-orange-100 text-orange-700",
  delivered:       "bg-green-100 text-green-700",
  cancelled:       "bg-red-100 text-red-700",
  returned:        "bg-gray-200 text-gray-600",
};

const SHIPMENT_TO_TIMELINE = {
  pending:    "pending",
  confirmed:  "pending",
  processing: "pending",
  dispatched: "in_transit",
  delivered:  "delivered",
  returned:   "returned",
  cancelled:  "cancelled",
};

const STEP_STYLES = {
  done:    { dot: "bg-blue-600 ring-4 ring-blue-100",   text: "text-gray-800",  sub: "text-gray-500"  },
  active:  { dot: "bg-orange-500 ring-4 ring-orange-100", text: "text-gray-800", sub: "text-gray-500" },
  future:  { dot: "bg-gray-200 ring-4 ring-gray-50",    text: "text-gray-300",  sub: "text-gray-300"  },
};

function TimelineStep({ step, state, event}){
    const { dot, text, sub} = STEP_STYLES[state];
    const {Icon} = step;
    const isFuture = state === "future";

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${dot}`}>
                    <Icon size={17} className={isFuture ? "text-gray-300" : "text-white"} />
                </div>
            </div>

            <div className="flex-1 pb-6">
                <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-sm font-semibold ${text}`}>
                        {step.label}
                    </p>
                    {state === "active" &&(
                        <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold">
                            In Progress
                        </span>
                    )}
                </div>
                {event ? (
                    <>
                        <p className={`text-xs mt-0.5 ${sub}`}>
                            {event.location}
                        </p>
                        {event.description && (
                            <p className={`text-xs mt-1 ${sub}`}>{event.description}</p>
                        )}
                        <p className="text-[11px] text-gray-400 mt-1">
                            {new Date(event.timestamp).toLocaleString("en-GB", {day : "numeric", month: "short", hour: "2-digit", minute:"2-digit"})}
                        </p>
                    </>
                ) : (
                    <p className={`text-xs mt-0.5 ${sub}`}>
                        {isFuture ? step.label : "-"}
                    </p>
                )}
            </div>
        </div>
    )
}

function StatusBadge({ status}) {
    const style = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
    return(
        <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${style}`}>
            {status?.replace(/_/g, "")}
        </span>
    );
}

const TIMELINE_STEPS = [
  { status: "pending",          label: "Pending",          Icon: LuClock        },
  { status: "in_transit",       label: "In Transit",       Icon: LuTruck        },
  { status: "out_for_delivery", label: "Out for Delivery", Icon: LuMapPin       },
  { status: "delivered",        label: "Delivered",        Icon: LuCircleCheck },
];

function InfoRow({label, value}){
    if(!value) return null;
    return(
        <div className="flex justify-between py-2 border-b border-gray-50 last:border-0 text-sm">
            <span className="text-gray-400">{label}</span>
            <span className="text-gray-800 font-medium text-right max-w-[60%]">{value}</span>
        </div>
    );
}

export default function Track_Package(){
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [code, setCode] = useState(searchParams.get("code") ?? "");
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const handleSearch = async (e) => {
        e?.preventDefault();
        const trimmed = code.trim().toUpperCase();
        if(!trimmed) return;

        setLoading(true)
        setError("")
        setData(null);
        setSearchParams({ code: trimmed });

        try{
            const endpoint = user ? `/shipments/track/auth/${trimmed}/` : `/shipments/track/${trimmed}/`;
            const res = await api.get(endpoint);
            setData(res.data)
        }catch (err) {
            if(err.response?.status == 404){
                setError(`No shipment found with code "${trimmed}". Please check and try again.`);
            } else if(err.response?.status == 403){
                setError("You don't have permission to track this shipment.")
            } else{
                setError("Something went wrong. Please try again.")
            }
        } finally{
            setLoading(false);
        }
    };

    useState(() => {
        const urlCode = searchParams.get("code");
        if(urlCode){
            setCode(urlCode)
            setTimeout(handleSearch, 100)
        }
    });

    const buildTimeline = (shipmentData) => {
        if(!shipmentData) return [];

        const currentStep = SHIPMENT_TO_TIMELINE[shipmentData.status] ?? "pending";
        const stepOrder = TIMELINE_STEPS.map((s) => s.status);
        const currentIndex = stepOrder.indexOf(currentStep)

        const eventMap = {};
        (shipmentData.events ?? []).forEach((evt) => {
            eventMap[evt.status] = evt;
        });

        return TIMELINE_STEPS.map((step, index) => {
            let state;
            if(index < currentIndex) state="done";
            else if(index === currentIndex) state="active";
            else state="future";

            if(shipmentData.status === "delivered") state="done";
            return { step, state, event:eventMap[step.status] ?? null,}
        })
    }

    const timeline = buildTimeline(data)
    return (
        <>
            <div className="w-full h-auto flex flex-col items-center p-5">
                <h3 className="text-2xl font-bold">Track Package</h3>
                <p className="text-sm text-gray-400">Enter your shipment code to see real-time status.</p>
                <form onSubmit={handleSearch} className="mt-5 flex space-x-3 p-1">
                    <div className="w-110 h-11 border-1 border-gray-200 text-gray-500 bg-white rounded-lg flex space-x-3 items-center px-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20 focue:border-[#0F172A] bg-white tracking-wide">
                        <LuSearch size={18} />
                        <input type="text" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} className="w-full h-full outline-none" placeholder="Enter Shipment Code (e.g. SWABCD1234)" />
                    </div>
                    <motion.button
                        {...buttonHover}
                        type="submit"
                        disabled = {loading || !code.trim()}
                        className="flex items-center py-1.5 font-medium px-5 bg-[#14B8A6] text-white rounded-lg text-sm cursor-pointer"
                    >
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                        ) : (
                            <LuSearch size={15} className="mr-1" />
                        )}
                        
                        {loading ? "Searching..." : "Search"}
                    </motion.button>
                </form>
                {error && (
                    <div className="flex items-center bg-red-50 text-red-600 rounded-xl px-4 py-2.5 text-sm space-x-2 mt-5">
                        <LuCircleAlert size={16} className="mr-1.5" />
                        {error}
                    </div>
                )}
                {!data && !loading && !error && (
                    <div className="w-[60%]  mt-5 flex flex-col rounded-2xl border border-gray-200 shadow-xs py-10 text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <LuTruck size={28} className="text-[#14B8A6]" />
                            
                        </div>
                        <p className="text-sm text-gray-500">Try searching {" "}
                            <button onClick={() => { setCode("SWABCD1234"); }}
                                className="font-bold cursor-pointer text-[#14B8A6] hover:underline"
                            >
                                SWABCD1234
                            </button> {" "} to see a live tracking example.
                        </p>
                    </div>
                )}
                {loading && (
                    <div className="bg-white w-[65%] rounded-2xl border border-gray-100 p-6 animate-pulse space-y-4">
                        <div className="h-5 bg-gray-200 rounded w-40" />
                        <div className="h-4 bg-gray-200 rounded w-24" />
                        <div className="h-12 bg-gray-100 rounded-xl" />
                        {Array(4).fill(0).map((i) => (
                            <div key={i} className="flex gap-4">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-gray-200 rounded w-24" />
                                    <div className="h-3 bg-gray-100 rounded w-40" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {data && !loading && (
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden w-[65%] mt-5">
                        <div className="p-5 space-y-5">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 mb-1">Shipment Code</p>
                                    <p className="text-xl font-bold text-gray-800 font-mono">
                                        {data.shipment_code}
                                    </p>
                                    <p className="text-sm text-gray-500 mt-0.5">
                                        Service: {data.service}
                                    </p>
                                </div>
                                <StatusBadge status={data.status} />
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="text-center">
                                    <p className="font-bold text-gray-800 text-sm">{data.sender_city}</p>
                                    <p className="text-xs text-gray-400">({data.sender_state} State)</p>
                                </div>
                                <div className="flex-1 flex items-center gap-1">
                                    <div className="flex-1 h-0.5 bg-gray-200" />
                                    <div className="w-6 h-6 bg-[#14B8A6] rounded-full flex items-center justify-center flex-shrink-0">
                                        <LuArrowRight size={12} className="text-white" />
                                    </div>
                                    <div className="flex-1 h-0.5 bg-gray-200" />
                                    
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-gray-800 text-sm">{data.receiver_city}</p>
                                    <p className="text-xs text-gray-400">({data.receiver_state} State)</p>
                                </div>
                            </div>
                            {data.estimated_delivery && (
                                <div className="flex items-center space-x-3 bg-[#14B8A6]/12 rounded-xl px-4 py-3">
                                    <LuCalendarCheck size={16} className="text-[#14B8A6] font-medium" />
                                    <div>
                                        <p className="text-xs text-[#14B8A6] font-medium">
                                            Estimated Delivery Date
                                        </p>
                                        <p className="text-sm font-semibold text-[#14B8A6]">
                                            {new Date(data.estimated_delivery).toLocaleDateString("en-GB", {weekday: "short", day: "numeric", month: "short", year : "numeric"})}
                                        </p>
                                    </div>
                                </div>
                            )}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                                    Tracking Timeline
                                </h3>
                                <div className="relative">
                                    <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-100" />
                                    <div className="space-y-0">
                                        {timeline.map(({ step, state, event}, idx) => (
                                            <TimelineStep key={step.status} step={step} state={state} event={event} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {data.total_price && (
                                <>
                                    <hr className="border-gray-100" />
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-700 mb-3">
                                            Shipment Details
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                            <div>
                                                <InfoRow
                                                    label="Receiver"
                                                    value={data.receiver_name}
                                                />
                                                <InfoRow
                                                    label= "Delivery Address"
                                                    value={`${data.receiver_address}, ${data.receiver_city}`}
                                                />
                                                <InfoRow
                                                    label="Receiver Phone"
                                                    value={data.receiver_phone}
                                                />
                                                <InfoRow
                                                    label="Weight"
                                                    value={`${data.weight_kg} kg`}
                                                />
                                            </div>
                                            <div>
                                                <InfoRow
                                                    label="Total Price"
                                                    value={`₦${Number(data.total_price).toLocaleString("en-NG")}`} 
                                                />
                                                <InfoRow 
                                                    label="Payment"
                                                    value={{ online : "Online (Card)", wallet : "Wallet", cod : "Cash  on Delivery"}[data.payment_method]}
                                                />
                                                <InfoRow 
                                                    label="Paid"
                                                    value={data.is_paid ? "Yes" : "No - Pending"} 
                                                />
                                                {data.is_fragile && (
                                                    <InfoRow
                                                        label="Fragile"
                                                        value="Handle with care"
                                                    />
                                                )}
                                                {data.driver_name && (
                                                    <>
                                                        <hr className="border-gray-100" />
                                                        <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4">
                                                            <div className="w-10 h-10 bg-[#] rounded-full flex items-center justify-center flex-shrink-0">
                                                                <LuUser size={16} className="text-white" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-xs text-gray-400">Assigned Driver</p>
                                                                <p className="text-sm font-semibold text-gray-800">
                                                                    {data.driver_name}
                                                                </p>
                                                                {data.driver_phone && (
                                                                    <a
                                                                        href={`tel:${data.driver_phone}`}
                                                                        className="text-xs text-[#14B8A6] flex items-center gap-1 mt-0.5 hover:underline"
                                                                    >
                                                                        <LuPhone  size={11}/>
                                                                        {data.driver_phone}
                                                                    </a>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                                {!data.total_price && data.description && (
                                                    <div className="flex items-center gap-3 text-sm text-gray-500 bg-gray-50 rounded-xl px-4 py-3">
                                                        <LuPackage size={15} />
                                                        {data.description}
                                                        {data.is_fragile && (
                                                            <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                                                                Fragile
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                            
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="border-t border-gray-100 px-6 py-4 bg-gray-50 flex justify-between items-center">
                            <p className="text-xs text-gray-400">
                                Last updated:{" "} {data.updated_at ? new Date(data.updated_at).toLocaleString("en-GB", {day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"}) : new Date(Date.created_at).toLocaleString("en-GB", {day:"numeric", month:"short", hour: "2-digit", minute:"2-digit"})}
                            </p>
                            <button
                                onClick={() => { setData(null); setCode(""); setSearchParams({});}}
                                className="text-xs cursor-pointer text-[#14B8A6] font-medium hover:underline"
                            >
                                Track another
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}