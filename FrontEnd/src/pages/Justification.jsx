import { Grid, List, Typography, ListItem, ListItemText, ListItemIcon, Box } from "@mui/material";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Logo from "../components/Logo";
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

const enviarDatos = () => {
    console.log("datos envidos");
}

export default function Justification() {
    return (
        <>
            <Grid container spacing={2} sx={{ mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "auto"} }}>
                <Grid item xs={12} md={5}>
                    <Logo />
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
                    <CustomList list={listItems} />
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
                            <CustomButton name="Guardar" />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}