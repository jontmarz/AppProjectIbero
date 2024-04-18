import React from 'react'
import { Grid, Typography } from '@mui/material';

export const DataProblem = ({problems}) => {

    const {dirEffect, indEffect, dirCauses, indCauses} = problems

  return (
    <>
    <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
        <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
            <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>3. Problema de Investigación:</Typography>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, px: 3, fontWeight:700 }}>Problema Central: <span className="f-weight">{problems ? problems.centralProb : 'S/D'}</span></Typography>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, px: 3, fontWeight:700 }}>Efectos Directos: <span className="f-weight">{dirEffect ? Object.entries(dirEffect).map(([key, value]) => value).join('. ') : 'S/D'}</span></Typography>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, px: 3, fontWeight:700 }}>Efectos Indirectos: <span className="f-weight">{indEffect ? Object.entries(indEffect).map(([key, value]) => value).join('. ') : 'S/D'}</span></Typography>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, px: 3, fontWeight:700 }}>Causas directas: <span className="f-weight">{dirCauses ? Object.entries(dirCauses).map(([key, value]) => value).join('. ') : 'S/D'}</span></Typography>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, px: 3, fontWeight:700 }}>Causas Indirectas: <span className="f-weight">{indCauses ? Object.entries(indCauses).map(([key, value]) => value).join('. ') : 'S/D'}</span></Typography>
        </Grid>
    </Grid>
    </>
  )
}
