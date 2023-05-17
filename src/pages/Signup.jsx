import { Box, Grid, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import styled from "@emotion/styled";
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
    
    const dataSelect = [
        {
            doc: "Cédula de Ciudadanía",
            value: "CC"
        },
        {
            doc: "Cédula de Extranjería",
            value: "CE"
        },
        {
            doc: "Pasaporte",
            value: "PA"
        },
    ]

    const enviarDatos = (e) => {
        console.log("datos envidos");
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
                            <TextField type="text" label="Nombre Completo" variant="filled" className="username"  required />
                            <FormControl>
                                <InputLabel id="documento--label">Tipo de Identificación</InputLabel>
                                <Select variant="filled" sx={{color: "#000"}}>
                                    {dataSelect.map((i, index) => 
                                        <MenuItem key={index} value={i.value}>{i.doc}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <TextField type="number" label="Número de Identificación" variant="filled" className="username"  required />
                            <TextField type="email" label="Email Institucional" variant="filled" className="username"  required />
                            <TextField type="email" label="Email Personal" variant="filled" className="username"  required />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{display:"grid", gap:2}}>
                            <TextField type="text" label="Facultad" variant="filled" className="username"  required />
                            <TextField type="text" label="Programa Académico" variant="filled" className="username"  required />
                            <TextField type="password" label="Contraseña" variant="filled" className="username"  required />
                            <TextField type="password" label="Confirmar Contraseña" variant="filled" className="username"  required />
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