import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext()

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('access');
        if(token){
            api.get('/accounts/auth/profile/')
            .then((res) => setUser(res.data))
            .catch(() => {
                localStorage.clear();
                setUser(null);
            })
            .finally(() => setLoading(false));
        }else{
            setLoading(false);
        }
    }, [])

    const register = async(formData) => {
        const res = await api.post("accounts/auth/register/", formData);
        return res.data;
    }

    const login = async(email, password) => {
        try{
            const res = await api.post('/accounts/auth/login/', {email, password});
            
            console.log("Login response:", res.data)

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            const userRes = await api.get('/accounts/auth/profile/');
            setUser(userRes.data)
            return userRes.data;
        } catch(err){
            console.error("Login error full details:", err.response?.data)
            throw err;
        }
    }

    const logout = async () => {
        try{
            const refresh = localStorage.getItem("refresh");
            await api.post('/accounts/auth/logout/', { refresh });

        } catch(e) {}
        localStorage.clear();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, setUser, login, logout, register, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(){
    return useContext(AuthContext);
}