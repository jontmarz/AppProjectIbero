import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../config/axios";
import MainNav from "./MainNav";


export default function Private() {
    const token = getToken()

    // return token ? <><MainNav /><Outlet /></> : <Navigate to="/" />
    return token
        ?
        <>
            <MainNav /> 
            <Outlet />
        </>
        : <Navigate to="/" />
}