import React, { useState } from 'react';
import { Grid, Typography, Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RichTextEditor from "../components/RichTextEditor";
import CustomButton from "../components/CustomButton";
import CustomList from "../components/CustomList";

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
    const [content, setContent] = useState('');
    const handleContentChange = (newContent) => {
        setContent(newContent);
    }
    const [checkboxes, setCheckboxes] = useState(new Array(listItems.length).fill(false));
    const navigate = useNavigate()

    const handleCheckboxChange = (index) => {
        const updatedCheckboxes = [...checkboxes];
        updatedCheckboxes[index] = !updatedCheckboxes[index];
        setCheckboxes(updatedCheckboxes);
    };

    const isButtonDisabled = checkboxes.filter((checkbox) => checkbox).length < listItems.length;

    const enviarDatos = () => {
        console.log(content);
        console.log("datos envidos");
        navigate("/print-to-pdf")
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
                    <Typography variant='p' component="p" color="red" sx={{mt: 2, fontSize: 'small'}}>Para continuar, verifique los requisitos y selecione la casilla cuando se haya cumplido</Typography>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Box
                        component="form"
                        className="justification"
                        onSubmit={enviarDatos}
                    >
                        <Typography variant="h6" component="h6" sx={{ mt: 3, mb: 2 }}>
                            Justificación:
                        </Typography>
                        <RichTextEditor />
                        <Box sx={{ display:"flex", justifyContent:"end" }}>
                            <CustomButton name="Guardar" data={isButtonDisabled} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}