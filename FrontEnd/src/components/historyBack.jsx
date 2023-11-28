import { Grid } from "@mui/material";
import CustomButton from "./CustomButton"

export default function historyBack() {

    const history = () => window.history.back()

    return (
        <>
            <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", mt:1 }}>
                <CustomButton name="Volver" action={history} />
            </Grid>
        </>
    )
}