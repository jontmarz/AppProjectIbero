import React from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, Button, Hidden } from '@mui/material'
import { Link } from "react-router-dom";
import HeroImg from '../../assets/WebPage/Hero-Banner.png'
import HeroImgM from '../../assets/WebPage/Hero-Banner-m.png'

export default function Hero() {
    return (
        <>
        <Card sx={{  }}>
            <Hidden mdUp>
                <CardMedia
                    component="img"
                    height="600"
                    image={HeroImgM}
                    alt="hero"
                    sx={{
                        position: 'relative',
                        
                    }}
                />
            </Hidden>
            <Hidden mdDown>
                <CardMedia
                    component="img"
                    height="600"
                    image={HeroImg}
                    alt="hero"
                    sx={{
                        position: 'relative',
                        
                    }}
                />
            </Hidden>
            <Button
                variant="contained"
                component={Link}
                color="primary"
                sx={{
                    position: 'relative',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    mt: '-10em',
                }}
                to="/login"
            >
                Iniciar sesión
            </Button>
            <CardContent sx={{ textAlign: 'center', my: '2em' }}>
                <Typography variant="h3" component="h1" gutterBottom color="secondary">
                    Bienvenido a <strong>Research Pro</strong>
                </Typography>
                <Typography variant="h5" component="p" color="primary" paragraph>
                    ¡La plataforma todo en uno para la gestión de proyectos de investigación!
                </Typography>
                <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ mt: 5 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h3" component="h3" color="secondary">
                            ¿Qué es <br /> ResearchPro?
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" component="p" color="primary" align="left" paragraph>
                            ResearchPro es una plataforma integral diseñada para simplificar y potenciar la gestión de proyectos de investigación en entornos académicos. Desde la planificación hasta la ejecución y evaluación, ResearchPro ofrece una solución completa para estudiantes, docentes e investigadores.
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card >
    </>
  )
}
