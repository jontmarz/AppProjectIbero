import { useUserContext } from "../context/UserContext";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../config/axios";
import MainNav from "./MainNav";
import Footer from "./Footer";


export default function Private() {
    const token = getToken()
    const { user } = useUserContext();

    return token
        ?
        <>
            <MainNav name={user.fullName} />
            <Outlet />
            <Footer />
        </>
        : <Navigate to="/" />
}