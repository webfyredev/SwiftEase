import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import api from "../../api/axios";
import { LuArrowRight, LuCircleAlert, LuCircleCheck, LuHeadphones, LuPlus, LuX } from "react-icons/lu";
import { motion } from 'framer-motion'
import { buttonHover } from "../../effects/motions";


const status_config = {
    open : {label : "Open", style: "bg-red-100 text-red-500"},
    in_progress : {label : "In Progress", style: "bg-amber-100 text-amber-500"},
    resolved : {label : "Resolved", style: "bg-green-100 text-green-500"},
    closed : {label : "Closed", style: "bg-gray-100 text-gray-500"}

}

function StatusStyle({ status}){
    const cfg = status_config[status] ?? status_config.open
    return(
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cfg.style}`}>
            {cfg.label}
        </span>
    )
}
const CATEGORIES = [
    {
        value : "delay",
        label : "Delay"
    },
    {
        value : "damage",
        label : "Damage"
    },
    {
        value : "missing",
        label: "Missing",
    },
    {
        value : "payment",
        label : "Payment"
    },
    {
        value : "other",
        label : "Other"
    },
];


function SkeletonRow(){
    return(
        <tr className="animate-pulse">
            {Array(6).fill(0).map((_,i) => (
                <td key={i} className="px-5 py-4">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                </td>
            ))}
        </tr>
    )
}

function Modal({ title, onClose, wide, children  }){
    useEffect(() => {
        document.body.style.overflow = "hidden"
        return() => { document.body.style.overflow = "";};
    }, []);

    return(
        <div className="fixed inset-0 z-50 flex items-center justify=center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${wide ? "max-w-2xl" : "max-w-lg"} max-h-[90vh] flex flex-col`}>
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
                    <h2 className="font-bold text-gray-900 text-base">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-100 transition"
                        >
                            <LuX size={17} className="text-gray-500" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}
