import React, { useEffect, useState } from 'react'
import { api, getToken } from '../../config/axios'
import { Grid, Typography, Box, FormGroup, FormControlLabel, Checkbox, TextField } from "@mui/material"
import { useForm } from "react-hook-form";
import { listItemsDescr } from '../../config/assets'
import CustomButton from "../../components/CustomButton"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

export default function Description({state}) {

    const [describe, setDescribe] = useState('');
    const [loadDescribe, setLoadDescribe] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const token = getToken()
    const [checkboxes, setCheckboxes] = useState(new Array(listItemsDescr.length).fill(false));
    const navigate = useNavigate()

    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setCheckboxes(updatedCheckboxes);
    };

    const isButtonDisabled = checkboxes.filter((checkbox) => checkbox).length < listItemsDescr.length;

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await api({
                url: "/api/dataApp/description",
                method: "GET"
            })
            setLoadDescribe(data.description)
        }
        fetchData()
    }, [])

    const onSubmit = async(data, e) => {
        // setDescribe([...describe, data]);

        const description = {
            desText: data.description
        }

        const res = await api({
            url: "/api/dataApp/description",
            method: "PUT",
            data: description
        })
            .then((res) => {
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: res.data.message,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
                navigate("/justification")
            })
            .catch((e) => {
                Swal.fire({
                    title: "¡Error!",
                    text: e.response.data.message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
            })
    }

    return (
        <>
        <Grid container spacing={2} sx={{ mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "0 auto 2em"} }}>
            <Grid item xs={12} md={4}>
                <Box>
                    <Typography variant="p" component="p" sx={{ mt: 3 }}>
                        Partiendo de lo identificado en el árbol del problema y los antecedentes, se debe elaborar la descripción del problema en forma narrativa (minimo 1000 palabras), tenga en cuenta utilizar citas o referentes que emuestren la problematica utilizando la norma APA. Es una buena práctica consultar estadísticas que demuestren la problemática y se pueden utilizar gráficas, teniendo en cuenta que tambien deben tener citas en norma APA.
                    </Typography>
                    <Typography variant="p" component="p" sx={{ mt: 3, mb:2 }}>
                        Después de cumplir con los requisitos puede guardar:
                    </Typography>
                    {listItemsDescr.map((item, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center'}}>
                            <FormGroup>
                                <FormControlLabel
                                    required
                                    control={<Checkbox
                                        checked={checkboxes[index]}
                                        onChange={() => handleCheckboxChange(index)}
                                    />}
                                />
                            </FormGroup>
                        {item}
                        </div>
                    ))}
                    <Typography variant='p' component="p" color="red" sx={{mt: 2, fontSize: 'small'}}>Para continuar, verifique los requisitos y selecione la casilla cuando se haya cumplido</Typography>
                </Box>
            </Grid>
            <Grid item xs={12} md={8}>
                <Box
                    component="form"
                    className="description"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography variant="h6" component="h6" sx={{ mt: 3, mb: 2 }}>
                        Descripción del problema:
                    </Typography>
                    <TextField
                        id="Description-field"
                        label={loadDescribe ? "Descripción" : "Incluya la descripción del problema"}
                        multiline
                        focused={loadDescribe ? true : false}
                        defaultValue={loadDescribe ? loadDescribe?.desText : ""}
                        minRows={13}
                        sx={{ width: "100%", mb: 2 }}
                        { ...register("description", { required: true }) }
                    />
                    {errors.description && <Typography component="span" sx={{color: "red", fontSize: 10}}>Ingresa la descripción del problema</Typography>}
                    <CustomButton name="Guardar" data={isButtonDisabled} />
                    {loadDescribe ? <CustomButton anchor='/dashboard' name="Menu" sx={{mx: 2}}/> : null}
                </Box>
            </Grid>
        </Grid>
        </>
    )
}