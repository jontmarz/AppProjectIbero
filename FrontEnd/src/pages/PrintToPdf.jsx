import React, { useEffect, useRef, useState} from 'react'
import { useReactToPrint } from "react-to-print";
import { ReactPdf } from '../components/ReactPdf'
import { api, getToken } from '../config/axios';
import { Grid, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";

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

    function createData(id, name, code, email, phone) {
        return { id, name, code, email, phone };
    }

    const rowsTable = [
        createData('1', 'Shakira Mebarak', '100102005', 'smebarak@uni.edu.co', '315555555'),
    ]

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
            <Box ref={componentRef} sx={{width: '1000px', mx: "auto", my: 2, pt: 2 }} className="printToPdf">
                <Grid container spacing={4}>
                    <Grid item xs={4} sx={{ textAlign: 'center', border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Logo sx={{ mt:0 }} />
                    </Grid>
                    <Grid item xs={8} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h5" component="h1" sx={{ mt: 1, textAlign: 'center', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>FICHA RESUMEN DE PROYECTO PARTICULAR O DE SEMILLERO DE INVESTIGACIÓN</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={9} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Facultad, Programa / Semillero de Investigación</Typography>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Ingeniería Ciencias Básicas - <span className="f-weight">ingenieria</span></Typography>
                    </Grid>
                    <Grid item xs={3} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'center', mb: 1, px: 3, fontWeight:700 }}>Fecha de entrega a Comité Focal: </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'center', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Título del Proyecto: <span className="f-weight">{goalsData.titleProj}</span></Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Proponentes del proyecto:</Typography>
                        <TableContainer component={Paper} sx={{mx:2, my:2, maxWidth: 1000 }}>
                            <Table sx={{ minWidth: 600 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{border:1, fontWeight: 700, fontSize: 18}}>Nombre Completo</TableCell>
                                        <TableCell sx={{border:1, fontWeight: 700, fontSize: 18}}>Código</TableCell>
                                        <TableCell sx={{border:1, fontWeight: 700, fontSize: 18}}>Correo Electrónico</TableCell>
                                        <TableCell sx={{border:1, fontWeight: 700, fontSize: 18}}>Teléfono de Contacto</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rowsTable.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 1, fontSize: 16 } }}
                                        >
                                            <TableCell component="th" scope="row">{row.id + '. ' + row.name}</TableCell>
                                            <TableCell align="right">{row.code}</TableCell>
                                            <TableCell align="right">{row.email}</TableCell>
                                            <TableCell align="right">{row.phone}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Tipo del Proyecto: <span className="f-weight"></span></Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Línea Institucional de Investigación a la que pertenece: <span className="f-weight"></span></Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Grupo de Investigación al que se vincularía: <span className="f-weight"></span></Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Semillero de Investigación (aplica para los estudiantes en categoría de MASTER vinculados a un semillero activo): <span className="f-weight"></span></Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>1. Resumen de la propuesta:</Typography>
                        <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, px: 3 }}>Lorem Ipsum</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>2. Antecedentes y Justificación:</Typography>
                        <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, px: 3 }}>Lorem Ipsum</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>3. Problema de Investigación:</Typography>
                        <Typography variant="p" component="p" sx={{ mt: 1, textAlign: 'left', mb: 1, px: 3 }}>Lorem Ipsum</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={4} sx={{ mt: 0 }}>
                    <Grid item xs={12} sx={{ border:1, pl: "0 !important", pt: "0 !important" }}>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>4. Objetivo General y Objetivos Específicos:</Typography>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Objetivo General: <span className="f-weight">Lorem Ipsum</span></Typography>
                        <Typography variant="h6" component="h1" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight:700 }}>Objetivos específicos: <span className="f-weight">Lorem Ipsum</span></Typography>
                    </Grid>
                </Grid>
                {/* <Grid container spacing={4} sx={{px: 10, mx: "auto" }}>
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
                    
                ) : '' } */}
                {/* <Grid container spacing={4} sx={{ mb: 5, ml: 5 }}>
                    <Grid item xs={12}>
                        <CustomButton name='Editar Objetivos' anchor='/goals'/>
                    </Grid>
                </Grid> */}
                <Grid container spacing={4} sx={{ ml: 5, mt: 1 }}>
                    <Grid item xs={12}>
                        <CustomButton action={handlePrint} name="Imprimir PDF"/>
                        <CustomButton anchor='/menu-pages' name="Menu" sx={{mx: 2}}/>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
