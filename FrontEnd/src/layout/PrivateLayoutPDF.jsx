import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { api, getToken } from "../config/axios";
import { Grid, CircularProgress } from "@mui/material";
import MainNav from "./MainNav";
import Footer from "./Footer";


export default function Private() {

    const [isAuthorized, setIsAuthorized] = useState(false)
    const [loading, setLoading] = useState(true)
    const [dataApp, setDataApp] = useState([{}])
    const token = getToken()
    const { user } = useUserContext();

    useEffect(() => {
        var dataApp = 0
        const fetch = async () => {
            try {
                const { data } = await api({
                    url: "/api/dataApp/dataProject",
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
                setDataApp(data.data)

            } catch (e) {
                console.error('error: ' + e, 'message: ' + e)
            }
        }

        fetch()

        if (user.role !== undefined ) {
            // Verificar la autorización del usuario
            if (token && user.role === "Estudiante") {
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false);
            }
            setLoading(false);
        }
    }, [])

    /* return isAuthorized && Object.entries(dataApp) > 0 ? (
        (user.role === "Estudiante") ?
            <>
                <MainNav name={user.fullName} />
                <Outlet />
                <Footer />
            </>
        :
            <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/" />
    ) */
}