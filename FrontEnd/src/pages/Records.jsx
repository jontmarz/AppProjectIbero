import { Grid, Typography, Box } from "@mui/material";
import styled from "@emotion/styled";
import { DataGrid } from '@mui/x-data-grid';
import Logo from "../components/Logo";
import dialnetLogo from "../assets/logos/dialnet.png";
import redalycLogo from "../assets/logos/redalyc.png";
import scifloLogo from "../assets/logos/sciflo.png";
import CustomButton from "../components/CustomButton";

export default function Records() {

    const imgLogos = [
        {
            img: dialnetLogo,
            alt: "Dialnet"
        },
        {
            img: redalycLogo,
            alt: "Redalyc"
        },
        {
            img: scifloLogo,
            alt: "SciFlo"
        },
    ]

    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'title', headerName: 'Título del antecedente', width: 200 },
        { field: 'author', headerName: 'Autor(es)', width: 200 },
        { field: 'resume', headerName: 'Resumen', width: 200 },
        { field: 'link', headerName: 'Link de consulta', width: 200 },
        { field: 'quotes', headerName: 'Número de citas', width: 100 },
        { field: 'inputs', headerName: 'Aportes de Investigación', width: 200 },
    ]

    const rows = [
        { id: 1, title: 'Título', author: 'Jon', resume: 'Este es el resumen', link: 'https://dato.com', quotes: '5', inputs: 'Aporte' },
    ]

    const Img = styled("img")({
        width: '50%',
        objectFit: "cover",
        objectPosition: "center"
    })

    return (
        <>
            <Box sx={{maxWidth: 1400, margin: "auto"}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Logo />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="p" component="p" sx={{ textAlign:'center', mt: 2 }}>Recuerde las bases bibliograficas que puede consultar:</Typography>
                        <Grid container spacing={2}>
                            {imgLogos.map((logo, index) => 
                            <Grid item xs={4}>
                                <Img src={logo.img} alt={logo.alt} />
                            </Grid>
                                )}
                        </Grid>
                    </Grid>
                </Grid>
                <Box sx={{mx:2}}>
                    <DataGrid
                        sx={{ mb: 3}}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page:0, pageSize : 5},
                            }
                        }}
                        pageSizeOptions={[5, 10]}
                    />
                    <Box sx={{ display:"flex", justifyContent:"end" }}>
                        <CustomButton name="Guardar"/>
                    </Box>
                </Box>
            </Box>
        </>
    )
}