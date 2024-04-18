import React from 'react'
import { Grid, Typography, List, ListItem, ListItemText} from '@mui/material';

export const BioReferences = ({records}) => {
  return (
    <>
    <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
        <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
            <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Referencias Bibliográficas:</Typography>
            <List sx={{px: 3}}>
                {records ? Object.values(records).map((record, i) => (
                    <ListItem key={i} sx={{py:'1px'}} >
                        <ListItemText primary={`${i+1}.    ${record.TitleRecord}. - ${record.AutorRecord}. ${record.LinkRecord}.`} />
                    </ListItem>
                )) : 'S/D'}
            </List>
        </Grid>
    </Grid>
    </>
  )
}
