import { Outlet } from "react-router-dom";
import UserProvider from "../context/UserContext";
import { Container } from "@mui/material";

export default function Root() {

    return (
        <UserProvider>
            <Container maxWidth="xl" sx={{ mx: "auto", p: "0 !important" }}>
            {/* <Container sx={{ maxWidth: {xl: 1400}, mx: "auto" }}> */}
                <Outlet />
            </Container>
        </UserProvider>
    )
}