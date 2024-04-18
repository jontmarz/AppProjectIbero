import React from 'react'
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';

export const DataMethodology = ({methodology}) => {

    const { explainGoals } = methodology
  return (
    <>
        <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
            <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>5. Metodología:</Typography>
                <Typography variant="p" component="h4" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Enfoque de la Investigación:</Typography>
                <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3}}>{methodology.approachResearch ? methodology.approachResearch : 'S/D'}</Typography>
                <Typography variant="p" component="h4" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Alcance de la Investigación:</Typography>
                <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3}}>{methodology.scopeResearch ? methodology.scopeResearch : 'S/D'}</Typography>
                <Typography variant="p" component="h4" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Diseño de la Investigación:</Typography>
                <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3}}>{methodology.designResearch ? methodology.designResearch : 'S/D'}</Typography>
                <Typography variant="p" component="h4" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Ténica de recolección de información: <span className="f-weight">{methodology.techSPickupInfo ? methodology.techSPickupInfo : 'S/D'}</span></Typography>
                <Typography variant="p" component="h4" sx={{ mt: 1, textAlign: 'left', textTransform: 'capitalize', px: 3, fontWeight:700 }}>Uso de la técnica:</Typography>
                <List sx={{px: 3}}>
                    {explainGoals ? Object.entries(explainGoals).map(([key, value],index) => (
                        <ListItem key={index} sx={{py:'1px'}}>
                            <ListItemText primary={`${index +1}.    ${value}`} />
                        </ListItem>
                    )): 'S/D'}
                </List>
            </Grid>
        </Grid>
    </>
  )
}
