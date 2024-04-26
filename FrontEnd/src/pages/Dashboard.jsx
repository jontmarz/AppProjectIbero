import React from "react"
import { useUserContext } from "../context/UserContext"
import DataContextProvider from "../context/DataContext"
import { Grid } from "@mui/material"
import HeaderStudentDashboard from "./Estudiante/HeaderStudentDashboard"
import DashboardEstudiante from "./Estudiante/DashboardEstudiante"
import HeaderDocenteDashboard from "./Docente/HeaderDocenteDashboard"
import DashboardDocente from "./Docente/DashboardDocente"

export default function Dashboard() {
    
    const { user } = useUserContext()

    if (!user) return null

    return (
        <>
        <Grid container spacing={2} className="dashboard" sx={{ mt: 3, px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "2em auto"}}>
            {user && user.role === "Estudiante" || user.role === "" ?
            <>
                <DataContextProvider>
                    <HeaderStudentDashboard user={user} />
                    <DashboardEstudiante />
                </DataContextProvider>
            </> 
            :
            <>
                <HeaderDocenteDashboard user={user} />
                <DashboardDocente />
            </>
            }
        </Grid>
        </>
    )
}
