import { useState, useEffect } from "react";
import { api, getToken} from '../../config/axios';
import { useForm } from "react-hook-form";
import { Grid, Typography, Box, TextField, Radio, RadioGroup } from "@mui/material";
import { typeStatus } from "../../config/assets";
import Swal from 'sweetalert2';
import CustomButton from "../CustomButton";

export default function Comment(props) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [commentData, setCommentData] = useState([])
    const [loadComment, setLoadComment] = useState([])
    // const [loading, setLoading] = useState(false)
    const token = getToken()
    const { idProj } = props
    
    const fetch = async () => {
        try {
            const res = await api({
                url: `/api/dataApp/review/${idProj}`,
                method: "GET"
            })
            const data = res.data.data
            setLoadComment(data)
        } catch (e) {
            console.error(e.response.data);
        }
    }

    useEffect(() => {
        if (token) {
            fetch()
        } else {
            loadComment(null)
        }
    }, [])

    const focus = loadComment ? true : false
    const label = loadComment ? "último comentario" : "Dejar un comentario"

    const onSubmit = async (data, e) => {
        setCommentData([...commentData, data])
        const comment = {
            comment: data.commentItem,
            state: data.status
        }

        const res = await api({
            url: `/api/dataApp/review/${idProj}`,
            method: "PUT",
            data: comment
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

    if (loadComment?.state !== undefined) {	
        var findValue = (valueToFind) => {
            const status = typeStatus.find(status => status.value === valueToFind);
            return status ? { RGlabel: status.label, RGcolor: status.colorR } : null;
        }
        const valueToFind = loadComment?.state
        var { RGlabel, RGcolor } = findValue(valueToFind)
    }

    
    return (
        <>
            <Grid item xs={12}sx={{ background: "rgba(0,0,0,0.1)", borderRadius: "15px", mt: 2}}>
                <Typography variant="h5" component="h6" sx={{ py: 1}}>
                    Dejar comentarios:
                </Typography>
            </Grid>
            <Box
                component="form"
                className="form-review"
                onSubmit={handleSubmit(onSubmit)}
                sx={{width: "100%", p: "0 2em", background: "rgba(0,0,0,0.1)", borderRadius: "15px", pb: 2 }}            >
                <Grid container spacing={2} sx={{mt: 1}}>
                    <Grid item xs={12} md={8} sx={{}}>
                        <TextField
                            label={label}
                            multiline
                            rows={3}
                            fullWidth
                            focused={focus}
                            defaultValue={loadComment ? loadComment.comment : ""}
                            { ...register("commentItem", { required: true }) }
                        />
                        {errors.commentItem && <Typography component="span" sx={{color: "red", fontSize: 10}}>Por favor dejar un comentario</Typography>}
                        {loadComment && loadComment?.state ? 
                        <>
                            <Typography variant="h6" component="h6" sx={{ mt: 2, mb:1 }}>Estado de la Ficha:</Typography>

                            <Typography variant="p" component="p" sx={{ mb: 1, fontWeight: 500, color: RGcolor }}><span className="c-black">Estado actual: </span>{RGlabel}</Typography>
                        </> : null}

                        <Typography variant="h6" component="h6" sx={{ mt: 2, mb:1 }}>Elija un estado</Typography>
                        <RadioGroup
                            row aria-label
                            sx={{ maxWidth: "600px", width: "auto", display: "flex", justifyContent: "center"}}
                        >
                            {typeStatus.map((item, index) => (
                                <Box key={index} sx={{ width: "200px", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center" }}>
                                    <Radio
                                        {...register("status", { required: true })}
                                        color={item.colorR}
                                        value={item.value}
                                        
                                    />
                                    <Typography sx={{ textAlign: "center", color: item.color }}>{item.label}</Typography>
                                </Box>
                            ))}
                            </RadioGroup>
                        
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