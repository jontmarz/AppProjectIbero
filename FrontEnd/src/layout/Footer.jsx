import { Grid, Typography } from "@mui/material";

export default function footer() {
    return (
        <>
            <footer id="footer">
                <Grid container spacing={4} direction="row" alignItems="center" sx={{maxWidth: 1400, margin: "auto", width: "100%", mb:3}}>
                    <Grid item xs={12} md={4} >
                        <Typography variant="h4" component="h3">Contacto</Typography>
                        <Typography variant="p" component="p">Si tienes alguna duda o sugerencia, no dudes en contactarnos.</Typography>
                        <Typography variant="p" component="p">Correo: <Typography variant="p" component="a" href="mailto:support@ibero.edu.co">support@ibero.edu.co</Typography ></Typography>
                    </Grid>
                    {/* <Grid item xs={12} md={4} >
                        <h2 className="footer-title">Redes sociales</h2>
                        <p className="footer-text">Síguenos en nuestras redes sociales.</p>
                        <ul className="social-links">
                            <li><a href="https://www.facebook.com/iberoamericana.edu.co" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="https://twitter.com/iberoamericana" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="https://www.instagram.com/iberoamericana/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="https://www.youtube.com/user/iberoamericana" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></li>
                        </ul>
                    </Grid>
                    <Grid item xs={12} md={4} >
                            <h2 className="footer-title">Ubicación</h2>
                            <p className="footer-text">Calle 67 No. 5-27 Bogotá, Colombia</p>
                            <p className="footer-text">Teléfono: (57-1) 353 7000</p>
                    </Grid> */}
                </Grid>
            </footer>
        </>
    )
}