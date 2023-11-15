import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, getToken } from '../../config/axios';
import { Grid } from "@mui/material";
import DataStudentDashboard from "../../components/ProjectPage/dataStudentDashboard";
import DataCardDashboard from "../../components/ProjectPage/dataCardDashboard";
import Comment from "../../components/ProjectPage/comment";

export default function fichaProject() {

    const [dataProj, setDataProj] = useState([])
    
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
                        const response = await api({
                            url: `/api/user/${student}/`,
                            method: "GET",
                            headers: { Authorization: `Bearer ${token}` }
                        })
                        const dataStudent = response.data.infoUser
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
            <Grid container spacing={2} sx={{ mt: 2, mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "0 auto 2em"} }}>
                <DataStudentDashboard user={dataStudent} data={dataProj} />
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                    <DataCardDashboard dataP={dataProj} />
                </Grid>
                <Comment idProj={idProject} />
            </Grid>
        </>
    )
}