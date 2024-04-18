import React from 'react'
import { Grid, Typography, List, ListItem, ListItemText } from '@mui/material';

export const DataGoals = ({ goalsData }) => {

    const { objEspe } = goalsData

    return (
        <>
            <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
                <Grid item xs={12} sx={{ border: 1, pl: "0 !important", pt: "0 !important" }}>
                    <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight: 700 }}>4. Objetivo General y Objetivos Específicos:</Typography>
                    <Typography variant="h6" component="h3" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight: 700 }}>Objetivo General: <span className="f-weight"></span></Typography>
                    <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3 }}>{goalsData ? goalsData.objGen : 'S/D'}</Typography>
                    <Typography variant="h6" component="h3" sx={{ mt: 1, textAlign: 'left', textTransform: 'capitalize', px: 3, fontWeight: 700 }}>Objetivos específicos:</Typography>
                    <List sx={{ px: 3 }}>
                        {objEspe ? Object.entries(objEspe).map(([key, value], index) => (
                            <ListItem key={index} sx={{ py: '1px' }}>
                                <ListItemText primary={`${index + 1}.    ${value}`} />
                            </ListItem>
                        )) : 'S/D'}
                    </List>
                </Grid>
            </Grid>
        </>
    )
}
