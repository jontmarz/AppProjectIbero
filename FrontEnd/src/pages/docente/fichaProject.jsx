import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, getToken } from '../../config/axios';
import { useForm } from "react-hook-form";
import { Grid, Typography, Box, TextField } from "@mui/material";
import Swal from 'sweetalert2';
import CustomButton from "../../components/CustomButton";
import DataStudentDashboard from "../../components/ProjectPage/dataStudentDashboard";
import DataCardDashboard from "../../components/ProjectPage/dataCardDashboard";

export default function fichaProject() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [dataProj, setDataProj] = useState([])
    const [loading, setLoading] = useState(false)
    const token = getToken()
    const [dataStudent, setDataStudent] = useState([])
    const [commentData, setCommentData] = useState([])
    let { idProject } = useParams();

    useEffect(() => {
        const loadDataProj = async () => {
            try {
                const res = await api({
                    url: `/api/dataApp/${idProject}`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
                const dataApp = res.data.data
                setDataProj(dataApp)

                const student = dataApp.user;

                const loadDataStudent = async () => {
                    try {
                        const response = await api({
                            url: `/api/user/${student}/`,
                            method: "GET",
                            headers: { Authorization: `Bearer ${token}` }
                        })
                        const dataStudent = response.data.infoUser
                        setDataStudent(dataStudent)
                        
                    } catch (e) {
                        console.error(e);
                    }
                }
        
                loadDataStudent()
                
            } catch (e) {
                console.error(e);
            }
        }

        loadDataProj()
    }, [token, idProject])

    // console.log(dataProj);

    const onSubmit = async (data, e) => {
        setCommentData([...commentData, data])
        const comment = data.commentItem

        console.log(comment);

        const res = await api({
            url: `/api/dataApp/review/${idProject}`,
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
            <Grid container spacing={2} sx={{ mt: 2, mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "0 auto 2em"} }}>
                <DataStudentDashboard user={dataStudent} data={dataProj} />
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                    <DataCardDashboard dataP={dataProj} />
                </Grid>
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
            </Grid>
        </>
    )
}