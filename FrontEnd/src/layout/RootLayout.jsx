import { Outlet } from "react-router-dom";
import UserProvider from "../context/UserContext";
import { Box } from "@mui/material";

export default function Root() {
    return (
        <UserProvider>
            <Box sx={{ maxWidth: {xl: 1400}, mx: "auto" }}>
                <Outlet />
            </Box>
        </UserProvider>
    )
}