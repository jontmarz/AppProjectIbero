import React, { useState } from "react";
import { Grid, Typography, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useUserContext } from "../context/UserContext"
import { Link } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { listSocialMedia } from "../config/assets";
import FixedButton from "../components/FixedButton";
import Logo from "../components/Logo";

export default function Footer() {

    const { user } = useUserContext()
    const socialIcon = [FacebookIcon, TwitterIcon, InstagramIcon, YouTubeIcon]

    if (!user) return null
    
    return (
        <>
        <footer id="footer">
            {user ?
            <Grid container spacing={4} direction="row" alignItems="center" sx={{maxWidth: 1400, margin: "auto", width: "100%", mb:3}}>
                <Grid item xs={12} md={4} >
                    <Typography variant="h4" component="h3">Contacto</Typography>
                    <Typography variant="p" component="p">Si tienes alguna duda o sugerencia, no dudes en contactarnos.</Typography>
                    <Typography variant="p" component="p">Correo: <Typography variant="p" component="a" href="mailto:support@ibero.edu.co">support@ibero.edu.co</Typography ></Typography>
                </Grid>
            </Grid>
            : 
            <Grid container spacing={4} direction="row" alignItems="center" sx={{maxWidth: 1400, margin: "auto", width: "100%", mb:3}}>
                <Grid item xs={12} md={4} >
                    <Logo />
                </Grid>
                <Grid item xs={12} md={4} >
                    <Typography variant="h5" component="h3">Redes sociales</Typography>
                    <Typography variant="p" component="p">Síguenos en nuestras redes sociales.</Typography>
                    <List>
                        {listSocialMedia.map((item, i) => (
                        <ListItem key={i} disablePadding>
                            <ListItemButton component={Link} to={item.url} target="_blank">
                                <ListItemIcon>
                                    {React.createElement(socialIcon[i])}
                                </ListItemIcon>
                                <ListItemText primary={item.name} />
                            </ListItemButton>
                        </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={12} md={4} >
                    <Typography variant="h5" component="h3">Ubicación</Typography>
                    <Typography variant="p" component="p">Calle 67 No. 5-27 Bogotá, Colombia</Typography>
                    <Typography variant="p" component="p">Teléfono: (57-1) 353 7000</Typography>
                </Grid>
            </Grid>
            }
        </footer>
        <FixedButton />
        </>
    )
}