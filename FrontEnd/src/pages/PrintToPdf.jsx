import React, { useEffect, useRef, useState} from 'react'
import { useReactToPrint } from "react-to-print";
import { ReactPdf } from '../components/ReactPdf'
import { api, getToken } from '../config/axios';
import { Grid, Typography } from '@mui/material';
import CustomButton from "../components/CustomButton";

export const PrintToPdf = () => {
    const componentRef = useRef()
    const token = getToken()
    const [goalsData, setGoalsData] = useState([])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: "Presentación de Proyecto",
        onAfterPrint: () => alert("Se ha generado el PDF"),
        // onAfterPrint: () => window.close()
    })

    useEffect(() => {
        const loadDoc = async () => {
            try {
                const {data} = await api({
                    url: "/api/dataApp/goals",
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
    
                setGoalsData(data.goals)
            } catch (e) {
                console.error(e);
            }
        }

        loadDoc()
    }, [])

    console.log(goalsData);

    return (
        <>
            <div ref={componentRef} style={{width: '100%', height: window.innerHeight}}>
                <Grid>
                    <Grid>
                        <Typography variant="h4" component="h1" sx={{ mt: 3, textAlign: 'center' }}>{goalsData.titleProj}</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{px: 10, maxWidth: {xl: 1400}, margin: {xl: "auto"} }}>
                    <Grid item xs={12} md={6} sx={{ py: 3}}>
                            <Typography variant="p" component="p">Objetivo General</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ py: 3}}>
                    <Typography variant="p" component="p">{goalsData.objGen}</Typography>
                    </Grid>
                </Grid>
                {/* <Grid container spacing={4} sx={{px: 10, maxWidth: {xl: 1400}, margin: {xl: "auto"} }}>
                    <Grid item xs={12} md={6} sx={{ py: 3}}>
                            <Typography variant="p" component="p">Primer Objetivo</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ py: 3}}>
                    <Typography variant="p" component="p">{goalsData.objEspe.oe1}</Typography>
                    </Grid>
                </Grid> */}
                <CustomButton action={handlePrint} name="Imprimir PDF"/>

            </div>
        </>
    )
}
