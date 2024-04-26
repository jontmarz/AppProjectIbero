import React from 'react'
import { Grid, Box, Typography, Card, CardContent, CardMedia } from '@mui/material'
import { listFeatures } from '../../config/assets'
import iconFeature1 from '../../assets/WebPage/iconFeature1.jpeg'
import iconFeature2 from '../../assets/WebPage/iconFeature2.jpeg'
import iconFeature3 from '../../assets/WebPage/iconFeature3.jpeg'
import iconFeature4 from '../../assets/WebPage/iconFeature4.jpeg'
import CustomButton from '../CustomButton'

const imageMap = {iconFeature1, iconFeature2, iconFeature3, iconFeature4}

export default function Features() {
  return (
    <>
    <div id="features">
        <Grid container elevation="2" sx={{ width: "100%", mt: 5 }}>
            <Grid item xs={12}>
                <Typography variant="h3" component="h2" align="center" color="secondary" sx={{ mt: 2, fontWeight:"600" }}>Características</Typography>
            </Grid>
        </Grid>
        <Grid container alignItems="stretch" sx={{ width: "100%", mt: 5 }}>
            {listFeatures.map((item, i) => (
            <Grid item xs={12} md={3} key={i} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: "stretch", p: 2 }}>
                <Card sx={{ width: '100%', p: 2, height: '100%', borderRadius: 4, boxShadow: 3, transition: 'box-shadow 0.3s', '&:hover': {boxShadow: 8}}}>
                    <CardMedia
                        component="img"
                        height="auto"
                        image={imageMap[item.img]}
                        alt={item.txt}
                        sx={{
                            position: 'relative',
                            borderRadius: "50%",
                        }}
                    />
                    <CardContent sx={{ textAlign: 'center', my: '2em' }}>
                        <Typography variant="h6" component="h5" color="primary" sx={{fontWeight: "600"}}>
                            {item.txt}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            ))}
        </Grid>
        <Grid container sx={{ width: "100%", mt: 5 }}>
            <Grid item xs={12} sx={{textAlign: "center"}}>
                <CustomButton name="Iniciar Sesión" anchor="/login" color="#0098D4" txtHovColor="#0098D4" />
            </Grid>
        </Grid>
    </div>
    </>
  )
}
