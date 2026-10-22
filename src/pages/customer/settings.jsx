import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext"
import api from "../../api/axios";
import { LuCamera, LuCircleAlert, LuCircleCheck, LuEye, LuEyeOff, LuLoader, LuLock, LuSave, LuUser } from "react-icons/lu";
import { motion } from 'framer-motion'
import { buttonHover } from "../../effects/motions";

function Toast({ toast }){
    if(!toast) return null;
    return(
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all
            ${toast.type === "success" ? "bg-[#14B8A6] text-white" : "bg-red-600 text-white"}
        `}>
            {toast.type === "success" ? <LuCircleCheck  size={15}/> : <LuCircleAlert size={15} />}
            {toast.message}
        </div>
    )
}

function Section({title, icon:Icon, children}){
    return(
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
                <div className="w-8 h-8 bg-[#14B8A6]/30 rounded-lg flex items-center justify-center">
                    <Icon size={16} className="text-[#14B8A6]" />
                </div>
                <h2 className="font-semibold text-gray-800">
                    {title}
                </h2>

            </div>
            <div className="px-6 py-5">{children}</div>
        </div>
    )
}

function Field({ label, error, children}){
    return(
        <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5">
                {label}
            </label>
            {children}
            {error && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <LuCircleAlert size={11} />
                </p>
            )}
        </div>
    )
}
function Input({error, ...props}){
    return(
        <input 
            {...props}
            className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition
                ${error ? "border-red-300 focus:ring-red-100" : "border-gray-200 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"}
                ${props.disabled ? "bg-gray-50 text-gray-400 cursor-not-allowed" : "bg-white"}`}
        />
    )
}

