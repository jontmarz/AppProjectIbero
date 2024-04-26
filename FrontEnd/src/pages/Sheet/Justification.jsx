import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, FormGroup, FormControlLabel, Checkbox, TextField } from "@mui/material"
import { api, getToken } from '../../config/axios'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { listJust, listItemsJust } from '../../config/assets'
import CustomButton from "../../components/CustomButton"
import CustomList from "../../components/CustomList"
import Swal from 'sweetalert2'

export default function Justification() {

    const [justify, setJustify] = useState([]);
    const [loadJustify, setLoadJustify] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const token = getToken()
    const [checkboxes, setCheckboxes] = useState(new Array(listItemsJust.length).fill(false));
    const navigate = useNavigate()

    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setCheckboxes(updatedCheckboxes);
    };

    const isButtonDisabled = checkboxes.filter((checkbox) => checkbox).length < listItemsJust.length;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api({
                    url: "/api/dataApp/justification",
                    method: "GET"
                })
                setLoadJustify(data.justification)
            } catch (e) {
                console.error(e);
            }
        }

        fetchData()
    }, [])

    const onSubmit = async (data, e) => {
        setJustify( ...justify, data);
        const justification = {
            justification: data.justification
        }
        
        const res = await api({
            url: "/api/dataApp/justification",
            method: "PUT",
            data: justification
        })
            .then((res) => {
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: res.data.message,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
                navigate("/goals")
            })
    }
    return (
        <>
        <Grid container spacing={2} sx={{ mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "0 auto 2em"} }}>
            <Grid item xs={12} md={5}>
                <Typography variant="p" component="p" sx={{ mt: 3 }}>
                La justificación consiste en una explicación argumentada de las razones que motivan a la realización del proyecto, buscando responder a la pregunta “¿Por qué?” o “¿Para qué?”.
                </Typography>
                <Typography variant="h5" component="h5" sx={{ mt: 2 }}>
                    ¿Cómo hacer una justificación de un proyecto?
                </Typography>
                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                    Ahora os voy a explicar e 4 sencillos pasos cómo hacer una justificación de un proyecto:
                </Typography>
                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                    Dentro de esa justificación, tiene que plantearte las siguientes cuestiones:
                </Typography>
                <CustomList list={listJust} order />
                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                    Después de cumplir con los requisitos puede guardar:
                </Typography>
                {listItemsJust.map((item, index) => (
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
            </Grid>
            <Grid item xs={12} md={7}>
                <Box
                    component="form"
                    className="justification"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Typography variant="h6" component="h6" sx={{ mt: 3, mb: 2 }}>
                        Justificación:
                    </Typography>
                    <TextField
                        id="Justficacion-field"
                        label={loadJustify?.justification ? "Justificación" : "Incluya la justificación del proyecto"}
                        focused={loadJustify?.justification ? true : false}
                        multiline
                        defaultValue={loadJustify ? loadJustify?.justification : ''}
                        minRows={25}
                        sx={{ width: "100%", mb: 2 }}
                        { ...register("justification", { required: true }) }
                        />
                    {errors.Justification && <Typography component="span" sx={{color: "red", fontSize: 10}}>Ingresa la justificación del proyecto</Typography>}
                    <Box sx={{ display:"flex", justifyContent:"end" }}>
                        <CustomButton name="Guardar"  data={isButtonDisabled} />
                        {loadJustify ? <CustomButton anchor='/dashboard' name="Menu" sx={{mx: 2}}/> : null }
                    </Box>
                </Box>
                <Typography variant='p' component="p" color="red" sx={{mt: 2, fontSize: 'small'}}>Para continuar, verifique los requisitos y selecione la casilla cuando se haya cumplido</Typography>
            </Grid>
        </Grid>
        </>
    )
}