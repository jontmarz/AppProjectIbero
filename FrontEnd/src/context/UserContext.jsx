import { useState, useEffect, useContext, createContext } from "react";
import { api, getToken, deleteToken } from "../config/axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export default function UserContextProvider({ children }) {

    const [user, setUser] = useState(null)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const token = getToken()
    const navigate = useNavigate()

    const checkSession = () => {
        if (token) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }

    const logIn = () => {
        setIsLoggedIn(true)
    }
    const logOut = () => {
        deleteToken()   
        setUser(null)
        setIsLoggedIn(false);
        navigate("/")
    }
    
    const getUser = async() => {
        if (!isLoggedIn) navigate("/");

        try {
            const { data } = await api({
                url: "/api/user/dataUser",
                method: "GET"
            })
            setUser(data.infoUser)
            
        } catch (e) {
            console.error('error: ' + e, 'message: ' + e);
            if (e.response.status >= 500 || e.response.status >= 400) {
                logOut()
            }
        }
    }
    
    useEffect(() => {
        checkSession()
        if (isLoggedIn) {
            getUser()
        } else {
            setUser(null)
        }
    }, [isLoggedIn])
    

    const contextValue = { user, setUser, isLoggedIn, setIsLoggedIn, logIn, logOut }
    
    return (
        <UserContext.Provider value={ contextValue }>{children}</UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext)