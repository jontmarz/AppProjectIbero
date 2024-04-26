import { useEffect, useState } from "react";
import { api } from '../../config/axios';
import { Grid, Typography, Box } from "@mui/material";
import { DataProfile } from "../../components/ProjectPage/DataProfile";

export default function HeaderStudentDashboard(props) {
    const { dataEst } = props
    const [dataUser, setDataUser] = useState(null)

    const loadUser = async () => {
        try {
            const res = await api({
                url: `/api/user/${dataEst.user}/`,
                method: "GET"
            })
            const userData = res.data.infoUser
            setDataUser(userData)
        } catch (e) {
            console.error(e.response.data);
        } finally {
            setLoading(false)
        }
        
    }
    useEffect(() => {
        if (dataEst) {
            loadUser()
        }
    }, [dataEst])

    if (!dataUser) return null

    return (
        <>
        <Box>
            <Grid container spacing={2} sx={{backgroundColor:"#666", borderRadius:"25px 25px 0 0", p:"0"}}>
                <DataProfile user={dataUser} />
                <Grid item xs={12} sx={{display:"flex", justifyContent:"space-between"}}>
                    <Typography variant="h6" component="h6" sx={{ mt: 1, mb: 3, color:"#fff"}}>
                        <strong>Título Proyecto: </strong> <i>{dataEst?.goals?.titleProj ? dataEst?.goals?.titleProj : "N/D"}</i>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
        </>
    )
}