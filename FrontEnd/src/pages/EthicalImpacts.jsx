import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, FormGroup, FormControlLabel, Checkbox, TextField } from "@mui/material"
import { api, getToken } from '../config/axios'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import CustomButton from "../components/CustomButton"
import CustomList from "../components/CustomList"
import Swal from 'sweetalert2'

const listJust = [
    "1. La necesidad de ese proyecto ¿Por qué se va a hacer?",
    "2. Finalidad del proyecto, ¿Para qué se va a hacer?",
    "3. ¿Qué problemáticas resuelve?",
    "4. Las exigencias que tiene. ¿Cómo se va a hacer?"
]

const listItems = [
    "Mínimo 800 palabras",
    "Mínimo 5 citas o referentes en norma APA",
    "Buena coherencia",
    "Buena ortografía",
]


export default function Justification() {

    const [ethicalImpacts, setEthicalImpacts] = useState([]);
    const [loadEtichalImpacts, setLoadEtichalImpacts] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const token = getToken()
    const [checkboxes, setCheckboxes] = useState(new Array(listItems.length).fill(false));
    const navigate = useNavigate()

    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setCheckboxes(updatedCheckboxes);
    };

    const isButtonDisabled = checkboxes.filter((checkbox) => checkbox).length < listItems.length;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api({
                    url: "/api/dataApp/ethicalImpacts",
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
                setLoadEtichalImpacts(data.res)
            } catch (e) {
                console.error(e.response.data);
            }
        }
        
        fetchData()
    }, [])
    console.log(loadEtichalImpacts);
    
    const onSubmit = async (data, e) => {
        // setEthicalImpacts( ...ethicalImpacts, data);

        const ethicalImpacts = {
            ethicals: data.ethicals,
            impacts: data.impacts
        }
        
        const res = await api({
            url: "/api/dataApp/ethicalImpacts",
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            data: ethicalImpacts
        })
            .then((res) => {
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: res.data.message,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
                navigate("/methodology")
            })
    }
    return (
        <>
        <Grid container spacing={2} sx={{ mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "0 auto 2em"} }}>
            <Grid item xs={12} md={5}>
                <Typography variant="h4" component="h2" sx={{ mt: 2 }}>
                    Consideraciones Éticas
                </Typography>
                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                    Ahora os voy a explicar e 4 sencillos pasos cómo hacer una justificación de un proyecto:
                </Typography>
                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                    Dentro de esa justificación, tiene que plantearte las siguientes cuestiones:
                </Typography>
                <CustomList list={listJust} order />

                <Typography variant="h4" component="h2" sx={{ mt: 2 }}>
                    Impactos y Productos Esperados
                </Typography>

                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                    Después de cumplir con los requisitos puede guardar:
                </Typography>
                {listItems.map((item, index) => (
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
                        Consideraciones Éticas:
                    </Typography>
                    <TextField
                        id="Ethical-field"
                        label="Incluya las consideraciones éticas del proyecto"
                        multiline
                        defaultValue={loadEtichalImpacts ? loadEtichalImpacts?.ethicals : ''}
                        minRows={12}
                        sx={{ width: "100%", mb: 2 }}
                        { ...register("ethicals", { required: true }) }
                        />
                    {errors.ethicals && <Typography component="span" sx={{color: "red", fontSize: 10}}>Ingresa la justificación del proyecto</Typography>}

                    <Typography variant="h6" component="h6" sx={{ mt: 3, mb: 2 }}>
                        Impactos y productos esperados:
                    </Typography>
                    <TextField
                        id="Impact-field"
                        label="Incluya los impáctos y los productos esperados del proyecto"
                        multiline
                        defaultValue={loadEtichalImpacts ? loadEtichalImpacts?.impacts : ''}
                        minRows={12}
                        sx={{ width: "100%", mb: 2 }}
                        { ...register("impacts", { required: true }) }
                        />
                    {errors.impacts && <Typography component="span" sx={{color: "red", fontSize: 10}}>Ingresa la justificación del proyecto</Typography>}
                    <Box sx={{ display:"flex", justifyContent:"end" }}>
                        <CustomButton name="Guardar"  data={isButtonDisabled} />
                        {Object.entries(loadEtichalImpacts).length !== 0 ? <CustomButton anchor='/dashboard' name="Menu" sx={{mx: 2}}/> : null}
                    </Box>
                </Box>
                <Typography variant='p' component="p" color="red" sx={{mt: 2, fontSize: 'small'}}>Para continuar, verifique los requisitos y selecione la casilla cuando se haya cumplido</Typography>
            </Grid>
        </Grid>
        </>
    )
}