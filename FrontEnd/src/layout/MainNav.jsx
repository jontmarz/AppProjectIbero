import React from 'react'
import { useNavigate } from "react-router-dom";
import { deleteToken } from '../config/axios';
import { Grid } from '@mui/material'
import Logo from '../components/Logo';
import CustomButton from '../components/CustomButton';

export default function MainNav(props) {
  const navigate = useNavigate()

  const signOut = () => {
      console.log("running");
      /* deleteToken()
      navigate("/") */
  }
  
  return (
    <>
      <Grid container spacing={4} direction="row" alignItems="center" sx={{maxWidth: 1400, margin: "auto", width: "100%"}}>
        <Grid item xs={6} sx={{pt:"0 !important"}}>
          <Logo />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end" sx={{pr:5}}>
          {/* <button onClick={signOut}>Salir</button> */}
          <CustomButton typeB="button" onClick={signOut} name="Salir"  />
        </Grid>
      </Grid>
    </>
  )
}
