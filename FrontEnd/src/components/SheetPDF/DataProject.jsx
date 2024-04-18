import React from 'react'
import { Grid, Typography } from '@mui/material';

export const DataProject = ({userData}) => {
  return (
    <>
    <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
        <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
            <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Tipo del Proyecto: <span className="f-weight">{userData.typeProj ? userData.typeProj : 'Aplicado'}</span></Typography>
        </Grid>
    </Grid>
    <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
        <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
            <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Línea Institucional de Investigación a la que pertenece: <span className="f-weight">{userData.instLine ? userData.instLine : 'S/D'}</span></Typography>
        </Grid>
    </Grid>
    <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
        <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
            <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Grupo de Investigación al que se vincularía: <span className="f-weight">{userData.ResearchGroup ? userData.ResearchGroup : 'S/D'}</span></Typography>
        </Grid>
    </Grid>
    <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
        <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
            <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Semillero de Investigación (aplica para los estudiantes en categoría de MASTER vinculados a un semillero activo): <span className="f-weight">{userData.seedLine ? userData.seedLine : 'S/D'}</span></Typography>
        </Grid>
    </Grid>
    </>
  )
}
