import React from 'react'
import { Grid, Typography } from '@mui/material';

export const HeaderSheet = ({userData, dataApp}) => {

  let date = new Date(dataApp.deadline).toLocaleDateString('es-ES')
  
  return (
    <>
        <Grid container spacing={4} sx={{ mt: 4, width: '1100px', mx: 'auto' }}>
            <Grid item xs={9} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Facultad, Programa / Semillero de Investigación</Typography>
                <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Ingeniería Ciencias Básicas - <span className="f-weight">{ userData.faculty ? userData.faculty : "S/D" } {userData.seedLine ? `/ ${userData.seedLine}` : ''}</span></Typography>
            </Grid>
            <Grid item xs={3} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'center', mb: 1, px: 3, fontWeight:700 }}>Fecha de entrega a Comité Focal: <br /> {date ? date : 'S/D'}</Typography>
            </Grid>
        </Grid>
    </>
  )
}
