import { useState, useEffect, useContext, createContext } from "react";
import { api } from "../config/axios";
import { getToken } from "../config/axios";

const UserContext = createContext()

export default function UserProvider({ children }) {
    const [user, setUser] = useState([])
    const token = getToken()
    
    const [loadingUser, setLoadingUser] = useState(true)

    useEffect(() => {
        const getUser = async() => {
            if (!token) {
                setLoadingUser(false)
                return
            }

            try {
                const { data } = await api({
                    url: "/api/user/info",
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` },
                })
                setUser(data.infoUser)
                setLoadingUser(false)
            } catch (e) {
                console.error(e);
            }
        }

        getUser()
    }, [])
    
    // if (user === false) return <h1>Loading...</h1>

    return (
        <UserContext.Provider value={[ user, setUser ]}>{children}</UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)