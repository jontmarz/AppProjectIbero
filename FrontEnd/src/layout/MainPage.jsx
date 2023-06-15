import { useState } from "react";
import MainNav from "./MainNav";


export default function MainPage() {
    const [user, setUser] = useState(null)

    const userLogin = () => {
        setUser({
            id: 1,
            name: "admin",
        })
    }

    const userLogout = () =>  setUser(null)

    return (
        <>
        {user ? (
            <MainNav click={userLogout} button="Logout" />
        ) : (
            <MainNav click={userLogin} button="Login" />
        )}
        </>
    )
}