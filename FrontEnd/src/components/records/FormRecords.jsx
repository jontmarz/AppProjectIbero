import React from 'react'
import { Box, TextField, Typography, Grid } from '@mui/material'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import CustomButton from "../CustomButton";

export const FormRecords = ({ uploadData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data, e) => {

        uploadData(data)
        console.log(data);

        Swal.fire({
            icon: 'success',
            title: '¡Antecedente agregado!',
            showConfirmButton: false,
            timer: 1500
        })
    }

    return (
        <>
            <Box
                component="form"
                className="records"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mb: 3 }}
            >
                <Grid container spacing={4} >
                    <Grid
                        item
                        xs={12}
                        sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
                    >
                        <TextField
                            type="text"
                            label="Título del Antecedente"
                            variant="filled"
                            className="titleRecord"
                            sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                            {...register("TitleRecord", { required: true })}
                        />
                        {errors.TitleRecord && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita el título del antecedente</Typography>}

                        <TextField
                            type="text"
                            label="Autor(es) del Antecedente"
                            variant="filled"
                            className="AutorRecord"
                            sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                            {...register("AutorRecord", { required: true })}
                        />
                        {errors.AutorRecord && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita el o los nombres de las autores</Typography>}

                        <TextField
                            type="text"
                            label="Resumen del Antecedente"
                            variant="filled"
                            className="ResumeRecord"
                            sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                            {...register("ResumeRecord", { required: true })}
                        />
                        {errors.ResumeRecord && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita el resumen de la base bibliográfica</Typography>}

                        <TextField
                            type="url"
                            label="Link Consulta"
                            variant="filled"
                            className="LinkRecord"
                            sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                            {...register("LinkRecord", { required: true })}
                        />
                        {errors.LinkRecord && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita el link de consulta de la base bibliográfica</Typography>}

                        <TextField
                            type="number"
                            label="Número de citas"
                            variant="filled"
                            className="NumberQuotes"
                            sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                            {...register("NumberQuotes", { required: true })}
                        />
                        {errors.NumberQuotes && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita el número de citas de la base bibliográfica</Typography>}

                        <TextField
                            type="text"
                            label="Aportes de Investigación"
                            variant="filled"
                            className="ResearchContribute"
                            sx={{ my: 2, width: {xs: "90%", md: "80%"} }}
                            multiline
                            rows={2}
                            {...register("ResearchContribute", { required: true })}
                        />
                        {errors.ResearchContribute && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Digita el número de citas de la base bibliográfica</Typography>}

                        <CustomButton name="Agregar Antecedente" />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
