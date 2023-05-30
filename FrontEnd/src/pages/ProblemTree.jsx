import { Grid, Typography, Box, List, ListItem, ListItemText, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import treeImg from "../assets/arbol-problema-img.png";
import CustomList from "../components/CustomList";

export default function ProblemTree() {

    const Img = styled("img")({
        width: '100%',
        objectFit: "cover",
        objectPosition: "center",
        marginTop: "25px"
    })

    const listItems = [
        "1. El problema central no debe extenderse más de 5 renglones.",
        "2. Las causas directas es lo que genera el problema en el contexto de estudio.",
        "3. Las causas indirectas son los aspectos que generan el problema pero que estan por fuera del contexto de estudio.",
        "4. Lo mismo sucede con los efectos, sin emabrgo, ellos refieren es lo que puede suceder si el problema continua",
    ]

    const [data, setData] = useState({
        indirectEffects: {1: '', 2: ''},
        directEffects: {1: '', 2: '', 3: ''},
        centralProblem: '',
        directCauses: {1: '', 2: '', 3: ''},
        indirectCauses: {1: '', 2: ''},
    })

    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value})
    }

    const enviarDatos = (e) => {
        e.preventDefault();
        console.log("datos envidos", data);
    }

    return (
        <>
            <Grid container spacing={2} sx={{ mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "auto"} }}>
                <Grid item xs={12} md={3}>
                    <Logo />
                    <Img src={treeImg} alt="Árbol del problema" />
                    <Box>
                        <Typography variant="p" component="p" sx={{ textAlign:'left', mt: 5 }}>
                            Recuerde que:
                        </Typography>
                        <CustomList list={listItems} order />
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box
                        component="form"
                        className="problem-tree"
                        onSubmit={enviarDatos}
                    >
                        <Grid container spacing={2} sx={{mt: 4}}>
                            <Grid item xs={12} sx={{display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row"}, justifyContent: "space-evenly", mx: {xs: "10"}, alignItems: "center"}}>
                                <Typography variant="p" component="p" sx={{  }}>Efectos Indirectos</Typography>
                                <TextField
                                    label="1"
                                    multiline
                                    rows={3}
                                    onChange={handleInputChange}
                                    name={data.indirectEffects[0]}
                                />
                                <TextField
                                    label="2"
                                    multiline
                                    rows={3}
                                    onChange={handleInputChange}
                                    name={data.indirectEffects[1]}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{mt: 2}}>
                            <Grid item xs={12} sx={{display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row"}, justifyContent: "space-between", mx: 10, alignItems: "center"}}>
                                <Typography variant="p" component="p" sx={{  }}>Efectos directos</Typography>
                                <TextField
                                    label="1"
                                    multiline
                                    rows={3}
                                    onChange={handleInputChange}
                                    name={data.directEffects[0]}
                                />
                                <TextField
                                    label="2"
                                    multiline
                                    rows={3}
                                    onChange={handleInputChange}
                                    name={data.directEffects[1]}
                                />
                                <TextField
                                    label="3"
                                    multiline
                                    rows={3}
                                    onChange={handleInputChange}
                                    name={data.directEffects[2]}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{mt: 2}}>
                            <Grid item xs={12} sx={{display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row"}, justifyContent: "space-around", mx: 10, alignItems: "center"}}>
                                <Typography variant="p" component="p" sx={{  }}>Problema central</Typography>
                                <TextField
                                    label="1"
                                    multiline
                                    rows={3}
                                    sx={{width: "80%"}}
                                    onChange={handleInputChange}
                                    name="centralProblem"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{mt: 2}}>
                            <Grid item xs={12} sx={{display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row"}, justifyContent: "space-between", mx: 10, alignItems: "center"}}>
                                <Typography variant="p" component="p" sx={{  }}>Causas directas</Typography>
                                <TextField
                                    label="1"
                                    multiline
                                    rows={3}
                                    onChange={handleInputChange}
                                    name={data.directCauses[0]}
                                />
                                <TextField
                                    label="2"
                                    multiline
                                    rows={3}
                                    onChange={handleInputChange}
                                    name={data.directCauses[1]}
                                />
                                <TextField
                                    label="3"
                                    multiline
                                    rows={3}
                                    onChange={handleInputChange}
                                    name={data.directCauses[2]}
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{mt: 4}}>
                            <Grid item xs={12} sx={{display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row"}, justifyContent: "space-evenly", mx: {xs: ""}, alignItems: "center"}}>
                                <Typography variant="p" component="p" sx={{  }}>Causas indirectas</Typography>
                                <TextField
                                    label="1"
                                    multiline
                                    rows={3}
                                />
                                <TextField
                                    label="2"
                                    multiline
                                    rows={3}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ display:"flex", justifyContent:"end", mt:5 }}>
                            <CustomButton name="Guardar"  />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}