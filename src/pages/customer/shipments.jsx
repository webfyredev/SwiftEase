import { useEffect, useMemo, useState } from "react"
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { LuCircleCheck, LuClock, LuClockAlert, LuDownload, LuEye, LuMapPin, LuPackage, LuRotateCcw, LuSearch, LuTruck, LuX } from "react-icons/lu";


const STATUS_CONFIG = {
  draft:       { label: "Draft",       pill: "bg-gray-100 text-gray-600",   dot: "bg-gray-400" },
  pending:     { label: "Pending",     pill: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-400" },
  confirmed:   { label: "Confirmed",   pill: "bg-blue-100 text-blue-700",   dot: "bg-blue-500" },
  processing:  { label: "Processing",  pill: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
  dispatched:  { label: "Dispatched",  pill: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
  delivered:   { label: "Delivered",   pill: "bg-green-100 text-green-700", dot: "bg-green-500" },
  cancelled:   { label: "Cancelled",   pill: "bg-red-100 text-red-700",     dot: "bg-red-400" },
  returned:    { label: "Returned",    pill: "bg-gray-200 text-gray-600",   dot: "bg-gray-500" },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.pill}`}>
      {cfg.label}
    </span>
  );
}

const TIMELINE_ICONS = {
  pending:          { icon: LuClock,        bg: "bg-blue-500",   ring: "ring-blue-200" },
  in_transit:       { icon: LuTruck,        bg: "bg-orange-500", ring: "ring-orange-200" },
  out_for_delivery: { icon: LuMapPin,       bg: "bg-amber-500",  ring: "ring-amber-200" },
  delivered:        { icon: LuCircleCheck, bg: "bg-green-500",  ring: "ring-green-200" },
  held:             { icon: LuClockAlert,  bg: "bg-red-400",    ring: "ring-red-200" },
  returned:         { icon: LuRotateCcw,    bg: "bg-gray-400",   ring: "ring-gray-200" },
};

function TrackingDot({ status, isActive, isFuture }) {
  const cfg = TIMELINE_ICONS[status] ?? TIMELINE_ICONS.pending;
  const Icon = cfg.icon;

  if (isFuture) {
    return (
      <div className="w-8 h-8 rounded-full bg-gray-100 ring-3 ring-gray-50 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-gray-300" />
      </div>
    );
  }
  return (
    <div className={`w-8 h-8 rounded-full ${cfg.bg} ring-3 ${cfg.ring} flex items-center justify-center flex-shrink-0`}>
      <Icon size={16} className="text-white" />
    </div>
  );
}
function SkeletonRow() {
  return (
    <tr className="animate-pulse">
      {Array(7).fill(0).map((_, i) => (
        <td key={i} className="px-5 py-4">
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </td>
      ))}
    </tr>
  );
}

const TABS = [
  { label: "All",       value: "" },
  { label: "Pending",   value: "pending" },
  { label: "In Transit",value: "dispatched" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

function ShipmentModal({shipment, onClose, onDownloadLabel}){
    const events = shipment?.tracking_events ?? [];

    const STATUS_ORDER = ["pending", "in_transit", "out_for_delivery", "delivered"];
    const currentIdx = STATUS_ORDER.indexOf(shipment?.status === "dispatched" ? "in_transit" : shipment?.status);
    
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {document.body.style.overflow = "";};
    },[]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-[95%] md:w-[60%] max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sitcky top-0 bg-white z-10">
                    <h2 className="font-bold text-gray-900 text-lg">Shipment Details</h2>
                    <button 
                        onClick={onClose}
                        className="p-1.5 rounded-lg cursor-pointer hover:bg-gray-100 transition">
                        <LuX size={18} className="text-gray-500" />
                    </button>
                </div>
                <div className="p-5 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400 mb-1">Shipment Code</p>
                            <p className="text-lg font-bold text-gray-900">{shipment.shipment_code}</p>
                        </div>
                        <StatusBadge status={shipment.status} />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="space-y-3">
                            <h3 className="font-semibold text-gray-800 text-sm">Shipment Info</h3>
                            {[
                                {label : "Receiver", value : shipment.receiver_name },
                                {label: "Destination", value : `${shipment.receiver_address}, ${shipment.receiver_city}, ${shipment.receiver_state}`},
                                {label: "Service", value : shipment.service_type?.name ?? shipment.service_name},
                                {label : "Weight", value : `${shipment.weight} kg`},
                                {label : "Total Price", value : `₦${Number(shipment.total_price).toLocaleString("en-NG")}`},
                                {label : "Date Created", value : new Date(shipment.created_at).toLocaleDateString("en-GB", { day: "numeric", month : "short", year: "numeric"})},
                                {label : "Est. Delivery", value : shipment.estimated_delivery ? new Date(shipment.estimated_delivery).toLocaleDateString("en-GB", {day : "numeric", month: "short", year : "numeric"}) : "-"},
                            ].map(({label, value}) => (
                                <div key={label} className="flex justify-between text-sm gap-4">
                                    <span className="text-gray-400 flex-shrink-0 text-[13px]">{label}</span>
                                    <span className="text-gray-800 font-medium text-right text-[13px]">{value}</span>
                                </div>
                            ))}
                            <button
                                onClick={() => onDownloadLabel(shipment.id, shipment.shipment_code)}
                                className="mt-5 w-full flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
                            >
                                Download Shipping Label
                            </button>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-800 text-sm mb-4">
                                Tracking Timeline
                            </h3>
                            {events.length === 0 ? (
                                <p className="text-xs text-gray-400">No tracking events yet </p>
                            ) : (
                                <div className="relative">
                                    <div className="absolute left-[16px] top-5 bottom-5 w-0.5 bg-gray-200" />
                                    <div className="space-y-5">
                                        {events.map((evt, idx) => {
                                            const evtStatusIdx = STATUS_ORDER.indexOf(evt.status);
                                            const isFuture = evtStatusIdx > currentIdx;
                                            const isActive = evtStatusIdx === currentIdx;
                                            return(
                                                <div key={evt.id ?? idx} className="flex gap-4 relative">
                                                    <TrackingDot status={evt.status} isActive={isActive} isFuture={isFuture} />
                                                    <div className="flex-1 min-w-0 pt-1">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <p className={`text-sm font-semibold capitalize ${isFuture ? "text-gray-300" : "text-gray-800"}`}>
                                                                {evt.status.replace(/_/g, " ")}
                                                            </p>
                                                            {isActive && (
                                                                <span className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-medium">
                                                                In progress
                                                                </span>
                                                            )}
                                                            </div>
                                                            <p className={`text-xs mt-0.5 ${isFuture ? "text-gray-300" : "text-gray-500"}`}>
                                                                {evt.location}
                                                            </p>
                                                            {evt.description && (
                                                                <p className={`text-xs mt-1 ${isFuture ? "text-gray-200" : "text-gray-500"}`}>
                                                                    {evt.description}
                                                                </p>
                                                            )}
                                                            <p className={`text-[10px] mt-1 ${isFuture ? "text-gray-200" : "text-gray-400"}`}>
                                                            {isFuture
                                                                ? shipment.estimated_delivery
                                                                ? `Estimated ${new Date(shipment.estimated_delivery).toLocaleDateString("en-GB", { month: "short", day: "numeric" })}`
                                                                : ""
                                                                : new Date(evt.timestamp).toLocaleString("en-GB", {
                                                                    day: "numeric", month: "short",
                                                                    hour: "2-digit", minute: "2-digit",
                                                                })}
                                                            </p>
                                                        </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function Shipments(){
    const navigate = useNavigate();
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("")
    const [search, setSearch] = useState("")
    const [selected, setSelected] = useState(null)
    const [modalLoading, setModalLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const params = activeTab ? `?status=${activeTab}` : "";
        api.get(`/shipments/${params}`)
        .then((res) => setShipments(res.data.results ?? res.data))
        .catch(() => setError("Failed to load shipments."))
        .finally(() =>  setLoading(false))
    }, [activeTab]);

    const filtered = useMemo(() => {
        const q = search.toLowerCase();
        if(!q) return shipments;
        return shipments.filter((s) => s.shipment_code.toLowerCase().includes(q) || s.receiver_name.toLowerCase().includes(q) || s.receiver_city.toLowerCase().includes(q));

    }, [shipments, search]);

    const openDetail = async (id) => {
        setModalLoading(true);
        setSelected({ id })
        try{
            const res = await api.get(`/shipments/${id}/`);
            setSelected(res.data)
        } catch{
            setSelected(null);
        } finally{
            setModalLoading(false);
        }
    };

    const downloadLabel = async (id, code) => {
        try{
            const res = await api.get(`/shipments/${id}/labels`, {responseType : "blob"});
            const url = URL.createObjectURL(new Blob([res.data], {type : "application/pdf"}));
            const link = document.createElement("a");
            link.href = url;
            link.download = `label_${code}.pdf`;
            link.click();
            URL.revokeObjectURL(url);
        }catch{
            alert("Could not download lable. Try again.");
        }
    }
    return (
        <>
            <div className="space-y-5">
                <div>
                    <h1 className="text-xl font-bold text-gray-900">My Shipments</h1>
                    <p className="text-sm text-gray-400 mt-0.5"> View and manage all your shipments</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex gap-1 bg-gray-100 rounded-full py-1 px-2 w-fit">
                        {TABS.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`px-4 py-1.5 rounded-full cursor-pointer text-sm font-medium transition ${activeTab === tab.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                >
                                    {tab.label}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <LuSearch size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" placeholder="Search code or receiver.." value={search} onChange={((e) => setSearch(e.target.value))} className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A] w-74 bg-white" />
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflowhidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    {["Shipment Code", "Receiver", "Service", "Weight", "Price", "Status", "Date", "Actions"].map((h) => (
                                        <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="py-20 text-center">
                                            <LuPackage size={40} className="text-gray-200 mx-auto mb-3" />
                                            <p className="text-sm text-gray-400 font-medium">No shipments found</p>
                                            <p className="text-xs text-gray-300 mt-1">Try a different filter or search term</p>
                                        </td>
                                    </tr>
                                ) : filtered.map((s) => (
                                    <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-5 py-4 font-bold text-gray-800">{s.shipment_code}</td>
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-gray-800">{s.receiver_name}</p>
                                            <p className="text-xs text-gray-400 ">{s.receiver_city}</p>
                                        </td>
                                        <td className="px-5 py-4 text-gray-600">
                                            {s.service_name}
                                        </td>
                                        <td className="px-5 py-4 text-gray-600">
                                            {s.weight_kg}
                                        </td>
                                        <td className="px-5 py-4 text-gray-800 font-medium">
                                            ₦{Number(s.total_price).toLocaleString("en-NG")}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={s.status} />
                                        </td>
                                        <td className="px-5 py-4 text-gray-400 text-xs">
                                            {new Date(s.created_at).toLocaleDateString("en-GB", {day: "numeric", month:"short", year : "numeric",})}
                                        </td>
                                        <td className="px-5 py-4 flex space-x-5">
                                            <button
                                                onClick={() => openDetail(s.id)}
                                                className="flex mt-2 cursor-pointer items-center gap-1.5 text-[#14B8A6] text-xs font-medium hover:underline"
                                            >
                                                <LuEye  size={13} /> View
                                            </button>
                                            <button
                                                onClick={() => downloadLabel(s.id, s.shipment_code)} 
                                                className="flex mt-2 items-center cursor-pointer gap-1.5 text-gray-500 text-xs font-medium hover:text-gray-700">
                                                <LuDownload size={13} /> Label
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {selected && (
                    modalLoading ? (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />
                            <div className="relative bg-white rounded-2xl p-10 flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                                <span className="text-sm text-gray-600">
                                    Loading shipment details...
                                </span>
                            </div>  
                        </div>
                    )
                : (

                    <ShipmentModal
                        shipment={selected}
                        onClose={() => setSelected(null)}
                        onDownloadLabel={downloadLabel}
                    />
                )
                )}
            </div>
        </>
    )
}