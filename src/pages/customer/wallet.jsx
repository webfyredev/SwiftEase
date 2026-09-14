import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"
import { useState } from "react";
import { LuCircleAlert, LuCircleCheck, LuCirclePlus, LuCreditCard, LuLoader, LuTrendingDown, LuTrendingUp, LuX } from "react-icons/lu";
import { useEffect } from "react";
import { useCallback } from "react";



const naira = (val) => `₦${Number(val).toLocaleString("en-NG", {minimumFractionDigits : 2})}`

function TypeBadge({ type }){
    const isCredit = type === "credit";
    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${isCredit ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}
        >
            {isCredit ? "Credit" : "Debit"}
        </span>
    )
}
function SkeletonRow(){
    return(
        <tr className="animte-pulse"
        >
            {Array(5).fill(0).map((_, i) => (
                <td key={i} className="px-5 py-4">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                </td>
            ))}
        </tr>
    )
}

function Modal({title, onClose, children}){
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {document.body.style.overflow = "";};
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-900">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg cursor-pointer hover:bg-gray-100 transition"
                    >
                        <LuX size={17} className="text-gray-500" />
                    </button>
                </div>
                <div className="px-6 py-5">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default function Wallet(){
    const { user, setUser} = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [balance, setBalance] = useState(user?.wallet_balance ?? 0);
    const [unpaid, setUnpaid] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [txnloading, setTxnLoading] = useState(true);
    const [modal, setModal] = useState(null);
    const [topupAmount, setTopupAmount] = useState("")
    const [topuploading, setTopupLoading] = useState(false)
    const [topupError, setTopupError] = useState("")
    const [selectedShipment, setSelectedShipment] = useState("")
    const [payLoading, setPayLoading] = useState(false)
    const [payError, setPayError] = useState("")

    const [toast, setToast] = useState(null);

    const showToast = (type, message) => {
        setToast({type, message});
        setTimeout(() => setToast(null), 4000);
    };

    const fetchData = useCallback(async () => {
        try {
            const [summaryRes, txnRes] = await Promise.all([
                api.get("/payments/wallet/"),
                api.get("/payments/wallet/transactions/"),
            ]);

            setBalance(summaryRes.data.wallet_balance)
            setUnpaid(summaryRes.data.unpaid_shipments);

            const txnData = txnRes.data;
            setTransactions(txnData.results ?? txnData);
        } catch{
            showToast("error", "Failed to load wallet data.")
        } finally{
            setTxnLoading(false)
        }
    },[]);

    useEffect(() => { fetchData(); }, [fetchData])

    useEffect(() => {
        const ref = searchParams.get("ref");
        if(!ref || !ref.startsWith("WLTOPUP-")) return;

        setSearchParams({});

        api.get(`/payments/wallet/topup/verify?reference=${ref}/`)
        .then((res) => {
            setBalance(res.data.new_balance);
            if(setUser) setUser((u) => ({...u, wallet_balance: res.data.new_balance}));
            showToast("success", `Wallet credited with ${naira(res.data.amount_credited)}`)
            fetchData();
        })
        .catch((err) => {
            const msg = err.response?.data?.detail ?? "Could not verify top-up";
            showToast("error", msg);
        })
        
    }, []);

    const handleTopup = async() => {
        setTopupError("");
        const amount = parseFloat(topupAmount)
        if(!amount || amount < 100){
            setTopupError("Minimum top-up amount is ₦100")
            return;
        }
        setTopupLoading(true);
        try{
            const res = await api.post("/payments/wallet/topup/init/", { amount })
            window.location.href = res.data.authorization_url;
        } catch(err){
            setTopupError(err.response?.data?.detail ?? "Could not initiate payment. Try again.");
            setTopupLoading(false)
        }
    }



    const handleWalletPay = async() => {
        setPayError("");
        if(!selectedShipment){
            setPayError("Please select a shipment.");
            return;
        }
        setPayLoading(true);

        try{
            const res = await api.post('/payments/wallet/pay/', {
                shipment_id: selectedShipment,
            });
            setBalance(res.data.new_balance);
            if(setUser) setUser((u) => ({...u, wallet_balance: res.data.new_balance }));
            setModal(null);
            showToast("success", "Shipment paid successfully from wallet.")
            fetchData();
        } catch(err){
            setPayError(
                err.response?.data?.detail ?? "Payment failed. Check your balance."
            );
        } finally{
            setPayLoading(false)
        }
    }
    const selectedShipmentData = unpaid.find((s) => s.id === selectedShipment)


    return(
        <>
            <div className="space-y-6">
                {toast && (
                    <div className={`fixed top-5 right-5
                     z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${toast.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
                        {toast.type === "success" ? <LuCircleCheck size={16} /> : <LuCircleAlert size={16} />}
                        {toast.message}
                    </div>
                )}
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Wallet</h1>
                    <p className="text-sm text-gray-400 mt-0.5">Manage your balance and payments.</p>
                </div>
                <div className="p-5 rounded-xl flex flex-col " style={{background: `radial-gradient(circle at 100% 0%, #14B8A6 0%, transparent 35%  ), linear-gradient(135deg, #0F172A , #134E4A )`}}>
                    <p className="text-gray-200 text-sm my-2">
                        Available Balance
                    </p>
                    <h3 className="text-4xl font-bold text-white mb-5 tracking-right">
                        ₦ {Number(balance).toLocaleString("en-NG", {minimumFractionDigits : 2})}
                    </h3>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => { setModal("topup"); setTopupAmount(""); setTopupError(""); }}    
                            className="flex items-center gap-2 bg-[#14B8A6] text-white px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer  transition"
                        >
                            <LuCirclePlus size={15} /> Top Up
                        </button>
                        <button
                            onClick={() => { setModal("pay"); setSelectedShipment(""); setPayError("");}}
                            disabled = {unpaid.length === 0}
                            className="flex items-center gap-2 border border-white/60 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity:40 disabled:cursor-not-allowed"
                        >
                            <LuCreditCard  size={15}/> Pay for Shipment
                        </button>

                    </div>
                    {unpaid.length === 0 && (
                        <p className="text-[#14B8A6]/50 text-xs mt-3 ">
                            No unpaid shipments at the moment
                        </p>
                    )}
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="font-semibold text-gray-800 text-sm">Transaction History</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-50">
                                    {["Date", "Type", "Description", "Amount", "Balance After"].map((data) => (
                                        <th key={data} className="px-5 py-3.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">
                                            {data}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {txnloading ? (
                                    Array(4).fill(0).map((_, i) => <SkeletonRow key={i} />)
                                ) : transactions.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-16 text-center">
                                            <LuCreditCard size={36} className="text-gray-200 mx-auto mb-3" />
                                            <p className="text-sm text-gray-400 font-medium">
                                                No transactions yet
                                            </p>
                                            <p className="text-xs text-gray-300 mt-1">
                                                Top up your wallet to get started
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    transactions.map((txn) => (
                                        <tr
                                            key={txn.id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td
                                                className="px-5 py-4 text-gray-500 text-xs"
                                            >
                                                {new Date(txn.created_at).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"})}
                                            </td>
                                            <td className="px-5 py-4">
                                                <TypeBadge type={txn.txn_type} />
                                            </td>
                                            <td className="px-5 py-4 text-gray-600 max-w-[260px] truncate">
                                                {txn.description}
                                            </td>
                                            <td className="px-5 py-4 font-semibold">
                                                {txn.txn_type === "credit" ? (
                                                    <span className="text-green-600 flex items-center gap-1">
                                                        <LuTrendingUp  size={13} />+{naira(txn.amount)}
                                                    </span>
                                                ) : (
                                                    <span
                                                        className="text-red-500 flex iems-center gap-1"
                                                    >
                                                        <LuTrendingDown size={13} />-{naira(txn.amount)}
                                                    </span>
                                                )}
                                            </td>
                                            <td
                                                className="px-5 py-4 text-gray-700 font-medium"
                                            >
                                                {naira(txn.balance_after)}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {modal === "topup" && (
                    <Modal title="Top Up Wallet" onClose={() => setModal(null)}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Amount (₦)
                                </label>
                                <input type="number" 
                                    min="100"
                                    value={topupAmount}
                                    onChange={(e) => {
                                        setTopupAmount(e.target.value)
                                        setTopupError("");
                                    }}
                                    placeholder="e.g. 10000"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A]"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {[1000, 5000, 10000, 20000].map((amt) => (
                                    <button
                                        key={amt}
                                        onClick={() => setTopupAmount(String(amt))}
                                        className={`py-2 rounded-lg text-xs font-semibold border cursor-pointer transition ${Number(topupAmount) === amt ? "border-[#14B8A6] bg-[#14B8A6]/20 text-[#14B8A6]" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
                                    >
                                        ₦{(amt / 1000).toFixed(0)}k
                                    </button>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400">
                                You will be redirected to Paystack to complete payment securely.
                            </p>

                            {topupError && (
                                <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">
                                    <LuCircleAlert size={13} />
                                    {topupError}
                                </div>
                            )}
                            <button
                                onClick={handleTopup}
                                disabled={topuploading || !topupAmount}
                                className="w-full flex cursor-pointer items-center justify-center gap-2 bg-[#14B8A6]
                                    text-white py-3 rounded-xl text-sm font-semibold disabled:opacity-50 transition"
                            >
                                {topuploading ? (
                                    <><LuLoader size={15}  className="animate-spin"/> Processing...</>
                                ) : (
                                    "Continue to Paystack"
                                )}
                            </button>
                        </div>
                    </Modal>
                )}
                {modal === "pay" && (
                    <Modal title="Pay for Shipment" onClose={() => setModal(null)}>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Select Unpaid Shipment
                                </label>
                                <select
                                    value={selectedShipment}
                                    onChange={(e) => {
                                        setSelectedShipment(e.target.value);
                                        setPayError("");
                                    }}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A]/50 focus:border-[#0F172A] bg-white"
                                >
                                    <option value="">Choose shipment..</option>
                                    {unpaid.map((s) => (
                                        <option key={s.id} value={s.id}>{s.shipment_code} - {naira(s.total_price)}</option>
                                    ))}

                                </select>
                            </div>
                            {selectedShipmentData && (
                                <div className="bg-gray-50 rounded-xl p-3 text-sm space-y-1">
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Receiver</span>
                                        <span className="font-medium text-gray-700">
                                            {selectedShipmentData.receiver_name}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Destination</span>
                                        <span className="font-medium text-gray-700">
                                            {selectedShipmentData.receiver_city}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-400">Amount</span>
                                        <span className="font-medium text-gray-700">
                                            {naira(selectedShipmentData.total_price)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex justify-between text-sm px-1">
                                <span className="text-gray-400">Wallet Balance</span>
                                <span
                                    className={`font-semibold 
                                        ${selectedShipmentData && Number(balance) < Number(selectedShipmentData.total_price) 
                                        ? "text-red-500" : "text-gray-800"}`}
                                >
                                    {naira(balance)}
                                </span>
                            </div>
                            {selectedShipmentData && 
                                Number(balance) < Number(selectedShipmentData.total_price) && (
                                    <div className="flex items-center gap-2 text-amber-600 text-xs bg-amber-50 rounded-lg px-3 py-2">
                                        <LuCircleAlert size={13} /> Insufficient balance. Please top up your wallet first.
                                    </div>
                            )}
                            {payError && (
                                <div className="flex items-center gap-2 text-red-500 text-xs bg-red-50 rounded-lg px-3 py-2">
                                    <LuCircleAlert size={13} />
                                    {payError}
                                </div>
                            )}

                            <button
                                onClick={handleWalletPay}
                                disabled={
                                    payLoading || 
                                    !selectedShipment || 
                                    (selectedShipmentData && Number(balance) < Number(selectedShipmentData.total_price))
                                }
                                className="w-full flex-items-center justify-center gap-2 bg-[#14B8A6] text-white py-3 rounded-xl text-sm font-semibold disabled:opacity-50 transition"
                            >
                                {payLoading ? (
                                    <><LuLoader size={15} className="animate-spin" /> Processing...</>
                                ): (
                                    "Pay from Wallet"
                                )}
                            </button>
                            
                        </div>
                    </Modal>
                )}
            </div>
        </>
    )
}