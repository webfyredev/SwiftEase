import { useCallback, useEffect, useState } from "react"
import { LuBellOff, LuCheckCheck, LuCircleCheck, LuCreditCard, LuInfo, LuLoader, LuTag, LuTrash2, LuTruck } from "react-icons/lu";
import api from "../../api/axios";



const TABS = [
  { label: "All",      value: ""         },
  { label: "Shipment", value: "shipment" },
  { label: "Payment",  value: "payment"  },
  { label: "Promo",    value: "promo"    },
  { label: "System",   value: "system"   },
];

const TYPE_CFG = {
  shipment: {
    icon:    LuTruck,
    iconBg:  "bg-blue-100",
    icontxt: "text-blue-600",
    label:   "Shipment",
  },
  payment: {
    icon:    LuCreditCard,
    iconBg:  "bg-green-100",
    icontxt: "text-green-600",
    label:   "Payment",
  },
  promo: {
    icon:    LuTag,
    iconBg:  "bg-purple-100",
    icontxt: "text-purple-600",
    label:   "Promo",
  },
  system: {
    icon:    LuInfo,
    iconBg:  "bg-gray-100",
    icontxt: "text-gray-500",
    label:   "System",
  },
};

function timeAgo(dateStr){
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if(mins < 1) return "Just now";
    if(mins < 60) return `${mins}m ago`;
    if(hours < 24) return `${hours}h ago`;
    if(days < 7) return `${days}d ago`;

    return new Date(dateStr).toLocaleDateString("en-GB", {
        day: "numeric", month : "short", year: "numeric"
    })
}

function SkeletonCard(){
    return(
        <div className="flex gap-4 p-4 animate-pulse">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-40 " />
                <div className="h-3 bg-gray-100 rounded w-64 " />
                <div className="h-2 bg-gray-100 rounded w-20 " />
            </div>
        </div>
    )
}
function NotifCard({ notif, onRead, onDelete}){
    const cfg = TYPE_CFG[notif.notif_type] ?? TYPE_CFG.system;
    const Icon = cfg.icon;

    return(
        <div className={`flex md:flex-row flex-col gap-4 p-4 rounded-xl transition-all group ${!notif.is_read ? 
        "bg-[#14B8A6]/20 border-l-4 border-[#14B8A6]" : "bg-white border-l-4 border-transparent hover:bg-gray-50"}`}
        >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center
                flex-shrink-0 ${cfg.iconBg}`}>
                    <Icon size={17} className={`${cfg.icontxt}`} />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <p className={`text-sm font-semibold truncate ${notif.is_read ? "text-gray-700" : "text-gray-900"}`}>
                            {notif.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">
                            {notif.message}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-gray-400">
                                {timeAgo(notif.created_at)}
                            </span>
                            <span className={`text-[10px] px-3 py-0.5 rounded-full font-semibold ${cfg.iconBg} ${cfg.icontxt}`}>
                                {cfg.label}
                            </span>
                            {!notif.is_read && (
                                <span className="w-2 h-2 bg-[#14B8A6] rounded-full"></span>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        {!notif.is_read && (
                            <button
                                onClick={() => onRead(notif.id)}
                                title="Mark as read"
                                className="cursor-pointer p-1.5 rounded-lg hover:bg-[#14B8A6]/30 transition"
                            >
                                <LuCheckCheck size={14} className="text-[#14B8A6]" />
                            </button>
                        )}
                        <button
                            onClick={() => onDelete(notif.id)}
                            title="Delete"
                            className="cursor-pointer p-1.5 rounded-lg bg-red-100 transition"
                        >   
                            <LuTrash2 size={14} className="text-red-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Notifications(){
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState("")
    const [markingAll, setMarkingAll] = useState(false)

    const [readingId, setReadingId] = useState(null)
    const [deletingId, setDeletingId] = useState(null);

    const unreadCount = notifications.filter((notif) => !notif.is_read).length;

    const fetchNotifications = useCallback( async () => {
        setLoading(true);
        try{
            const params = activeTab ? `?type=${activeTab}` : "";
            const res = await api.get(`/notifications/${params}`);
            setNotifications(res.data.results ?? res.data)
        } catch{

        } finally{
            setLoading(false)
        }
    }, [activeTab]);

    useEffect(() => { fetchNotifications ();}, [fetchNotifications]);

    const handleRead = async (id) => {
        setReadingId(id);
        try{
            await api.post(`/notifications/${id}/read/`);
            setNotifications(
                (prev) => prev.map((n) => 
                    (n.id === id ? {...n, is_read: true} : n)
            ))
        } catch{}
        setReadingId(null);
    }

    const handleMarkAllRead = async () => {
        if( unreadCount === 0) return;
        setMarkingAll(true)
        try{
            await api.post(`/notifications/read-all/`);
            setNotifications((prev) => prev.map((n) => ({...n, is_read: true})))
        } catch{}
        setMarkingAll(false);
    }

    const handleDelete = async (id) => {
        setDeletingId(id);
        try{
            await api.delete(`/notifications/${id}/delete/`);
            setNotifications((prev) => prev.filter((n) => n.id !== id))

        } catch{}
        setDeletingId(null);
    }
    return (
        <>
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                        <p className="text-sm text-gray-400 mt-0.5">
                            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "You're all caught up"}
                        </p>
                    </div>
                    {unreadCount > 0 && (
                        <button
                            onClick={handleMarkAllRead}
                            disabled = {markingAll}
                            className="cursor-pointer flex items-center gap-2 text-sm text-[#14B8A6] font-medium hover:underline disabled:opacity:50"
                        >
                            {markingAll ? <LuLoader size={14} className="animate-spin" /> : <LuCheckCheck size={14} />}
                            Mark all as read
                        </button>
                    )}
                </div>
                <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
                    {TABS.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`px-4 py-1.5 cursor-pointer rounded-lg text-[12px] md:text-sm font-medium transition
                                ${activeTab === tab.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}
                                `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    {loading ? (
                        <div className="divide-y divide-gray-50">
                            {Array(5).fill(0).map((_, i) => <SkeletonCard key={i} />
                            )}
                        </div>
                    ): notifications.length === 0 ? (
                        <div className="py-20 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LuBellOff size={26} className="text-gray-300" />
                            </div>
                            <p className="text-sm text-gray-400 font-medium">No notifications</p>
                            <p className="text-xs text-gray-300 mt-1">
                                {activeTab ? `No ${activeTab} notifications found` : "We'll notify you when something happens"}
                            </p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {notifications.map((notif) => (
                                <div key={notif.id} className="relative">
                                    {(readingId === notif.id || deletingId === notif.id) && (
                                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10 rounded-xl">
                                            <LuLoader size={16} className="animate-spin text-[#14B8A6]" />
                                        </div>
                                    )}
                                    <NotifCard
                                        notif={notif}
                                        onRead={handleRead}
                                        onDelete={handleDelete}
                                    />

                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {!loading && notifications.length > 0 && (
                    <p className="text-xs text-gray-400 text-center">
                        {notifications.length} notification{notifications.length > 1 ? "s" : ''} - {" "}
                        {unreadCount} unread
                    </p>
                )}

            </div>
        </>
    )
}