import React from 'react'
import { Grid, Typography } from '@mui/material';

export const EthicalChronoImpact = ({ethicalImpacts}) => {
  return (
    <>
    <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
        <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
            <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>6. Consideraciones Éticas:</Typography>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', px: 3 }}>{ethicalImpacts.ethicals}</Typography>
        </Grid>
    </Grid>
    <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
        <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
            <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>7. Cronograma:</Typography>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', px: 3 }}>Crono</Typography>
        </Grid>
    </Grid>
    <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
        <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
            <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>8. Impacto y Produco Esperado:</Typography>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', px: 3 }}>{ethicalImpacts.impacts}</Typography>
        </Grid>
    </Grid>
    </>
  )
}
