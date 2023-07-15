import React from 'react'
import { Grid, Typography} from "@mui/material";
import styled from "@emotion/styled";
import dialnetLogo from "../../assets/logos/dialnet.png";
import redalycLogo from "../../assets/logos/redalyc.png";
import scifloLogo from "../../assets/logos/sciflo.png";

export default function QueryDB() {

    const imgLogos = [
        {
            img: dialnetLogo,
            alt: "Dialnet"
        },
        {
            img: redalycLogo,
            alt: "Redalyc"
        },
        {
            img: scifloLogo,
            alt: "SciFlo"
        },
    ]

    const Img = styled("img")({
        width: '50%',
        objectFit: "cover",
        objectPosition: "center"
    })

    return (
        <>            
        <Grid container spacing={2}>
            {imgLogos.map((logo, index) =>
                <Grid item xs={4} key={index} sx={{ display: "flex", justifyContent: "center" }}>
                    <Img src={logo.img} alt={logo.alt} />
                </Grid>
            )}
        </Grid>                
        </>
    )
}
