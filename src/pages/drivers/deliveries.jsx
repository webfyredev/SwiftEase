import { useCallback, useEffect, useRef, useState } from "react"
import api from "../../api/axios";
import { LuCamera, LuCheck, LuChevronLeft, LuChevronRight, LuCircleCheck, LuLoader, LuMapPin, LuNavigation, LuPackage, LuSearch, LuTriangleAlert, LuUserRound, LuX } from "react-icons/lu";

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

const PROGRESS_STEPS = [
    {status : "pending", label : "Pending"},
    {status : "in_transit", label : "In Transit"},
    {status : "out_of_delivery", label : "Out for Delivery."},
    {status : "delivered", label : "Delivered"}
]
const SHIP_TO_STEP = {
    pending : 0,
    confirmed: 0,
    processing : 0,
    dispatched : 1,
    delivered : 3,
}

function TrackingProgress({status}){
    const current = SHIP_TO_STEP[status] ?? 0;
    return(
        <div className="flex itemx-center gap-0">
            {PROGRESS_STEPS.map((step, idx) => (
                <div key={step.status} className="flex items-center">
                    <div className="flex flex-col items-center">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all 
                            ${idx < current ? "bg-emerald-700 text-white" : idx === current ? "bg-orange-600 text-white" : 'bg-gray-200 text-gray-400'}
                            `}>
                                {idx < current ? <><LuCheck /></> : idx + 1}
                        </div>
                        <p className={`text-[9px] mt-1 text-center leading-tight ${
                            idx <= current ? "text-gray-700" : "text-gray-300"
                        }`}>
                            {step.label}
                        </p>
                    </div>
                    {idx < PROGRESS_STEPS.length - 1 && (
                        <div className={`flex h-0.5 mb-4 mx-0.5 ${idx < current ? "bg-emerald-600" : "bg-gray-200"}`} />
                    )}

                </div>
            ))}
        </div>
    )
}

function PODScreen({shipment, onBack, onSucess, showToast}){
    const fileRef = useRef(null);
    const [form, setForm] = useState({
        signed_by : "", latitude : "", longitude : "", notes: "",
    })
    const [photo, setPhoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((pos) => {
                setForm((f) => ({
                    ...f, 
                    latitude: pos.coords.latitude.toFixed(6),
                    longitude : pos.coords.longitude.toFixed(6),
                }))
            })
        }
    }, []);

    const handlePhoto = (e) => {
        const file = e.target.files?.[0];
        if(!file) return;
        setPhoto(file)
        const reader = new FileReader();
        reader.onloadend = () => setPhotoPreview(reader.result);
        reader.readAsDataURL(file);
        setErrors((err) => ({...err, photo : ""}))
    }

    const handleSubmit = async () => {
        const errs = {};
        if(!form.signed_by.trim()) errs.signed_by = "Required"
        if(!photo) errs.photo = "Delivery Photo is required";
        setErrors(errs)
        if(Object.keys(errs).length > 0) return;
        setSubmitting(true);

        try{
            const fd = new FormData();
            fd.append("signed_by", form.signed_by);
            fd.append("delivery_photo", photo);
            fd.append("notes", form.notes);
            if (form.latitude) fd.append("latitude", form.latitude);
            if(form.longitude) fd.append("longitude", form.longitude);

            await api.post(`/drivers/shipments/${shipment.id}/pod/`, fd, {
                headers : {"Content-Type" : "multipart/form-data"},
            });
            showToast("success", "Proof of delivery submitted!")
            onSucess();
        }catch (err){
            showToast("error", err.response?.data?.detail ?? 'Submission failed.');
        } finally{
            setSubmitting(false);
        }
    };
    return(
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-100 py-3 flex items-center gap-3 sticky top-0 z-10">
                <button
                    onClick={onBack}
                    className="p-1.5 rounded-lg hover:bg-gray-100"
                >
                    <LuChevronLeft size={20} className="text-gray-600" />
                </button>
                <div className="flex">
                    <p className="text-xs text-gray-400">Proof of Delivery</p>
                    <p className="font-bold text-gray-800 text-sm">{shipment.shipment_code}</p>
                </div>
                <StatusBadge  status={shipment.status}/>
            </div>
            <div className="p-4 space-y-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5">
                        Signed By <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text"
                        value={form.signed_by}
                        onChange={(e) => {
                            setForm((f) => ({...f, signed_by: e.target.value}))
                            setErrors((err) => ({...err, signed_by : ""}))
                        }}
                        placeholder="Receiver's full name"
                        className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${
                            errors.signed_by ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-emerald-200"
                        }`}
                    
                    />
                    {errors.signed_by && (
                        <p className="text-red-500 text-xs mt-1">{errors.signed_by}</p>
                    )}
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5">
                        Delivery Photo <span className="text-red-500">*</span>
                    </label>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
                    {photoPreview ? (
                        <div className="relative">
                            <img src={photoPreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                            <button
                                onClick={() => {setPhoto(null); setPhotoPreview(null);}} 
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                            >
                                <LuX />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => fileRef.current?.click()}
                            className={`w-full h-36 border-2 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 transition ${
                                errors.photo ? "border-red-300" : "border-gray-200 hover:border-emerald-200"
                            }`}
                        >
                            <LuCamera size={24} className="text-gray-300" />
                            <p className="text-sm text-gray-400">Upload / Take Photo</p>
                        </button>
                    )}
                    {errors.photo && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.photo}
                        </p>
                    )}
                </div>
                <div
                    className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3"
                >
                    <LuNavigation size={14} className={form.latitude ? "text-emerald-400" : "text-gray-300"} />
                    <p className="text-xs text-gray-500">
                        {form.latitude ? `Location captured: ${form.latitude}, ${form.longitude}` : 'Capturing location...'}
                    </p>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5">
                        Notes <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea 
                        value={form.notes}
                        onChange={(e) => setForm((f) => ({...f, notes: e.target.value}))}
                        rows={3}
                        placeholder="Any delivery notes..."
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-100 resize-none"
                    />
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-4 rounded-2xl text-sm font-bold hover:bg-emerald-700 disabled:opacity-50 transition mt-4"
                >
                    {submitting ? <><LuLoader size={16} className="animate-spin" /> Submitting...</> : <><LuCircleCheck size={16} /> Submit Proof of Delivery</>}
                </button>
            </div>
        </div>
    )
}
function DeliveryDetail({shipmentId, onBack, onRefresh, showToast}){
    const [shipment, setShipment] = useState(null)
    const [loading, setLoading] = useState(true);
    const [acting, setActing] = useState(false)
    const [showPOD, setShowPOD] = useState(false);

    const fetchDetail = useCallback(async () => {
        try{
            const res = await api.get(`/drivers/shipments/${shipmentId}/`);
            setShipment(res.data)
        }catch{
            showToast("error", "Failed to load delivery.");
        } finally{
            setLoading(false);
        }
    }, [shipmentId]);

    useEffect(() => {fetchDetail();}, [fetchDetail]);

    const handleAction = async (action) => {
        setActing(true);
        try{
            await api.post(`/drivers/shipments/${shipmentId}/status/`, { action });
            showToast("success", action === "picked_up" ? "Marked as picked up!" : "Marked as out for delivery!")
            fetchDetail();
            onRefresh();
        }catch(err){
            showToast("error", err.response?.data?.detail ?? "Action failed.");
        }finally{
            setActing(false)
        }
    };

    if(showPOD && shipment){
        return(
            <PODScreen 
                shipment={shipment}
                onBack={() => setShowPOD(false)}
                onSuccess={() => {setShowPOD(false); fetchDetail(); onRefresh(); }}
                showToast={showToast}
            />
        )   
    }

    if(loading){
        return(
            <div className="min-h-screen bg-gray50 flex items-center justify-center">
                <LuLoader size={24} className="animate-spin text-emerald-400" />
            </div>
        );
    }

    if(!shipment) return null;

    const canPickUp = shipment.status === "confirmed" || shipment.status === "processing";
    const canOutForDel = shipment.status === "dispatched";
    const canDeliver = shipment.status === "dispatched" && !shipment.has_pod;
    const isDelivered = shipment.status === "delivered";

    return(
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white border-b border-gray-100 py-3 flex items-center gap-3 sticky top-0 z-10">
                <button
                    onClick={onBack}
                    className="p-1.5 rounded-lg hover:bg-gray-100"
                >
                    <LuChevronLeft size={20} className="text-gray-600" />
                </button>
                <div className="flex">
                    <p className="font-bold text-gray-800">{shipment.shipment_code}</p>
                    <p className="text-xs text-gray-400">{shipment.service}</p>
                </div>
                <StatusBadge  status={shipment.status}/>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col space-y-1.5">
                    <div className="flex items-center space-x-4">
                        <LuUserRound />
                        <span className="font-bold text-emerald-700 tracking-wide mb-2">PICKUP FORM</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LuUserRound />
                        <span className="font-semibold text-gray-800">{shipment.sender_name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LuUserRound />
                        <span className="text-sm text-gray-500 mt-0.5">{shipment.sender_address}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LuUserRound />
                        <span className="text-sm text-gray-500 mt-0.5">{shipment.sender_city}, {shipment.sender_state}</span>
                    </div>
                    <a
                        href={`te:${shipment.sender_phone}`} 
                        className="flex items-center space-x-4">
                        <LuUserRound />
                        <span className="text-sm text-gray-500 mt-0.5">{shipment.sender_phone}</span>
                    </a>
                </div>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col space-y-1.5">
                    <div className="flex items-center space-x-4">
                        <LuUserRound />
                        <span className="font-bold text-emerald-700 tracking-wide mb-2">DELIVER TO</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LuUserRound />
                        <span className="font-semibold text-gray-800">{shipment.receiver_name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LuUserRound />
                        <span className="text-sm text-gray-500 mt-0.5">{shipment.receiver_address}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <LuUserRound />
                        <span className="text-sm text-gray-500 mt-0.5">{shipment.receiver_city}, {shipment.receiver_state}</span>
                    </div>
                    <a
                        href={`te:${shipment.receiver_phone}`} 
                        className="flex items-center space-x-4">
                        <LuUserRound />
                        <span className="text-sm text-gray-500 mt-0.5">{shipment.sender_phone}</span>
                    </a>
                </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex space-x-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center">
                    <LuPackage />
                </div>
                <div className="flex flex-col">
                    <p className="text-xs font-bold text-emerald-800 mb-3">
                        PACKAGE INFO
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <p className="text-gray-500 flex">Service: <span className="text-gray-600 font-semibold">{shipment.service}</span></p>
                            <p className="text-gray-500 flex">Weight: <span className="text-gray-600 font-semibold">{shipment.weight_kg} kg</span></p>

                        </div>
                        {shipment.is_fragile && (
                            <div className="bg-red-100 px-3 py-1.5 rounded-xl text-red-600 font-bold flex items-center space-x-1.5">
                                <LuTriangleAlert size={11} /> <span>FRAGILE</span>
                            </div>
                        )}
                    </div>
                    {shipment.description && (
                        <span className="text-xs bg-gray-100 px-3 py-1.5 rounded-full text-gray-600">
                            {shipment.description}
                        </span>
                    )}
                </div>  
            </div>

            <div className="bg-white reounded-2xl p-4 shadow-sm border border-gray-100">
                <p className="text-xs font-bold text-gray-400 mb-4">
                    DelIVERY PROGRESS
                </p>
                <TrackingProgress status={shipment.status} />

            </div>
            {isDelivered && (
                <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-400 text-center">
                    <LuCircleCheck size={32} className="text-emerald-600 mx-auto mb-2" />
                    <p className="font-bold text-emerald-800"> Delivered Successfully!</p>
                    <p className="text-xs text-emerald-600 mt-1">Proof of delivery  has been submitted.</p>
                </div>
            )}
            {!isDelivered && (
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 space-y-2">
                    {canPickUp && (
                        <button
                            onClick={() => handleAction("picked_up")}
                            disabled={acting}
                            className="w-full flex items-center justify-center bg-emerald-400 text-white py-3.5 rounded-2xl text-sm font-bold hover:bg-emerald-600 disabled:opacity-50 transition"
                        >
                            {acting ? <LuLoader size={15} className="animate-spin" /> : <LuPackage size={15} />}
                            Mark as Picked Up
                        </button>
                    )}
                    {canOutForDel && (
                        <button
                            onClick={() => handleAction("out_for_delivery")}
                            disabled={acting}
                            className="w-full flex items-center justify-center bg-orange-500 
                            text-white py-3.5 rounded-2xl text-sm font-bold hover:bg-orange-600 disabled:opacity-50 transition"
                        >
                            {acting ? <LuLoader size={15} className="animate-spin" /> : <LuMapPin size={15} />}
                            Mark Out for Delivery
                        </button>
                    )}

                    {canDeliver && (
                        <button
                            // onClick={() }
                            className="w-full flex items-center justify-center bg-emerald-700
                            text-white py-3.5 rounded-2xl text-sm font-bold hover:bg-emerald-800 transition"
                        >
                            <LuCircleCheck size={15} /> Complete Delivery
                        </button>
                    )}
                </div>
            )}
        </div>

    )
}

export default function Driver_Deliveries(){
    const [deliveries, setDeliveries] = useState([]);
    const [detailId, setDetailId] = useState(null);
    const [deliveryTab, setDeliveryTab] = useState("all");
    const [deliveryLoading, setDeliveryLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [tab, setTab] = useState("home");
    
    const fetchDeliveries = useCallback(async () => {
        setDeliveryLoading(true);
        try{
            const res = await api.get(`/drivers/shipments/?tab=${deliveryTab}`);
            setDeliveries(res.data);
        }catch{}
        setDeliveryLoading(false);
    }, [deliveryTab]);

    useEffect(() => {
        if(tab === 'deliveries') fetchDeliveries();
    }, [tab, fetchDeliveries])


    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    };

    if (detailId){
        return(
            <>
                <Toast toast={toast} />
                <DeliveryDetail 
                    shipmentId={detailId}
                    onBack={() => setDetailId(null)}
                    onRefresh={fetchDeliveries}
                    showToast={showToast}
                />
                
            </>
        )
    }
    
    return(
        <>
            <div className='w-full flex flex-col space-y-4'>
                <div className='w-auto flex flex-col space-y-1'>
                    <h3 className='font-bold text-2xl text-[#1e293b]'>My Deliveries</h3>
                    <p className='text-[13px] text-[#94a3b8]'>View your delivery history and current activities.</p>
                </div>
                {/* {tab === 'deliveries' && ( */}
                    <div className="w-full flex flex-col md:flex-row items-center justify-between">
                        <div className="w-full flex space-x-3 bg-gray-100 rounded-xl md:p-2 space-y-3 md:space-y-0">
                            {[
                                {label : "All", value : "all"},
                                {label : "Active", value : "active"},
                                {label : "Completed", value : "completed"},
                            ].map((del) => (
                                <button
                                    key={del.value}
                                    onClick={() => setDeliveryTab(del.value)}
                                    className={`cursor-pointer px-5 py-2 rounded-lg text-xs font-semibold transition ${
                                        deliveryTab === del.value ? "bg-[#14B8A6] text-white shadow-sm" : "bg-white text-gray-500"
                                    }`}
                                >
                                    {del.label}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <LuSearch  className="absolute w-4 h-4 text-slate-400 left-3 top-1/2 -translate-y-1/2"/>
                            <input type="text" placeholder="Search by tracking number..." className="w-90 md:w-120 py-2.5 px-8 text-sm text-slate-600 rounded-xl bg-gray-200/50 border-none outline-none"/>
                        </div>
                    </div>
                    
                {/* )}   */}
                {deliveryLoading ? (
                    <div className="space-y-3">
                        {Array(4).fill(0).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-4 animate-pulse h-28" />
                        ))}
                    </div>
                ): deliveries.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center border border-gray-100">
                        <LuPackage size={32} className="text-gray-200 mx-auto mb-2" />
                        <p className="text-sm text-gray-400">No deliveries found</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {deliveries.map((dlv) => {
                            const isDelivered = dlv.status === 'delivered';
                            return(
                                <div
                                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform cursor-pointer flex items-center justify-between"
                                    // onClick={() => }
                                >
                                    <div className="flex space-x-2.5">
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-[#14B8A6] text-white">
                                            <LuPackage />
                                        </div>
                                        <div className="flex flex-col">
                                            <p className="font-bold text-gray-800 text-sm">{dlv.shipment_code}</p>
                                            <p className="font-semibold text-gray-900">{dlv.receiver_name}</p>
                                            <p className="text-sm text-gray-500 mt-0.5 truncate">{dlv.receiver_address}</p>
                                            <p className="text-xs text-gray-400 mt-0.5 flex space-x-1"><LuMapPin className="w-4 h-4" /> <span>{dlv.receiver_city}, {dlv.receiver_state}</span></p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-4">
                                        <StatusBadge status={dlv.status} />
                                        <LuChevronRight />
                                    </div>
                                </div>
                                
                            )
                        })}
                    </div>
                )}
            </div>
        </>
    )
}