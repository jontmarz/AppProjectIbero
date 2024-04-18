import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import { api, getToken } from '../config/axios'
import { set, useForm } from "react-hook-form"
import { Grid, Typography, Table, Card, Box } from "@mui/material"
import HeaderStudentDashboard from "../components/ProjectPage/HeaderStudentDashboard"
import HeaderDocenteDashboard from "../components/ProjectPage/HeaderDocenteDashboard"
import DashboardEstudiante from "./estudiante/DashboardEstudiante"
import DashboardDocente from "./docente/DashboardDocente"
// import AdsClickIcon from '@mui/icons-material/AdsClick';

export default function Dashboard() {
    
    const { user } = useUserContext()
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            searchText: "",
            searchSelect: "",
        }
    });
    const navigate = useNavigate()
    const [dataProj, setDataProj] = useState([])
    const [dataUser, setDataUser] = useState([])
    const [loading, setLoading] = useState(false)
    const token = getToken()

    
    useEffect(() => {
        const loadDataApp = async () => {
            try {
                const res = await api({
                    url: `/api/dataApp/dataProject/`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
                const dataApp = res.data.data
                setDataProj(dataApp)
                
            } catch (e) {
                console.error(e);
            }
        }
        
        loadDataApp()
    }, [])

    return (
        <>
        <Grid container spacing={2} className="dashboard" sx={{ mt: 3, px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "2em auto"}}>
            {user.role === "Estudiante" ? 
            <HeaderStudentDashboard data={dataProj} sx={{width: "100%", mx:"auto"}} />
            :
            <HeaderDocenteDashboard user={user} sx={{width: "100%", mx:"auto"}} />}
            
            {user.role === "Estudiante" ?
            <DashboardEstudiante />
            : 
            <DashboardDocente />
            }
        </Grid>
        </>
    )
}
