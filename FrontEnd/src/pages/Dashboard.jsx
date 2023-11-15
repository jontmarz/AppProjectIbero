import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { api, getToken } from '../config/axios';
import { useForm } from "react-hook-form";
import { Grid, Typography, Card, Box, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Swal from 'sweetalert2';
import CustomButton from "../components/CustomButton";
import DataUserDashboard from "../components/dataUserDashboard";

export default function Dashboard() {
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            searchText: "",
            searchSelect: "",
        }
    });
    const navigate = useNavigate()
    const { user } = useUserContext();
    const [dataApp, setDataApp] = useState([])
    const [searchData, setSearchData] = useState([])
    const token = getToken()
    const dataSelect = [
        { id: 1, name: "Proyecto" },
        { id: 2, name: "Identificación" },
        { id: 3, name: "Nombre Estudiante" },
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
                let dataApp = data.data
                setDataApp(dataApp)
                
            } catch (e) {
                console.error(e);
            }
        }
        
        loadDataApp()
    }, [token])
    
    const onSubmit = async (data, e) => {
        setSearchData([...searchData, data])
        var dataSearch = {}
        if (data.searchSelect == 1) {
            dataSearch = { titleProj : data.searchText }
        } else if (data.searchSelect == 2) {
            dataSearch = { idUser : data.searchText }
        } else if (data.searchSelect == 3) {
            dataSearch = { nameUser : data.searchText }
        }

        try {
            const res = await api({
                url: "/api/search",
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
                params: dataSearch
            })
            let dataApp = res.data
            navigate(`/dashboard/${dataApp.data._id}`)
            console.log(dataApp.data._id);
            
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Grid container spacing={2} sx={{ mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "0 auto 2em"} }}>
                <DataUserDashboard user={user} />
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "end"}}>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ display: "flex", width: "80%", gap: 2 }}
                    >
                        <TextField
                            id="outlined-basic"
                            label="Buscar por..."
                            variant="outlined"
                            fullWidth
                            {...register("searchText", { required: true })}
                        />
                        {errors.searchText && <Typography component="span" sx={{color: "red", fontSize: 10}}>Diligenciar el dato</Typography>}
                        <FormControl variant="standard" sx={{ minWidth: 220 }}>
                            <InputLabel id="search-select-label">Elija el filtro de busq...</InputLabel>
                            <Select
                                variant="filled"
                                {...register("searchSelect", { required: true })}
                            >
                                {dataSelect.map((item, index) => 
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                )}
                            </Select>
                            {errors.searchSelect && <Typography component="span" sx={{color: "red", fontSize: 10}}>Debe elegir una opción</Typography>}
                        </FormControl>
                        <Grid item xs={12} md={3} sx={{ display: "flex", alignItems: "end"}}>
                            <CustomButton name="Buscar" disabled={Object.keys(errors).length > 0} />
                        </Grid>
                    </Box>
                </Grid>
                {user.role === 'Docente' ?
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt:5 }}>
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
