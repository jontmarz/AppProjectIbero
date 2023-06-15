import { Box, Grid, TextField, Select, MenuItem, FormControl, InputLabel, Typography, Alert } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from '../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import signupImg from "../assets/img-signup.jpg";

const dataSelect = [
    { type: "CC", name: "Cédula de Ciudadanía"},
    { type: "TI", name: "Tarjeta de Identidad"},
    { type: "CE", name: "Cédula de Extranjería"},
]

export default function Signup() {

    const Img = styled("img")({
        width: '100%',
        height: "100%",
        objectFit: "cover",
        objectPosition: "center"
    })

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate()

    const [user, setUser] = useState([])

    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value})
    }

    const onSubmit = async(data, e) => {
        setUser([ ...user, data])

        const newUser = {
            fullName: data.fullName,
            typeDoc: data.typeDoc,
            identify: data.identify,
            emailI: data.emailI,
            emailP: data.emailP,
            faculty: data.faculty,
            academicProgram: data.academicProgram,
            password: data.password,
            repassword: data.repassword
        }
        
        const res = await api.post("/api/auth/register", newUser)
            .then((res) => {
                console.log(res.data);
                setLoading(true)
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: res.data.message,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
                setLoading(false)
                navigate("/")
            })
            .catch((e) => {
                console.error(e.response.data);
                Swal.fire({
                    title: "¡Error!",
                    text: e.response.data.message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
            })

    }

    return (
        <>
        <Grid container spacing={4} direction="row" alignItems="center" sx={{maxWidth: 1400, margin: "auto", width: "100%"}}>
            <Grid item xs={12} md={8}>
                <Box sx={{my:2, ml: 4}} >
                    <Logo  />
                </Box>
                <Box
                    sx={{mx: 4, mb: 5}}
                    component="form"
                    className="signup"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Grid container spacing={4} >
                        <Grid item xs={12}>
                            <Typography variant="h4" component="h2" sx={{ mt: 2, textAlign: "center" }}>Registro de Usuario</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{display:"grid", gap:2}}>
                            {/* FullName */}
                            <TextField
                                label="Nombre Completo"
                                variant="filled"
                                className="fullName"
                                {...register("fullName", { required: true})}
                            />
                            {errors.fullName && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita tu nombre completo</Typography>}
                            
                            {/* typeDoc */}
                            <FormControl>
                                <InputLabel id="documento--label">Tipo de Identificación</InputLabel>
                                <Select
                                    variant="filled"
                                    {...register("typeDoc", { required: true })}
                                    sx={{color: "#000"}}
                                >
                                    {dataSelect.map((i, index) => 
                                        <MenuItem key={index} value={i.type}>{i.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            {errors.typeDoc && <Typography component="span" sx={{color: "red", fontSize: 10}}>Elige un dato de la lista</Typography>}

                            {/* Identify */}
                            <TextField
                                type="number"
                                { ...register("identify", {required: true}) }
                                label="Número de Identificación"
                                variant="filled"
                                className="username"
                            />
                            {errors.identify && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita tu número de identidad</Typography>}

                            {/* Email Institucional */}
                            <TextField
                                type="email"
                                { ...register("emailI", { required: true }) }
                                label="Email Institucional"
                                variant="filled"
                                className="username"
                            />
                            {errors.emailI && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita tu dirección de correo electrónico Institucional</Typography>}

                            {/* Email Personal */}
                            <TextField
                                type="email"
                                { ...register("emailP", { required: true}) }
                                label="Email Personal"
                                variant="filled"
                                className="username"
                            />
                            {errors.emailP && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita tu dirección de correo electrónico Personal</Typography>}
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{display:"grid", gap:2}}>
                            {/* Facultad */}
                            <TextField
                                type="text"
                                { ...register("faculty", {required: true}) }
                                label="Facultad"
                                variant="filled"
                                className="username"
                            />
                            {errors.faculty && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita la facultad a la que perteneces</Typography>}

                            {/* Programa académico */}
                            <TextField
                                type="text" 
                                { ...register("academicProgram", { required: true}) }
                                label="Programa Académico"
                                variant="filled"
                                className="username"
                            />
                            {errors.academicProgram && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita tu programa académico</Typography>}

                            {/* Password */}
                            <TextField
                                type="password"
                                { ...register("password", { required: true, minLength: 8}) }
                                label="Contraseña"
                                variant="filled"
                                className="username"
                            />
                            {errors.password && <Typography component="span" sx={{color: "red", fontSize: 10}}>La contraseña debe tener mínimo 8 caracteres</Typography>}

                            <TextField
                                type="password"
                                { ...register("repassword", { required: true, minLength: 8}) }
                                label="Confirmar Contraseña"
                                variant="filled"
                                className="username"
                            />
                            {errors.password && <Typography component="span" sx={{color: "red", fontSize: 10}}>La contraseña debe tener mínimo 8 caracteres</Typography>}

                            {/* Botón submit */}
                            <Box sx={{ display:"flex", justifyContent:"end" }}>
                                <CustomButton name="Guardar" />
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
            <Grid item xs={12} md={4}>
                <Img src={signupImg} />
            </Grid>
        </Grid>
        </>
    )
}