import { Box, Grid, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import CustomList from "../components/CustomList";

export default function Goals() {

    const enviarDatos = () => {
        e.preventDefault();
        console.log("datos envidos");
    }
    const listItems = [
        "1. Teniendo en cuenta las causas del árbol del problema se deben generar los objetivos específicos.",
        "2. El objetivo general debe salir de la problemática central del árbol.",
        "3. El titulo puede ser el mismo objetivo general sin el verbo en infinitivo."
    ]

    return (
        <>
        <Box
            component="form"
            className="goals"
            onSubmit={enviarDatos}
        >
            <Grid container spacing={2} sx={{ mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "auto"} }}>
                <Grid item xs={12} md={6} sx={{display:"grid", gap:2, pr: 3}}>
                    <Logo />
                    <Typography variant="p" component="p" sx={{ mt: 3 }}>Objetivos específicos:</Typography>
                    <TextField
                        type="text"
                        label="Primera causa directa del árbol del problema"
                        defaultValue={'La primera causa directa del árbol del problema guardada para la comprobación'}
                        variant="filled"
                        className="Main-Goals"
                        color="success"
                        focused
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        type="text"
                        label="Primer objetivo específico"
                        variant="filled"
                        className="Main-Goals"
                        required
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        type="text"
                        label="Segunda causa directa del árbol del problema"
                        defaultValue={'La segunda causa directa del árbol del problema guardada para la comprobación'}
                        variant="filled"
                        className="Main-Goals"
                        color="success"
                        focused
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        type="text"
                        label="Segundo objetivo específico"
                        variant="filled"
                        className="Main-Goals"
                        required
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        type="text"
                        label="Tercera causa directa del árbol del problema"
                        defaultValue={'La tercera causa directa del árbol del problema guardada para la comprobación'}
                        variant="filled"
                        className="Main-Goals"
                        color="success"
                        focused
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        type="text"
                        label="Tercer objetivo específico"
                        variant="filled"
                        className="Main-Goals"
                        required
                    />
                    <TextField
                        sx={{ mt: 2 }}
                        type="text"
                        label="Objetivo específico 4 opcional:"
                        variant="filled"
                        className="Main-Goals"
                    />
                </Grid>
                <Grid item xs={12} md={6} sx={{display:"grid", gap:2, pl: 3}}>
                    <Typography variant="P" component="P" sx={{ mt: 3 }}>Problema central del árbol:</Typography>
                    <TextField
                        type="text"
                        label="Problema central del árbol del problema"
                        defaultValue={"El problema central del árbol del problema guardado para la comprobación"}
                        variant="filled"
                        className="Main-Goals"
                        color="success"
                        focused
                        InputProps={{ readOnly: true }}
                    />
                    <Typography variant="P" component="P" sx={{ mt: 3 }}>Objetivo general:</Typography>
                    <TextField
                        type="text"
                        label="Aquí debe salir el problema central guardado para la comprobación"
                        variant="filled"
                        className="Main-Goals"
                        minRows={5}
                        multiline
                        required
                    />
                    <Typography variant="P" component="P" sx={{ mt: 3 }}>Titulo del proyecto:</Typography>
                    <TextField
                        type="text"
                        label="Título proyectado para el proyecto"
                        variant="filled"
                        className="Main-Goals"
                        required
                    />
                    <CustomList list={listItems} order />
                    <Box sx={{ display:"flex", justifyContent:"end", mt:5 }}>
                        <CustomButton name="Guardar"  />
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}