function CreateTicketModal({onClose, onCreated, shipments }){
    const [form, setForm] = useState({ category : "delay", shipment: "", subject : "", description : ""});
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false)
    const [ApiError, setApiError] = useState("");

    const set = (k, v) => {
        setForm((f) => ({...f, [k]: v}));
        setErrors((e) => ({...e, [k] : ""}));
    };

    const handleSubmit = async () => {
        const errs = {};
        if(!form.subject.trim()) errs.subject = "Required";
        if(!form.description.trim()) errs.description = "Required";
        setErrors(errs);
        if(Object.keys(errs).length > 0) return;

        setSubmitting(true);
        setApiError("");

        try{
            const payload = {
                category : form.category,
                subject : form.subject.trim(),
                desciprion : form.description.trim()
            };
            if (form.shipment) payload.shipment = form.shipment;

            const res = await api.post('/support/tickets/', payload);
            onCreated(res.data);
            onClose();
        } catch (err){
            setApiError(err.reponse?.data?.detail ?? Object.values(err.response?.data ?? {})[0]?.[0] ?? "Failed to create ticket")
        } finally{
            setSubmitting(false);
        }
    }

    return(
        <Modal title="Create New Ticket" onClose={onclose}>
            <div className="px-6 py-5 space-y-4 overflow-y-auto">
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5">Category</label>
                    <select value={form.category} onChange={(e) => set("category", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 bg-white"
                    >
                        {CATEGORIES.map((data) => (
                            <option key={c.value} value={}></option>
                        ))}
                    </select>

                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5">Related Shipment</label>
                    <select value={form.shipment} onChange={(e) => set("shipment", e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/20 bg-white"
                    >
                        <option value="">None</option>
                        {shipments.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.shipment_code} - {s.receiver_name} ({s.status})
                            </option>
                        ))}
                    </select>
                    
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <input type="text" 
                    value={form.subject} onChange={(e) => set("subject", e.target.value)} 
                    placeholder="Brief description of your issue"
                    className={`w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 
                        ${errors.subject} ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-[#14B8A6]/50"`}
                    
                    />
                    {errors.subject && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.subject}
                        </p>
                    )}
                    
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5">Description</label>
                    <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4}
                        placeholder="Describe your issue in detail..."
                        className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 resize-none transition
                            ${errors.description ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-[#14B8A6]/50 focus:border-[#14B8A6]"}
                            `} 
                    />
                    {errors.description && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>
                {ApiError && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-500 text-xs roundedlg px-3 py-2">
                        <LuCircleAlert />
                    </div>
                )}
            </div>
        </Modal>

    )
}
export default function Support_Ticket(){
    const { user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true)
    const [modal, setModal] = useState(null);
    const [activeTicket, setActiveTicket] = useState(null)
    const [ticketLoading, setTicketLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const showToast = (type, message) => {
        setToast({type, message});
        setTimeout(() => setToast(null), 4000);
    };

    const fetchTickets = useCallback( async () => {
        try{
            const res = await api.get('/support/tickets/');
            setTickets(res.data.results ?? res.data);
        } catch{
            showToast("error", "Failed to load tickets.");
        } finally{
            setLoading(false);
        }
    },[]);

    const fetchShipments = useCallback(async () => {
        try{
            const res = await api.get('/support/my-shipments/');
            setShipments(res.data);
        } catch {}
    }, []);

    useEffect(() => {
        fetchTickets();
        fetchShipments();

    }, [fetchTickets, fetchShipments]);

    const openChat = async (ticket) => {
        setTicketLoading(true);
        setModal("chat");
        try{
            const res = await api.get(`/support/tickets/${ticket.id}/`);
            setActiveTicket(res.data)
        }catch{
            setModal(null);
            showToast("error", "Could not load ticket.")
        } finally{
            setTicketLoading(false)
        }
    }

    const handleCreated = (newTicket) => {
        setTickets((prev) => [newTicket, ...prev]);
        showToast("success", `Ticket ${newTicket.ticket_no} created successfully.`)
    };


    return (
        <>
            <div className="space-y-5">
                {toast && (
                    <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                        {toast.type === "success" ? <LuCircleCheck size={15} /> : <LuCircleAlert size={15} />}
                        {toast.message}
                    </div>
                )}

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Support Tickets</h1>
                        <p className="text-sm text-gray-400 mt-0.5">Track and manage your support requests</p>
                    </div>
                    <motion.button
                        {...buttonHover}
                        onClick={() => setModal("create")}
                        className="cursor-pointer flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5
                        rounded-lg text-sm font-semibold"
                    >
                        <LuPlus size={15} /> Create New Ticket
                    </motion.button>
                </div>

                <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-100">
                                    {["Ticket No", "Category", "Subject", "Status", "Date", "Action"].map((data) => (
                                        <th key={data} className="px-5 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">
                                            {data}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loading ? Array(4).fill(0).map((_, i) => <SkeletonRow key={i} />)
                                :tickets.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-20 text-center">
                                            <LuHeadphones size={40} className="text-gray-200 mx-auto mb-3" />
                                            <p className="text-sm text-gray-400 font-medium">No tickets yet</p>
                                            <p className="text-xs text-gray-300 mt-1">
                                                Need help? Create your first support ticket
                                            </p>
                                        </td>
                                    </tr>
                                ) : tickets.map((ticket) => (
                                    <tr key={ticket.id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-5 py-4 font-bold text-gray-800">
                                            {ticket.ticket_no}
                                        </td>
                                        <td className="px-5 py-4 text-gray-600">
                                            {ticket.category_display ?? ticket.category}
                                        </td>
                                        <td className="px-5 py-4 text-gray-700 max-w-[250px] truncate">
                                            {ticket.subject}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusStyle status={ticket.status} />
                                        </td>
                                        <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                                            {new Date(ticket.created_at).toLocaleDateString("en-GB", {day :"numeric", month: "short", year: "numeric"})}
                                        </td>
                                        <td className="px-5 py-4">
                                            <button
                                                onClick={() => openChat(ticket)}
                                                className="cursor-pointer text-[#14B8A6] text-xs font-medium hover:underline flex items-center gap-1"
                                            >
                                                View <LuArrowRight />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {modal === "create" && (

                )}
            </div>
        </>
    )
}