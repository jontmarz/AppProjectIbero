import { Grid, Typography, Box } from "@mui/material";

export default function dataCardDashboard(props) {
    
    const { dataP } = props

    return (
      <>
        <Grid container spacing={2} sx={{  }}>
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                    Descripción:
                </Typography>
                <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.description && dataP.description.desText ? dataP.description.desText : "No hay datos"}
                </Typography>
            </Grid>
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Objetivo General:
                </Typography>
                <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.goals && dataP.goals.objGen ? dataP.goals.objGen : "No hay datos"}
                </Typography>
            </Grid>
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                    Justificación:
                </Typography>
                <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.justification && dataP.justification.jusText ? dataP.description.jusText : "No hay datos"}
                </Typography>
            </Grid>
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Objetivos Específicos:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid #000"}}>
                    <Typography variant="p" component="p" sx={{p:1}}>
                        <b>Objetivo Específico 1: </b>{dataP && dataP.goals && dataP.goals.objEspe && dataP.goals.objEspe.oe1 ? dataP.goals.objEspe.oe1 : "No hay datos"}
                    </Typography>
                    <Typography variant="p" component="p" sx={{p:1}}>
                        <b>Objetivo Específico 2: </b>{dataP && dataP.goals && dataP.goals.objEspe && dataP.goals.objEspe.oe2 ? dataP.goals.objEspe.oe2 : "No hay datos"}
                    </Typography>
                    <Typography variant="p" component="p" sx={{p:1}}>
                        <b>Objetivo Específico 3: </b>{dataP && dataP.goals && dataP.goals.objEspe && dataP.goals.objEspe.oe3 ? dataP.goals.objEspe.oe3 : "No hay datos"}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Problema Central:
                </Typography>
                <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.problems && dataP.problems.centralProb ? dataP.problems.centralProb : "No hay datos"}
                </Typography>
            </Grid>
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Efectos:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid #000", pt: 1}}>
                    <Typography variant="p" component="p" sx={{ ml:1 }}>
                        <b>Efectos Indirectos:</b>
                    </Typography>
                    <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                        {dataP && dataP.problems && dataP.problems.indEffect && dataP.problems.indEffect.ei1 ? dataP.problems.indEffect.ei1 : "No hay datos"}
                    </Typography>
                    <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                        {dataP && dataP.problems && dataP.problems.indEffect && dataP.problems.indEffect.ei2 ? dataP.problems.indEffect.ei2 : "No hay datos"}
                    </Typography>
                    <Typography variant="p" component="p" sx={{ ml:1 }}>
                        <b>Efectos Directos:</b>
                    </Typography>
                    <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                        {dataP && dataP.problems && dataP.problems.dirEffect && dataP.problems.dirEffect.ed1 ? dataP.problems.dirEffect.ed1 : "No hay datos"}
                    </Typography>
                    <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                        {dataP && dataP.problems && dataP.problems.dirEffect && dataP.problems.dirEffect.ed2 ? dataP.problems.dirEffect.ed2 : "No hay datos"}
                    </Typography>
                    <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                        {dataP && dataP.problems && dataP.problems.dirEffect && dataP.problems.dirEffect.ed3 ? dataP.problems.dirEffect.ed3 : "No hay datos"}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Causas:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid #000", pt: 1}}>
                    <Typography variant="p" component="p" sx={{ ml:1 }}>
                        <b>Causas Directas</b>
                    </Typography>
                    <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                        {dataP && dataP.problems && dataP.problems.dirCauses && dataP.problems.dirCauses.cd1 ? dataP.problems.dirCauses.cd1 : "No hay datos"}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Comentarios Anteriores:
                </Typography>
                <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.review && dataP.review.comment ? dataP.review.comment : "No hay datos"}
                </Typography>
            </Grid>
        </Grid>
      </>
    )
    
}
