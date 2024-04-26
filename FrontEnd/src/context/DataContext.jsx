import { useState, useEffect, useContext, createContext } from "react";
import { api, getToken } from "../config/axios";

const DataContext = createContext()

export default function DataContextProvider({ children }) {
    const [dataApp, setDataApp] = useState(null)
    const token = getToken()
    
    const getData = async() => {
        if (!token) {
            return
        }

        try {
            const { data } = await api({
                url: "/api/dataApp/dataProject/",
                method: "GET"
            })
            setDataApp(data.data)
            
        } catch (e) {
            console.error('error: ' + e, 'message: ' + e);
            if (e.response.status >= 500 || e.response.status >= 400) {
                setDataApp(null)
            }
        }
    }

    
    useEffect(() => {
        if (token) {
            getData()
        } else {
            setDataApp(null)
        }
    }, [])

    console.log(dataApp);

    return (
        <DataContext.Provider value={{ dataApp, setDataApp }}>{children}</DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext)