import { Typography, Grid, TextField, Box, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from '../config/axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
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

const bgUrl = "../assets/bg-login.jpg"

export default function Login() {

    var disabled = false;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate()

    /* const [data, setData] = useState({
        email: '',
        password: ''
    }) */

    /* const [error, setError] = useState({
        error: false,
        message: ''
    }) */

    const [user, setUser] = useState([])

    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value})
        if (data) {
            disabled = false;
        }
    }

    const onSubmit = (data, e) => {
        setUser([ ...user, data])

        const logUser = {
            identify: data.identify,
            password: data.password
        }

        const res = api.post("/api/auth/login", logUser)
            .then((res) => {
                console.log(res.data);
            })
            .catch((e) => {
                console.log(e.response.data.message);
            })
    }

    return (
        <Box>
            <Grid
                container
                spacing={2}
                sx={{
                    background: "url(/src/assets/bg-login.jpg) center top no-repeat",
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
                            type="text"
                            label="Identificación"
                            variant="filled"
                            className="identify"
                            { ...register("identify", {required: true}) }
                        />
                        {errors.identify && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita tu número de identidad</Typography>}
                        {/* <TextField
                            type="email"
                            label="Usuario (email)"
                            variant="filled"
                            className="username"
                            { ...register("emailI", { required: true }) }
                        /> 
                        {errors.emailI && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita tu dirección de correo electrónico Institucional</Typography>} */}


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
                        <CustomButton name='Registrarse' anchor='/signup' />
                    </Box>
                    <Box sx={{ display:"flex", justifyContent:"end" }}>
                        <Logo />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}