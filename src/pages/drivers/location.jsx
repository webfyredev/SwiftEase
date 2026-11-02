import { useEffect, useState } from "react"
import api from "../../api/axios"
import { LuCircleCheck, LuClock, LuLoader, LuMapPin, LuNavigation } from "react-icons/lu"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

const driverIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize:    [25, 41],
    iconAnchor:  [12, 41],
    popupAnchor: [1, -34],
    shadowSize:  [41, 41],
})

function RecenterMap({ lat, lng }) {
    const map = useMap()
    useEffect(() => {
        if (lat && lng) {
            map.flyTo([parseFloat(lat), parseFloat(lng)], 15, {
                animate: true,
                duration: 1.5,
            })
        }
    }, [lat, lng, map])
    return null
}

const DEFAULT_LAT = 6.5244
const DEFAULT_LNG = 3.3792

export default function Drivers_Locations(){
    const [coords, setCoords] = useState(null)
    const [updatingLoc, setUpdatingLoc] = useState(false)
    const [lastLocUpdate, setLastLocUpdate] = useState(null)
    const [autoUpdate, setAutoUpdate] = useState(false)
    const [toast, setToast] = useState(null)


    const showToast = (type, message) => {
        setToast({type, message});
        setTimeout(() => setToast(null), 3500);
    }
    useEffect(() => {
        if(!autoUpdate)return;
        const interval = setInterval(() => updateLocation(true), 5 * 60*1000);
        return() => clearInterval(interval)
    }, [autoUpdate])

    const updateLocation = async (silent = false) => {
        if(!navigator.geolocation){
            if(!silent) showToast("error", "Geolocation not supported");
            return;
        }
        if(!silent) setUpdatingLoc(true);
        
        navigator.geolocation.getCurrentPosition( async (pos) => {
            const lat = pos.coords.latitude.toFixed(6)
            const lng = pos.coords.longitude.toFixed(6)
            setCoords({lat, lng});
            try{
                await api.post("/drivers/location/", {latitude : lat, longitude : lng});
                setLastLocUpdate(new Date());
                if(!silent) showToast("success", "Location updated.");
            }catch{
                if(!silent) showToast("error", "Failed to update location.");
            }

            if(!silent) setUpdatingLoc(false)
            
        }, () => {
            if(!silent) {
                showToast("error", "Could not get your location.")
                setUpdatingLoc(false);
            }
        })
    }

    const mapLat = coords ? parseFloat(coords.lat) : DEFAULT_LAT
    const mapLng = coords ? parseFloat(coords.lng) : DEFAULT_LNG
    
    return(
        <>
            <div className='w-full flex flex-col space-y-4'>
                {toast && (
                    <div className={`fixed top-4 right-4 z-[9999] flex items-center gap-2
                                        px-4 py-3 rounded-xl shadow-lg text-sm font-medium
                                        max-w-xs ${
                        toast.type === "success"
                            ? "bg-emerald-600 text-white"
                            : "bg-red-600 text-white"
                    }`}>
                        {toast.type === "success"
                            ? <LuCircleCheck size={15} />
                            : <LuMapPin size={15} />}
                        {toast.message}
                    </div>
                )}

                <div className='w-auto flex flex-col space-y-1'>
                    <h3 className='font-bold text-2xl text-[#1e293b]'>My Location</h3>
                    <p className='text-[13px] text-[#94a3b8]'>Share your current location for better coordination.</p>
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-emerald-100 shadow-sm" style={{height: "400px", zIndex: 0}}>
                    <MapContainer
                        center={[mapLat, mapLng]}
                        zoom={14}
                        style={{height : "100%", width : "100%"}}
                        zoomControl={true}
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />

                        <RecenterMap lat={mapLat} lng={mapLng} />
                        <Marker
                            position={[mapLat, mapLng]}
                            icon={driverIcon}
                        >
                            <Popup>
                                <div className="text-sm font-semibold text-gray-800">
                                    Your Location
                                </div>
                                {coords ? (
                                    <div className="text-xs text-gray-500 mt-1">
                                        {coords.lat}, {coords.lng}
                                    </div>
                                ): (
                                    <div className="text-xs text-gray-400 mt-1">
                                        Default location (Lagos)
                                    </div>
                                )}
                            </Popup>
                        </Marker>
                    </MapContainer>

                    {!coords && (
                        <div 
                            className="absolute inset-0 flex items-end justify-center pb-4 pointer-events-none" style={{zIndex: 10}}
                        >
                            <div className="bg-white/90 backdrop-blur-sm text-xs text-gray-500 px-3 py-1.5 rounded-full shadow border border-gray-200">
                                Showinf default location tap Update to get yours
                            </div>

                        </div>
                    )}

                </div>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
                        <LuMapPin size={14} className="text-emerald-500 mx-auto mb-1" />
                        <p className="text-[10px] text-gray-400 font-medium">Latitude</p>
                        <p className="text-sm font-bold text-gray-800">
                            {coords ? coords.lat : DEFAULT_LAT.toFixed(4)}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
                        <LuNavigation size={14} className="text-emerald-500 mx-auto mb-1" />
                        <p className="text-[10px] text-gray-400 font-medium">Longitude</p>
                        <p className="text-sm font-bold text-gray-800">
                            {coords ? coords.lng : DEFAULT_LNG.toFixed(4)}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
                        <LuClock size={14} className="text-emerald-500 mx-auto mb-1" />
                        <p className="text-[10px] text-gray-400 font-medium">Last Updated</p>
                        <p className="text-sm font-bold text-gray-800">
                            {lastLocUpdate
                                ? lastLocUpdate.toLocaleTimeString("en-GB", {
                                    hour: "2-digit", minute: "2-digit",
                                    })
                                : "—"}
                        </p>
                    </div>
                </div>
                {/* <div className="bg-emerald-50 rounded-2xl border border-emerald-100 h-100 flex items-center justify-center">
                    <div className="text-center">
                        <LuMapPin size={36} className=" text-emerald-400 mx-auto mb-2" />
                        {coords ? (
                            <>
                                <p className="text-sm font-bold text-emerald-800">Location Captured</p>
                                <p className="text-xs text-emerald-500 mt-1">
                                    {coords.lat}, {coords.lng}
                                </p>
                            </>
                        ) : (
                            <p className="text-sm text-emerald-300">Tap button to get location</p>
                        )}
                    </div>
                </div> */}
                {lastLocUpdate && (
                    <div className="flex items-center gap-2 bg-emerald-50 rounded-xl px-4 py-3">
                        <LuCircleCheck size={14} className="texte-emerald-500" />
                        <p className="text-xs text-emerald-600">
                            Location successfully shared at {" "} 
                            {lastLocUpdate.toLocaleTimeString("en-GB", {
                                hour : "2-digit", minute: "2-digit",
                            })}
                        </p>
                    </div>
                )}
                <div className="flex flex-col md:flex-row md:items-center w-full space-x-4 space-y-3 md:spce-y-0">
                    <button
                        onClick={() => updateLocation()}
                        disabled={updatingLoc}
                        className="cursor-pointer md:w-1/2 flex items-center justify-center gap-2 bg-emerald-500 text-white py-3.5 rounded-2xl text-sm font-bold hover:bg-emerald-700 disabled:opacity-50 transition"
                    >
                        {updatingLoc ? <><LuLoader size={15} className="animate-spin" /> Updating...</> : <><LuNavigation size={15} /> Update My Location</>}
                    </button>
                    <div className="md:w-1/2 flex items-center justify-between bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500">Auto-update every 5 mins</p>
                        <button
                            onClick={() => setAutoUpdate((a) => !a)}
                            className={`cursor-pointer relative w-11 h-6 rounded-full transition-colors ${autoUpdate ? "bg-emerald-400" : "bg-gray-200"}`}
                        >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${autoUpdate ? "left-5" : "left-0.5"}`}>
                            </div>
                        </button>
                    </div>
                </div>
                
            </div>
        </>
    )
}