import { Typography, Grid, TextField, Box, Button } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from '../config/axios';
import { useNavigate } from "react-router-dom";
import { setToken } from "../config/axios";
import styled from "@emotion/styled";
import Swal from 'sweetalert2';
import Logo from '../components/Logo';
import imgLogin from '../assets/bg-login.jpg'
import CustomButton from "../components/CustomButton";

const ImgBG = styled("img")({
    width: '80%',
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    opacity: 0
})

export default function Login() {

    var disabled = false;

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data, e) => {
        const logUser = {
            emailI: data.emailI,
            password: data.password
        }

        const res = await api.post("/api/auth/login", logUser)
            .then((res) => {
                setLoading(true)
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: res.data.message,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
                setToken(res.data.token.tokenid)
                setLoading(false)
                navigate("/problem-tree")
            })
            .catch((e) => {
                console.log(e);
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
        <Box>
            <Grid
                container
                spacing={2}
                sx={{
                    background: `url(${imgLogin}) center top no-repeat`,
                    backgroundSize: "cover",
                }}
            >
                <Grid item xs={12}>
                    <ImgBG 
                        src={imgLogin}
                        alt="Imagen de fondo Ibero Project"
                    />
                </Grid>
            </Grid>
            <Grid container  alignItems="center" spacing={4} sx={{ mx: "auto", mt:{xs: "1em", md: "-20em", } , width: "auto", maxWidth: 1400 }}>
                <Grid item xs={12} md={6} sx={{ p:4 }}>
                    <Box
                        sx={{ display:"grid", gap:2, width:{ xs: "100%", md: "80%" }}}
                        component="form"
                        className="login"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* User */}
                        <TextField
                            type="email"
                            label="Usuario (email)"
                            variant="filled"
                            className="username"
                            { ...register("emailI", { required: true }) }
                        /> 
                        {errors.emailI && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita tu dirección de correo electrónico Institucional</Typography>}


                        {/* Password */}
                        <TextField
                            type="password"
                            label="Contraseña"
                            variant="filled"
                            className="password"
                            { ...register("password", { required: true, minLength: 8}) }
                        />
                        {errors.password && <Typography component="span" sx={{color: "red", fontSize: 10}}>La contraseña debe tener mínimo 8 caracteres</Typography>}

                        <Box sx={{ display:"flex", justifyContent:"end" }}>
                            <CustomButton name="Ingresar" data={disabled} />
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ p:4 }}>
                    <Box sx={{ display:"flex", justifyContent:"end" }}>
                        <CustomButton data={disabled} name='Registrarse' anchor='/signup' />
                    </Box>
                    <Box sx={{ display:"flex", justifyContent:"end" }}>
                        <Logo />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}