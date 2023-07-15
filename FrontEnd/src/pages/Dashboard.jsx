import { useState } from 'react'
import { api } from "../config/axios";
import { getToken, deleteToken } from "../config/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [user, setUser] = useState([])
    const token = getToken()
    const navigate = useNavigate()
    
    const getUser = async() => {

        try {
            const { data } = await api({
                url: "/api/user/info",
                method: "GET",
            })
            setUser(data.infoUser)
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
    getUser()

  return (
    <div>Usuario: {user}</div>
  )
}
