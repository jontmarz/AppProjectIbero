import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, getToken } from '../../config/axios';
import { useUserContext } from "../../context/UserContext";
import { Grid } from "@mui/material";
import HeaderStudentDashboard from "../../components/ProjectPage/HeaderStudentDashboard";
import DataCardDashboard from "../../components/ProjectPage/dataCardDashboard";
import Comment from "../../components/ProjectPage/comment";
import HistoryBack from "../../components/historyBack";

export default function fichaProject() {

    const [dataProj, setDataProj] = useState([])
    const { user } = useUserContext()
    const token = getToken()
    const [dataStudent, setDataStudent] = useState([])
    let { idProject } = useParams();

    useEffect(() => {
        const loadDataProj = async () => {
            try {
                const res = await api({
                    url: `/api/dataApp/${idProject}/`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
                const dataApp = res.data.data
                setDataProj(dataApp)

                const student = dataApp.user;

                const loadDataStudent = async () => {
                    try {
                        const res = await api({
                            url: `/api/user/${student}/`,
                            method: "GET",
                            headers: { Authorization: `Bearer ${token}` }
                        })
                        const dataStudent = res.data.infoUser
                        setDataStudent(dataStudent)
                        
                    } catch (e) {
                        console.error(e);
                    }
                }
        
                loadDataStudent()
                
            } catch (e) {
                console.error(e);
            }
        }

        loadDataProj()
    }, [token, idProject])

    return (
        <>
        <Grid container spacing={2} className="projectCard" sx={{ mt: 3, px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "2em auto"}}>
            <HeaderStudentDashboard data={dataProj} sx={{width: "100%", mx:"auto"}} />
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                <DataCardDashboard dataP={dataProj} />
            </Grid>
            <Comment idProj={idProject} />
            <HistoryBack />
        </Grid>
        {/* <Grid container spacing={2} className="dashboard" sx={{ mt: 3, px: 5, maxWidth: {xl: 1400}, width: "100%", margin: "2em auto"}}>
            <DataStudentDashboard data={dataProj} sx={{width: "100%", mx:"auto"}}/>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                <DataCardDashboard dataP={dataProj} />
            </Grid>
            <Comment idProj={idProject} />
            <HistoryBack />
        </Grid> */}
        </>
    )
}