import React, { useState, useEffect } from 'react'
import { api } from '../../config/axios'
import { useForm } from "react-hook-form";
import { Box, FormControl, Grid, Typography, Select, InputLabel, RadioGroup, List, ListItem, Radio, FormControlLabel } from "@mui/material"
import CustomButton from '../CustomButton';
import Swal from 'sweetalert2';


export default function Projects() {
  const [ docentes, setDocentes ] = useState([])
  const [ projects, setProjects ] = useState([])
  const [ selectedDocente, setSelectedDocente ] = useState("")
  const [ selectedProjects, setSelectedProjects ] = useState([])
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api({
          url: "/api/superUser/users",
          method: "GET"
        })
        setDocentes(res.data.docentes)
      } catch (e) {
        console.error('Error al cargar los docentes:', e)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (selectedDocente) {
      const fetchData = async () => {
        try {
          const { data } = await api({
            url: "/api/superUser/dataApp",
            method: "GET"
          })
          setProjects(data.projects)
          // Filtrar los proyectos que pertenecen al docente seleccionado
          const currentProjects = data.projects.filter(p => docentes.find(d => d._id === selectedDocente).projects.includes(p._id))
          setSelectedProjects(currentProjects.map(p => p._id))
        } catch (e) {
          console.error('Error al cargar los proyectos:', e)
        }
      }
      fetchData()
    }
  }, [selectedDocente])

  const handleDocenteChange = (e) => {
    setSelectedDocente(e.target.value);
  }

  const handleProjectChange = (e) => {
    const { options } = e.target
    const value = []
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    setSelectedProjects(value)
  }

  const DocenteName = (id) => {
    const docente = docentes.find(docente => docente._id === id)
    return docente ? docente.fullName : ""
  }

  const onSubmit = async (data, e) => {
    // setProjects([...selectedProjects, data])
    const docente = docentes.find(d => d._id === selectedDocente)
    const proyectAssigned = selectedDocente.filter(projId => docente.projects.includes(projId))
    
    if (proyectAssigned.length > 0) {
      const projectsName = projects
        .filter(p => proyectAssigned.includes(p._id))
        .map(p => p.goals?.titleProj)
        .join(", ")

      Swal.fire({
        title: "¡Proyecto ya asignado!",
        text: `Los siguientes proyectos ya ha sido asignados: ${projectsName}`,
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#0098D4"
      })
      return
    }
    
    try {
      const res = await api({
        url: `/api/superUser/users/${selectedDocente}`,
        method: "PUT",
        data: { projects: selectedProjects }
      })
      Swal.fire({
        title: "¡Datos Guardados!",
        text: res.data.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (e) {
      console.error(e)
      Swal.fire({
          title: "¡Error!",
          text: e,
          icon: "error",
          confirmButtonText: "Aceptar",
          confirmButtonColor: "#0098D4"
      })
    }
    window.location.reload()
  }
  

  return (
    <>
    <Typography variant="h5" component="h5" sx={{ fontSize: 25, fontWeight: "bold", my: 2, mr: "3em", textAlign: "center" }}>Asignar Proyectos a un docente</Typography>

    <Box
      component="form"
      className="asignar-proyecto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2} sx={{ mt: 3, px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "2em auto"}}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="h6" sx={{ fontSize: 20, fontWeight: "bold", my: 2, }}>Seleccionar Docente</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 300, maxHeight: 200, overflow: 'auto', border: '1px solid #ddd', borderRadius: '4px', p: 1 }}>
            <RadioGroup value={selectedDocente} onChange={handleDocenteChange}>
              <List>
                {docentes.map((docente) => (
                  <ListItem key={docente._id}>
                    <FormControlLabel
                      value={docente._id}
                      control={<Radio />}
                      label={docente.fullName}
                    />
                  </ListItem>
                ))}
              </List>
            </RadioGroup>
          </FormControl>
        </Grid>
      {selectedDocente && (
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" component="h6" sx={{ fontSize: 20, fontWeight: "bold", my: 2, }}>Projectos para el docente: { DocenteName(selectedDocente) }</Typography>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: 300 }}>
            <InputLabel shrink htmlFor="select-multiple-native">
              Selecionar Proyectos
            </InputLabel>
            <Select
              multiple
              native
              id="project-select"
              value={selectedProjects}
              {...register("projects", { required: true })}
              onChange={handleProjectChange}
              inputProps={{
                id: 'selected-multiple-native',
                'aria-label': 'Without label',
                size: 8
              }}
              sx={{ maxHeight: 200, overflowY: 'auto', }}
            >
              {projects
              .filter(project => project.goals && project.goals?.titleProj)
              .map((project) => (
                <option key={project._id} value={project._id}>{project.goals?.titleProj}</option>
              ))}
            </Select>
          </FormControl>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CustomButton name="Asignar Proyectos" />
          </Box>
        </Grid>
      )}
      </Grid>
    </Box>
    </>
  )
}
