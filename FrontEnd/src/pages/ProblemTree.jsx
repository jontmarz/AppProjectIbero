import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { api, getToken } from '../config/axios';
import Swal from 'sweetalert2';
import CustomButton from "../components/CustomButton";
import treeImg from "../assets/arbol-problema-img.png";
import CustomList from "../components/CustomList";

const Img = styled("img")({
    width: '100%',
    objectFit: "cover",
    objectPosition: "center",
    marginTop: "25px"
})


export default function ProblemTree() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [treeData, settreeData] = useState([])
    const [loading, setLoading] = useState(false)

    const listItems = [
        "1. El problema central no debe extenderse más de 5 renglones.",
        "2. Las causas directas es lo que genera el problema en el contexto de estudio.",
        "3. Las causas indirectas son los aspectos que generan el problema pero que estan por fuera del contexto de estudio.",
        "4. Lo mismo sucede con los efectos, sin emabrgo, ellos refieren es lo que puede suceder si el problema continua",
    ]

    const onSubmit = async (data, e) => {
        settreeData([ ...treeData, data])
        
        const tree = {
            indEffect: {
                ei1: data.EI1,
                ei2: data.EI2
            },
            dirEffect: {
                ed1: data.ED1,
                ed2: data.ED2,
                ed3: data.ED3
            },
            centralProb: data.CentralProblem,
            dirCauses: {
                cd1: data.CD1,
                cd2: data.CD2,
                cd3: data.CD3
            },
            indCauses: {
                ci1: data.CI1,
                ci2: data.CI2
            }
        }
        console.log(tree);
        /* const res =  await api({
            url: "/api/dataApp/problem-tree",
            method: "PUT",
            headers: { Authorization: `Bearer ${getToken()}` },
            data: { tree }
        })
            .then((res) => {
                setLoading(true)
                Swal.fire({
                    title: "¡Datos Guardados!",
                    text: res.data.message,
                    icon: "success",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
                setLoading(false)
                navigate("/goals")
            })
            .catch((e) => {
                console.error(e)
                Swal.fire({
                    title: "¡Error!",
                    text: e.response.data.message,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
            }) */
    }

    return (
        <>
            <Grid container spacing={2} sx={{ mb: 3, px: 5, margin: {xl: "auto"} }}>
                <Grid item xs={12} md={3}>
                    <Img src={treeImg} alt="Árbol del problema" />
                    <Box>
                        <Typography variant="p" component="p" sx={{ textAlign:'left', mt: 5 }}>
                            Recuerde que:
                        </Typography>
                        <CustomList list={listItems} order />
                    </Box>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Box
                        component="form"
                        className="problem-tree"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid container spacing={2} sx={{mt: 4}}>
                            <Grid item xs={12} sx={{display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row"}, justifyContent: "space-evenly", mx: {xs: "10"}, alignItems: "center"}}>

                                {/* Efectos Indirectos */}
                                <Typography variant="p" component="p" sx={{  }}>Efectos Indirectos</Typography>
                                <TextField
                                    label="1"
                                    multiline
                                    rows={3}
                                    { ...register("EI1", { required: true }) }
                                />
                                {errors.EI1 && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el primer efecto indirecto</Typography>}

                                <TextField
                                    label="2"
                                    multiline
                                    rows={3}
                                    { ...register("EI2", { required: true }) }
                                />
                                {errors.EI2 && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el segundo efecto indirecto</Typography>}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{mt: 2}}>
                            <Grid item xs={12} sx={{display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row"}, justifyContent: "space-between", mx: 10, alignItems: "center"}}>
                                <Typography variant="p" component="p" sx={{  }}>Efectos directos</Typography>
                                <TextField
                                    label="1"
                                    multiline
                                    rows={3}
                                    { ...register("ED1", { required: true }) }
                                />
                                {errors.ED1 && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el primer efecto directo</Typography>}
                                <TextField
                                    label="2"
                                    multiline
                                    rows={3}
                                    { ...register("ED2", { required: true }) }
                                />
                                {errors.EI2 && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el segundo efecto directo</Typography>}
                                <TextField
                                    label="3"
                                    multiline
                                    rows={3}
                                    { ...register("ED3", { required: true }) }
                                />
                                {errors.ED3 && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el tercer efecto directo</Typography>}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{mt: 2}}>
                            <Grid item xs={12} sx={{display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row"}, justifyContent: "space-around", mx: 10, alignItems: "center"}}>

                                {/* Problema central */}
                                <Typography variant="p" component="p" sx={{  }}>Problema central</Typography>
                                <TextField
                                    label="Problema central"
                                    multiline
                                    rows={3}
                                    sx={{width: "80%"}}
                                    { ...register("CentralProblem", { required: true }) }
                                />
                                {errors.CentralProblem && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el problema central</Typography>}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{mt: 2}}>
                            <Grid item xs={12} sx={{display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row"}, justifyContent: "space-between", mx: 10, alignItems: "center"}}>

                                {/* Causas directas */}
                                <Typography variant="p" component="p" sx={{  }}>Causas directas</Typography>
                                <TextField
                                    label="1"
                                    multiline
                                    rows={3}
                                    { ...register("CD1", { required: true }) }
                                />
                                {errors.CD1 && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita la primera causa directa</Typography>}
                                <TextField
                                    label="2"
                                    multiline
                                    rows={3}
                                    { ...register("CD2", { required: true }) }
                                />
                                {errors.CD2 && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita la segunda causa directa</Typography>}
                                <TextField
                                    label="3"
                                    multiline
                                    rows={3}
                                    { ...register("CD3", { required: true }) }
                                />
                                {errors.CD3 && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita la tercera causa directa</Typography>}
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{mt: 4}}>
                            <Grid item xs={12} sx={{display: "flex", gap: 2, flexDirection: { xs: "column", sm: "row"}, justifyContent: "space-evenly", mx: {xs: ""}, alignItems: "center"}}>
                                <Typography variant="p" component="p" sx={{  }}>Causas indirectas</Typography>
                                <TextField
                                    label="1"
                                    multiline
                                    rows={3}
                                    { ...register("CI1", { required: true }) }
                                />
                                {errors.CI1 && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita la primera causa indirecta</Typography>}
                                <TextField
                                    label="2"
                                    multiline
                                    rows={3}
                                    { ...register("CI2", { required: true }) }
                                />
                                {errors.CI2 && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita la tercera causa indirecta</Typography>}
                            </Grid>
                        </Grid>
                        <Box sx={{ display:"flex", justifyContent:"end", mt:5 }}>
                            <CustomButton name="Guardar"  />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}