function PasswordInput({value, onChange, placeholder, error}){
    const [show, setShow] = useState(false)
    return(
        <div className="relative">
            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-2.5 pr-11 rounded-xl border text-sm focus:outline-none focus:ring-2
                    transition ${error ? "border-red-300 focus:ring-red-100" : 
                        "border-gray-200 focus:ring-[#14B8A6]/30 focus:border-[#14B8A6]"}`}
            />
            <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                hover:text-gray-600 transition"
            >
                {show ?  <LuEyeOff size={16} /> : <LuEye size={16} />}
            </button>
        </div>
    )
}
export default function Settings(){
    const { user, setUser} = useAuth();
    const fileInputRef = useRef(null);

    const [toast, setToast] = useState(null);

    const showToast = ( type, message) => {
        setToast({ type, message});
        setTimeout(() => setToast(null), 4000);
    }

    const [profile, setProfile] = useState({
        full_name : "",
        phone : ""
    })
    const [profileErrors, setProfileErrors] = useState({})
    const [profileSaving, setProfileSaving] = useState(false)
    const [avatarUploading, setAvatarUploading] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState(null)

    useEffect(() => {
        if(user){
            setProfile({
                full_name : user.full_name ?? "",
                phone : user.phone ?? ""
            });
            if (user.avatar) setAvatarPreview(user.avatar);
        }
    }, [user]);

    const handleProfileSave = async () => {
        const errs = {};
        if(!profile.full_name.trim()) errs.full_name = "Name is required.";
        setProfileErrors(errs)
        if(Object.keys(errs).length > 0) return;

        setProfileSaving(true);

        try{
            const res = await api.patch("/accounts/auth/profile/", profile);
            setUser((u) => ({...u, ...res.data}));
            showToast("success", "Profile updated successfully.");

        } catch (err){
            showToast("error", err.response?.data?.detail ?? 
                Object.values(err.response?.data ?? {}) [0]?.[0] ?? "Failed to update profile."
            )
        } finally{
            setProfileSaving(false)
        }
    };
    const handleAvatarChange = async (e) => {
        const file = e.target.files?.[0];
        if(!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setAvatarPreview(reader.result);
        reader.readAsDataURL(file)
        const formData = new FormData();
        formData.append("avatar", file);

        setAvatarUploading(true)

        try{
            const res = await api.post("/accounts/auth/avatar/", formData, {
                headers: {"Content-Type" : "multipart/form-data"},
            });
            setUser((u) => ({...u, avatar : res.data.avatar}));
            setAvatarPreview(res.data.avatar)
            showToast("success", "Profile photo updated.")
        } catch (err){
            showToast("error", err.response?.data?.detail ?? "Failed to upload photo")
        } finally{
            setAvatarUploading(false);
        }
    };

    const [passwords, setPasswords] = useState({
        old_password : "",
        new_password : "",
        confirm_password : ""
    })
    const [pwErrors, setPwErrors] = useState({})
    const [pwSaving, setPwSaving] = useState(false)

    const setpw = (key, val) => {
        setPasswords((p) => ({...p, [key] : val }));
        setPwErrors((e) => ({...e, [key]: ""}));
    }
    const handlePasswordSave = async () => {
        const errs = {};
        if(!passwords.old_password)
            errs.old_password = "Current password is required.";
        if(!passwords.new_password)
            errs.new_password = "New password is required."
        else if(passwords.new_password.length < 8)
            errs.new_password = "Password must be atleast 8 characters"
        if(passwords.new_password !== passwords.confirm_password)
            errs.confirm_password = "Passwords do not match.";

        setPwErrors(errs);
        if(Object.keys(errs).length > 0) return;

        setPwSaving(true);
        try{
            await api.post('/accounts/auth/change-password/', {
                old_password : passwords.old_password,
                new_password : passwords.new_password,
            });
            setPasswords({ old_password : "", new_password : "", confirm_password: ""});
            showToast("success", "Password changed successfully")
        } catch (err){
            const data = err.response?.data;
            if(data?.old_password){
                setPwErrors((e) => ({...e, old_password : data.old_password[0]}));
            } else if (data?.new_password){
                setPwErrors((e) => ({...e, new_password: data.new_password[0]}))
            } else{
                showToast("error", data?.detail ?? "Failed to change password.")
            }
        } finally{
            setPwSaving(false);
        }
    };

    const initials = user?.full_name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) ?? "U";
    return(
        <div className="space-y-5">
            <Toast toast={toast} />
            <div>
                <h1 className="text-xl font-bold text-gray-900">Profile & Settings</h1>
                <p className="text-sm text-gray-400 mt-0.5">Manage your personal information and account security</p>
            </div>
            <Section title="Personal Information" icon={LuUser}>
                <div className="space-y-5">
                    <div className="flex items-center gap-5">
                        <div className="relative">
                            {avatarPreview ? (
                                <img src={avatarPreview} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-gray-100" />
                            ) : (
                                <div className="w-20 h-20 rounded-full bg-[#14B8A6] flex items-center justify-center border-2 border-gray-100">
                                    <span className="text-white text-xl font-bold">
                                        {initials}
                                    </span>
                                </div>
                            )}
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={avatarUploading}
                                className="cursor-pointer absolute bottom-0 right-0 w-7 h-7 bg-[#14B8A6] rounded-full
                                flex items-center justify-center border-2 border-white transition disabled:opacity-60"
                            >
                                {avatarUploading ? <LuLoader size={12} className="text-white animate-spin" /> : <LuCamera size={12} className="text-white" />}
                            </button>
                            <input 
                                ref={fileInputRef}
                                type="file" 
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </div>
                        <div>
                            <p className="font-semibold text-gray-800">
                                {user?.full_name}
                            </p>
                            <p>
                                <a href={`mailto:${user?.email}`} className="text-sm text-gray-400 hover:text-[#14B8A6] transition">
                                    {user?.email}
                                </a>
                            </p>
                            

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled = {avatarUploading}
                                className="cursor-pointer text-xs text-[#14B8A6] mt-1 hover:underline disabled:opacity-50"
                            >
                                {avatarUploading ? "Uploading..." : "Change photo"}
                            </button>
                            
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Field label="Full Name" error={profileErrors.full_name}>
                            <Input 
                                value={profile.full_name}
                                onChange={(e) => 
                                    { setProfile((p) => ({...p, full_name: e.target.value}));
                                    setProfileErrors((e) => ({...e, full_name: ""}))
                                }}
                                placeholder="Your full name"
                                error={profileErrors.full_name}
                            />
                        </Field>
                        <Field label="Phone Number">
                            <Input 
                                value={profile.phone}
                                onChange={(e) => 
                                    { setProfile((p) => ({...p, phone: e.target.value}));
                                }}
                                placeholder="+234 800 000 0000"
                            />
                        </Field>
                        <Field label="Email Address">
                            <Input 
                                value={user?.email ?? ""}
                                disabled
                                readOnly
                            />
                            <p className="text-xs text-gray-400 mt-1">
                                Email cannot be changed. Contact support if needed.
                            </p>
                        </Field>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Account type:</span>
                            <span className="px-3 py-1 bg-[#14B8A6]/30 text-[#14B8A6] rounded-full text-xs font-semibold capitalize">
                                {user?.role ?? "Customer"}
                            </span>
                        </div>
                        <motion.button
                            {...buttonHover}
                            onClick={handleProfileSave}
                            disabled={profileSaving}
                            className="cursor-pointer flex items-center justify-center mt-2 gap-2 bg-gray-900 text-white px-6 py-3
                            rounded-xl text-sm font-semibold disabled:opacity-50"
                        >
                            {profileSaving ? <><LuLoader size={14} className="animate-spin" /> Saving...</> : <><LuSave size={14} /> Save Changes</>}
                        </motion.button>
                    </div>
                </div>
            </Section>
            <Section title="Change Password" icon={LuLock}>
                <div className="space-y-4">
                    <Field label="Current Password" error={pwErrors.old_password}>
                        <PasswordInput 
                            value={passwords.old_password}
                            onChange={(e) => setpw("old_password", e.target.value)}
                            placeholder="Enter current password"
                            error={pwErrors.old_password}
                        />
                    </Field>
                    <Field label="New Password" error={pwErrors.new_password}>
                        <PasswordInput 
                            value={passwords.new_password}
                            onChange={(e) => setpw("new_password", e.target.value)}
                            placeholder="At least 8 characters"
                            error={pwErrors.new_password}
                        />
                        {pwErrors.new_password && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <LuCircleAlert size={11}  /> {pwErrors.new_password}
                            </p>
                        )}
                        {passwords.new_password &&(
                            <div className="mt-2 space-y-1">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((level) => {
                                        const strength = (() => {
                                            let s = 0;
                                            if(passwords.new_password.length >=8) s++;
                                            if(/[A-Z]/.test(passwords.new_password)) s++;
                                            if(/[0-9]/.test(passwords.new_password)) s++;
                                            if(/^A-Za-z0-9/.test(passwords.new_password)) s++;
                                            return s
                                        })();
                                        return(
                                            <div
                                                key={level}
                                                className={`h-1 flex-1 rounded-full transition-colors
                                                    ${level <= strength ? strength <= 1 ? "bg-red-400"
                                                        : strength === 2 ? "bg-amber-400"
                                                        : strength === 3 ? "bg-blue-400"
                                                        : "bg-green-500"
                                                        : "bg-gray-200"
                                                    }
                                                `}
                                            />
                                        )
                                    })}
                                </div>
                                <p className="text-xs text-gray-400">
                                    {(() => {
                                        let s = 0;
                                        if(passwords.new_password.length >=8) s++;
                                        if(/[A-Z]/.test(passwords.new_password)) s++;
                                        if(/[0-9]/.test(passwords.new_password)) s++;
                                        if(/[^A-Za-z0-9]/.test(passwords.new_password)) s++;
                                        return ["", "Weak", "Fair", "Good", "Strong"][s];
                                    })}
                                </p>
                            </div>
                        )}
                    </Field>
                    <Field label="Confirm New Password" error={pwErrors.confirm_password}>
                        <PasswordInput 
                            value={passwords.confirm_password}
                            onChange={(e) => setpw("confirm_password", e.target.value)}
                            placeholder="Repeat new password"
                            error={pwErrors.confirm_password}
                        />
                        {pwErrors.confirm_password && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <LuCircleAlert size={11} /> {pwErrors.confirm_password}
                            </p>
                        )}
                        {passwords.confirm_password && passwords.new_password && (
                            <p className={`text-xs mt-1 flex items-center gap-1
                            ${passwords.new_password === passwords.confirm_password ? "text-green-600" : "text-red-500"}
                            `}>
                                {passwords.new_password === passwords.confirm_password ? <><LuCircleCheck size={11} /> Passwords match</> :
                                <><LuCircleAlert size={11} /> Passwords do not match</>}
                            </p>
                        )}
                    </Field>
                    <button
                        onClick={handlePasswordSave}
                        disabled={pwSaving}
                        className="cursor-pointer flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5
                        rounded-xl text-sm font-semibold hover:bg-gray-700 disabled:opacity-50 transition"
                    >
                        {pwSaving ? <><LuLoader size={14} className="animate-spin" /> Updating...</> : 
                        <><LuLock size={14} /> Update Password</>}
                    </button>
                </div>
            </Section>
            <Section title="Account Information" icon={LuUser}>
                <div className="space-y-3 text-sm">
                    {[
                        {label : 'Member since', value :user?.date_joined ?
                            new Date(user.date_joined).toLocaleDateString("en-GB", {
                                day: "numeric", month: "long", year:"numeric"
                            })
                        : "-"},
                        {label : "Wallet balance", value : `₦${Number(user?.wallet_balance ?? 0).toLocaleString("en-GB", {minimumFractionDigits : 2})}`},
                        {label: "Account status", value : `Active`},
                    ].map(({ label, value}) => (
                            <div key={label} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                                <span className="text-gray-400">{label}</span>
                                <span className="font-medium text-gray-800">{value}</span>
                            </div>
                    ))}
                </div>
            </Section>

        </div>
    )
}