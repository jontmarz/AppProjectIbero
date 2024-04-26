import React, { useEffect, useRef, useState } from 'react'
// import { useDataContext } from '../context/DataContext'
import { useReactToPrint } from "react-to-print";
import { api, getToken } from '../../config/axios';
import { Grid, Typography, Box } from '@mui/material'
import { HeaderSheet } from '../../components/SheetPDF/HeaderSheet'
import { ProponentData } from '../../components/SheetPDF/ProponentData'
import { DataSumaryRecords } from '../../components/SheetPDF/DataSumaryRecords'
import { DataProject } from '../../components/SheetPDF/DataProject'
import { DataProblem } from '../../components/SheetPDF/DataProblem'
import { DataGoals } from '../../components/SheetPDF/DataGoals'
import { DataMethodology } from '../../components/SheetPDF/DataMethodology'
import { EthicalChronoImpact } from '../../components/SheetPDF/EthicalChronoImpact'
import { BioReferences } from '../../components/SheetPDF/BioReferences'
import CustomButton from "../../components/CustomButton"
import Logo from "../../components/Logo"
import signupImg from "../../assets/img-signup.jpg"
import FixedButton from '../../components/FixedButton';

export default function PrintToPdf() {

    // const { dataApp } = useDataContext()
    const componentRef = useRef()
    const token = getToken()
    const [dataApp, setDataApp] = useState([{}])
    const [goalsData, setGoalsData] = useState([])
    const [description, setDescription] = useState([])
    const [justification, setJustification] = useState([])
    const [methodology, setMethodology] = useState([])
    const [problems, setProblems] = useState([])
    const [records, setRecords] = useState([])
    const [ethicalImpacts, setEthicalImpacts] = useState([])
    const [userData, setUserData] = useState([])

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `Ficha de Proyecto - ${userData.fullName}`,
        margin: { top: 20, right: 20, bottom: 20, left: 20 },
        pageStyle: `
            @page {
                size: letter;
                margin-top: 20mm; margin-right: 5mm; margin-bottom: 20mm; margin-left: 5mm;
                background-image: url(${signupImg});
                background-repeat: repeat;
                background-position: center;
            }
            body { width: 100%; overflow: hidden; }`,
        // onAfterPrint: () => alert("Se ha generado el PDF"),
        ignoreElements: [".ignore-on-pdf"],
        onAfterPrint: () => window.close()
    })

    

    useEffect(() => {
        const loadDoc = async() => {
            try {
                const { data } = await api({
                    url: "/api/dataApp/dataProject",
                    method: "GET"
                })
                setDataApp(data.data)
                setGoalsData(data.data.goals)
                setDescription(data.data.description)
                setJustification(data.data.justification.justification)
                setMethodology(data.data.methodology)
                setProblems(data.data.problems)
                setRecords(data.data.records.recordlist)
                setEthicalImpacts(data.data.ethicalImpacts)

                const user = data.data.user

                const loadUser = async() => {
                    try {
                        const res = await api({
                            url: `/api/user/${user}`,
                            method: "GET"
                        })
                        setUserData(res.data.infoUser)
                    } catch (e) {
                        console.error(e);
                    }
                }
        
                loadUser()
            } catch (e) {
                console.error(e);
            }
        }
        
        loadDoc()        
    }, [])
    
    return (
        <>
        <Box ref={componentRef} sx={{width:"1200px", mx: "auto", my: '3em', display: 'block' }} className="printToPdf">
            <Grid container spacing={4} sx={{width: '1100px', mx: 'auto' }} >
                <Grid item xs={4} sx={{ textAlign: 'center', border:1, pl: "0 !important", pt: "0 !important" }}>
                    <Logo sx={{ mt:0 }} />
                </Grid>
                <Grid item xs={8} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                    <Typography variant="h5" component="h1" sx={{ mt: 1, textAlign: 'center', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>FICHA RESUMEN DE PROYECTO PARTICULAR O DE SEMILLERO DE INVESTIGACIÓN</Typography>
                </Grid>
            </Grid>

            <HeaderSheet userData={userData} dataApp={dataApp} />

            <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
                <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                    <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'center', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Título del Proyecto: <span className="f-weight">{goalsData.titleProj ? goalsData.titleProj : "S/D"}</span></Typography>
                </Grid>
            </Grid>

            <ProponentData userData={userData} />

            <DataProject userData={userData} />
            
            <DataSumaryRecords description={description} records={records} justification={justification} />

            <DataProblem problems={problems} />

            <DataGoals goalsData={goalsData} />
            
            <DataMethodology methodology={methodology} />

            <EthicalChronoImpact ethicalImpacts={ethicalImpacts} />
            {/* <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
                <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                    <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>7. Cronograma:</Typography>
                    <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', px: 3 }}>Crono</Typography>
                </Grid>
            </Grid> */}

            <BioReferences records={records} />

            <Grid container spacing={4} sx={{ ml: 5, mt: 1 }} className="ignore-on-pdf">
                <Grid item xs={12}>
                    <CustomButton action={handlePrint} name="Imprimir PDF"/>
                    <CustomButton anchor='/dashboard' name="Menu" sx={{mx: 2}}/>
                </Grid>
            </Grid>
        </Box>
        <FixedButton />
        </>
    )
}
