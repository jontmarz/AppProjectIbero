import { useState } from "react";
import { api, getToken} from '../../config/axios';
import { useForm } from "react-hook-form";
import { Grid, Typography, Box, TextField } from "@mui/material";
import Swal from 'sweetalert2';
import CustomButton from "../../components/CustomButton";

export default function comment(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [commentData, setCommentData] = useState([])
    const [loading, setLoading] = useState(false)
    const token = getToken()
    const { idProj } = props

    const onSubmit = async (data, e) => {
        setCommentData([...commentData, data])
        const comment = data.commentItem

        const res = await api({
            url: `/api/dataApp/review/${idProj}`,
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            data: { comment }
        })
            .then((res) => {
                setLoading(true)
                Swal.fire({
                    title: "¡Comentario enviado!",
                    text: res.data.message,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4",
                })
                setLoading(false)
                navigate("/dashboard")
            })
            .catch((e) => {
                console.error(e);
                Swal.fire({
                    title: "¡Error!",
                    text: e.response.data.message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4",
                })
            })
    }
    
    return (
        <>
            <Grid item xs={12}sx={{}}>
                <Typography variant="h6" component="h6" sx={{ mt: 1}}>
                    Dejar comentarios:
                </Typography>
            </Grid>
            <Box
                component="form"
                className="form-review"
                onSubmit={handleSubmit(onSubmit)}
                sx={{width: "100%", p: "0 2em", mt: "1em"}}
            >
                <Grid container spacing={2} sx={{mt: 1}}>
                    <Grid item xs={12} md={8} sx={{}}>
                        <TextField
                            label="Dejar un comentario"
                            multiline
                            rows={3}
                            fullWidth
                            { ...register("commentItem", { required: true }) }
                        />
                        {errors.commentItem && <Typography component="span" sx={{color: "red", fontSize: 10}}>Por favor dejar un comentario</Typography>}
                    </Grid>
                    <Grid item xs={12} md={4} sx={{}}>
                        <Box sx={{display: "flex", justifyContent: "end", mt: 5}}>
                            <CustomButton name="Guardar" />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}