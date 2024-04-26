import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Box, Chip, TextField } from '@mui/material'
import styled from '@emotion/styled'
import { useForm, Controller, set } from "react-hook-form"
import { api, getToken } from '../../config/axios'
import { listTPickupInfo } from '../../config/assets'
import Swal from 'sweetalert2'
import CustomButton from "../../components/CustomButton"
import methodImg from "../../assets/methodology.png"

export default function Methodology() {

  const { register, control, handleSubmit, formState: { errors } } = useForm();
  const token = getToken()
  const navigate = useNavigate()
  const [Method, setMethod] = useState([])
  const [loadMethod, setLoadMethod] = useState([])
  const [loadGoals, setLoadGoals] = useState([])
  

  useEffect(() => {
    const loadGoals = async () => {
      try {
        const { data } = await api({
          url: "/api/dataApp/goals",
          method: "GET"
        })

        const goals = data.goals.objEspe

        setLoadGoals(goals)

      } catch (e) {
        console.error(e);
      }
    }

    loadGoals()

    const fetchData = async () => {
      try {
        const { data } = await api({
          url: "/api/dataApp/methodology",
          method: "GET"
        })
        setLoadMethod(data.data)
      } catch (e) {
        console.error(e);
      }

    }

    fetchData()

  }, [])

  const Img = styled("img")({
    width: '100%',
    height: "100%",
    objectFit: "cover",
    objectPosition: "center"
  })

  const onSubmit = async (data, e) => {
    setMethod([...Method, data])

    const methodology = {
      summary: data.summary,
      approachResearch: data.approachResearch,
      scopeResearch: data.scopeResearch,
      designResearch: data.designResearch,
      techSPickupInfo: data.techSPickupInfo,
      explainGoals: {
        eg1: data.explainGoal1,
        eg2: data.explainGoal2,
        eg3: data.explainGoal3,
      }
    }

    console.log(methodology);

    const res = await api({
      url: "/api/dataApp/methodology/",
      method: "PUT",
      data: { methodology }
    })
      .then((res) => {
        Swal.fire({
          title: 'Metodología guardada',
          text: res.data.message,
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0098D4'
        })
        navigate("/print-to-pdf")
      })
      .catch((e) => {
        console.error(e)
        Swal.fire({
          title: '¡Error!',
          text: e,
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#0098D4'
        })
      })
  }

  return (
    <>
      <Box
        component="form"
        className="methodology"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2} sx={{ mb: 3, px: 5, maxWidth: { xl: 1400 }, margin: { xl: "0 auto 2em" } }}>
          <Grid item xs={12} md={6} sx={{}}>
            {/* Pendiente agregar el resumen de la propuesta, si no se agrega, se elimina este bloque de comentario
          
          <Typography variant="h4" component="h1" sx={{ mt: 3, mb: 2 }}>Resumen de la propuesta:</Typography>
          <Typography variant="p" component="p" sx={{my:1}}>
            El resumen de la propuesta es un texto que describe de manera general el proyecto de investigación, en el cual se presentan los objetivos, la metodología y los resultados esperados. Se recomienda que el resumen sea claro y conciso, y que contenga la información más relevante del proyecto. El resumen debe ser redactado en tercera persona y en tiempo presente. El resumen debe tener una extensión máxima de 250 palabras.
          </Typography>
          <TextField
            id="Summary-field"
            label="Incluya el resumen de la propuesta"
            multiline
            defaultValue={loadMethod ? loadMethod?.summary : ""}
            minRows={5}
            sx={{ width: "100%", mb: 2 }}
            {...register("summary", { required: true }) }
          />
          {errors.summary && <Typography component="span" sx={{color: "red", fontSize: 10}}>Agregue el resumen de la propuesta o agregue un caracter en aprobación del texto ya almacenado</Typography>} */}

            <Typography variant="h4" component="h1" sx={{ my: 1 }}>Metodología</Typography>
            <Typography variant="h6" component="h4" sx={{ my: 2 }}>Tipo de investigación</Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                type="text"
                label="Enfoque de la investigación"
                focused={loadMethod.approachResearch ? true : false}
                multiline
                defaultValue={loadMethod ? loadMethod.approachResearch : ""}
                rows={2}
                sx={{ mt: 0 }}
                {...register("approachResearch", { required: true })}
              />
              {errors.approachResearch && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Agregue el enfoque de la investigación o agregue un caracter en aprobación del texto almacenado previamente</Typography>}

              <TextField
                type="text"
                label="Alcance de la investigación"
                focused={loadMethod.scopeResearch ? true : false}
                multiline
                defaultValue={loadMethod ? loadMethod.scopeResearch : ""}
                rows={2}
                sx={{ mt: 2 }}
                {...register("scopeResearch", { required: true })}
              />
              {errors.scopeResearch && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Agregue el alcance de la investigación o agregue un caracter en aprobación del texto almacenado previamente</Typography>}

              <TextField
                type="text"
                label="Diseño de la investigación"
                focused={loadMethod.designResearch ? true : false}
                multiline
                defaultValue={loadMethod ? loadMethod.designResearch : ""}
                rows={2}
                sx={{ mt: 2 }}
                {...register("designResearch", { required: true })}
              />
              {errors.designResearch && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Agregue el diseño de la investigación o agregue un caracter en aprobación del texto almacenado previamente</Typography>}
            </Box>
            <Grid item xs={6}>
              <Img src={methodImg} alt="Metodología" />
            </Grid>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="p" component="p" sx={{ mt: 2, mb: 3 }}>Ténica de recolección de información:</Typography>
            <Box
              sx={{ width: { xs: 1 / 1, sm: 500 }, margin: "auto", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly" }}
            >
              <Controller
                name="techSPickupInfo"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <>
                    {listTPickupInfo.map((i, index) => (
                      <Chip
                        key={index}
                        label={i}
                        clickable
                        onClick={() => field.onChange(i)}
                        color={field.value === i ? "primary" : "warning"}
                        style={{ margin: "0.5em", padding: "0.2em 1.2em" }}
                      />
                    ))}
                    <input type="hidden" {...field} />
                  </>
                )}
              />
            </Box>
            <Typography variant="p" component="p" sx={{ mt: 3 }}>Piense en la solución de los objetivos específicos para poder identificar las
              técnicas de recolección de información:</Typography>
            <Grid container spacing={2}>
              {Object.keys(loadGoals).map((key, i) => (
                <Grid key={i} item xs={12} md={4}>
                  <Typography variant="h6" component="h6" sx={{ mt: 3, p: 0, border: 1, textAlign: "center" }}>Objetivo {i + 1}</Typography>
                  <Typography variant="p" component="p" sx={{ border: 1, p: 1 }}>{loadGoals[key]}</Typography>
                </Grid>
              ))}
            </Grid>
            <Box sx={{ display: "flex", flexDirection: "column", mt: 3 }}>
              <TextField
                type="text"
                label="Explicación de uso de la técnica objetivo 1:"
                focused={loadMethod.explainGoals?.eg1 ? true : false}
                multiline
                defaultValue={loadMethod ? loadMethod?.explainGoals?.eg1 : ""}
                rows={2}
                className="explainGoal1"
                sx={{ mt: 2 }}
                {...register("explainGoal1", { required: true })}
              />
              {errors.explainGoal1 && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Explique brevemente cómo usó la técnica de recolección para crear el objetivo 1, o agregue un caracter en aprobación del texto almacenado previamente</Typography>}

              <TextField
                type="text"
                label="Explicación de uso de la técnica objetivo 2:"
                focused={loadMethod.explainGoals?.eg2 ? true : false}
                multiline
                defaultValue={loadMethod ? loadMethod?.explainGoals?.eg2 : ""}
                rows={2}
                className="explainGoal2"
                sx={{ mt: 2 }}
                {...register("explainGoal2", { required: true })}
              />
              {errors.explainGoal2 && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Explique brevemente cómo usó la técnica de recolección para crear el objetivo 2, o agregue un caracter en aprobación del texto almacenado previamente</Typography>}

              <TextField
                type="text"
                label="Explicación de uso de la técnica objetivo 3:"
                focused={loadMethod.explainGoals?.eg3 ? true : false}
                multiline
                defaultValue={loadMethod ? loadMethod?.explainGoals?.eg3 : ""}
                rows={2}
                className="explainGoal3"
                sx={{ mt: 2 }}
                {...register("explainGoal3", { required: true })}
              />
              {errors.explainGoal3 && <Typography component="span" sx={{ color: "red", fontSize: 10 }}>Explique brevemente cómo usó la técnica de recolección para crear el objetivo 3, o agregue un caracter en aprobación del texto almacenado previamente</Typography>}
            </Box>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "end", my: 5 }}>
            <CustomButton name="Guardar" />
            {Object.entries(loadMethod).length !== 0 ? <CustomButton anchor='/dashboard' name="Menu" sx={{ mx: 2 }} /> : null}
          </Box>
        </Grid>
      </Box>
    </>
  )
}