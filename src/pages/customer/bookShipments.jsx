import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { LuChevronLeft, LuChevronRight, LuCircleAlert, LuCircleCheck, LuLoader } from "react-icons/lu";
import { buttonHover } from "../../effects/motions";
import { motion } from 'framer-motion'


const NG_STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
  "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
  "Yobe","Zamfara",
];
function Field({label, error, children }){
    return(
        <div>
            <label className="text-sm font-medium text-gray-700 mb-2.5">{label}</label>
            {children}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    )
}
function Input({error, ...props}){
    return(
        <input {...props} className={`w-full px-4 mt-1 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition ${error ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-[#0F172A]/30 focus:border-[#0F172A]"} bg-white`} />
    );
}

function Select({error, children, ...props}){
    return (
        <select {...props} className={`w-full px-4 py-2.5 rounded-xl text-sm border focus:outline-none focus:ring-2 transition bg-white ${error ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-[#0F172A]/30 focus:border-[#0F172A]"}`}>
            {children}
        </select>
    )
}
const STEPS = ["Sender", "Receiver", "Package", "Review"];

function StepIndicator({ current }){
    return(
        <div className="flex items-center gap-0 mb-8 w-[95%]">
            {STEPS.map((label, idx) => {
                const step = idx + 1;
                const done = step < current;
                const active = step === current;
                return (
                    <div key={label} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${done ? "bg-[#14B8A6] border-[#14B8A6] text-white" : active ? "bg-[#14B8A6] border-[#14B8A6] text-white" : "bg-white border-gray-200 text-gray-400"}`}
                            >
                                {done ? <LuCircleCheck size={16} /> : step}

                            </div>
                            <span className={`text-xs mt-1 font-medium ${active ? "text-[#14B8A6]" : done ? "text-[#14B8A6]" : "text-gray-400"}`}>
                                {label}
                            </span>
                        </div>
                        {idx < STEPS.length - 1 && (
                            <div className={`flex-1 h-0.5 mb-4 mx-1 ${done ? "bg-[#14B8A6]" : "bg-gray-200"}`}>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

function PriceBreakdown({rate, loading}) {
    if(loading){
        return(
            <div className="bg-[#14B8A6] rounded-xl p-4 animte-pulse space-y-2">
                {Array(4).fill(0).map((_,i) => <div key={i} className="h-3 bg-[#14B8A6]/12 rounded w-3/4" />)}
            </div>
        );
    }
    if(!rate) return null;
    return(
        <div className="bg-[#14B8A6]/10 rounded-xl p-4 space-y-2 text-sm">
            <h4 className="font-semibold text-[#14B8A6] mb-3">Price Breakdown</h4>
            {[
                ["Base price", rate.base_price],
                ["Weight charge", rate.weight_charge],
                ["Distance charge", rate.distance_charge],
                ["Insurance (1%)", rate.insurance_fee]
            ].map(([label, val]) => (
                <div key={label} className="flex justify-between text-[#14B8A6]">
                    <span>{label}</span>
                    <span>₦{Number(val).toLocaleString("en-NG")}</span>
                </div>
            ))}
            <div className="border-t border-[#14B8A6]/50 pt-2 mt-2 flex justify-between font-bold text-blue-[#14B8A6]">
                <span>Total</span>
                <span>₦{Number(rate.total).toLocaleString("en-NG")}</span>
            </div>
            <p className="text-xs text-[#14B8A6] mt-1">{rate.estimated_days}</p>
        </div>
    );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-50 text-sm last:border-0">
      <span className="text-gray-400">{label}</span>
      <span className="text-gray-800 font-medium text-right max-w-[55%]">{value || "—"}</span>
    </div>
  );
}

export default function Book_Shipments(){
    const { user } = useAuth;
    const navigate = useNavigate()
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        sender_name : "", 
        sender_phone : "", 
        sender_address : "", 
        sender_city : "", 
        sender_state : "", 
        receiver_name : "", 
        receiver_phone : "",
        receiver_address : "", 
        receiver_city : "", 
        receiver_state : "", 
        service_type_id : "", 
        weight_kg : "",
        length_cm : "", 
        width_cm : "",  
        height_cm : "", 
        description : "", 
        is_fragile: false, 
        declared_value : "", 
        distance_km: "", 
        payment_method: "online"
    })
    const [errors, setErrors] = useState({})
    const [services, setServices] = useState([])
    const [rate, setRate] = useState(null)
    const [rateLoading, setRateLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState("");
    const [success, setSuccess] = useState(null);
    useEffect(() => {
        if(user) {
            setForm((f) => ({...f, sender_name: user.full_name ?? "", sender_phone : user.phone ?? ""}))
        }
    }, []);
    useEffect(() => {
        api.get("/shipments/services/")
        .then((res) => setServices(res.data.results ?? res.data))
        .catch(() => {});
    }, []);

    useEffect(() => {
        const { service_type_id, weight_kg, distance_km, declared_value} = form;
        if (!service_type_id || !weight_kg || !distance_km){
            setRate(null);
            return;
        }
        const timer = setTimeout(async () => {
            setRateLoading(true);
            try{
                const res = await api.post("/shipments/rate/", { 
                    service_type_id, 
                    weight_kg: parseFloat(weight_kg), 
                    distance_km: parseFloat(distance_km),
                    declared_value: parseFloat(declared_value || 0),
                });
                setRate(res.data);
            } catch{
                setRate(null);
            } finally{
                setRateLoading(false);
            }
        }, 600);
        return () => clearTimeout(timer);
    }, [form.service_type_id, form.weight_kg, form.distance_km, form.declared_value]);

    const set = (key, value) => {
        setForm((f) => ({...f, [key]: value}));
        setErrors((e) => ({...e, [key]: ""}));
    };
    const validate = () => {
        const errs = {};
        if(step === 1){
            if (!form.sender_name) errs.sender_name = "Required";
            if (!form.sender_phone) errs.sender_phone = "Required";
            if (!form.sender_address) errs.sender_address = "Required";
            if (!form.sender_city) errs.sender_city = "Required";
            if (!form.sender_state) errs.sender_state = "Required";
        }
        if(step === 2){
            if(!form.receiver_name) errs.receiver_name = "Required";
            if(!form.receiver_phone) errs.receiver_phone = "Required";
            if(!form.receiver_address) errs.receiver_address = "Required";
            if(!form.receiver_city) errs.receiver_city = "Required";
            if(!form.receiver_state) errs.receiver_state = "Required";

        }
        if (step === 3){
            if(!form.service_type_id) errs.service_type_id = "Select a service";
            if(!form.weight_kg) errs.weight_kg = "Required";
            if(!form.distance_km) errs.distance_km = "Required";
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };
    const next = () => { if (validate()) setStep((s) => s + 1);};
    const back = () => setStep((s) => s - 1);

    const submit = async () => {
        setSubmitting(true)
        setSubmitError("");
        try{
            const payload = {
                ...form,
                weight_kg: parseFloat(form.weight_kg),
                length_cm: parseFloat(form.length_cm || 0),
                width_cm: parseFloat(form.width_cm || 0),
                height_cm: parseFloat(form.height_cm || 0),
                declared_value: parseFloat(form.declared_value || 0),
                distance_km: parseFloat(form.distance_km),
            };
            const res = await api.post("/shipments/", payload);
            setSuccess(res.data);

            if (form.payment_method === "online"){
                const payRes = await api.post("/payments/initiate/", { shipment_id: res.data.id});
                window.location.href = payRes.data.authorization_url;
            }
        } catch(err){
            setSubmitError(
                err.response?.data?.detail ?? Object.values(err.response?.data ?? {})[0]?.[0] ??
                "Something went wrong. Please try again."
            )
        } finally{
            setSubmitting(false);
        }
    }

    if (success) {
        return (
          <div className="max-w-md mx-auto text-center py-20">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <LuCircleCheck size={36} className="text-green-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Shipment Booked!</h2>
            <p className="text-gray-500 text-sm mb-1">Your shipment code is</p>
            <p className="text-2xl font-bold text-blue-600 mb-6">{success.shipment_code}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate("/dashboard/shipments")}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
              >
                View My Shipments
              </button>
              <button
                onClick={() => { setSuccess(null); setStep(1); setForm({ sender_name: user?.full_name ?? "", sender_phone: user?.phone ?? "", sender_address: "", sender_city: "", sender_state: "", receiver_name: "", receiver_phone: "", receiver_address: "", receiver_city: "", receiver_state: "", service_type_id: "", weight_kg: "", length_cm: "", width_cm: "", height_cm: "", description: "", is_fragile: false, declared_value: "", distance_km: "", payment_method: "online" }); }}
                className="px-5 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
              >
                Book Another
              </button>
            </div>
          </div>
        );
      }
    
    return(
        <>
            <div className="mx-auto">
                <div className="mb-6">
                    <h1 className="text-xl font-bold text-gray-900">Book Shipment</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Fill in the details to book a new shipment.</p>
                </div>

                <StepIndicator current={step} />
                <div className="w-[95%] bg-white rounded-2xl shadow-sm border border-gray-100 p-5 border">
                    {step === 1 && (
                        <div className="space-y-5">
                            <h2 className="font-semibold text-gray-800">Sender Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Full Name" error={errors.sender_name}>
                                    <Input 
                                        value={form.sender_name} 
                                        onChange={(e) => set('sender_name', e.target.value)} 
                                        placeholder="Your full name"
                                        error={errors.sender_name} 
                                    />
                                </Field>
                                <Field label="Phone" error={errors.sender_phone}>
                                    <Input 
                                        value={form.sender_phone} 
                                        onChange={(e) => set('sender_phone', e.target.value)} 
                                        placeholder="+234 800 000 0000"
                                        error={errors.sender_phone} 
                                    />
                                </Field>
                                <Field label="Address" error={errors.sender_address}>
                                    <Input 
                                        value={form.sender_address} 
                                        onChange={(e) => set('sender_address', e.target.value)} 
                                        placeholder="Street address"
                                        error={errors.sender_address} 
                                    />
                                </Field>
                                <Field label="City" error={errors.sender_city}>
                                    <Input 
                                        value={form.sender_city} 
                                        onChange={(e) => set('sender_city', e.target.value)} 
                                        placeholder="City"
                                        error={errors.sender_city} 
                                    />
                                </Field>
                                <Field label="State" error={errors.sender_state}>
                                    <Select
                                        value={form.sender_state} 
                                        onChange={(e) => set('sender_state', e.target.value)} 
                                        error={errors.sender_state}
                                    
                                    >
                                        <option value="">Select state</option>
                                        {NG_STATES.map((s) => <option key={s}>{s}</option>)}
                                    </Select>
                                </Field>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="space-y-5">
                            <h2 className="font-semibold text-gray-800">Receiver Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Field label="Full Name" error={errors.receiver_name}>
                                    <Input 
                                        value={form.receiver_name} 
                                        onChange={(e) => set('receiver_name', e.target.value)} 
                                        placeholder="Receiver's full name"
                                        error={errors.receiver_name} 
                                    />
                                </Field>
                                <Field label="Phone" error={errors.receiver_phone}>
                                    <Input 
                                        value={form.receiver_phone} 
                                        onChange={(e) => set('receiver_phone', e.target.value)} 
                                        placeholder="+234 800 000 0000"
                                        error={errors.receiver_phone} 
                                    />
                                </Field>
                                <Field label="Address" error={errors.receiver_address}>
                                    <Input 
                                        value={form.receiver_address} 
                                        onChange={(e) => set('receiver_address', e.target.value)} 
                                        placeholder="Delivery address"
                                        error={errors.receiver_address} 
                                    />
                                </Field>
                                <Field label="City" error={errors.receiver_city}>
                                    <Input 
                                        value={form.receiver_city} 
                                        onChange={(e) => set('receiver_city', e.target.value)} 
                                        placeholder="City"
                                        error={errors.receiver_city} 
                                    />
                                </Field>
                                <Field label="State" error={errors.receiver_state}>
                                    <Select
                                        value={form.receiver_state} 
                                        onChange={(e) => set('receiver_state', e.target.value)} 
                                        error={errors.receiver_state}
                                    
                                    >
                                        <option value="">Select state</option>
                                        {NG_STATES.map((s) => <option key={s}>{s}</option>)}
                                    </Select>
                                </Field>    
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="space-y-5">
                            <h2 className="font-semibold text-gray-800">Package Details</h2>
                            <Field label="Service Type" error={errors.service_type_id}>
                                <Select
                                    value={form.service_type_id} 
                                    onChange={(e) => set('service_type_id', e.target.value)} 
                                    error={errors.service_type_id}
                                
                                >
                                    <option value="">Select service</option>
                                    {services.map((s) => 
                                        <option key={s.id} value={s.id}>{s.name} - ₦{Number(s.base_price).toLocaleString("en-NG")} base ({s.estimated_days_min}-{s.estimated_days_max} days)
                                        </option>
                                    )}
                                </Select>
                            </Field>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Weight (kg)" error={errors.weight_kg}>
                                    <Input 
                                        type="number" min="0.1" step="0.1"
                                        value={form.weight_kg} 
                                        onChange={(e) => set('weight_kg', e.target.value)} 
                                        placeholder="e.g. 2.5"
                                        error={errors.weight_kg} 
                                    />
                                </Field>
                                <Field label="Distance (km)" error={errors.distance_km}>
                                    <Input 
                                        type="number" min="0"
                                        value={form.distance_km} 
                                        onChange={(e) => set('distance_km', e.target.value)} 
                                        placeholder="Approx. distance"
                                        error={errors.distance_km}
                                    />
                                </Field>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-gray-700 mb-1.5">Dimensions (cm) optional</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {["length_cm", "width_cm", "height_cm"].map((key, i) => (
                                        <Input
                                        key={key} 
                                        type="number" min="0"
                                        value={form[key]} 
                                        onChange={(e) => set(key, e.target.value)} 
                                        placeholder={["L", "W", "H"][i]}
                                        />  
                                    ))}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <Field label="Package Description">
                                    <Input 
                                        value={form.description} 
                                        onChange={(e) => set('description', e.target.value)} 
                                        placeholder="e.g. Electronics, Clothing"
                                    />
                                </Field>
                                <Field label="Declared Value (₦)">
                                    <Input
                                        type="number" min="0"
                                        value={form.declared_value} 
                                        onChange={(e) => set('declared_value', e.target.value)} 
                                        placeholder="Item value for insurance"
                                    />
                                </Field>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer w-fit">
                                <div
                                    onClick={() => set("is_fragile", !form.is_fragile)}
                                    className={`w-11 h-6 rounded-full transition-colors relative ${form.is_fragile ? "bg-[#14B8A6]" : "bg-gray-200"}`}
                                >
                                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${form.is_fragile ? "left-5" : "left-0.5"}`} />
                                </div>
                                <span className="text-sm text-gray-700 font-medium">Fragile item handle with care</span>
                            </label>

                            <Field label="Payment Method">
                                <div className="grid grid-cols-3 gap-3 mt-1.5">
                                    {[
                                        {value : "online", label:"Online (Card)"},
                                        {value : "wallet", label: "Wallet"},
                                        {value : "cod", label : "Cash on Delivery"},
                                    ].map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => set("payment_method", opt.value)}
                                            className={`py-2.5 px-3 rounded-xl cursor-pointer border text-sm font-medium transition ${form.payment_method === opt.value ? "border-[#14B8A6] bg-[#14B8A6] text-white" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                                        >
                                            {opt.label}
                                        </button>
                                    ))}
                                </div>
                            </Field>
                            <PriceBreakdown rate={rate} loading={rateLoading} />
                            
                        </div>
                    )}
                    {step === 4 &&(
                        <div className="space-y-6">
                            <h2 className="font-semibold text-gray-800">Review & Confirm</h2>
                
                            {/* Sender */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Sender</h3>
                                <ReviewRow label="Name"    value={form.sender_name} />
                                <ReviewRow label="Phone"   value={form.sender_phone} />
                                <ReviewRow label="Address" value={`${form.sender_address}, ${form.sender_city}, ${form.sender_state}`} />
                            </div>
                
                            {/* Receiver */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Receiver</h3>
                                <ReviewRow label="Name"    value={form.receiver_name} />
                                <ReviewRow label="Phone"   value={form.receiver_phone} />
                                <ReviewRow label="Address" value={`${form.receiver_address}, ${form.receiver_city}, ${form.receiver_state}`} />
                            </div>
                
                            {/* Package */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Package</h3>
                                <ReviewRow label="Service"     value={services.find((s) => String(s.id) === String(form.service_type_id))?.name} />
                                <ReviewRow label="Weight"      value={`${form.weight_kg} kg`} />
                                <ReviewRow label="Distance"    value={`${form.distance_km} km`} />
                                <ReviewRow label="Description" value={form.description} />
                                <ReviewRow label="Fragile"     value={form.is_fragile ? "Yes" : "No"} />
                                <ReviewRow label="Payment"     value={{ online: "Online (Card)", wallet: "Wallet", cod: "Cash on Delivery" }[form.payment_method]} />
                            </div>
                
                            {/* Price summary */}
                            {rate && (
                                <div className="bg-[#14B8A6] rounded-xl p-4 text-white">
                                <div className="flex justify-between text-sm mb-1 opacity-80">
                                    <span>Subtotal</span>
                                    <span>₦{Number(rate.base_price + rate.weight_charge + rate.distance_charge).toLocaleString("en-NG")}</span>
                                </div>
                                <div className="flex justify-between text-sm mb-3 opacity-80">
                                    <span>Insurance</span>
                                    <span>₦{Number(rate.insurance_fee).toLocaleString("en-NG")}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>₦{Number(rate.total).toLocaleString("en-NG")}</span>
                                </div>
                                <p className="text-xs opacity-70 mt-1">{rate.estimated_days}</p>
                                </div>
                            )}
                
                            {/* Error */}
                            {submitError && (
                                <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm">
                                <LuCircleAlert size={15} />
                                {submitError}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                        <motion.button
                            {...buttonHover}
                            onClick={back}
                            disabled={step === 1}
                            className="cursor-pointer flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-gray-400 text-sm font-semibold text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <LuChevronLeft size={18} /> Back
                        </motion.button>
                        {step < 4 ? (
                            <motion.button
                                {...buttonHover}
                                onClick={next}
                                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#14B8A6] text-white text-sm font-semibold transition cursor-pointer"
                            >
                                Continue <LuChevronRight  size={18}/>
                            </motion.button>
                        ) : (
                            <motion.button
                                {...buttonHover}
                                onClick={submit}
                                disabled={submitting}
                                className="flex items-center gap-2 cursor-pointer px-6 py-2.5 rounded-xl bg-[#14B8A6] text-white text-sm font-semibold hover:green-400 disabled:opacity-60"
                            >
                                {submitting ? (
                                    <>
                                        <LuLoader size={15} className="animte-spin" /> Processing...
                                    </>
                                ) : (
                                    <><LuCircleCheck size={15} /> Confirm Booking</>
                                )}

                            </motion.button>
                        )}
                    </div>
                </div>
            </div>  
        </>
    )
}