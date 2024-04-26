import { Grid, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
// import CustomButton from "./CustomButton";
import dialnetLogo from "../../assets/img-profile.png";

export default function HeaderDocenteDashboard(props) {

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
                            Hola {user.fullName ? user.fullName : "N/D"},
                        </Typography>
                        <Typography variant="p" component="p" sx={{ color:"#fff" }}>
                            {user.emailI ? user.emailI : "N/D"}
                        </Typography>
                        <Typography variant="p" component="p" sx={{ color:"#fff" }}>
                            {user.emailP ? user.emailP : "N/D"}
                        </Typography>
                        <Typography variant="p" component="p" sx={{ color:"#fff" }}>
                            {user.role ? user.role : "N/D"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography variant="h6" component="h5" sx={{ mt: 3, color:"#fff" }}>
                            Facultad de {user.faculty ? user.faculty : "N/D"}
                        </Typography>
                        <Typography variant="h6" component="h5" sx={{ mt: 3, color:"#fff" }}>
                            Programa: {user.academicProgram ? user.academicProgram: "N/D"}
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