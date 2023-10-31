import { Grid, Typography, Box } from "@mui/material";

export default function DataUserDashboard(props) {

    const { user } = props
    const { data } = props
    const goals = data.goals

    return (
        <>
            <Box sx={{width:"100%", p:"0 2em", mt:"1em"}}>
                <Grid container spacing={2} sx={{backgroundColor:"#666", borderRadius:"25px 25px 0 0", p:"0 1em"}}>
                    <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: "flex-start", alignItems: "start", flexDirection: "column"}}>
                        
                        <Typography variant="h6" component="h6" sx={{ mt: 1, mb: 1, color:"#fff"}}>
                            <b>Nombre: </b> <i>{user.fullName ? user.fullName : "N/D" }</i>,
                        </Typography>
                        
                        <Typography variant="h6" component="h6" sx={{ mt: 1, mb: 1, color:"#fff"}}>
                            <b>Título Proyecto: </b> <i>{data && data.goals && data.goals.titleProj ? data.goals.titleProj: "N/D"}</i>,
                        </Typography>
                        
                        <Typography variant="h6" component="h6" sx={{ mt: 1, mb: 1, color:"#fff"}}>
                            <b>Tipo Proyecto: </b> <i>{data.type ? data.typeProj : "Básico"}</i>,
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        
                        <Typography variant="h6" component="h5" sx={{ mt: 1, color:"#fff" }}>
                            <b>Facultad: </b>{user.faculty ? user.faculty: "N/D"}
                        </Typography>

                        <Typography variant="h6" component="h5" sx={{ mt: 1, color:"#fff" }}>
                            <b>Programa: </b>{user.academicProgram ? user.academicProgram : "N/D"}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" component="h5" sx={{ mt: 1, color:"#fff" }}>
                            <b>Línea de Investigación: </b>{user.researchLine ? user.researchLine : "Semillero"}
                        </Typography>

                        <Typography variant="h6" component="h5" sx={{ mt: 1, color:"#fff" }}>
                            <b>Grupo de Investigación: </b>{user.group ? user.group : "N/D"}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}