import { useEffect, useState } from "react"
import { api, getToken } from "../../config/axios"
import { useUserContext } from "../../context/UserContext"
import { useDataContext } from "../../context/DataContext"
import { Grid, Typography, Table, Box, Paper, MenuList, MenuItem, ListItemText, ListItemIcon } from "@mui/material"
import { typeStatus } from "../../config/assets"
import { menuItems } from "../../config/assets"
import AdsClickIcon from '@mui/icons-material/AdsClick'
import { Link } from "react-router-dom";

export default function DashboardEstudiante() {
    
    const [docente, setDocente] = useState([])
    const { user } = useUserContext()
    const { dataApp } = useDataContext()
    const token = getToken()

    const loadUser = async () => {
        try {
            const data = await api({
                url: "/api/user/",
                method: "GET"
            })
            const user = data.data.infoUser
            setDocente(user)
        } catch (e) {
            console.log(e.response.data.message);
        }
    }

    useEffect(() => {
        if (token) {
            loadUser()
        } else {
            setDocente(null)
        }
    }, [])

    if (!dataApp && docente) return null

    const authorId = dataApp?.review?.author
    const author = docente ? (docente).find(item => item._id === authorId)?.fullName : "No hay autor"

    if (dataApp !== undefined) {
        var findValue = (valueToFind) => {
            const state = typeStatus.find(item => item.value === valueToFind)
            return state ? {status: state.label} : "No hay estado"
        }
        const valueStatus = dataApp?.review?.state
        var { status } = findValue(valueStatus)
    }

    return (
        <>
        {user.role === 'Estudiante' ?
        <>
            <Grid container spacing={2} className="headerEstudiante" sx={{ mt: 3, px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "2em auto 0", bgcolor: "rgba(0,152,212,0.1)" }}>
                <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin:"auto" }}>
                    <Typography variant="h2" component="h2" sx={{ fontSize: 35, fontWeight: "bold", my: 2, mr: "3em" }}>Menú</Typography>
                    <Paper sx={{ width: "100%", bgcolor: "rgba(0,152,212,0)", mb: 5 }}>
                        <MenuList>
                            {menuItems.map((item, index) =>
                                <MenuItem key={index} component={Link} to={item.url} sx={{ my: 2}}>
                                    <ListItemIcon>
                                        <AdsClickIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.title}
                                        primaryTypographyProps={{ variant: 'body1', sx: { fontWeight: 'bold' } }}
                                    />
                                    <Typography variant="body2"
                                    sx={{ bgcolor: "#000", color: "#fff", px: 2, py: 1, borderRadius: "5px" }}>
                                        Editar
                                    </Typography>
                                </MenuItem>)}
                        </MenuList>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2} className="dashboard" sx={{ mt: 3, px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "0 auto 2em", bgcolor: "rgba(218,171,75,0.2)"}}>
                <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin:"auto" }}>
                    <Typography variant="h2" component="h2" sx={{ fontSize: 35, fontWeight: "bold", my: 2, mr: "3em" }}>Reseñas</Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    <Typography variant="h4" component="p" sx={{ fontSize: 20, fontWeight: "bold", my: 2, mr: "3em", flexBasis: "100%", textAlign: "center" }}>Revisión: {dataApp?.review?.comment}</Typography>
                    <Typography variant="h4" component="p" sx={{ fontSize: 20, my: 2, mr: "3em", flexGrow: 1, }}>Estado: {status}</Typography>
                    <Typography variant="h4" component="p" sx={{ fontSize: 20, my: 2, mr: "3em", flexGrow: 1 }}>Autor: { author }</Typography>
                </Box>
                </Grid>
            </Grid>
        </>
        : <Typography variant="h6" component="h6" sx={{ mt: 3 }}>No hay rol específico</Typography>}
        </>
    )
}
