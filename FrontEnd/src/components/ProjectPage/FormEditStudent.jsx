import { useState } from "react";
import { Box, TextField, Typography, Grid } from '@mui/material'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import CustomButton from "../CustomButton";

export const FormEditStudent = ({uploadUserData}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [edit, setEdit] = useState(false)
    
    console.log(uploadUserData)

    const onSubmit = async (data, e) => {

        uploadUserData(data)
        /* const editUser = {
            fullName: data.fullName,
            email: data.email,
            password: data.password
        
        } */
    }
  return (
    <>
    <Box
        component="form"
        className="editUser"
        onSubmit={handleSubmit(onSubmit)}
    >
        <Grid container spacing={2} >
            <Grid
                item
                xs={12}
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
                <TextField
                    type="text"
                    label="Nombre"
                    className="name"
                    defaultValue={uploadUserData.fullName ? uploadUserData.fullName : ""}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("fullName")}
                />
                {errors.fulName && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita el nombre del usuario</Typography>}

                <TextField
                    type="text"
                    label="Contraseña"
                    className="password"
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("password", { minLength: 8 })}
                />
                {errors.password && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>La contraseña debe tener mínimo 8 caracteres</Typography>}

                <TextField
                    type="text"
                    label="Identificación"
                    variant="filled"
                    className="identification"
                    defaultValue={uploadUserData.identify ? uploadUserData.identify : ""}
                    inputProps={{readOnly: true}}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("identify")}
                />

                <TextField
                    type="text"
                    label="Correo Institucional"
                    variant="filled"
                    className="email"
                    defaultValue={uploadUserData.emailI ? uploadUserData.emailI : ""}
                    inputProps={{readOnly: true}}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                />

                <TextField
                    type="text"
                    label="Correo Personal"
                    className="email"
                    defaultValue={uploadUserData.emailP ? uploadUserData.emailP : ""}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("emailP")}
                />
                {errors.emailP && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita tu dirección de correo electrónico Personal</Typography>}

                <TextField
                    type="text"
                    label="Facultad"
                    className="faculty"
                    defaultValue={uploadUserData.faculty ? uploadUserData.faculty : ""}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("faculty")}
                />
                {errors.faculty && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita la facultad a la que perteneces</Typography>}

                <TextField
                    type="text"
                    label="Programa Académico"
                    className="AcadProgram"
                    defaultValue={uploadUserData.academicProgram ? uploadUserData.academicProgram : ""}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("academicProgram")}
                />
                {errors.academicProgram && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita tu programa académico</Typography>}

                <TextField
                    type="text"
                    label="Código de Estudiante"
                    className="EstudentCode"
                    defaultValue={uploadUserData.code ? uploadUserData.code : ""}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("code")}
                />
                {errors.code && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita el código de estudiante</Typography>}

                <TextField
                    type="text"
                    label="Teléfono de Contacto"
                    className="contactPhone"
                    defaultValue={uploadUserData.phone ? uploadUserData.phone : ""}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("phone")}
                />
                {errors.phone && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita un número de teléfono de contacto</Typography>}

                <TextField
                    type="text"
                    label="Tipo de Proyecto"
                    className="proyectType"
                    defaultValue={uploadUserData.typeProj ? uploadUserData.typeProj : ""}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("typeProj")}
                />
                {errors.typeProj && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita un número de teléfono de contacto</Typography>}

                <TextField
                    type="text"
                    label="Línea de Investigación"
                    className="ResearchLine"
                    defaultValue={uploadUserData.instLine ? uploadUserData.instLine : ""}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("instLine")}
                />
                {errors.instLine && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita un número de teléfono de contacto</Typography>}

                <TextField
                    type="text"
                    label="Grupo de Investigación"
                    className="ResearchGroup"
                    defaultValue={uploadUserData.ResearchGroup ? uploadUserData.ResearchGroup : ""}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("ResearchGroup")}
                />
                {errors.ResearchGroup && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita un número de teléfono de contacto</Typography>}

                <TextField
                    type="text"
                    label="Línea de semillero"
                    className="seedLine"
                    defaultValue={uploadUserData.seedLine ? uploadUserData.seedLine : ""}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                    {...register("seedLine")}
                />
                {errors.seedLine && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita un número de teléfono de contacto</Typography>}

                <TextField
                    type="text"
                    label="Rol de Usuario"
                    className="UserRole"
                    variant="filled"
                    defaultValue={uploadUserData.role ? uploadUserData.role : ""}
                    inputProps={{readOnly: true}}
                    sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                />
            </Grid>
            <Grid item xs={12} md={4} sx={{width: "100%", mx: "auto", display: "flex", justifyContent: "center"}}>
                <CustomButton name="Editar Datos" padding="0.7em 1.5em" margin="0" />
            </Grid>
        </Grid>
    </Box>
    </>
  )
}
