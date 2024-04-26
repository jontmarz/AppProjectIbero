import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, getToken } from '../../config/axios';
import { Grid } from "@mui/material";
import HeaderStudentFichaProject from "./HeaderStudentFichaProject";
import DataCardDashboard from "../../components/ProjectPage/dataCardDashboard";
import Comment from "../../components/ProjectPage/Comment";
import HistoryBack from "../../components/historyBack";

export default function FichaProject() {

    const [dataProj, setDataProj] = useState([])
    let { idProject } = useParams();

    const loadDataProj = async () => {
        try {
            const res = await api({
                url: `/api/dataApp/${idProject}/`,
                method: "GET"
            })
            const dataApp = res.data.data
            setDataProj(dataApp)                
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (idProject) {
            loadDataProj()
        }
    }, [idProject])

    if (!dataProj) return null

    return (
        <>
        <Grid container spacing={2} className="projectCard" sx={{ mt: 3, px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "2em auto"}}>
            <HeaderStudentFichaProject dataEst={dataProj} />
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                <DataCardDashboard dataP={dataProj} />
            </Grid>
            <Comment idProj={idProject} />
            <HistoryBack />
        </Grid>
        </>
    )
}