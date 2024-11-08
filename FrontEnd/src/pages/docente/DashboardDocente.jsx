import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { api, getToken } from '../../config/axios';
import { set, useForm } from "react-hook-form";
import { Grid, Typography, Card, Box, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Swal from 'sweetalert2';
import CustomButton from "../../components/CustomButton";
import { searchSelect } from "../../config/assets";

export default function DashboardDocente() {
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: {
            searchText: "",
            searchSelect: "",
        }
    });
    const navigate = useNavigate()
    const { user } = useUserContext();
    const [dataApp, setDataApp] = useState([])
    const [searchData, setSearchData] = useState([])
    const [loading, setLoading] = useState(false)
    const token = getToken()

    useEffect(() => {
        const loadDataApp = async () => {
            try {
                const {data} = await api({
                    url: "/api/dataApp/",
                    method: "GET"
                })
                let dataApp = data.data
                setDataApp(dataApp)
                
            } catch (e) {
                console.error(e);
            }
        }
        
        loadDataApp()
    }, [token])

    const userProjects = user.projects.map(item => item.toString())
    const filterProjects = dataApp.filter(item =>
        item.goals && item.goals.titleProj && userProjects.includes(item._id.toString())
    )
    
    const onSubmit = async (data, e) => {
        setSearchData([...searchData, data])
        var dataSearch = {}
        if (data.searchSelect == 3) {
            dataSearch = { titleProj : data.searchText }
        } else if (data.searchSelect == 1) {
            dataSearch = { idUser : data.searchText }
        } else if (data.searchSelect == 2) {
            dataSearch = { nameUser : data.searchText }
        }

        try {
            const res = await api({
                url: "/api/search/",
                method: "GET",
                params: dataSearch
            })
            let searchQuery = res.data
            searchData.length > 0 ? setLoading(true) : setLoading(false)
            searchQuery.data.length > 0 ? setDataApp(searchQuery.data) : setDataApp()
            
        } catch (e) {
            console.error(e);
            Swal.fire({
                title: "¡Error!",
                text: e.response.data.message,
                icon: "error",
                confirmButtonText: "Aceptar",
                confirmButtonColor: "#0098D4"
            })
        }
        reset();
    }

    // console.log(user, userProjects, filterProjects);
    

    const resetButton = () => {
        return window.location.reload()
    }

    return (
        <>
            <Grid container spacing={2} className="headerDocente" sx={{ mt: 3, px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "0 auto"}}>
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
                                defaultValue="1"
                                {...register("searchSelect", { required: true })}
                            >
                                {searchSelect.map((item, index) => 
                                    <MenuItem key={index} value={item.id}>{item.name}</MenuItem>
                                )}
                            </Select>
                            {errors.searchSelect && <Typography component="span" sx={{color: "red", fontSize: 10}}>Debe elegir una opción</Typography>}
                        </FormControl>
                        <Grid item xs={12} md={3} sx={{ display: "flex", alignItems: "end"}}>
                            <CustomButton name="Buscar" disabled={Object.keys(errors).length > 0} />
                            <CustomButton name="Reset" action={resetButton} />
                        </Grid>
                    </Box>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                    <Typography variant="h3" component="h3" sx={{ my: 3 }}>Proyectos de Investigación</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", my:5 }}>
                    <Grid container spacing={2} sx={{  }}>
                        {loading ? <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Typography variant="h6" component="h6" sx={{ mb: 3 }}>Resultados de la Búsqueda</Typography>
                        </Grid> : ''}

                        {filterProjects.length === 0 ? (
                            <Typography variant="h6" component="h6" sx={{ mt: 3 }}>El docente no Tiene proyectos asignados</Typography>
                        ) : (
                            filterProjects.map((item, index) => (
                                <Grid item xs={12} md={3} key={index} className="proj-card">
                                    <Box
                                        component={Link}
                                        to={`../docente/${item._id}`}
                                        className="bg-card title-card"
                                        title={item.goals.titleProj}
                                        sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', padding: 2, textDecoration: "none", height: '100%' }}
                                    >
                                        <Typography variant="h6" component="h6" sx={{ my: 3 }}>
                                            {item.goals ? item.goals.titleProj.length > 25 ? item.goals.titleProj.substring(0, 25) + '...' : item.goals.titleProj : "No hay título de proyecto"}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}
