import { useState } from "react";
import { useAuth } from "../../context/AuthContext"
import { useCallback } from "react";
import api from "../../api/axios";
import { useEffect } from "react";
import { LuCalendar, LuChevronLeft, LuChevronRight, LuCircleAlert, LuCircleCheck, LuClock, LuLoader, LuX } from "react-icons/lu";

const TIME_SLOTS = [
    {label : "Morning", time: "08:00", range : "8:00 AM - 12:00 PM"},
    {label : "Afternoon", time: "12:00", range : "12:00 PM - 4:00 PM"},
    {label : "Evening", time: "16:00", range: "4:00 PM - 7:00 PM"}
];

const STATUS_CFG = {
  booked:    { label: "Booked",    cls: "bg-blue-100 text-blue-700"   },
  available: { label: "Scheduled", cls: "bg-blue-100 text-blue-700"   },
  completed: { label: "Completed", cls: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelled", cls: "bg-red-100 text-red-500"     },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CFG[status] ?? STATUS_CFG.booked;
  return (
    <span className={`px-3 py-1.5 rounded-lg text-xs font-medium ${cfg.cls}`}>
      {cfg.label}
    </span>
  );
}
function Toast({toast}) {
    if (!toast) return null;
    return(
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
            {toast.type === "success" ? <LuCircleCheck size={15} /> : <LuCircleAlert size={15} />}
            {toast.message}
        </div>
    )
}

function PickupRow({slot, onCancel, cancelling}) {
    const date = new Date(slot.slot_date);
    const canCancel = slot.status === "booked" || slot.status ==="available";

    return (
        <tr className="hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3.5 text-sm text-gray-600 whitespace-nowwrap">
                {date.toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric", })}
            </td>
            <td className="px-4 py-2.5 text-sm text-gray-600 whitespace-nowrap">
                {slot.time_range || slot.slot_time}
            </td>
            <td className="px-4 py-3.5 text-sm text-gray-600 max-w-[180px]">
                <p className="truncate">{slot.address}</p>
                <p className="text-xs text-gray-400">{slot.city}</p>
            </td>
            <td className="px-4 py-3">
                <StatusBadge status={slot.status} />
            </td>
            {canCancel && (
                <td className="px-4 py-3.5">
                    <button
                        onClick={() => onCancel(slot.id)}
                        disabled={cancelling === slot.id}
                        className="text-xs text-red-500 hover:bg-red-50 py-1.5 px-3 rounded-lg cursor-pointer hover:underline disabled:opacity:50"
                    >
                        {cancelling === slot.id ? <LuLoader size={12} className="animate-spin inline" /> : "Cancel"}
                    </button>
                </td>
            )}
        </tr>
    )
}
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

export default function Pickup_Scheduling(){
    const { user } = useAuth();
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const [selected, setSelected] = useState(null)

    const [timeSlot, setTimeSlot] = useState(0);
    const [address, setAddress] = useState(user?.address ?? "")
    const [city, setCity] = useState("");
    const [notes, setNotes] = useState("");
    const [errors, setErrors] = useState({});

    const [upcoming, setUpcoming] = useState([])
    const [past, setPast] = useState([])
    const [bookedDates, setBookedDates] = useState([])
    const [dataLoading, setDataLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [cancelling, setCancelling] = useState(null)
    const [toast, setToast] = useState(null);

    const showToast = ( type, message) => {
        setToast({ type, message});
        setTimeout(() => setToast(null), 4000)
    };

    const fetchData = useCallback(async () => {
        try{
            const res = await api.get("/shipments/pickups/dashboard/");
            setUpcoming(res.data.upcoming);
            setPast(res.data.past)
            setBookedDates(res.data.booked_dates)
        } catch{
            showToast("error", "Failed to load pickup data.")
        } finally{
            setDataLoading(false)
        }
    }, []);

    useEffect(() => { fetchData(); }, [fetchData]);

    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
    const firstDay = new Date(viewYear, viewMonth, 1).getDay();

    const prevMonth = () => {
        if(viewMonth === 0){ setViewYear((y) => y -1); setViewMonth(11);}
        else setViewMonth((m) => m -1 );
    }
    const nextMonth = () => {
        if(viewMonth === 11){ setViewYear((y) => y + 1 ); setViewMonth(0)}
        else setViewMonth((m) => m + 1)
    }

    const toDateStr = (day) => `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`

    const isPast = (day) => {
        const d = new Date(viewYear, viewMonth, day);
        d.setHours(0, 0, 0, 0);
        const t = new Date(); t.setHours(0,0,0,0);
        return d < t
    }
    const isBooked = (day) => bookedDates.includes(toDateStr(day))
    const isToday = (day) => day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

    const handleSubmit = async () => {
        const errs = {};
        if (!selected) errs.date = "Please select a date on the calender.";
        if (!address) errs.address = "Address is required.";
        if(!city) errs.city = "City is required.";
        if(!notes) errs.notes = "Notes is required";

        setErrors(errs);
        if(Object.keys(errs).length > 0) return;

        setSubmitting(true);
        try{
            await api.post("/shipments/pickups/", {
                slot_date : selected,
                slot_time : TIME_SLOTS[timeSlot].time,
                address,
                city,
                notes,
            });
            showToast("success", "Pickup scheduled successfully!");
            setSelected(null);
            setNotes("");
            setErrors([]);
            fetchData();
        } catch (err){
            const msg = err.response?.data?.slot_date?.[0] ??
            err.response?.data?.detail ?? "Failed to schedule pickup."
            showToast("error", msg);
        } finally{
            setSubmitting(false)
        }
    };
    const handleCancel = async (id) => {
        if(!window.confirm("Are you sure you want to cancel this pickup?")) return;
        setCancelling(id);

        try {
            await api.post(`/shipments/pickups/${id}/cancel/`);
            showToast("success", "Pickup cancelled.");
            fetchData();
        } catch{
            showToast("error", "Could not cancel pickup.");
        } finally{
            setCancelling(null)
        }
    }
    return (
        <>
            <div className="space-y-5">
                <Toast toast={toast} />
            </div>
            <div>
                <h1 className="text-xl text-gray-900 font-bold">Pickup Scheduling</h1>
                <p className="text-sm text-gray-400 mt-0.5">Schedule a courier to pick up your package.</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">
                <div className="space-y-4">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5">
                        <div className="flex items-center justify-between mb-5">
                            <h2 className="font-semibold text-gray-800">{MONTHS[viewMonth]} {viewYear}</h2>
                            <div className="flex gap-1">
                                <button
                                    onClick={prevMonth}
                                    className="p-1.5 cursor-pointer rounded-lg hover:bg-gray-100  transition"
                                >
                                    <LuChevronLeft size={16} className="text-gray-500 hover:text-gray-700" />
                                </button>
                                <button
                                    onClick={nextMonth}
                                    className="p-1.5 cursor-pointer rounded-lg hover:bg-gray-100  transition"
                                >
                                    <LuChevronRight size={16} className="text-gray-500 hover:text-gray-700" />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 mb-2">
                            {DAYS.map((day) =>(
                                <div key={day} className="text-center text-xs font-medium text-gray-400 py-1">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-y-1">
                            {Array(firstDay).fill(null).map((_, i) => (
                                <div key={`empty-${i}`} />
                            ))}
                            {Array.from({ length: daysInMonth}, (_, i) => i + 1).map((day) => {
                                const dateStr = toDateStr(day);
                                const past_day = isPast(day);
                                const booked = isBooked(day);
                                const sel = selected === dateStr;
                                const tod = isToday(day);

                                return(
                                    <button
                                        key={day}
                                        disabled={past_day}
                                        onClick={() => {
                                            setSelected(sel ? null : dateStr);
                                            setErrors((e) => ({...e, date: ""}))
                                        }}
                                        className={`relative mx-auto w-9 h-9 rounded-full text-sm font-medium flex items-center justify-center transition-all
                                            ${past_day ? "text-gray-200 cursor-not-allowed" : "hover:bg-[#14B8A6]/50 cursor-pointer"}
                                            ${sel ? "bg-[#14B8A6] text-white" : ""}
                                            ${tod && !sel ? "border-2 border-[#14B8A6]/70 text-[#14B8A6]" : ""}
                                            ${!sel && !tod && !past_day ? "text-gray-700" : ""}
                                            `}
                                    >
                                        {day}
                                        {booked && !sel && (
                                            <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#14B8A6] rounded-full" />
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                        {selected && (
                            <div className="mt-4 flex items-center gap-2 bg-[#14B8A6]/20 rounded-xl p-3">
                                <LuCalendar size={14} className="text-[#14B8A6]" />
                                <span className="text-xs text-[#14B8A6] font-medium">
                                    Selected: {" "}
                                    {new Date(selected + "T00:00:00").toLocaleDateString("en-GB", {
                                        weekday : "long", day:"numeric", month:"long", year : "numeric"
                                    })}
                                </span>
                                <button
                                    onClick={() => setSelected(null)}
                                    className="ml-auto"
                                >
                                    <LuX size={13} className="cursor-pointer text-[#14B8A6]/80 hover:text-white rounded-lg hover:bg-[#14B8A6]" />
                                </button>
                            </div>
                        )}
                        {errors.date && (
                            <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
                                <LuCircleAlert size={11}  /> {errors.date}
                            </p>
                        )}
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs p-5 space-y-3">
                        <h2 className="font-semibold text-gray-800">Pickup Details</h2>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2">
                                Time Slot
                            </label>
                            <div className="flex gap-2 flex-wrap mt-1">
                                {TIME_SLOTS.map((slot, idx) => (
                                    <button
                                        key={slot.label}
                                        onClick={() => setTimeSlot(idx)}
                                        className={`px-3 py-1.5 rounded-lg cursor-pointer border text-sm font-medium transition ${timeSlot === idx ? "border-[#14B8A6] bg-[#14B8A6]/10 text-[#14B8A6]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                                    >
                                        {slot.label}
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-[#14B8A6] mt-2 font-medium">
                                {TIME_SLOTS[timeSlot].range}
                            </p>
                        </div>
                        <div>
                            <label
                                className="text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Address
                            </label>
                            <input 
                                type="text" value={address} onChange={(e) => { setAddress(e.target.value); setErrors((er) => ({...er, address : ""}))}}
                                placeholder="e.g. 14 Admiralty Way, Lekki Phase 1"
                                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition 
                                    ${errors.address ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"}
                                `}
                            />
                            {errors.address && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.address}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                className="text-sm font-medium text-gray-700 mb-1.5"
                            >
                                City
                            </label>
                            <input 
                                type="text" value={city} onChange={(e) => { setCity(e.target.value); setErrors((er) => ({...er, city : ""}))}}
                                placeholder="e.g. Lagos"
                                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition 
                                    ${errors.city ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-[#14B8A6]/20 focus:border-[#14B8A6]"}
                                `}
                            />
                            {errors.city && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.city}
                                </p>
                            )}
                        </div>
                        <div>
                            <label
                                className="text-sm font-medium text-gray-700 mb-1.5"
                            >
                                Notes
                            </label>
                            <textarea 
                                value={notes} onChange={(e) => { setNotes(e.target.value); setErrors((er) => ({...er, notes : ""}))}}
                                placeholder="Any special instructions for the courier..."
                                className={`w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50 focus:border-[#14B8A6] resize-none transition 
                                `}
                            />
                            {errors.notes && (
                                <p className="text-red-500 text-xs mt-1">
                                    {errors.notes}
                                </p>
                            )}
                            
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={submitting}
                            className="w-full flex cursor-pointer items-center justify-center gap-2 bg-[#14B8A6]
                            text-white py-3 rounded-xl text-sm font-semibold disabled:opacity:50 transition"
                        >
                            {submitting ? (
                                <><LuLoader size={15} className="animate-spin" /> Scheduling...</>
                            ): (
                                <><LuCalendar size={15} /> Schedule Pickup</>
                            )}
                        </button>
                    </div>
                </div>
                <div className="space-y-5">
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-800">
                                Upcoming Pickups
                            </h2>
                        </div>
                        {dataLoading ? (
                            <div className="p-3 space-y-3 animate-pulse">
                                {Array(2).fill(0).map((_, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="h-3 bg-gray-200 rounded w-24" />
                                        <div className="h-3 bg-gray-200 rounded w-32" />
                                        <div className="h-3 bg-gray-200 rounded w-40" />

                                    </div>
                                ))}
                            </div>
                        ) : upcoming.length === 0 ? (
                            <div className="py-12 text-center">
                                <LuCalendar size={32} className="text-gray-200 mx-auto mb-3" />
                                <p className="text-sm text-gray-400">No upcoming pickups</p>
                                <p className="text-xs text-gray-300 mt-1">
                                    Select a date and schedule one
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-50">
                                            {["Date", "Time", "Address", "Status", "Action"].map((data) => (
                                                <th
                                                    key={data}
                                                    className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide"
                                                >
                                                    {data}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {upcoming.map((slot) => (
                                            <PickupRow
                                                key={slot.id}
                                                slot={slot}
                                                onCancel={handleCancel}
                                                cancelling={cancelling}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                        <div className="p-4 border-b border-gray-100">
                            <h2 className="font-semibold text-gray-800">
                                Past Pickups
                            </h2>
                        </div>
                        {dataLoading ? (
                            <div className="p-3 space-y-3 animate-pulse">
                                {Array(2).fill(0).map((_, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="h-3 bg-gray-200 rounded w-24" />
                                        <div className="h-3 bg-gray-200 rounded w-32" />
                                        <div className="h-3 bg-gray-200 rounded w-40" />

                                    </div>
                                ))}
                            </div>
                        ) : past.length === 0 ? (
                            <div className="py-12 text-center">
                                <LuClock size={32} className="text-gray-200 mx-auto mb-3" />
                                <p className="text-sm text-gray-400">No past pickups yet</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-50">
                                            {["Date", "Time", "Address", "Status"].map((data) => (
                                                <th
                                                    key={data}
                                                    className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wide"
                                                >
                                                    {data}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {past.map((slot) => (
                                            <PickupRow
                                                key={slot.id}
                                                slot={slot}
                                                onCancel={handleCancel}
                                                cancelling={cancelling}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}