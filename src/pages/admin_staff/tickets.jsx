import { useCallback, useEffect, useRef, useState } from "react"
import api from "../../api/axios"
import { LuLoader, LuSend, LuX } from "react-icons/lu";



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

export default function Ad_S_Tickets(){
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState("")
    const [detail, setDetail] = useState(null)
    const [reply, setReply] = useState("")
    const [sending, setSending] = useState(false)
    const [upStat, setUpStat] = useState("")
    const bottomRef = useRef(null)

    const fetchTickets = useCallback(async() => {
        setLoading(true)
        try{
            const res = await api.get('/ad_stffs/tickets/', {params : { status }})
            setTickets(res.data)
        }catch(err){
            console.error("Failed to fetch tickets:", err)
        }finally{
            setLoading(false)
        }
    }, [status]);

    useEffect(() => {fetchTickets();}, [fetchTickets])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior : "smooth"})
    }, [detail?.replies]);

    const openDetail = async (id) => {
        try{
            const res = await api.get(`/ad_stffs/tickets/${id}/`)
            setDetail(res.data)
            setUpStat(res.data.status)
        } catch{
            console.error('Failed to load ticket.')
        }
    }

    const handleReply = async () => {
        if(!reply.trim()) return;
        setSending(true)
        try{
            const res = await api.post(`/ad_stffs/tickets/${detail.id}/reply`, {message : reply})
            setDetail((d) => ({...d, replies: [...d.replies, res.data]}))
            setReply("")
            fetchTickets();
        }catch{
            console.error("Failed to send reply")
            setSending(false);
        }
    }

    const handleStatusChange = async (newStatus) => {
        try{
            await api.patch(`/ad_stffs/tickets/${detail.id}/status/`, {status : newStatus})
            setDetail((d) => ({...d, status : newStatus}))
            setUpStat(newStatus)
        }catch{
            console.error('Status update failed')
        }
    }
    const status_tabs = [
        { value : "", label : "All"}, {value : "open", label : "Open"}, {value : "in_progress", label : "In Progress"}, {value : 'resolved', label : "Resolved"}, {value : "closed", label : "Closed"}
    ]
    const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-GB", {
        day: "numeric", month: "short", year: "numeric",
    }) : "—";
    return(
        <>
            <div className="space-y-4">
                <div className="flex flex-col space-y-1">
                    <h1 className="text-2xl font-bold text-gray-800 my-1">Support Tickets</h1>
                    <p className="text-gray-500 text-[12px] md:text-sm">
                        Reply to customers and move ticket through the queue
                    </p>
                    <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
                        {status_tabs.map((data) => (
                            <button key={data.value} onClick={() => setStatus(data.value)}
                                className={`cursor-pointer px-5 py-1.5 rounded-lg text-xs font-semibold transition ${status === data.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}                            
                            >
                                {data.label}
                            </button>
                        ))}
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <table className="w-full text-sm min-w-max">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    {["Ticket", "Customer", "Category", "Subject", "Status", "Replies", "Date", ""].map((hds) => (
                                        <th key={hds} className="px-4 py-3.5 text-left text-xs font-medium text-gray-400 uppercase">
                                            {hds}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? <Skeleton rows={6} cols={8} /> : tickets?.ticket_data.map((tik) => (
                                    <tr key={tik.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 font-bold text-gray-800 text-xs">{tik.ticket_no}</td>
                                        <td className="px-4 py-3 text-gray-600">{tik.user_name} <br /><span className="text-gray-400">{tik.user_email}</span></td>
                                        <td className="px-4 py-3 text-gray-600">{tik.category}</td>
                                        <td className="px-4 py-3 text-xs text-gray-700 max-w-[200px] truncate">{tik.subject}</td>
                                        <td className="px-4 py-3"><Badge status={tik.status} /></td>
                                        <td className="px-4 py-3 text-xs text-gray-500">{tik.reply_count}</td>
                                        <td className="px-4 py-3 text-xs text-gray-400">{fmtDate(tik.created_at)}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => openDetail(tik.id)}
                                                className="cursor-pointer text-gray-600 hover:text-gray-800 text-xs font-medium hover:underline"
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {detail && (
                        <Modal title={`${detail.ticket_no} - ${detail.subject}`} onClose={() => setDetail(null)} wide>
                            <div className="flex items-center gap-3 px-6 py-3 border-b border-gray-100">
                                <Badge status={detail.status} />
                                <span className="text-xs text-gray-500">Category: {detail.category}</span>
                                <div className="ml-auto flex items-center gap-2">
                                    <select
                                        value={upStat}
                                        onChange={(e) => handleStatusChange(e.target.value)}
                                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-white"
                                    >
                                        <option value="open">Open</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="resolved">Resolved</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex overflow-y-auto px-6 py-4 space-y-4 min-h-0" style={{maxHeight: "360px"}}>
                                <div className="flex justify-start">
                                    <div className="max-w-[70%]">
                                        <p className="text-xs text-gray-400 mb-1 text-left"></p>
                                        <div className="bg-gray-100 text-gray-800 rounded-2xl  ounded-tl-sm px-4 py-3 text-sm">
                                            {detail.description}
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1">{fmtDate(detail.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                            {detail.replies.map((rep) => (
                                <div key={rep.id} className={`flex px-6 py-4 ${rep.is_staff ? 'justify-end' : 'justify-start'}`}>
                                    <div className="max-w-[70%]">
                                        <p className={`text-xs mb-1 mx-5 ${rep.is_staff ? "text-gray-400 text-right" : "text-gray-400 text-left"}`}>
                                            {rep.author_name}
                                            {rep.is_staff && <span className="ml-1 bg-[#14B8A6]/10 text-[#14B8A6] px-1.5 rounded-full text-[10px]">Staff</span>}
                                        </p>
                                        <div className={`rounded-2xl px-4 py-3 text-sm ${rep.is_staff ? "bg-[#14B8A6] text-white": "bg-gray-100 text-gray-800 rounded-tl-sm"}`}>
                                            {rep.message}
                                        </div>
                                        <p className={`text-[10px] text-gray-400 mt-1 ${rep.is_staff ? 'text-right' : 'text-left'}`}>{fmtDate(rep.created_at)}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={bottomRef} />
                            <div className="px-6 py-4 border-t border-gray-100 flex gap-3 items-end">
                                <textarea 
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    placeholder="Type your reply..."
                                    onKeyDown={(e) => {if(e.key === "Enter" && !e.shiftKey) {e.preventDefault(); handleReply();}}}
                                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm resize-none focus:border-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#0F172A]/20"
                                />
                                <button 
                                    onClick={handleReply}
                                    disabled={sending || !reply.trim()}
                                    className="flex items-center gap-2 bg-[#14B8A6] text-white px-4 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50"
                                >
                                    {sending ? <LuLoader  className="animate-spin"/> : <><LuSend /> Send</>}
                                </button>
                            </div>
                        </Modal>
                    )}
                </div>
            </div>
        </>
    )
}