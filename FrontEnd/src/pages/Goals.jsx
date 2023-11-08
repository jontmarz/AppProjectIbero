import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { api, getToken } from '../config/axios';
import Swal from 'sweetalert2';
import CustomButton from "../components/CustomButton";
import CustomList from "../components/CustomList";

export default function Goals() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const token = getToken()
    const [loadCausesD, setLoadCausesD] = useState([])
    const [loadProblem, setLoadProblem] = useState([])
    const [goalsData, setGoalsData] = useState([])

    const listItems = [
        "1. Teniendo en cuenta las causas del árbol del problema se deben generar los objetivos específicos.",
        "2. El objetivo general debe salir de la problemática central del árbol.",
        "3. El titulo puede ser el mismo objetivo general sin el verbo en infinitivo."
    ]

    useEffect(() => {
        const loadTree = async () => {
            try {
                const {data} = await api({
                    url: "/api/dataApp/problem-tree",
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
    
                const CausesD = data.problemas.dirCauses
                const Problem = data.problemas
                
                setLoadCausesD(CausesD)
                setLoadProblem(Problem)
                
            } catch (e) {
                console.error(e);
            }
        }
    
        loadTree()

    }, [])


    const onSubmit = async (data, e) => {
        setGoalsData([...goalsData, data])

        const goals = {
            objEspe: {
                oe1: data.firstGoal,
                oe2: data.secondGoal,
                oe3: data.thirdGoal,
                oe4: data.forthGoal,
            },
            objGen: data.mainGoal,
            titleProj: data.titleProject
        }

        // console.log(goals);

        const res = await api({
            url: "/api/dataApp/goals",
            method: "PUT",
            headers: { Authorization: `Bearer ${token}` },
            data: { goals }
        })
            .then((res) => {
                setLoading(true)
                Swal.fire({
                    title: "¡Datos Guardados!",
                    text: res.data.message,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1500
                })
                setLoading(false)
                navigate("/justification")
            })
            .catch((e) => {
                console.error(e)
                Swal.fire({
                    title: "¡Error!",
                    text: e,
                    icon: "error",
                    confirmButtonText: "Aceptar",
                    confirmButtonColor: "#0098D4"
                })
            })
    }

    return (
        <>
        <Box
            component="form"
            className="goals"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid container spacing={2} sx={{ mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "0 auto 2em"} }}>
                <Grid item xs={12} md={6} sx={{display:"grid", gap:2, pr: 3}}>
                    <Typography variant="p" component="p" sx={{ mt: 3 }}>Objetivos específicos:</Typography>

                    {/* Causa Directa 1 */}
                    <TextField
                        type="text"
                        label="Primera causa directa del árbol del problema"
                        value={loadCausesD.cd1 || ''}
                        variant="filled"
                        className="Main-Goals"
                        color="success"
                        focused
                        InputProps={{ readOnly: true }}
                    />

                    {/* Primer Objetivo */}
                    <TextField
                        type="text"
                        label="Primer objetivo específico"
                        variant="filled"
                        className="Main-Goals"
                        { ...register("firstGoal", { required: true }) }
                    />
                    {errors.firstGoal && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el primer efecto indirecto</Typography>}

                    {/* Causa Directa 2 */}
                    <TextField
                        sx={{ mt: 2 }}
                        type="text"
                        label="Segunda causa directa del árbol del problema"
                        value={loadCausesD.cd2 || ''}
                        variant="filled"
                        className="Main-Goals"
                        color="success"
                        focused
                        InputProps={{ readOnly: true }}
                    />

                    {/* Segundo objetivo */}
                    <TextField
                        type="text"
                        label="Segundo objetivo específico"
                        variant="filled"
                        className="Main-Goals"
                        { ...register("secondGoal", { required: true }) }
                    />
                    {errors.secondGoal && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el primer efecto indirecto</Typography>}

                    {/* Causa Directa 3 */}
                    <TextField
                        sx={{ mt: 2 }}
                        type="text"
                        label="Tercera causa directa del árbol del problema"
                        value={loadCausesD.cd3 || ''}
                        variant="filled"
                        className="Main-Goals"
                        color="success"
                        focused
                        InputProps={{ readOnly: true }}
                    />

                    {/* Tercer objetivo */}
                    <TextField
                        sx={{ mt: 2 }}
                        type="text"
                        label="Tercer objetivo específico"
                        variant="filled"
                        className="Main-Goals"
                        { ...register("thirdGoal", { required: true }) }
                    />
                    {errors.thirdGoal && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el primer efecto indirecto</Typography>}

                    {/* Cuarto Objetivo */}
                    <TextField
                        sx={{ mt: 2 }}
                        type="text"
                        label="Objetivo específico 4 opcional:"
                        variant="filled"
                        className="Main-Goals"
                        { ...register("forthGoal") }
                    />
                    {errors.forthGoal && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el primer efecto indirecto</Typography>}
                </Grid>
                <Grid item xs={12} md={6} sx={{display:"grid", gap:2, pl: 3}}>
                    <Typography variant="p" component="p" sx={{ mt: 3 }}>Problema central del árbol:</Typography>

                    {/* Problema central */}
                    <TextField
                        type="text"
                        label="Problema central del árbol del problema"
                        value={loadProblem.centralProb || ''}
                        variant="filled"
                        className="Main-Goals"
                        color="success"
                        focused
                        InputProps={{ readOnly: true }}
                    />

                    {/* Objetivo General */}
                    <Typography variant="p" component="p" sx={{ mt: 3 }}>Objetivo general:</Typography>
                    <TextField
                        type="text"
                        label="Aquí debe salir el problema central guardado para la comprobación"
                        variant="filled"
                        className="Main-Goals"
                        minRows={5}
                        multiline
                        { ...register("mainGoal", { required: true }) }
                    />
                    {errors.mainGoal && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el primer efecto indirecto</Typography>}
                    <Typography variant="p" component="p" sx={{ mt: 3 }}>Titulo del proyecto:</Typography>
                    <TextField
                        type="text"
                        label="Título proyectado para el proyecto"
                        variant="filled"
                        className="Main-Goals"
                        { ...register("titleProject", { required: true }) }
                    />
                    {errors.titleProject && <Typography component="span" sx={{color: "red", fontSize: 10}}>Digita el primer efecto indirecto</Typography>}
                    <CustomList list={listItems} order />
                    <Box sx={{ display:"flex", justifyContent:"end", mt:5 }}>
                        <CustomButton name="Guardar"  />
                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}