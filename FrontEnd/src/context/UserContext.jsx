import { useState, useEffect, useContext, createContext } from "react";
import { api } from "../config/axios";
import { getToken, deleteToken } from "../config/axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export default function UserContextProvider({ children }) {
    const [user, setUser] = useState([])
    const token = getToken()
    const navigate = useNavigate()
    
    const getUser = async() => {
        if (!token) {
            return
        }

        try {
            const { data } = await api({
                url: "/api/user/info",
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            })
            setUser(data.infoUser)
        } catch (e) {
            console.error(e);
            if (e.response.status === 500) {
                deleteToken()
                setUser(false)
                navigate("/")
            }
        }
    }
    getUser()

    useEffect(() => {
        return getUser
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)