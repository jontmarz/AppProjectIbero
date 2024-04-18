import react from "react";
import { Grid, Typography, Table } from "@mui/material"
import AdsClickIcon from '@mui/icons-material/AdsClick'
import CustomButton from "../../components/CustomButton"

export default function DashboardEstudiante() {
    
    const menuItems = [
        {
            title: "Antecedentes",
            url: "/records",
        },
        {
            title: "Árbol del Problema",
            url: "/problem-tree",
        },
        {
            title: "Descripción del Problema",
            url: "/description",
        },
        {
            title: "Justificación",
            url: "/justification",
        },
        {
            title: "Título y Objetivos",
            url: "/goals",
        },
        {
            title: "Ética e Impactos",
            url: "/ethicalimpacts",
        },
        {
            title: "Metodología",
            url: "/methodology",
        },
        {
            title: "Ficha del Proyecto",
            url: "/print-to-pdf",
        }
    ]

    return (
        <>
            <Grid container spacing={2} className="headerEstudiante" sx={{ mt: 3, px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "2em auto"}}>
                <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", margin:"auto" }}>
                    <Table  className="menuStyle">
                        <tbody>
                        {menuItems.map((item, index) =>
                            <tr key={index}>
                                <td>
                                    <AdsClickIcon key={index} sx={{ fontSize: 25, color: "#000", my: 2, mr: "3em" }} />
                                </td>
                                <td>
                                    <Typography key={index} variant="h4" component="p" sx={{ fontSize: 20, fontWeight: "bold", my: 2, mr: "3em" }}>{item.title}</Typography>
                                </td>
                                <td>
                                    <CustomButton key={index} name="Editar" anchor={item.url} />
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Grid>
            </Grid>
        </>
    )
}
