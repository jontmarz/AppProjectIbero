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
            })
            setUser(data.infoUser)
            navigate("/menu-pages")
            console.log(data);
        } catch (e) {
            console.error('error: ' + e.response);
            /* if (e.response.status >= 500 || e.response.status >= 400) {
                deleteToken()
                setUser(false)
                navigate("/")
            } */
        }
    }
    
    useEffect(() => {
        return getUser
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)