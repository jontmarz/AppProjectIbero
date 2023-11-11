import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { api, getToken } from '../config/axios';
import { useForm } from "react-hook-form";
import { Grid, Typography, Card, Box, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import DataUserDashboard from "../components/dataUserDashboard";

export default function Dashboard() {
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            searchText: "",
            searchSelect: "",
        }
    });
    const { user } = useUserContext();
    const [dataApp, setDataApp] = useState([])
    const [search, setSearch] = useState({})
    const token = getToken()
    const dataSelect = [
        { id: 1, name: "por Proyecto" },
        { id: 2, name: "por Documento" },
        { id: 3, name: "por Estudiante" },
    ]

    // console.log(user);

    useEffect(() => {
        const loadDataApp = async () => {
            try {
                const {data} = await api({
                    url: "/api/dataApp/",
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
                {/* <Grid item xs={12} sx={{ display: "flex", justifyContent: "end"}}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ display: "flex", width: "50%", gap: 2 }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Buscar por..."
                            variant="outlined"
                            fullWidth
                            {...register("searchText")}
                        />
                        <FormControl fullWidth>
                            <InputLabel id="search-select-label">Elija el filtro de busq...</InputLabel>
                            <Select
                                variant="filled"
                                {...register("searchSelect")}
                            >
                                {dataSelect.map((item, index) => 
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <Grid item xs={12} md={3} sx={{ display: "flex", alignItems: "end"}}>
                            <CustomButton name="Buscar" />
                        </Grid>
                    </Box>
                </Grid> */}
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
