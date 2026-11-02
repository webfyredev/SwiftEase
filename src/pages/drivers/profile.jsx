import { useCallback, useEffect, useState } from "react"
import api from "../../api/axios"
import { useAuth } from "../../context/AuthContext"
import { LuBike, LuBus, LuCalendarCheck, LuCar, LuCreditCard, LuMapPin, LuPhone, LuStar, LuTruck, LuUser, LuWalletCards } from "react-icons/lu";

export default function Driver_Profiles(){
    const { user } = useAuth();
    const [data, setData] = useState(null)
    const [toast, setToast] = useState(null)
    const [loading, setLoading] = useState(true)

    const showToast = (type, message) => {
        setToast({ type, message });
        setTimeout(() => setToast(null), 3500);
    };
    const fetchDriverProfile = useCallback(async () => {
        try{
            const res = await api.get('/drivers/dashboard/');
            setData(res.data)
        }catch{
            showToast("error", "Failed to load dashboard");
        } finally{
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchDriverProfile();}, [fetchDriverProfile]);

    return(
        <>
            <div className='w-full flex flex-col space-y-4'>
                <div className='w-auto flex flex-col space-y-1'>
                    <h3 className='font-bold text-2xl text-[#1e293b]'>My Profile</h3>
                    <p className='text-[13px] text-[#94a3b8]'>Manage your personal and vehicle information.</p>
                </div>
                <div className="w-full flex flex-col bg-white border border-gray-100 rounded-xl shadow-xs">
                    <div className="flex space-x-4 items-center justify-left p-3">
                        {data?.driver.avatar ? (
                            <img 
                                src={data.driver.avatar} 
                                alt="Driver Profile"
                                className="w-20 h-20 rounded-full object-cover border-4 border-emerald-100"
                            
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center border-4 border-emerald-100">
                                <span className="text-white text-2xl font-bold">
                                    {data?.driver?.full_name?.charAt(0).toUpperCase() ?? "SD"}
                                </span>
                            </div>
                        )} 
                        <div className="flex flex-col space-y-1">
                            <h3 className="text-gray-900 text-lg  font-semibold">
                                {data?.driver?.full_name ?? user?.full_name}
                            </h3>
                            <a href={`mailto:${data?.driver?.email || user?.email}`} className="text-sm text-gray-400">
                                {data?.driver?.email ?? user?.email}
                            </a>
                            <p className="flex space-x-1 font-medium items-center text-gray-600 font-semibold"><LuStar className="fill-yellow-400 text-yellow-400" /><span>{data?.driver?.rating} <span className="font-normal text-gray-400 text-xs">rating</span></span></p>
                            <p  className="flex items-center space-x-1.5 text-sm text-gray-400"> <LuCreditCard /> <span>Wallet Balance : {data?.driver?.wallet_balance || '0.00'}</span></p>
                        </div>
                    </div>
                    <hr className="w-[95%] ml-5 border-1 border-gray-100 my-2" />
                    <div className="mt-2 p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="flex space-x-5">
                            <LuPhone className="text-gray-500" />
                            <div className="flex flex-col space-y-1.5">
                                <p className="text-xs">Phone</p>
                                <a href={`tel://${data?.driver?.phone}`} className="text-sm text-gray-400">{data?.driver?.phone || 'Nill'}</a>
                            </div>
                        </div>
                        <div className="flex space-x-5">
                            <LuUser className="text-gray-500" />
                            <div className="flex flex-col space-y-1.5">
                                <p className="text-xs">Role</p>
                                <p className="text-sm text-gray-400 capitalize">{data?.driver?.role}</p>
                            </div>
                        </div>
                        <div className="flex space-x-5">
                            <LuCreditCard className="text-gray-500" />
                            <div className="flex flex-col space-y-1.5">
                                <p className="text-xs">License No:</p>
                                <p className="text-sm text-gray-400 capitalize">{data?.driver?.license_no || 'Nill'}</p>
                            </div>
                        </div>
                        <div className="flex space-x-5">
                            <LuCalendarCheck className="text-gray-500" />
                            <div className="flex flex-col space-y-1.5">
                                <p className="text-xs">Date Joined</p>
                                <p className="text-sm text-gray-400 capitalize">{data?.driver?.date_joined || 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex md:flex-row flex-col space-x-7 mt-2 space-y-3 md:space-y-0">
                    <div className="w-full md:w-1/2 p-5 flex space-x-3 border bg-white border border-gray-100 rounded-xl shadow-xs">
                        {data?.vehicle?.vehicle_type === 'bike' && (
                            <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <LuBike />
                            </span>
                        )}
                        {data?.vehicle?.vehicle_type === 'van' && (
                            <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <LuBus />
                            </span>
                        )}
                        {data?.vehicle?.vehicle_type === 'truck' && (
                            <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <LuTruck />
                            </span>
                        )}
                        {data?.vehicle?.vehicle_type === 'car' && (
                            <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                <LuCar />
                            </span>
                        )}
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-sm text-gray-700 font-medium">Vehicle</h3>
                            <p className="text-xs text-gray-500"><span className="text-gray-700 font-semibold">Plate Number: </span>{data?.vehicle?.plate_number}</p>
                            <p className="text-xs text-gray-500 capitalize"><span className="text-gray-700 font-semibold">Vehicle Type: </span>{data?.vehicle?.vehicle_type}</p>
                            <p className="text-xs text-gray-500 capitalize"><span className="text-gray-700 font-semibold">Model: </span>{data?.vehicle?.model}</p>
                            <p className="text-xs text-gray-500 capitalize"><span className="text-gray-700 font-semibold">Capacity_Kg: </span>{data?.vehicle?.capacity_kg}kg</p>


                        </div>
                    </div>
                    <div className="w-full md:w-1/2 p-5 flex space-x-3 border bg-white border border-gray-100 rounded-xl shadow-xs">
                        <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <LuMapPin />
                        </span>
                        <div className="flex flex-col space-y-2">
                            <h3 className="text-sm text-gray-700 font-medium">Branch</h3>
                            <p className="text-xs text-gray-500"><span className="text-gray-700 font-semibold">Name: </span>{data?.branch?.name}</p>
                            <p className="text-xs text-gray-500 capitalize"><span className="text-gray-700 font-semibold">City: </span>{data?.branch?.city}</p>
                            <p className="text-xs text-gray-500 capitalize"><span className="text-gray-700 font-semibold">Model: </span>{data?.branch?.address}</p>
                        </div>
                    </div>
                </div>
                    {/* {data?.driver.avatar ? (
                        <img 
                            src={data.driver.avatar} 
                            alt="Driver Profile"
                            className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-emerald-100"
                        
                        />
                    ) : (
                        <div className="w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center mx-auto border-4 border-emerald-100">
                            <span className="text-white text-2xl font-bold">
                                {data?.driver?.full_name?.charAt(0).toUpperCase() ?? "SD"}
                            </span>
                        </div>
                    )} */}
                    {/* <p className="font-bold text-gray-900 mt-3 text-lg">
                        {data?.driver?.full_name ?? user?.full_name}
                    </p>
                    <a href={`mailto:${data?.driver?.email || user?.email}`} className="text-sm text-gray-400">
                        {data?.driver?.email ?? user?.email}
                    </a>
                    {data?.driver?.phone && (
                        <p className="text-sm text-gray-400">
                            {data?.driver?.phone}
                        </p>
                    )} */}
                {/* </div> */}
            </div>
        </>
    )
}