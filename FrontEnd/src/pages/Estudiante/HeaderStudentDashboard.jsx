import { useState } from "react";
import { api } from '../../config/axios';
import { useDataContext } from "../../context/DataContext";
import { Grid, Typography, Box, Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";
import PropTypes from 'prop-types';
import { FormEditStudent } from "../../components/ProjectPage/FormEditStudent";
import { DataProfile } from "../../components/ProjectPage/DataProfile";
import CustomButton from "../../components/CustomButton";
import Swal from 'sweetalert2';

function SimpleDialog(props) {
    const { onClose, open, userData, onSubmit } = props
  
    const handleClose = () => {
      onClose(userData);
    };
  
    return (
      <Dialog onClose={handleClose} open={open} sx={{ px:3 }}>
        <DialogTitle sx={{ textAlign: "center"}}>Perfil de Usuario</DialogTitle>
        <DialogContent>
            <DialogContentText sx={{ textAlign: "center", mb: 2 }}>Los datos de usuario se muestran a continuación, pueden ser modificados si es requerido</DialogContentText>
            <FormEditStudent uploadUserData={userData} onSubmit={onSubmit} />
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

    const { user } = props
    const { dataApp } = useDataContext()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (data, e) => {
        
        if (data.password === "") delete data.password
        data.deadline = new Date(data.deadline).toISOString().split('T')[0]

        const res = await api({
            url: `/api/user/`,
            method: "PUT",
            data
        })
            .then((res) => {
                handleClose()
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: res.data.message,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
            })
            .catch((e) => {
                Swal.fire({
                    title: "¡Error!",
                    text: e.response.data.message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
            })
    }

    console.log(user);

    return (
        <>
        <Box>
            <Grid container spacing={2} sx={{backgroundColor:"#666", borderRadius:"25px 25px 0 0", p:"0"}}>
                <DataProfile user={user} />
                <Grid item xs={12} sx={{display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h6" component="h6" sx={{ mt: 1, mb: 3, color:"#fff"}}>
                        <strong>Título Proyecto: </strong> <i>{dataApp && dataApp.goals && dataApp.goals.titleProj ? dataApp.goals.titleProj: "N/D"}</i>
                    </Typography>
                    <CustomButton name="Ver Perfil" action={handleClickOpen} color="#cca448" padding="1em, 1em" height="3em" txtHovColor="fff" />
                </Grid>
            </Grid>
        </Box>
        { user && (
            <SimpleDialog
                userData={ user ? user : null }
                open={open}
                onClose={handleClose}
                onSubmit={onSubmit}
            />
        )}
        </>
    )
}