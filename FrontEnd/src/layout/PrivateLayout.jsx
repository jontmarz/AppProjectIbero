import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { getToken } from "../config/axios";
import MainNav from "./MainNav";
import { useUserContext } from "../context/UserContext";


export default function Private() {
    const token = getToken()
    const { user, setUser } = useUserContext();
    // const { user, setUser } = useContext(useUserContext)

    // console.log(user.fullName);

    return token
        ?
        <>
            {/* <MainNav /> */}
            <MainNav name={user.fullName} />
            <Outlet />
        </>
        : <Navigate to="/" />
}