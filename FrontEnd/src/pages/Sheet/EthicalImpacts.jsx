import React, { useEffect, useState } from 'react'
import { Grid, Typography, Box, FormGroup, FormControlLabel, Checkbox, TextField } from "@mui/material"
import { api, getToken } from '../../config/axios'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { listItemsJust } from '../../config/assets'
import CustomButton from "../../components/CustomButton"
import CustomList from "../../components/CustomList"
import Swal from 'sweetalert2'


export default function Justification() {

    const [ethicalImpacts, setEthicalImpacts] = useState([]);
    const [loadEtichalImpacts, setLoadEtichalImpacts] = useState([]);
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
                    url: "/api/dataApp/ethicalImpacts",
                    method: "GET"
                })
                setLoadEtichalImpacts(data.res)
            } catch (e) {
                console.error(e.response.data);
            }
        }
        
        fetchData()
    }, [])
    
    const onSubmit = async (data, e) => {
        // setEthicalImpacts( ...ethicalImpacts, data);

        const ethicalImpacts = {
            ethicals: data.ethicals,
            impacts: data.impacts
        }
        
        const res = await api({
            url: "/api/dataApp/ethicalImpacts",
            method: "PUT",
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
                    Es fundamental que el estudiante se comprometa a respetar los principios éticos y morales que guían la investigación académica. 
                </Typography>
                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                    Esto implica la protección de la confidencialidad de los participantes, la obtención de consentimiento informado, el manejo responsable de los datos y el respeto a la integridad y diversidad de las comunidades involucradas.
                </Typography>
                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                    Asimismo, se espera que el estudiante esté al tanto de las normativas y regulaciones éticas pertinentes en su campo de estudio y busque orientación adicional si surge alguna duda o conflicto ético durante el proceso de investigación.
                </Typography>

                <Typography variant="h4" component="h2" sx={{ mt: 2 }}>
                    Impactos y Productos Esperados
                </Typography>
                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                el estudiante debe tener en cuenta tanto los resultados académicos como los impactos prácticos y sociales de su trabajo.
                </Typography>
                <Typography variant="p" component="p" sx={{ mt: 2 }}>
                El estudiante debe anticipar y planificar cómo comunicar los resultados de su investigación de manera efectiva. Al prever los posibles impactos y productos de su investigación, el estudiante puede maximizar su contribución al conocimiento y a la sociedad en general.
                </Typography>
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
                        Consideraciones Éticas:
                    </Typography>
                    <TextField
                        id="Ethical-field"
                        label={loadEtichalImpacts?.ethicals ? "Consideraciones éticas" : "Incluya las consideraciones éticas del proyecto"}
                        focused={loadEtichalImpacts?.ethicals ? true : false}
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
                        label={loadEtichalImpacts?.impacts ? "Impactos y productos esperados" : "Incluya los impáctos y los productos esperados del proyecto"}
                        multiline
                        focused={loadEtichalImpacts?.impacts ? true : false}
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