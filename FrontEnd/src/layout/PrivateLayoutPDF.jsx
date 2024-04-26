import { useEffect, useState } from "react";
import UserContextProvider, { useUserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
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
        if(user) {
            // Verificar la autorización del usuario
            if (token) {
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
    
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [token, user]);

    if (loading) return (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
            <CircularProgress color="success" />
        </Grid>
    )

    if (!isAuthorized) return <Navigate to="/" />
    
    return (
        <UserContextProvider>
            <Outlet />
        </UserContextProvider>
    )
    
}