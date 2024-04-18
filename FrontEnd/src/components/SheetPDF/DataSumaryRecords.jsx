import React from 'react'
import { Grid, Typography, List, ListItem, ListItemText} from '@mui/material';

export const DataSumaryRecords = ({description, records, justification}) => {
  return (
    <>
    <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
        <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
            <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>1. Resumen de la propuesta:</Typography>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, px: 3, whiteSpace: 'pre-line' }}>{description.desText ? description.desText : "S/D"}</Typography>
        </Grid>
    </Grid>
    <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
        <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
            <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>2. Antecedentes y Justificación:</Typography>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', px: 3, fontWeight:700 }}>Antecedentes:</Typography>
            <List sx={{px: 3}}>
                {records ? Object.values(records).map((record, i) => (
                    <ListItem key={i} sx={{py:'1px'}} >
                        <ListItemText primary={`${record.TitleRecord}. - ${record.ResearchContribute}.`} />
                    </ListItem>
                )) : 'S/D'}
            </List>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, px: 3, fontWeight:700 }}>Justificación:</Typography>
            <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, px: 3, whiteSpace: 'pre-line' }}>{justification ? justification : 'S/D'}</Typography>
        </Grid>
    </Grid>
    </>
  )
}
