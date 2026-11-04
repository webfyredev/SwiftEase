import { useCallback, useEffect, useState } from "react"
import api from "../../api/axios"
import { LuCheck, LuChevronLeft, LuChevronRight, LuLoader, LuSearch, LuX } from "react-icons/lu"


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

const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-GB", {
  day: "numeric", month: "short", year: "numeric",
}) : "—";

function Modal({ title, onClose, wide, children}){
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "";};
    }, []);

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative bg-white rounded-2xl shadow-2xl w-full  ${wide ? 'max-w-3xl' : 'max-w-lg'} max-h-[90vh] flex flex-col`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-100"
                    >
                        <LuX size={17} className="text-gray-500" />
                    </button>
                </div>
                <div className="overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default function Ad_S_Shipments(){
    const [shipments, setShipments] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState("")
    const [service, setService] = useState("")
    const [detail, setDetail] = useState(null)
    const [drivers, setDrivers] = useState([])
    const [assigning, setAssigning] = useState(false)
    const [selectedDrivers, setSelectedDrivers] = useState("");
    const [upStatus, setUpStatus] = useState("")
    const [updating, setUpdating] = useState(false);

    const fetchShipments = useCallback(async() => {
        setLoading(true)
        try{
            const res = await api.get(`/ad_stffs/shipments/`, {params : { page, search, service, status }})
            setShipments(res.data.results)
        }catch{
            console.error('Failed to load shipments')
        } finally{
            setLoading(false)
        }
    }, [page, search, status, service]);

    useEffect(() => { fetchShipments();}, [fetchShipments])

    const openDetail = async(id) => {
        try{
            const [sRes, dRes] = await Promise.all([
                api.get(`/ad_stffs/shipments/${id}/`),
                api.get('/ad_stffs/drivers/'),
            ])
            setDetail(sRes.data);
            setDrivers(dRes.data);
            setUpStatus(sRes.data.status);
            setSelectedDrivers(sRes.data.driver_id ?? "");
        }catch{
            console.error('Failed to load details')
        }
    }

    const handleAssign = async() => {
        if(!selectedDrivers) return;
        setAssigning(true)

        try{
            await api.patch(`/ad_stffs/shipments/${detail.id}/assign`, { driver_id : selectedDrivers })
            setDetail((d) => ({...d, driver: drivers.find((dr) => dr.id === selectedDrivers)?.full_name }))
            fetchShipments()
        }catch{
            console.error('Failed to assign a driver.')
            setAssigning(false);
        }
    }

    const handleStatusUpdate = async () => {
        setUpdating(true)
        try{
            await api.patch(`/ad_stffs/shipments/${detail.id}/status/`, {status : upStatus, location : detail.sender_city})
            setDetail((d) => ({...d, status:upStatus }));
            fetchShipments()
        }catch{
            console.error('Failed to update shipment status.')
            setUpdating(false)
        }
    }
    const STATUSES = ["", "pending", "confirmed", "processing", "dispatched", "delivered", "cancelled", "returned"];
    const total_count = shipments?.pagination?.count || 0
    const naira   = (v) => `₦${Number(v).toLocaleString("en-NG", { minimumFractionDigits: 0 })}`;
    return(
        <>
            <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                    <h1 className="text-2xl font-bold text-gray-800 my-1">Shipments</h1>
                    <p className="text-gray-500 text-[12px] md:text-sm">
                        Track every shipment, update status and assign drivers.
                    </p>
                </div>
                <div className="w-full flex gap-3">
                    <div className="relative w-120">
                        <LuSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
                        <input value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder="Search code, name, city.." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20" />
                    </div>
                    <select
                        value={status}
                        onChange={(e) => {setStatus(e.target.value)}}
                        className="px-4 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
                    >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="processing">Processing</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="returned">Returned</option>
                    </select>
                    <select
                        value={service}
                        onChange={(e) => {setService(e.target.value)}}
                        className="px-4 py-2 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none"
                    >
                        <option value="">All services</option>
                        <option value="express">Express</option>
                        <option value="standard">Standard</option>
                    </select>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-max text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    {["Code", "Sender", "Receiver", "Service", "Status", "Paid", "Driver", "Date", ""].map((hds) => (
                                        <th key={hds} className="px-4 py-3.5 text-left text-xs font-medium text-gray-400 uppercase">{hds}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? <Skeleton rows={8} cols={9} /> : shipments.map((shp) => (
                                    <tr key={shp.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-bold text-gray-800 text-xs">{shp.shipment_code}</td>
                                        <td className="px-4 py-3 text-xs text-gray-600">{shp.sender_name}</td>
                                        <td className="px-4 py-3 text-xs text-gray-600">{shp.receiver_name}</td>
                                        <td className="px-4 py-3 text-xs text-gray-600">{shp.service}</td>
                                        <td className="px-4 py-3"><Badge status={shp.status} /></td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-semibold ${shp.is_paid ? 'text-green-600' : 'text-red-500'}`}>
                                                {shp.is_paid ? 'Paid' : 'Unpaid'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-500">{shp.driver ?? ''}</td>
                                        <td className="px-4 py-3 text-xs text-gray-400">{fmtDate(shp.created_at)}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => openDetail(shp.id)}
                                                className="cursor-pointer text-gray-600  hover:text-gray-800 text-xs font-medium hover:underline transition-colors"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>   
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                        <div>
                            Showing <span className="font-semibold">{shipments.length}</span> of <span className="font-semibold">{total_count}</span> shipments
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                disabled={!shipments?.pagination?.previous}
                                onClick={() => setPage(page - 1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronLeft className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 font-semibold text-gray-700">Page {page}</span>
                            <button
                                disabled={!shipments?.pagination?.next}
                                onClick={() => setPage(page + 1)}
                                className="cursor-pointer p-1.5 border border-gray-200 rounded-lg disabled:opacity-40"
                            >
                                <LuChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                    {detail &&(
                        <Modal title={`Shipment - ${detail.shipment_code}`} onClose={() => setDetail(null)} wide>
                            <div className="px-6 py-5 space-y-5">
                                <div className="flex items-center justify-between gap-3">
                                    <Badge status={detail.status} />
                                    {detail.is_paid ? 
                                        <span className="flex items-center text-xs text-green-600 font-semibold"><LuCheck className="mr-1"/>Paid</span> 
                                        :<span className="flex items-center text-xs text-red-500 font-semibold"><LuX  className="mr-1"/> Unpaid</span>
                                    }
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-50 rounded-xl p-4 text-sm space-y-1">
                                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Sender</p>
                                        <p className="font-semibold text-gray-800">{detail.sender_name}</p>
                                        <p className="text-gray-500">{detail.sender_phone}</p>
                                        <p className="text-gray-500">{detail.sender_address}</p>
                                        <p className="text-gray-500">{detail.sender_city}, {detail.sender_state} state.</p>
                                    </div>
                                    <div className="bg-blue-50 rounded-xl p-4 text-sm space-y-1">
                                        <p className="text-xs font-semibold text-gray-400 uppercase mb-2">Receiver</p>
                                        <p className="font-semibold text-gray-800">{detail.receiver_name}</p>
                                        <p className="text-gray-500">{detail.receiver_phone}</p>
                                        <p className="text-gray-500">{detail.receiver_address}</p>
                                        <p className="text-gray-500">{detail.receiver_city}, {detail.receiver_state} state.</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-3 text-sm">
                                    {[
                                        {label : "Service", value : detail.service},
                                        {label : "Weight", value : `${detail.weight_kg} kg`},
                                        {label : "Total", value : naira(detail.total_price)},
                                        {label : "Fragile", value : detail.is_fragile ? <div className="flex items-center"><LuCheck className="mr-0.5" />Yes</div> : <div className="flex items-center"><LuX  className="mr-0.5"/>No</div>},
                                        {label : "Declared", value : naira(detail.declared_value)},
                                        {label : "Insurance", value : naira(detail.insurance_fee)},
                                    ].map((shp, idx) => (
                                        <div key={idx} className="flex flex-col bg-gray-50 rounded-lg p-3">
                                            <p className="text-[10px] text-gray-500 font-semibold uppercase">
                                                {shp.label}
                                            </p>
                                            <p className="font-semibold text-gray-800 mt-0.5 text-sm">
                                                {shp.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="border border-gray-100 rounded-xl p-4 space-y-3">
                                        <p className="text-sm font-semibold text-gray-700">Update Status</p>
                                        <div className="flex gap-2">
                                            <select 
                                                value={upStatus} onChange={(e) => setUpStatus(e.target.value)}
                                                className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white"
                                            >
                                                <option value="">All Updates</option>
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="processing">Processing</option>
                                                <option value="dispatched">Dispatched</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                                <option value="returned">Returned</option>
                                            </select>
                                            <button
                                                onClick={handleStatusUpdate}
                                                disabled={updating}
                                                className="cursor-pointer px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-50"
                                            >
                                                {updating ? <LuLoader className="animate-spin" /> :  "Update"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="border border-gray-100 rounded-xl p-4 space-y-3">
                                        <p className="text-sm font-semibold text-gray-700">
                                            Assign Driver {detail.driver && <span className="font-normal ml-1 text-gray-400"> currently: {detail.driver}</span>}
                                        </p>
                                        <div className="flex gap-2">
                                            <select 
                                                value={selectedDrivers} onChange={(e) => setSelectedDrivers(e.target.value)}
                                                className="px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white"
                                            >
                                                <option value="">Select driver...</option>
                                                {drivers.map((d) => (
                                                    <option key={d.id} value={d.id}>
                                                        {d.full_name} {d.is_on_duty}
                                                    </option>
                                                ))}
                                            </select>
                                            <button
                                                onClick={handleAssign}
                                                disabled={assigning || !selectedDrivers}
                                                className="cursor-pointer px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 disabled:opacity-50"
                                            >
                                                {assigning ? <LuLoader className="animate-spin" /> :  "Assign"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {detail.tracking_events?.length > 0 && (
                                    <div>
                                        <p className="text-sm font-semibold text-gray-700 mb-3">
                                            Tracking Timeline
                                        </p>
                                        <div className="space-y-3">
                                            {detail.tracking_events.map((evs, idx) => (
                                                <div key={idx} className="flex gap-3 text-sm">
                                                    <div className="w-2 h-2 bg-gray-800 rounded-full mt-1.5" />
                                                    <div>
                                                        <p className="font-medium text-gray-700 capitalize">{evs.status} __ {evs.location}</p>
                                                        <p className="text-gray-400 text-xs">{evs.description}</p>
                                                        <p className="text-gray-300 text-xs">{fmtDate(evs.timestamp)}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </>
    )
}