import { useState } from 'react'
import { Box, TextField, Typography, Grid } from '@mui/material'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { api, getToken } from '../config/axios';
import Swal from 'sweetalert2';
import CustomButton from "../components/CustomButton";

export default function ModalRecords(props) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const token = getToken()
    const [recordsData, setRecordsData] = useState([])

    const onSubmit = async (data, e) => {
        setRecordsData([...recordsData, data])

        const records = {
            titleRecord: data.titleRecord,
            AutorRecord: data.AutorRecord,
            ResumeRecord: data.ResumeRecord,
        }

        try {
            const {data} = await api({
                url: "/api/dataApp/records",
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                data: records
            })

            Swal.fire({
                icon: 'success',
                title: '¡Antecedente agregado!',
                showConfirmButton: false,
                timer: 1500
            })

            navigate('/problem-tree')
        } catch (e) {
            console.error(e);
        }
    }

  return (
    <>
        <Typography variant='h3' component="h3" sx={{textAlign: "center", mb: 2}}>Antecedentes de la Investigación</Typography>
        <Typography variant='p' component="p" sx={{textAlign: "center", mb: 2}}>Puedes agregar un antecedente de la investigación, para ello debes diligenciar el siguiente formulario:</Typography>
        <Box
            component="form"
            className="goals"
            onSubmit={handleSubmit(onSubmit)}
            sx={{mb: 3 }}
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
                        sx={{ my: 2, width: "70%" }}
                        focused
                        { ...register("titleRecord", { required: true }) }
                    />
                    {errors.titleRecord && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el título del antecedente</Typography>}

                    <TextField
                        type="text"
                        label="Autor(es) del Antecedente"
                        variant="filled"
                        className="AutorRecord"
                        sx={{ my: 2, width: "70%" }}
                        focused
                        { ...register("AutorRecord", { required: true }) }
                    />
                    {errors.AutorRecord && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el o los nombres de las autores</Typography>}
                    
                    <TextField
                        type="text"
                        label="Resumen del Antecedente"
                        variant="filled"
                        className="ResumeRecord"
                        sx={{ my: 2, width: "70%" }}
                        focused
                        { ...register("ResumeRecord", { required: true }) }
                    />
                    {errors.ResumeRecord && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el resumen de la base bibliográfica</Typography>}

                    <TextField
                        type="text"
                        label="Link Consulta"
                        variant="filled"
                        className="LinkRecord"
                        sx={{ my: 2, width: "70%" }}
                        focused
                        { ...register("LinkRecord", { required: true }) }
                    />
                    {errors.LinkRecord && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el link de consulta de la base bibliográfica</Typography>}

                    <TextField
                        type="text"
                        label="Link Consulta"
                        variant="filled"
                        className="NumberQuotes"
                        sx={{ my: 2, width: "70%" }}
                        focused
                        { ...register("NumberQuotes", { required: true }) }
                    />
                    {errors.NumberQuotes && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el número de citas de la base bibliográfica</Typography>}

                    <TextField
                        type="text"
                        label="Link Consulta"
                        variant="filled"
                        className="ResearchContribute"
                        sx={{ my: 2, width: "70%" }}
                        focused
                        { ...register("ResearchContribute", { required: true }) }
                    />
                    {errors.ResearchContribute && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el número de citas de la base bibliográfica</Typography>}

                    <CustomButton name="Guardar Antecedente"/>
                </Grid>
            </Grid>
        </Box>
    </>
    )
}
