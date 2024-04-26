import { Grid, Typography, Box } from "@mui/material";

export default function dataCardDashboard(props) {
    
    const { dataP } = props

    return (
      <>
        <Grid container spacing={2} sx={{ mb:2 }}>
            <Grid item xs={12} sx={{}}>
                <Typography variant="h3" component="h2" sx={{ mt: 1, textAlign: 'center' }}>
                    Ficha de Investigación
                </Typography>
            </Grid>
            {/* Descripción y Objetivo General */}
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

            {/* Justificación y Objetivos Específicos */}
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
                    {dataP && dataP.goals && dataP.goals.objEspe ? Object.entries(dataP.goals.objEspe).map(([key, value], index) => (
                        <div key={key}>
                            <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                                <strong>Objetivo Específico {index + 1}: </strong>{value ? value : "No hay datos"}
                            </Typography>
                        </div>
                    )) : null}
                </Box>
            </Grid>

            {/* Problema central y Efectos */}
            <Grid item xs={12} sx={{}}>
                <Typography variant="h4" component="h4" sx={{ mt: 1, textAlign: 'center' }}>
                   Problemas
                </Typography>
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
                    {dataP && dataP.problems && dataP.problems.dirCauses ? Object.entries(dataP.problems.indEffect).map(([key, value]) => (
                        <div key={key}>
                            <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                                {value ? value : "No hay datos"}
                            </Typography>
                        </div>
                    )) : null}
                    <Typography variant="p" component="p" sx={{ ml:1 }}>
                        <b>Efectos Directos:</b>
                    </Typography>
                    {dataP && dataP.problems && dataP.problems.dirCauses ? Object.entries(dataP.problems.dirEffect).map(([key, value]) => (
                        <div key={key}>
                            <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                                {value ? value : "No hay datos"}
                            </Typography>
                        </div>
                    )) : null}
                </Box>
            </Grid>

            {/* Causas y Consideraciones éticas */}
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Causas:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid #000", pt: 1}}>
                    <Typography variant="p" component="p" sx={{ ml:1 }}>
                        <b>Causas Indirectas</b>
                    </Typography>
                    {dataP && dataP.problems && dataP.problems.indEffect ? Object.entries(dataP.problems.indEffect).map(([key, value]) => (
                        <div key={key}>
                            <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                                {value ? value : "No hay datos"}
                            </Typography>
                        </div>
                    )) : null}
                    <Typography variant="p" component="p" sx={{ ml:1 }}>
                        <b>Efectos Directos:</b>
                    </Typography>
                    {dataP && dataP.problems && dataP.problems.dirCauses ? Object.entries(dataP.problems.dirEffect).map(([key, value]) => (
                        <div key={key}>
                            <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                                {value ? value : "No hay datos"}
                            </Typography>
                        </div>
                    )) : null}
                </Box>
            </Grid>
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Consideraciones Éticas:
                </Typography>
                <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.ethicalImpacts && dataP.ethicalImpacts.ethicals ? dataP.ethicalImpacts.ethicals : "No hay datos"}
                </Typography>
            </Grid>

            {/* Impactos y Enfoque de la investigación */}
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Impactos y Productos Esperados:
                </Typography>
                <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.ethicalImpacts && dataP.ethicalImpacts.impacts ? dataP.ethicalImpacts.impacts : "No hay datos"}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{}}>
                <Typography variant="h4" component="h5" sx={{ mt: 1, textAlign: 'center' }}>Metodología</Typography>
            </Grid>
            <Grid item xs={12}  md={6} sx={{}}>    
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                    Enfoque de la investigación:
                </Typography>
                <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.methodology && dataP.methodology.approachResearch ? dataP.methodology.approachResearch : "No hay datos"}
                </Typography>
            </Grid>
            {/* Enfoque y Diseño de la investigación */}
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Alcance de la investigación:
                </Typography>
                <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.methodology && dataP.methodology.scopeResearch ? dataP.methodology.scopeResearch : "No hay datos"}
                </Typography>
            </Grid>
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Diseño de la investigación:
                </Typography>
                <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.methodology && dataP.methodology.designResearch ? dataP.methodology.designResearch : "No hay datos"}
                </Typography>
            </Grid>
            <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Explicación de los Objetivos:
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid #000"}}>
                    {dataP && dataP.methodology && dataP.methodology.explainGoals ? Object.entries(dataP.methodology.explainGoals).map(([key, value], index) => (
                        <div key={key}>
                            <Typography variant="p" component="p" sx={{pl:3, py:1}}>
                                <strong>Objetivo {index + 1}: </strong>{value ? value : null}
                            </Typography>
                        </div>
                    )) : "No hay datos"}
                </Box>
            </Grid>
            <Grid item xs={12} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Técnica de recolección de datos: {dataP && dataP.methodology && dataP.methodology.techSPickupInfo ? dataP.methodology.techSPickupInfo : "No hay datos"}
                </Typography>
                {/* <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.methodology && dataP.methodology.designResearch ? dataP.methodology.designResearch : "No hay datos"}
                </Typography> */}
            </Grid>

            {/* <Grid item xs={12}  md={6} sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                   Comentarios Anteriores:
                </Typography>
                <Typography variant="p" component="p" sx={{mb: 2, border: "1px solid #000", p:1}}>
                    {dataP && dataP.review && dataP.review.comment ? dataP.review.comment : "No hay datos"}
                </Typography>
            </Grid> */}
        </Grid>
      </>
    )
    
}
