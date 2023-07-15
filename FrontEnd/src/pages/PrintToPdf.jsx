import React, { useEffect, useRef, useState} from 'react'
import { useReactToPrint } from "react-to-print";
import { ReactPdf } from '../components/ReactPdf'
import { api, getToken } from '../config/axios';
import { Grid, Typography, Box } from '@mui/material';
import CustomButton from "../components/CustomButton";

export const PrintToPdf = () => {
    const componentRef = useRef()
    const token = getToken()
    const [goalsData, setGoalsData] = useState([])
    const [goalsEspect, setGoalsEspect] = useState([])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Presentación de Proyecto",
        onAfterPrint: () => alert("Se ha generado el PDF"),
        // onAfterPrint: () => window.close()
    })

    useEffect(() => {
        const loadDoc = async() => {
            try {
                const { data } = await api({
                    url: "/api/dataApp/goals",
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
                setGoalsData(data.goals)
                setGoalsEspect(data.goals.objEspe)
            } catch (e) {
                console.error(e);
            }
        }

        loadDoc()
    }, [])

    const forthGoal = goalsEspect.oe4

    // console.log(goalsData);

    return (
        <>
            <Box ref={componentRef} sx={{width: '100%', }} className="printToPdf">
                <Grid>
                    <Grid>
                        <Typography variant="h4" component="h1" sx={{ mt: 3, textAlign: 'center', mb: 5, textTransform: 'capitalize' }}>{goalsData.titleProj}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{px: 10, mx: "auto" }}>
                    <Grid item xs={12} md={6} sx={{ py: 3 }}>
                            <Typography variant="p" component="p" sx={{ border: "1px solid #000", p: 1 }}>Objetivo General</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ py: 3 }}>
                    <Typography variant="p" component="p" sx={{ border: "1px solid #000", p: 1 }}>{goalsData.objGen}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{px: 10, mx: "auto" }}>
                    <Grid item xs={12} md={6} sx={{ py: 3 }}>
                        <Typography variant="p" component="p" sx={{ border: "1px solid #000", p: 1 }}>Primer Objetivo</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ py: 3}}>
                    <Typography variant="p" component="p" sx={{ border: "1px solid #000", p: 1 }}>{goalsEspect.oe1}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{px: 10, mx: "auto" }}>
                    <Grid item xs={12} md={6} sx={{ py: 3}}>
                        <Typography variant="p" component="p" sx={{ border: "1px solid #000", p: 1 }}>Segundo Objetivo</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ py: 3}}>
                    <Typography variant="p" component="p" sx={{ border: "1px solid #000", p: 1 }}>{goalsEspect.oe2}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{px: 10, mx: "auto" }}>
                    <Grid item xs={12} md={6} sx={{ py: 3}}>
                        <Typography variant="p" component="p" sx={{ border: "1px solid #000", p: 1 }}>Tercer Objetivo</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ py: 3}}>
                    <Typography variant="p" component="p" sx={{ border: "1px solid #000", p: 1 }}>{goalsEspect.oe3}</Typography>
                    </Grid>
                </Grid>

                { forthGoal ? (
                    <Grid container spacing={4} sx={{px: 10, mx: "auto" }}>
                        <Grid item xs={12} md={6} sx={{ py: 3}}>
                            <Typography variant="p" component="p" sx={{ border: "1px solid #000", p: 1 }}>Cuarto Objetivo</Typography>
                        </Grid>
                        <Grid item xs={12} md={6} sx={{ py: 3}}>
                        <Typography variant="p" component="p" sx={{ border: "1px solid #000", p: 1 }}>{goalsEspect.oe4}</Typography>
                        </Grid>
                    </Grid>
                    
                ) : '' }
                {/* <Grid container spacing={4} sx={{ mb: 5, ml: 5 }}>
                    <Grid item xs={12}>
                        <CustomButton name='Editar Objetivos' anchor='/goals'/>
                    </Grid>
                </Grid> */}
                <Grid container spacing={4} sx={{ ml: 5 }}>
                    <Grid item xs={12}>
                        <CustomButton action={handlePrint} name="Imprimir PDF"/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
