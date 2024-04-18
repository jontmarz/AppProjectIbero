import { useEffect, useState } from "react";
import { api, getToken } from '../../config/axios';
import { useUserContext } from "../../context/UserContext";
import { Grid, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import PropTypes from 'prop-types';
import { FormEditStudent } from "./FormEditStudent";
import CustomButton from "../CustomButton";

function SimpleDialog(props) {
    const { onClose, open, userData } = props;
  
    const handleClose = () => {
      onClose(userData);
    };
  
    return (
      <Dialog onClose={handleClose} open={open} sx={{ px:3 }}>
        <DialogTitle sx={{ textAlign: "center"}}>Perfil de Usuario</DialogTitle>
        <DialogContent>
            <DialogContentText sx={{ textAlign: "center", mb: 2 }}>Los datos de usuario se muestran a continuación, pueden ser modificados si es requerido</DialogContentText>
            <FormEditStudent uploadUserData={userData} />
        </DialogContent>
      </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
}

export default function HeaderStudentDashboard(props) {

    const { data } = props
    const { user } = useUserContext()
    const token = getToken()
    const [dataUser, setDataUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    useEffect(() => {
        const loadUser = async () => {
            if (data && data.user) {
                try {
                    const res = await api({
                        url: `/api/user/${data.user}/`,
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    const userData = res.data.infoUser
                    setDataUser(userData)
                } catch (e) {
                    console.error(e.response.data);
                } finally {
                    setLoading(false)
                }
            }
        }

        loadUser()
    }, [data, token])

    if (loading) { return <p>Cargando...</p> }

    return (
        <>
        <Box>
            <Grid container spacing={2} sx={{backgroundColor:"#666", borderRadius:"25px 25px 0 0", p:"0"}}>
                <Grid item xs={12} md={4}> 
                    <Typography variant="h6" component="h6" sx={{ mt: 1, mb: 1, color:"#fff"}}>
                        <strong>Investigador: </strong> <i>{dataUser && dataUser.fullName ? dataUser.fullName : "N/D" }</i>
                    </Typography>
                    
                    <Typography variant="h6" component="h6" sx={{ mt: 1, mb: 1, color:"#fff"}}>
                        <strong>Tipo Proyecto: </strong> <i>{dataUser && dataUser.type ? data.typeProj : "Básico"}</i>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    
                    <Typography variant="h6" component="h5" sx={{ mt: 1, color:"#fff" }}>
                        <strong>Facultad: </strong>{dataUser && dataUser.faculty ? dataUser.faculty: "N/D"}
                    </Typography>

                    <Typography variant="h6" component="h5" sx={{ mt: 1, color:"#fff" }}>
                        <strong>Programa: </strong>{dataUser && dataUser.academicProgram ? dataUser.academicProgram : "N/D"}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" component="h5" sx={{ mt: 1, color:"#fff" }}>
                        <strong>Línea de Investigación: </strong>{dataUser && dataUser.researchLine ? dataUser.researchLine : "Semillero"}
                    </Typography>

                    <Typography variant="h6" component="h5" sx={{ mt: 1, color:"#fff" }}>
                        <strong>Grupo de Investigación: </strong>{dataUser && dataUser.group ? dataUser.group : "N/D"}
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h6" component="h6" sx={{ mt: 1, mb: 3, color:"#fff"}}>
                        <strong>Título Proyecto: </strong> <i>{data && data.goals && data.goals.titleProj ? data.goals.titleProj: "N/D"}</i>
                    </Typography>
                    {user && user.role !== "Docente"
                        ? <CustomButton name="Ver Perfil" action={handleClickOpen} color="#cca448" padding="1em, 1em" height="3em" txtHovColor="fff" />
                        : null}
                    
                </Grid>
            </Grid>
        </Box>
        <SimpleDialog
            userData={dataUser}
            open={open}
            onClose={handleClose}
        />
        </>
    )
}