import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, getToken } from '../../config/axios';
// import { useUserContext } from "../../context/UserContext";
import { Grid, Typography, Box } from "@mui/material";
import DataStudentDashboard from "../../components/dataStudentDashboard";

export default function first() {

    // const { user } = useUserContext();
    const [dataProj, setDataProj] = useState([])
    const [dataStudent, setSataStudent] = useState([])
    let { idProject } = useParams();
    const token = getToken()

    useEffect(() => {
        const loadDataProj = async () => {
            try {
                const res = await api({
                    url: `/api/dataApp/${idProject}`,
                    method: "GET",
                    headers: { Authorization: `Bearer ${token}` }
                })
                const dataApp = res.data.data
                setDataProj(dataApp)

                const student = dataApp.user;

                const loadDataStudent = async () => {
                    try {
                        const response = await api({
                            url: `/api/user/${student}`,
                            method: "GET",
                            headers: { Authorization: `Bearer ${token}` }
                        })
                        const dataStudent = response.data.infoUser
                        setSataStudent(dataStudent)
                        
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
    
    console.log(dataStudent);
    console.log(dataProj);

    return (
        <>
            <Grid container spacing={2} sx={{ mt: 2, mb: 3, px: 5, maxWidth: {xl: 1400}, margin: {xl: "0 auto 2em"} }}>
                <Grid container spacing={2} sx={{backgroundColor:"#666", borderRadius:"25px 25px 0 0", p:"1em"}}>
                    <DataStudentDashboard user={dataStudent} data={dataProj} />
                </Grid>
                <Grid item xs={12} sx={{ display: "flex", justifyContent: "center"}}>
                    <Grid container spacing={2} sx={{  }}>
                        <Grid item xs={12}  md={6} sx={{ display: "flex", justifyContent: "center"}}>
                        <Typography variant="h6" component="h6" sx={{ mt: 3, mb: 1}}>
                            Problema Central:
                        </Typography>
                        <Typography variant="p" component="p" sx={{ mt: 3, mb: 1}}>
                            {dataProj}
                        </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}