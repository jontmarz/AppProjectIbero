import { Link } from "react-router-dom";
import { getToken } from '../config/axios'
import { Grid } from "@mui/material";

export default function ErrorPage() {
    const redirect = () => {
        if(!getToken()) {
            return "/"
        } else {
            return "/menu-pages"
        }
    }

    return (
        <>
            <Grid container spacing={4} direction="row" alignItems="center" sx={{maxWidth: 1400, margin: "auto", width: "100%"}}>
                <Grid item xs={12} md={8} sx={{textAlign: "center", pl:"0 !important" }}>
                    <h1>404</h1>
                    <h2>Page not found</h2>
                    <Link to={redirect()}>Ir a Inicio</Link>
                </Grid>
            </Grid>
        </>
    )
}