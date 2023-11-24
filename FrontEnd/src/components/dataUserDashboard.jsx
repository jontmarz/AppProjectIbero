import { Grid, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
import CustomButton from "../components/CustomButton";
import dialnetLogo from "../assets/img-profile.png";

export default function DataUserDashboard(props) {

    const Img = styled("img")({
        width: '150px',
        objectFit: "cover",
        objectPosition: "center",
    })
    const { user } = props

    return (
        <>
            <Box sx={{width:"100%", p:"1em 2em", mt:"2em"}}>
                <Grid container spacing={2} sx={{backgroundColor:"#666", borderRadius:"25px 25px 0 0", p:"1em"}}>
                    <Grid item xs={12} md={2} sx={{ display: "flex", alignItems: "end"}}>
                        <Img src={dialnetLogo} alt="Avatar" />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h4" component="h2" sx={{ mt: 3, mb: 1, color:"#fff" }}>
                            Hola {user.fullName},
                        </Typography>
                        <Typography variant="p" component="p" sx={{ color:"#fff" }}>
                            {user.emailI}
                        </Typography>
                        <Typography variant="p" component="p" sx={{ color:"#fff" }}>
                            {user.emailP}
                        </Typography>
                        <Typography variant="p" component="p" sx={{ color:"#fff" }}>
                            {user.role}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" component="h5" sx={{ mt: 3, color:"#fff" }}>
                            Facultad de {user.faculty}
                        </Typography>
                        <Typography variant="h6" component="h5" sx={{ mt: 3, color:"#fff" }}>
                            Programa: {user.academicProgram}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ display: "flex", alignItems: "end"}}>
                        {/* <CustomButton name="Editar" /> */}
                    </Grid>
                    
                </Grid>

            </Box>
        </>
    )
}