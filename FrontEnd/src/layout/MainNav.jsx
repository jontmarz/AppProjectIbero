import React from 'react'
import Logo from '../components/Logo'
import { Button, Grid } from '@mui/material'
import CustomButton from '../components/CustomButton'

export default function MainNav(props) {
  return (
    <>
      <Grid container spacing={4} direction="row" alignItems="center" sx={{maxWidth: 1400, margin: "auto", width: "100%"}}>
        <Grid item xs={6} sx={{pt:"0 !important"}}>
          <Logo />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="flex-end" sx={{pr:5}}>
          <CustomButton action="click" click={props.click} name={props.button}  />
        </Grid>
      </Grid>
    </>
  )
}
