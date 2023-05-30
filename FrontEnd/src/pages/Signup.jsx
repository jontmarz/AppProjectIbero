import { Box, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import signupImg from "../assets/img-signup.jpg";

export default function Signup() {

    const Img = styled("img")({
        width: '100%',
        height: "100%",
        objectFit: "cover",
        objectPosition: "center"
    })

    const dataSelect = {
        CC: "Cédula de Ciudadanía",
        CE: "Cédula de Extranjería",
        PA: "Pasaporte",
    }

    const [data, setData] = useState({
        name: '',
        typeDoc: '',
        numDoc: '',
        emailI: '',
        emailP: '',
        faculty: '',
        academicProgram: '',
        password: '',
        rePassword: '',
    })

    const [error, setError] = useState({
        error: false,
        message: ''
    })

    const [loading, setLoading] = useState(false)

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value})
    }

    const enviarDatos = (e) => {
        e.preventDefault();
        console.log("datos enviados ", data);
    }

    return (
        <>
        <Grid container spacing={4} direction="row" alignItems="center" sx={{maxWidth: 1400, margin: "auto"}}>
            <Grid item xs={12} md={8}>
                <Box sx={{my:2, ml: 4}} >
                    <Logo  />
                </Box>
                <Box
                    sx={{mx: 4}}
                    component="form"
                    className="signup"
                    onSubmit={enviarDatos}
                >
                    <Grid container spacing={4} >
                        <Grid item xs={12} sm={6} sx={{display:"grid", gap:2}}>
                            <TextField type="text" onChange={handleInputChange} name="name" label="Nombre Completo" variant="filled" className="username"  required />
                            <FormControl>
                                <InputLabel id="documento--label">Tipo de Identificación</InputLabel>
                                <Select variant="filled" onChange={e => handleInputChange(e)} name="typeDoc" sx={{color: "#000"}}>
                                    {Object.entries(dataSelect).map((i, index) => 
                                        <MenuItem key={index} value={i[0]}>{i[1]}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <TextField type="number" onChange={handleInputChange} name="numDoc" label="Número de Identificación" variant="filled" className="username"  required />
                            <TextField type="email" onChange={handleInputChange} name="emailI" label="Email Institucional" variant="filled" className="username"  required />
                            <TextField type="email" onChange={handleInputChange} name="emailP" label="Email Personal" variant="filled" className="username"  required />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{display:"grid", gap:2}}>
                            <TextField type="text" onChange={handleInputChange} name="faculty" label="Facultad" variant="filled" className="username"  required />
                            <TextField type="text" onChange={handleInputChange} name="academicProgram" label="Programa Académico" variant="filled" className="username"  required />
                            <TextField type="password" onChange={handleInputChange} name="password" label="Contraseña" variant="filled" className="username"  required />
                            <TextField type="password" onChange={handleInputChange} name="rePassword" label="Confirmar Contraseña" variant="filled" className="username"  required />
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