import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { api, getToken } from '../config/axios';
import { useForm } from "react-hook-form";
import { Grid, Typography, Card, Box, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import DataUserDashboard from "../components/dataUserDashboard";

export default function Dashboard() {
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: { searchText: "", searchSelect: "",
        }
    });
    const { user } = useUserContext();
    const [dataApp, setDataApp] = useState([])
    const token = getToken()

    useEffect(() => {
        const loadDataApp = async () => {
            try {
                const {data} = await api({
                    url: "/api/dataApp",
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
                const dataApp = data.data
                setDataApp(dataApp)
                
            } catch (e) {
                console.error(e);
            }
        }
        
        loadDataApp()
    }, [token])

    console.log(dataApp);
    
    const onSubmit = (data, e) => {
        setSearch([...search, data])
        console.log(data.searchSelect);
    }

    return (
        <>
            <Grid container spacing={2} sx={{ mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "0 auto 2em"} }}>
                <DataUserDashboard user={user} />

                {user.role === 'Docente' ?
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                    <Grid container spacing={2} sx={{  }}>
                        {user.role === 'Docente' ? dataApp.map((item, index) =>
                            <Grid item xs={12} md={3} key={index} className="proj-card" >
                                <Box component={Link} to={item._id} className="bg-card" sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', padding: 2, textDecoration: "none" }}>
                                    <Typography variant="h6" component="h6" sx={{ my: 3 }}>{item.goals.titleProj}</Typography>
                                </Box>
                            </Grid>
                        ) : <Typography variant="h6" component="h6" sx={{ mt: 3 }}>No hay proyectos registrados</Typography>}
                    </Grid>
                </Grid>: user.role === 'Estudiante' ?
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                    <Typography variant="h6" component="h6" sx={{ mt: 3 }}>Datos Estudiante</Typography>
                </Grid>: 
                <Typography variant="h6" component="h6" sx={{ mt: 3 }}>No Existen datos</Typography>
                }
            </Grid>
        </>
    )
}
