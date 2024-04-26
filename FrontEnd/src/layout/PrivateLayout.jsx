import { useEffect, useState } from "react";
import UserContextProvider, { useUserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { Grid, CircularProgress } from "@mui/material";
import MainNav from "./MainNav";
import Footer from "./Footer";


export default function Private() {

    const [loading, setLoading] = useState(true)
    const { isLoggedIn, logIn } = useUserContext();

    
    useEffect(() => {
        setLoading(logIn())
    }, [logIn]);

    if (loading) return (
        <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
            <CircularProgress color="success" />
        </Grid>
    )

    if (!isLoggedIn) return <Navigate to="/" />
    
    return (
        <>
        <UserContextProvider>
            <MainNav />
            <Outlet />
            <Footer />
        </UserContextProvider>
        </>
    )
    
}