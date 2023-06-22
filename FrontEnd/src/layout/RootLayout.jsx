import { Outlet } from "react-router-dom";
import UserProvider from "../context/UserContext";

export default function Root() {
    return (
        <UserProvider>
            <Outlet />
        </UserProvider>
    )
}