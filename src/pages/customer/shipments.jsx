import { useEffect, useMemo, useState } from "react"
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { LuDownload, LuEye, LuPackage, LuSearch } from "react-icons/lu";


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
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cfg.pill}`}>
      {cfg.label}
    </span>
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
            const res = await api.get(`/shipments/${id}/label/`, {responseType : "blob"});
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
                                            ₦{Number(s.total_price).toLocaleString("en NG")}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={s.status} />
                                        </td>
                                        <td className="px-5 py-4 text-gray-400 text-xs">
                                            {new Date(s.created_at).toLocaleDateString("en-GB", {day: "numeric", month:"short", year : "numeric",})}
                                        </td>
                                        <td className="px-5 py-4 flex space-x-2.5">
                                            <button
                                                onClick={() => openDetail(s.id)}
                                                className="flex items-center gap-1.5 text-[#14B8A6] text-xs font-medium hover:underline"
                                            >
                                                <LuEye  size={13} /> View
                                            </button>
                                            <button
                                                onClick={() => downloadLabel(s.id, s.shipment_code)} 
                                                className="flex items-center gap-1.5 text-gray-500 text-xs font-medium hover:text-gray-700">
                                                <LuDownload size={13} /> Label
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}