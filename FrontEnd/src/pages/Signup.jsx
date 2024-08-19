import { Box, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Typography } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { api, setToken } from '../config/axios'
import { useNavigate } from "react-router-dom"
import { useUserContext } from "../context/UserContext"
import styled from "@emotion/styled"
import Swal from 'sweetalert2'
import Logo from "../components/Logo"
import CustomButton from "../components/CustomButton"
import signupImg from "../assets/img-signup.jpg"
import { typeDocSel, roleSel } from "../config/assets"

export default function Signup() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const Img = styled("img")({
        width: '100%',
        height: "100%",
        objectFit: "cover",
        objectPosition: "center"
    })

    const onSubmit = async (data, e) => {

        const res = await api.post("/api/auth/register", data)
            .then((res) => {
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: res.data.message,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
                setToken(res.data.token.tokenid)
                console.log(data);
                
                switch (data.role) {
                    case "SuperUser":
                        navigate("/settings")
                        break;
                    case "Docente":
                        navigate("/dashboard")
                        break;
                    default:
                        navigate("/records")
                        break;
                }
            })
            .catch((e) => {
                console.error(e.response.data.message)
                let errormsg;

                switch (true) {
                    case !!e.response.data.errors.password:
                        errormsg = e.response.data.errors.password;
                        break;
                    case !!e.response.data.errors.emailI:
                        errormsg = e.response.data.errors.emailI;
                        break;
                    case !!e.response.data.errors.identify:
                        errormsg = e.response.data.errors.identify;
                        break;
                    case !!e.response.data:
                        errormsg = e.response.data.message;
                        break;
                    default:
                        errormsg = e.response.data.message;
                        break;
                }
                
                
                Swal.fire({
                    title: "¡Error!",
                    text: errormsg,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
            })
    }

    return (
        <>
        <Grid container spacing={4} direction="row" alignItems="center" sx={{ maxWidth: 1400, margin: "auto", width: "100%" }}>
            <Grid item xs={12} md={9} lg={8}>
                <Box sx={{ my: 2, ml: 4 }} >
                    <Logo />
                </Box>
                <Box
                    sx={{ mx: 4, mb: 5 }}
                    component="form"
                    className="signup"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container spacing={4} >
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h2" sx={{ mt: 2, textAlign: "center" }}>Registro de Usuario</Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ display: "grid", gap: 2, gridTemplateColumns: { sm: "repeat(2,1fr)" } }}>
                            {/* FullName */}
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", order: 1 }}>
                                <TextField
                                    label="Nombre Completo"
                                    variant="filled"
                                    className="fullName"
                                    {...register("fullName", { required: true })}
                                    sx={{ color: "#000" }}
                                />
                                {errors.fullName && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita tu nombre completo</Typography>}
                            </Box>

                            {/* typeDoc */}
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", order: 3 }}>
                                <FormControl>
                                    <InputLabel id="documento--label">Tipo de Identificación</InputLabel>
                                    <Select
                                        variant="filled"
                                        defaultValue="CC"
                                        {...register("typeDoc", { required: true })}
                                        sx={{ color: "#000" }}
                                    >
                                        {typeDocSel.map((item, index) => (
                                            <MenuItem key={index} value={item.type}>
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.typeDoc && (
                                        <Typography component="span" sx={{ color: "red", fontSize: 10 }}>
                                            Elige un dato de la lista
                                        </Typography>
                                    )}
                                </FormControl>
                            </Box>

                            {/* Identify */}
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", order: 5 }}>
                                <TextField
                                    type="number"
                                    {...register("identify", { required: true })}
                                    label="Número de Identificación"
                                    variant="filled"
                                    className="username"
                                />
                                {errors.identify && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita tu número de identidad</Typography>}
                            </Box>


                            {/* Email Institucional */}
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", order: 7 }}>
                                <TextField
                                    type="email"
                                    {...register("emailI", { required: true })}
                                    label="Email Institucional"
                                    variant="filled"
                                    className="username"
                                />
                                {errors.emailI && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita tu dirección de correo electrónico Institucional</Typography>}
                            </Box>

                            {/* Email Personal */}
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", order: 9 }}>
                                <TextField
                                    type="email"
                                    {...register("emailP", { required: true })}
                                    label="Email Personal"
                                    variant="filled"
                                    className="username"
                                />
                                {errors.emailP && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita tu dirección de correo electrónico Personal</Typography>}
                            </Box>

                            {/* Facultad */}
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", order: 2 }}>
                                <TextField
                                    type="text"
                                    {...register("faculty", { required: true })}
                                    label="Facultad"
                                    variant="filled"
                                    className="username"
                                />
                                {errors.faculty && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita la facultad a la que perteneces</Typography>}
                            </Box>

                            {/* Role */}
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", order: 3 }}>
                                <FormControl>
                                    <InputLabel id="documento--label">¿Quién Eres?</InputLabel>
                                    <Select
                                        variant="filled"
                                        defaultValue="Estudiante"
                                        {...register("role", { required: true })}
                                        sx={{ color: "#000" }}
                                    >
                                        {roleSel.map((item, index) => (
                                            <MenuItem key={index} value={item.role}>
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.typeDoc && (
                                        <Typography component="span" sx={{ color: "red", fontSize: 10 }}>
                                            Elige un dato de la lista
                                        </Typography>
                                    )}
                                </FormControl>
                            </Box>

                            {/* Password */}
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", order: 6 }}>
                                <TextField
                                    type="password"
                                    {...register("password", { required: true, minLength: 8 })}
                                    label="Contraseña"
                                    variant="filled"
                                    className="username"
                                />
                                {errors.password && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>La contraseña debe tener mínimo 8 caracteres</Typography>}
                            </Box>

                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", order: 8 }}>
                                <TextField
                                    type="password"
                                    {...register("repassword", { required: true, minLength: 8 })}
                                    label="Confirmar Contraseña"
                                    variant="filled"
                                    className="username"
                                />
                                {errors.password && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>La contraseña debe tener mínimo 8 caracteres</Typography>}
                            </Box>

                            {/* Botones */}
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", order: 10 }}>
                                <Box sx={{ display: "flex", justifyContent: "center" }}>
                                    {/* Botón submit */}
                                    <CustomButton name="Registrar" />
                                    {/* Botón login */}
                                    <CustomButton name="login" anchor="/login" />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
                <Img src={signupImg} />
            </Grid>
        </Grid>
        </>
    )
}