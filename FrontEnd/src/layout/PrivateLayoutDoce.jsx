import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { getToken } from "../config/axios";
import { Grid, CircularProgress } from "@mui/material";
import MainNav from "./MainNav";
import Footer from "./Footer";


export default function Private() {

    const [isAuthorized, setIsAuthorized] = useState(false)
    const [loading, setLoading] = useState(true)
    const token = getToken()
    const { user } = useUserContext();

    useEffect(() => {
        if (user.role !== undefined) {
            // Verificar la autorización del usuario
            if (token && user.role === "Estudiante") {
                setIsAuthorized(true);
            } else if (token && user.role === "Docente") {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
            setLoading(false);
        }
    }, [token, user]);

    if (loading) return (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
            <CircularProgress color="success" />
        </Grid>
    )

    return isAuthorized ? (
        (user.role === "Docente") ?
            <>
                <MainNav name={user.fullName} />
                <Outlet />
                <Footer />
            </>
        :
            <Navigate to="/dashboard" />
    ) : (
        <Navigate to="/" />
    )
}