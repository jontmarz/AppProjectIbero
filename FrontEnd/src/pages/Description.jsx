import React, { useState } from 'react';
import { api, getToken } from '../config/axios';
import { Grid, Typography, Box, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import CustomButton from "../components/CustomButton";
import RichTextEditor from "../components/RichTextEditor";
import { useNavigate } from "react-router-dom";

const listItems = [
    "Citas en norma APA.",
    "Mínimo 1000 palabras.",
    "Minimo 5 citas o referentes.",
    "Buena coherencias",
    "Buena ortografía",
    "Relación coherente con el árbol del problema",
]

export default function Description({state}) {
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

    const enviarDatos = async() => {
        // setContent([...content, data]);
        navigate("/goals")
        /* const res = await api({
            url: '/api/dataApp/description',
            method: 'PUT',
            headers: { Authorization: `Bearer ${getToken()}` },
            data: { content }
        }) */

        console.log(content);

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
                    </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Typography variant="h6" component="h6" sx={{ mt: 3, mb: 2 }}>
                        Descripción del problema:
                    </Typography>
                    <RichTextEditor
                        onContentChange={handleContentChange}
                    />
                    <CustomButton name="Guardar" action={enviarDatos} data={isButtonDisabled} />
                    {/* <Box
                        sx={{ display:"grid", gap:2, width:"100%"}}
                        component="form"
                        className="description"
                        onSubmit={enviarDatos}
                    >
                        <Box sx={{ display:"flex", justifyContent:"end" }}>
                            <CustomButton name="Guardar" />
                        </Box>
                    </Box> */}
                    {/* <Box
                        component="form"
                        className="problem-description"
                        onSubmit={enviarDatos}
                    >
                    </Box> */}
                </Grid>
            </Grid>
        </>
    )
}