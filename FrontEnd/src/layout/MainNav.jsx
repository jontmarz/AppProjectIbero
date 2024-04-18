import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { Grid, Typography, CircularProgress } from '@mui/material'
import { deleteToken } from '../config/axios';
import Swal from 'sweetalert2';
import Logo from '../components/Logo';
import CustomButton from "../components/CustomButton";

export default function MainNav(props) {
  
  const [loading, setLoading] = useState(false)
  const { name } = props
  const navigate = useNavigate()
  
  /* useEffect(() => {
    if (name !== undefined) return () => {
    }
    setLoading(true)
  }, []) */

  const signOut = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás a punto de cerrar sesión",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      confirmButtonColor: "#F4C504",
      cancelButtonText: "Cancelar",
      customClass: {
        confirmButton: "btn-confirm-logout"
      }
    }).then((result) => {
      if (result.isConfirmed) {
        deleteToken()
        navigate("/")
        // logOut()
      }
    })
  }

  /* if (loading) return (
    <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
        <CircularProgress color="success" />
    </Grid>
  ) */
  
  return (
    <>
      <Grid container spacing={4} direction="row" alignItems="center" sx={{maxWidth: 1400, margin: "auto", width: "100%"}}>
        <Grid item xs={6} sx={{ pt:"16px !important" }}>
          <Logo />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end" sx={{pr:5}}>
          <Typography variant="h6" component="p" sx={{ mr: 3, color:"#de0d0d", fontWeight: 600 }}>Bienvenido { name }!</Typography>
          <CustomButton action={signOut} name="Salir"  />
        </Grid>
      </Grid>
    </>
  )
}
