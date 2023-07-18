import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Grid, Typography, Box } from "@mui/material";
import AdsClickIcon from '@mui/icons-material/AdsClick';
import CustomButton from '../components/CustomButton';

export default function MenuPages() {

    const navigate = useNavigate()
    const menuItems = [
        {
            title: "Antecedentes",
            url: "/records",
        },
        {
            title: "Árbol del Problema",
            url: "/problem-tree",
        },
        {
            title: "Descripción del Problema",
            url: "/description",
        },
        {
            title: "Título y Objetivos",
            url: "/goals",
        },
        {
            title: "Justificación",
            url: "/justification",
        },
        {
            title: "Metodología",
            url: "/metodology",
        },
        {
            title: "Consideraciones Éticas",
            url: "/ethics",
        },
        {
            title: "Protocolos e Impáctos",
            url: "/impacts",
        },
    ]
    
    return (
        <>
        <Grid container spacing={2} sx={{ justifyContent: "center", my: 5 }}>
            <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                {menuItems.map((item, index) =>
                    <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "between", alignItems: "center", width: "100%" }}>
                        <Grid container spacing={2} sx={{ justifyContent: "center", alignItems: "center" }}>
                            <Grid item xs={2}>
                                <AdsClickIcon key={index} sx={{ fontSize: 25, color: "#000", my: 2, mr: "3em" }} />
                            </Grid>
                            <Grid item xs={7}>
                                <Typography key={index} variant="h4" component="p" sx={{ fontSize: 20, fontWeight: "bold", my: 2, mr: "3em" }}>{item.title}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <CustomButton key={index} name="Editar" anchor={item.url} />
                            </Grid>
                        </Grid>
                    </Box>
                )}
            </Grid>
        </Grid>
        </>
    )
}
