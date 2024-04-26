import React from 'react'
import { Grid, Typography } from "@mui/material";

export const DataProfile = (props) => {

    const { user } = props

    if (!user) return null

    return (
        <>
        <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h6" sx={{ mt: 1, mb: 1, color: "#fff" }}>
                <strong>Investigador: </strong> <i>{user && user.fullName ? user.fullName : "N/D"}</i>
            </Typography>

            <Typography variant="h6" component="h6" sx={{ mt: 1, mb: 1, color: "#fff" }}>
                <strong>Tipo Proyecto: </strong> <i>{user && user.type ? data.typeProj : "Básico"}</i>
            </Typography>
        </Grid>
        <Grid item xs={12} md={4}>

            <Typography variant="h6" component="h5" sx={{ mt: 1, color: "#fff" }}>
                <strong>Facultad: </strong>{user && user.faculty ? user.faculty : "N/D"}
            </Typography>

            <Typography variant="h6" component="h5" sx={{ mt: 1, color: "#fff" }}>
                <strong>Programa: </strong>{user && user.academicProgram ? user.academicProgram : "N/D"}
            </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
            <Typography variant="h6" component="h5" sx={{ mt: 1, color: "#fff" }}>
                <strong>Línea de Investigación: </strong>{user && user.researchLine ? user.researchLine : "Semillero"}
            </Typography>

            <Typography variant="h6" component="h5" sx={{ mt: 1, color: "#fff" }}>
                <strong>Grupo de Investigación: </strong>{user && user.group ? user.group : "N/D"}
            </Typography>
        </Grid>
        </>
    )
}
