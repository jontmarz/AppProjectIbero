import React from 'react'
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export const ProponentData = ({ userData }) => {

    function createData(id, name, code, email, phone) {
        return { id, name, code, email, phone };
    }
    const rowsTable = [
        createData('1', 'Shakira Mebarak', '100102005', 'smebarak@uni.edu.co', '315555555'),
    ]
    return (
        <>
            <Grid container spacing={4} sx={{ mt: 0, width: '1100px', mx: 'auto' }}>
                <Grid item xs={12} sx={{ border: 1, pl: "0 !important", pt: "0 !important" }}>
                    <Typography variant="h6" component="h2" sx={{ mt: 1, textAlign: 'left', mb: 1, textTransform: 'capitalize', px: 3, fontWeight: 700 }}>Proponentes del proyecto:</Typography>
                    <TableContainer component={Paper} sx={{ mx: "auto", my: 2, maxWidth: 1000 }}>
                        <Table sx={{ minWidth: 600 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ border: 1, fontWeight: 700, fontSize: 18 }}>Nombre Completo</TableCell>
                                    <TableCell sx={{ border: 1, fontWeight: 700, fontSize: 18 }}>Código</TableCell>
                                    <TableCell sx={{ border: 1, fontWeight: 700, fontSize: 18 }}>Correo Electrónico</TableCell>
                                    <TableCell sx={{ border: 1, fontWeight: 700, fontSize: 18 }}>Teléfono de Contacto</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsTable.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 1, fontSize: 16 } }}
                                    >
                                        <TableCell component="th" scope="row">{userData ? userData.fullName : 'Jon Doe'}</TableCell>
                                        <TableCell align="right">{userData.code ? userData.code : '100102005'}</TableCell>
                                        <TableCell align="right">{userData ? userData.emailI : 'user@ibero.edu.co'}</TableCell>
                                        <TableCell align="right">{userData.phone ? userData.phone : '315555555'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </>
    )
}
