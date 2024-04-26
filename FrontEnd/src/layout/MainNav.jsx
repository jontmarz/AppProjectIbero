import react from 'react'
import { Grid, Typography } from '@mui/material'
import { useUserContext } from '../context/UserContext';
import Swal from 'sweetalert2';
import Logo from '../components/Logo';
import CustomButton from "../components/CustomButton";

export default function MainNav() {
 
  const { user, logOut } = useUserContext()

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
        logOut()
      }
    })
  }

  if (!user) return null
  
  return (
    <>
      <Grid container spacing={4} direction="row" alignItems="center" sx={{maxWidth: 1400, margin: "auto", width: "100%"}}>
        <Grid item xs={6} sx={{ pt:"16px !important" }}>
          <Logo />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end" sx={{pr:5}}>
          <Typography variant="h6" component="p" sx={{ mr: 3, color:"#de0d0d", fontWeight: 600 }}>Bienvenido { user.fullName }!</Typography>
          <CustomButton action={signOut} name="Salir"  />
        </Grid>
      </Grid>
    </>
  )
}
